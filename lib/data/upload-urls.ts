/**
 * Client-safe helpers for ephemeral upload URLs. Kept free of store/Buffer
 * imports so client components can use them without bundling server code.
 */

export const UPLOADS_BASE_PATH = "/api/uploads/";

export function uploadUrl(id: string): string {
  return `${UPLOADS_BASE_PATH}${id}`;
}

/**
 * Ephemeral uploads live in instance memory, so the Next image optimizer's
 * self-fetch can miss them on another instance — render these unoptimized.
 */
export function isEphemeralUpload(url: string): boolean {
  return url.startsWith(UPLOADS_BASE_PATH);
}
