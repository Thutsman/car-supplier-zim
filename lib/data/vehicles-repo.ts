import { getStore } from "./store";
import type { Vehicle } from "./types";

/**
 * Data access seam for vehicle listings. All functions are async so the
 * internals can be swapped for Supabase queries (docs/cms-phase2.md)
 * without touching call sites.
 */

export type NewVehicleInput = Omit<Vehicle, "id" | "createdAt" | "updatedAt">;

export async function getVehicles(): Promise<Vehicle[]> {
  return [...getStore().vehicles].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getFeaturedVehicles(): Promise<Vehicle[]> {
  return getStore().vehicles.filter(
    (v) => v.featured && v.status !== "sold"
  );
}

export async function getVehicleById(
  id: string
): Promise<Vehicle | undefined> {
  return getStore().vehicles.find((v) => v.id === id);
}

export async function getMakes(): Promise<string[]> {
  return [...new Set(getStore().vehicles.map((v) => v.make))].sort();
}

type Bounds = { min: number; max: number };

function bounds(values: number[]): Bounds {
  if (values.length === 0) return { min: 0, max: 0 };
  return { min: Math.min(...values), max: Math.max(...values) };
}

export async function getPriceBounds(): Promise<Bounds> {
  return bounds(getStore().vehicles.map((v) => v.price));
}

export async function getYearBounds(): Promise<Bounds> {
  return bounds(getStore().vehicles.map((v) => v.year));
}

export async function getMileageBounds(): Promise<Bounds> {
  return bounds(getStore().vehicles.map((v) => v.mileage));
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createVehicle(input: NewVehicleInput): Promise<Vehicle> {
  const now = new Date().toISOString();
  const vehicle: Vehicle = {
    ...input,
    id: `${slugify(`${input.make}-${input.model}`)}-${Date.now().toString(36)}`,
    createdAt: now,
    updatedAt: now,
  };
  getStore().vehicles.push(vehicle);
  return vehicle;
}

export async function updateVehicle(
  id: string,
  input: NewVehicleInput
): Promise<Vehicle | undefined> {
  const store = getStore();
  const index = store.vehicles.findIndex((v) => v.id === id);
  if (index === -1) return undefined;
  const updated: Vehicle = {
    ...store.vehicles[index],
    ...input,
    id,
    updatedAt: new Date().toISOString(),
  };
  store.vehicles[index] = updated;
  return updated;
}

export async function deleteVehicle(
  id: string
): Promise<Vehicle | undefined> {
  const store = getStore();
  const index = store.vehicles.findIndex((v) => v.id === id);
  if (index === -1) return undefined;
  const [removed] = store.vehicles.splice(index, 1);
  return removed;
}
