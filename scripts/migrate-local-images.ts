/**
 * One-off script: uploads the real local vehicle photos in public/vehicles/
 * to the Supabase `vehicle-images` Storage bucket and links them to their
 * already-seeded vehicle rows (matched by make + model).
 *
 * Run once, locally, after the 0001/0002/0003 migrations have been applied:
 *
 *   SUPABASE_URL=https://xourjibposchcfnsttuv.supabase.co \
 *   SUPABASE_SERVICE_ROLE_KEY=... \
 *   npx tsx scripts/migrate-local-images.ts
 *
 * The service role key is only ever used here — never in the deployed app.
 * Not idempotent: re-running will duplicate rows/files. Safe to delete
 * this file after a successful run.
 */
import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running this script."
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
const BUCKET = "vehicle-images";

interface SeedImage {
  file: string;
  contentType: string;
  alt: string;
  sortOrder: number;
}

interface SeedVehicle {
  make: string;
  model: string;
  images: SeedImage[];
}

const vehicles: SeedVehicle[] = [
  {
    make: "BMW",
    model: "F20 118d",
    images: [
      {
        file: "public/vehicles/bmw-118d.jpg",
        contentType: "image/jpeg",
        alt: "Red BMW F20 118d front view at Car Supplier Zimbabwe",
        sortOrder: 0,
      },
      {
        file: "public/vehicles/bmw-118d-rear-quarter.jpg",
        contentType: "image/jpeg",
        alt: "Red BMW F20 118d rear three-quarter view with alloy wheels",
        sortOrder: 1,
      },
      {
        file: "public/vehicles/bmw-118d-rear.jpg",
        contentType: "image/jpeg",
        alt: "Red BMW F20 118d rear view with 118d badge",
        sortOrder: 2,
      },
      {
        file: "public/vehicles/bmw-118d-interior.jpg",
        contentType: "image/jpeg",
        alt: "BMW F20 118d cockpit with sport steering wheel and iDrive",
        sortOrder: 3,
      },
      {
        file: "public/vehicles/bmw-118d-rear-seats.jpg",
        contentType: "image/jpeg",
        alt: "BMW F20 118d rear seats with red-stitched sport upholstery",
        sortOrder: 4,
      },
    ],
  },
  {
    make: "BMW",
    model: "F32 420i",
    images: [
      {
        file: "public/vehicles/bmw-420i.jpg",
        contentType: "image/jpeg",
        alt: "White BMW F32 420i coupé at Car Supplier Zimbabwe",
        sortOrder: 0,
      },
    ],
  },
  {
    make: "Toyota",
    model: "HiAce (Baby Quantum)",
    images: [
      {
        file: "public/vehicles/toyota-hiace.jpg",
        contentType: "image/jpeg",
        alt: "Silver Toyota HiAce Baby Quantum at Car Supplier Zimbabwe",
        sortOrder: 0,
      },
    ],
  },
  {
    make: "Audi",
    model: "A4 Quattro",
    images: [
      {
        file: "public/vehicles/audi-a4.jpg",
        contentType: "image/jpeg",
        alt: "White Audi A4 Quattro at Car Supplier Zimbabwe",
        sortOrder: 0,
      },
    ],
  },
];

async function main() {
  for (const vehicle of vehicles) {
    const { data: row, error: findError } = await supabase
      .from("vehicles")
      .select("id")
      .eq("make", vehicle.make)
      .eq("model", vehicle.model)
      .single();
    if (findError || !row) {
      throw new Error(`Vehicle not found: ${vehicle.make} ${vehicle.model}`);
    }

    for (const img of vehicle.images) {
      const buffer = await readFile(img.file);
      const path = `vehicles/${randomUUID()}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(path, buffer, { contentType: img.contentType });
      if (uploadError) throw uploadError;

      const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
      const { error: insertError } = await supabase
        .from("vehicle_images")
        .insert({
          vehicle_id: row.id,
          url: pub.publicUrl,
          alt: img.alt,
          sort_order: img.sortOrder,
        });
      if (insertError) throw insertError;
    }
    console.log(
      `Linked ${vehicle.images.length} photo(s) for ${vehicle.make} ${vehicle.model}`
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
