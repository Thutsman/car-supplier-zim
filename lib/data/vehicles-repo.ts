import { vehicles } from "./vehicles";
import type { Vehicle } from "./types";

export async function getVehicles(): Promise<Vehicle[]> {
  return [...vehicles].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getFeaturedVehicles(): Promise<Vehicle[]> {
  return vehicles.filter((v) => v.featured);
}

export async function getVehicleById(id: string): Promise<Vehicle | undefined> {
  return vehicles.find((v) => v.id === id);
}

export async function getMakes(): Promise<string[]> {
  return [...new Set(vehicles.map((v) => v.make))].sort();
}

export function getPriceBounds() {
  const prices = vehicles.map((v) => v.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function getYearBounds() {
  const years = vehicles.map((v) => v.year);
  return { min: Math.min(...years), max: Math.max(...years) };
}

export function getMileageBounds() {
  const mileages = vehicles.map((v) => v.mileage);
  return { min: Math.min(...mileages), max: Math.max(...mileages) };
}
