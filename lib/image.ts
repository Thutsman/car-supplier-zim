/**
 * Photos in our own Supabase bucket are resized + compressed before they're stored
 * (in the browser at upload, and by scripts/shrink-existing-images.ts for older ones),
 * so they're served as-is. That keeps them out of Vercel's metered image optimizer.
 * Anything else (e.g. the legacy Unsplash placeholders) still goes through next/image.
 */
export function isSelfHostedPhoto(url: string): boolean {
  return url.includes(".supabase.co/storage/v1/object/public/");
}
