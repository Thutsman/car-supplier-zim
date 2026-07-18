import { randomUUID } from "node:crypto";
import { createClient } from "@/lib/supabase/server";
import type { Vehicle } from "./types";

/**
 * Photo storage backed by Supabase Storage's `vehicle-images` bucket.
 */

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
export const ALLOWED_UPLOAD_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

const BUCKET = "vehicle-images";

export function isAllowedUploadType(type: string): boolean {
  return (ALLOWED_UPLOAD_TYPES as readonly string[]).includes(type);
}

function extFor(type: string): string {
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  return "jpg";
}

/** Uploads a photo and returns its public URL. */
export async function saveUpload(file: File): Promise<string> {
  if (!isAllowedUploadType(file.type)) {
    throw new Error(`Unsupported image type: ${file.type || "unknown"}`);
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("Image exceeds the 5MB limit");
  }

  const supabase = await createClient();
  const path = `vehicles/${randomUUID()}.${extFor(file.type)}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
  });
  if (error) throw new Error(`Upload failed: ${error.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

function storagePathFromUrl(url: string): string | null {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const i = url.indexOf(marker);
  return i === -1 ? null : url.slice(i + marker.length);
}

/** Frees Storage objects for a vehicle's images. URLs outside our bucket
 * (e.g. the legacy Unsplash placeholders) are skipped — nothing to delete. */
export async function deleteUploadsForImages(
  images: Vehicle["images"]
): Promise<void> {
  const paths = images
    .map((img) => storagePathFromUrl(img.url))
    .filter((p): p is string => p !== null);
  if (paths.length === 0) return;

  const supabase = await createClient();
  const { error } = await supabase.storage.from(BUCKET).remove(paths);
  if (error) throw new Error(`Failed to delete images: ${error.message}`);
}
