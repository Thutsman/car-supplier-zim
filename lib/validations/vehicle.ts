import { z } from "zod";

const CURRENT_YEAR = new Date().getFullYear();

export const vehicleFormSchema = z.object({
  make: z.string().trim().min(2, "Make is required").max(60, "Make is too long"),
  model: z
    .string()
    .trim()
    .min(1, "Model is required")
    .max(80, "Model is too long"),
  year: z.coerce
    .number()
    .int("Year must be a whole number")
    .min(1980, "Year must be 1980 or later")
    .max(CURRENT_YEAR + 1, `Year cannot be after ${CURRENT_YEAR + 1}`),
  price: z.coerce
    .number()
    .positive("Price must be greater than 0")
    .max(10_000_000, "Price is too high"),
  mileage: z.coerce
    .number()
    .min(0, "Mileage cannot be negative")
    .max(2_000_000, "Mileage is too high"),
  transmission: z.enum(["Automatic", "Manual"], {
    error: "Choose a transmission",
  }),
  fuelType: z.enum(["Petrol", "Diesel", "Hybrid", "Electric"], {
    error: "Choose a fuel type",
  }),
  color: z
    .string()
    .trim()
    .min(2, "Color is required")
    .max(40, "Color is too long"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description is too long"),
  featuresText: z.string().max(2000, "Feature list is too long").default(""),
  status: z.enum(["available", "sold", "reserved"], {
    error: "Choose a status",
  }),
  featured: z.preprocess(
    (value) => value === true || value === "true" || value === "on",
    z.boolean()
  ),
});

export type VehicleFormValues = z.input<typeof vehicleFormSchema>;
export type ParsedVehicleForm = z.output<typeof vehicleFormSchema>;

/** One feature per line → trimmed, de-duplicated list (max 20). */
export function parseFeatures(featuresText: string): string[] {
  return [
    ...new Set(
      featuresText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    ),
  ].slice(0, 20);
}

/** Ordering plan for the image manager: existing images by id, new files by
 * their index within the uploaded file list, in final display order. */
export type ImagePlanEntry =
  | { kind: "existing"; id: string }
  | { kind: "new"; index: number };

export const MAX_VEHICLE_IMAGES = 12;
