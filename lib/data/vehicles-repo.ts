import { createClient } from "@/lib/supabase/server";
import type {
  FuelType,
  Transmission,
  Vehicle,
  VehicleImage,
  VehicleStatus,
} from "./types";

/**
 * Data access seam for vehicle listings, backed by Supabase Postgres.
 * Callers never touch Supabase directly — this module owns the mapping
 * between snake_case DB rows and the app's Vehicle shape.
 */

export type NewVehicleInput = Omit<Vehicle, "id" | "createdAt" | "updatedAt">;

interface VehicleImageRow {
  id: string;
  url: string;
  alt: string;
  sort_order: number;
}

interface VehicleRow {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number | string;
  mileage: number;
  transmission: string;
  fuel_type: string;
  color: string;
  description: string;
  features: string[] | null;
  featured: boolean;
  status: string;
  created_at: string;
  updated_at: string;
  vehicle_images: VehicleImageRow[];
}

const VEHICLE_SELECT = "*, vehicle_images(*)";

function mapVehicle(row: VehicleRow): Vehicle {
  return {
    id: row.id,
    make: row.make,
    model: row.model,
    year: row.year,
    price: Number(row.price),
    mileage: row.mileage,
    transmission: row.transmission as Transmission,
    fuelType: row.fuel_type as FuelType,
    color: row.color,
    description: row.description,
    features: row.features ?? [],
    images: [...row.vehicle_images]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(
        (img): VehicleImage => ({
          id: img.id,
          url: img.url,
          alt: img.alt,
          sortOrder: img.sort_order,
        })
      ),
    featured: row.featured,
    status: row.status as VehicleStatus,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toRow(input: NewVehicleInput) {
  return {
    make: input.make,
    model: input.model,
    year: input.year,
    price: input.price,
    mileage: input.mileage,
    transmission: input.transmission,
    fuel_type: input.fuelType,
    color: input.color,
    description: input.description,
    features: input.features,
    featured: input.featured,
    status: input.status,
  };
}

async function replaceImages(
  vehicleId: string,
  images: VehicleImage[]
): Promise<void> {
  const supabase = await createClient();
  const { error: deleteError } = await supabase
    .from("vehicle_images")
    .delete()
    .eq("vehicle_id", vehicleId);
  if (deleteError) throw new Error(deleteError.message);

  if (images.length === 0) return;
  const { error: insertError } = await supabase.from("vehicle_images").insert(
    images.map((img) => ({
      vehicle_id: vehicleId,
      url: img.url,
      alt: img.alt,
      sort_order: img.sortOrder,
    }))
  );
  if (insertError) throw new Error(insertError.message);
}

export async function getVehicles(): Promise<Vehicle[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicles")
    .select(VEHICLE_SELECT)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data as VehicleRow[]).map(mapVehicle);
}

export async function getFeaturedVehicles(): Promise<Vehicle[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicles")
    .select(VEHICLE_SELECT)
    .eq("featured", true)
    .neq("status", "sold")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data as VehicleRow[]).map(mapVehicle);
}

export async function getVehicleById(
  id: string
): Promise<Vehicle | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicles")
    .select(VEHICLE_SELECT)
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data ? mapVehicle(data as VehicleRow) : undefined;
}

export async function getMakes(): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("vehicles").select("make");
  if (error) throw new Error(error.message);
  return [...new Set((data as { make: string }[]).map((v) => v.make))].sort();
}

type Bounds = { min: number; max: number };

async function numericBounds(column: string): Promise<Bounds> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("vehicles").select(column);
  if (error) throw new Error(error.message);
  const values = (data as unknown as Record<string, number | string>[]).map(
    (row) => Number(row[column])
  );
  if (values.length === 0) return { min: 0, max: 0 };
  return { min: Math.min(...values), max: Math.max(...values) };
}

export async function getPriceBounds(): Promise<Bounds> {
  return numericBounds("price");
}

export async function getYearBounds(): Promise<Bounds> {
  return numericBounds("year");
}

export async function getMileageBounds(): Promise<Bounds> {
  return numericBounds("mileage");
}

export async function createVehicle(input: NewVehicleInput): Promise<Vehicle> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicles")
    .insert(toRow(input))
    .select()
    .single();
  if (error) throw new Error(error.message);

  await replaceImages(data.id, input.images);
  return (await getVehicleById(data.id))!;
}

export async function updateVehicle(
  id: string,
  input: NewVehicleInput
): Promise<Vehicle | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicles")
    .update(toRow(input))
    .eq("id", id)
    .select()
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return undefined;

  await replaceImages(id, input.images);
  return getVehicleById(id);
}

export async function deleteVehicle(
  id: string
): Promise<Vehicle | undefined> {
  const existing = await getVehicleById(id);
  if (!existing) return undefined;

  const supabase = await createClient();
  const { error } = await supabase.from("vehicles").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return existing;
}
