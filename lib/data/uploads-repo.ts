import { randomUUID } from "node:crypto";
import { getStore, type StoredUpload } from "./store";
import { UPLOADS_BASE_PATH, isEphemeralUpload } from "./upload-urls";
import type { Vehicle } from "./types";

/**
 * Interim image storage: Buffers in the in-memory store, served by
 * app/api/uploads/[id]/route.ts. Swapped for Supabase Storage in Phase 2
 * (docs/cms-phase2.md) — only this file's internals change.
 */

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
export const ALLOWED_UPLOAD_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export function isAllowedUploadType(type: string): boolean {
  return (ALLOWED_UPLOAD_TYPES as readonly string[]).includes(type);
}

export async function saveUpload(file: File): Promise<string> {
  if (!isAllowedUploadType(file.type)) {
    throw new Error(`Unsupported image type: ${file.type || "unknown"}`);
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("Image exceeds the 5MB limit");
  }
  const id = randomUUID();
  const buffer = Buffer.from(await file.arrayBuffer());
  getStore().uploads.set(id, { buffer, contentType: file.type });
  return id;
}

export async function getUpload(
  id: string
): Promise<StoredUpload | undefined> {
  return getStore().uploads.get(id);
}

export async function deleteUpload(id: string): Promise<void> {
  getStore().uploads.delete(id);
}

/** Free stored buffers for a vehicle's ephemeral images (e.g. on delete). */
export async function deleteUploadsForImages(
  images: Vehicle["images"]
): Promise<void> {
  for (const image of images) {
    if (isEphemeralUpload(image.url)) {
      await deleteUpload(image.url.slice(UPLOADS_BASE_PATH.length));
    }
  }
}
