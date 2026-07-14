import { createHash, createHmac, timingSafeEqual } from "node:crypto";

/**
 * Interim admin session for the pre-Supabase CMS: an HMAC-SHA256-signed
 * expiry payload in an httpOnly cookie, keyed off ADMIN_PASSWORD. Pure
 * functions only — no next/headers — so proxy.ts can import this module.
 * Replaced by Supabase Auth in Phase 2 (see docs/cms-phase2.md).
 */

export const ADMIN_COOKIE = "csz_admin_session";
export const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

function getSecret(): Buffer | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return createHash("sha256").update(`csz-admin-v1:${password}`).digest();
}

function sign(payload: string, secret: Buffer): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createSessionToken(now = Date.now()): string {
  const secret = getSecret();
  if (!secret) throw new Error("ADMIN_PASSWORD is not configured");
  const payload = Buffer.from(
    JSON.stringify({ exp: now + SESSION_MAX_AGE_SECONDS * 1000 })
  ).toString("base64url");
  return `${payload}.${sign(payload, secret)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  const secret = getSecret();
  if (!secret || !token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = Buffer.from(sign(payload, secret));
  const actual = Buffer.from(signature);
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    return false;
  }
  try {
    const { exp } = JSON.parse(Buffer.from(payload, "base64url").toString());
    return typeof exp === "number" && exp > Date.now();
  } catch {
    return false;
  }
}

export function verifyPassword(input: string): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const a = createHash("sha256").update(input).digest();
  const b = createHash("sha256").update(password).digest();
  return timingSafeEqual(a, b);
}
