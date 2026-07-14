import { vehicles as seedVehicles } from "./vehicles";
import type { Vehicle } from "./types";

/**
 * Interim in-memory data store for the pre-Supabase CMS. Seeded from the
 * static vehicles file on first access. Stashed on globalThis so it
 * survives dev-server HMR; on Vercel it is per-instance and resets on
 * redeploy — an accepted tradeoff until the Supabase repo lands
 * (docs/cms-phase2.md), at which point this file is deleted.
 */

export interface StoredUpload {
  buffer: Buffer;
  contentType: string;
}

interface CszStore {
  vehicles: Vehicle[];
  uploads: Map<string, StoredUpload>;
}

const g = globalThis as unknown as { __cszStore?: CszStore };

export function getStore(): CszStore {
  if (!g.__cszStore) {
    g.__cszStore = {
      vehicles: structuredClone(seedVehicles),
      uploads: new Map(),
    };
  }
  return g.__cszStore;
}
