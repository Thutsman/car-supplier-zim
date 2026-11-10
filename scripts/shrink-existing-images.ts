/**
 * One-off script: shrinks the photos already stored in the Supabase `vehicle-images`
 * bucket (older uploads can be up to 5MB) to 1600px / ~80% quality, in place.
 * Each file keeps its path and format, so no database rows or URLs change.
 *
 * Run once, locally. Use --dry-run first to see what would change:
 *
 *   SUPABASE_URL=https://xourjibposchcfnsttuv.supabase.co \
 *   SUPABASE_SERVICE_ROLE_KEY=... \
 *   npx tsx scripts/shrink-existing-images.ts --dry-run
 *
 * Safe to re-run: files already under the size threshold are skipped.
 * The service role key is only ever used here — never in the deployed app.
 */
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const DRY_RUN = process.argv.includes("--dry-run");

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running this script.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
const BUCKET = "vehicle-images";
const MAX_EDGE = 1600;
const SKIP_UNDER_BYTES = 450 * 1024;

async function listAll(prefix: string): Promise<string[]> {
  const out: string[] = [];
  for (let offset = 0; ; offset += 100) {
    const { data, error } = await supabase.storage.from(BUCKET).list(prefix, { limit: 100, offset });
    if (error) throw new Error(`list ${prefix}: ${error.message}`);
    if (!data || data.length === 0) break;
    for (const item of data) {
      const path = prefix ? `${prefix}/${item.name}` : item.name;
      if (item.id === null) out.push(...(await listAll(path))); // folder
      else out.push(path);
    }
    if (data.length < 100) break;
  }
  return out;
}

async function main() {
  const paths = await listAll("");
  let saved = 0;
  for (const path of paths) {
    const { data: blob, error } = await supabase.storage.from(BUCKET).download(path);
    if (error || !blob) {
      console.warn(`skip ${path}: ${error?.message ?? "no data"}`);
      continue;
    }
    const input = Buffer.from(await blob.arrayBuffer());
    if (input.length < SKIP_UNDER_BYTES) {
      console.log(`ok   ${path} (${Math.round(input.length / 1024)} KB, already small)`);
      continue;
    }
    const pipeline = sharp(input).rotate().resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true });
    const lower = path.toLowerCase();
    const [output, contentType] = lower.endsWith(".png")
      ? [await pipeline.png({ compressionLevel: 9 }).toBuffer(), "image/png"]
      : lower.endsWith(".webp")
        ? [await pipeline.webp({ quality: 80 }).toBuffer(), "image/webp"]
        : [await pipeline.jpeg({ quality: 80, mozjpeg: true }).toBuffer(), "image/jpeg"];
    if (output.length >= input.length) {
      console.log(`keep ${path} (no smaller)`);
      continue;
    }
    console.log(`${DRY_RUN ? "would shrink" : "shrink"} ${path}: ${Math.round(input.length / 1024)} KB -> ${Math.round(output.length / 1024)} KB`);
    saved += input.length - output.length;
    if (!DRY_RUN) {
      const { error: upErr } = await supabase.storage.from(BUCKET).update(path, output, { contentType, upsert: true });
      if (upErr) console.warn(`  failed to update ${path}: ${upErr.message}`);
    }
  }
  console.log(`${DRY_RUN ? "Would save" : "Saved"} about ${(saved / 1024 / 1024).toFixed(1)} MB`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
