"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import {
  createVehicle,
  deleteVehicle,
  getVehicleById,
  updateVehicle,
  type NewVehicleInput,
} from "@/lib/data/vehicles-repo";
import {
  deleteUploadsForImages,
  saveUpload,
} from "@/lib/data/uploads-repo";
import { uploadUrl } from "@/lib/data/upload-urls";
import type { Vehicle, VehicleImage } from "@/lib/data/types";
import {
  MAX_VEHICLE_IMAGES,
  parseFeatures,
  vehicleFormSchema,
  type ImagePlanEntry,
} from "@/lib/validations/vehicle";

export interface VehicleActionState {
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

function parseImagePlan(raw: FormDataEntryValue | null): ImagePlanEntry[] {
  if (typeof raw !== "string" || !raw) return [];
  try {
    const plan = JSON.parse(raw);
    if (!Array.isArray(plan)) return [];
    return plan.filter(
      (entry): entry is ImagePlanEntry =>
        (entry?.kind === "existing" && typeof entry.id === "string") ||
        (entry?.kind === "new" && typeof entry.index === "number")
    );
  } catch {
    return [];
  }
}

async function buildImages(
  plan: ImagePlanEntry[],
  newFiles: File[],
  existing: VehicleImage[],
  altBase: string
): Promise<{ images: VehicleImage[]; removed: VehicleImage[] }> {
  const images: VehicleImage[] = [];

  for (const entry of plan) {
    if (images.length >= MAX_VEHICLE_IMAGES) break;
    if (entry.kind === "existing") {
      const image = existing.find((img) => img.id === entry.id);
      if (image) {
        images.push({ ...image, sortOrder: images.length });
      }
    } else {
      const file = newFiles[entry.index];
      if (file && file.size > 0) {
        const id = await saveUpload(file);
        images.push({
          id: `img-${id}`,
          url: uploadUrl(id),
          alt: `${altBase} — photo ${images.length + 1}`,
          sortOrder: images.length,
        });
      }
    }
  }

  const keptIds = new Set(images.map((img) => img.id));
  const removed = existing.filter((img) => !keptIds.has(img.id));
  return { images, removed };
}

async function saveVehicle(
  vehicleId: string | null,
  formData: FormData
): Promise<VehicleActionState> {
  await requireAdmin();

  const parsed = vehicleFormSchema.safeParse({
    make: formData.get("make"),
    model: formData.get("model"),
    year: formData.get("year"),
    price: formData.get("price"),
    mileage: formData.get("mileage"),
    transmission: formData.get("transmission"),
    fuelType: formData.get("fuelType"),
    color: formData.get("color"),
    description: formData.get("description"),
    featuresText: formData.get("featuresText") ?? "",
    status: formData.get("status"),
    featured: formData.get("featured"),
  });
  if (!parsed.success) {
    return {
      error: "Please fix the highlighted fields.",
      fieldErrors: z_flatten(parsed.error),
    };
  }
  const values = parsed.data;

  const existingVehicle: Vehicle | undefined = vehicleId
    ? await getVehicleById(vehicleId)
    : undefined;
  if (vehicleId && !existingVehicle) {
    return { error: "This vehicle no longer exists." };
  }

  const plan = parseImagePlan(formData.get("imagePlan"));
  const newFiles = formData
    .getAll("newImages")
    .filter((entry): entry is File => entry instanceof File);

  if (plan.length === 0) {
    return { error: "Add at least one photo." };
  }
  if (plan.length > MAX_VEHICLE_IMAGES) {
    return { error: `Maximum ${MAX_VEHICLE_IMAGES} photos per vehicle.` };
  }

  let images: VehicleImage[];
  let removed: VehicleImage[];
  try {
    ({ images, removed } = await buildImages(
      plan,
      newFiles,
      existingVehicle?.images ?? [],
      `${values.year} ${values.make} ${values.model}`
    ));
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Image upload failed.",
    };
  }
  if (images.length === 0) {
    return { error: "Add at least one photo." };
  }

  const input: NewVehicleInput = {
    make: values.make,
    model: values.model,
    year: values.year,
    price: values.price,
    mileage: values.mileage,
    transmission: values.transmission,
    fuelType: values.fuelType,
    color: values.color,
    description: values.description,
    features: parseFeatures(values.featuresText),
    images,
    featured: values.featured,
    status: values.status,
  };

  if (existingVehicle) {
    await updateVehicle(existingVehicle.id, input);
  } else {
    await createVehicle(input);
  }
  await deleteUploadsForImages(removed);

  refresh();
  redirect("/admin/vehicles");
}

// zod v4 flatten helper kept local to avoid version-specific imports elsewhere
function z_flatten(error: {
  issues: Array<{ path: PropertyKey[]; message: string }>;
}): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    (fieldErrors[key] ??= []).push(issue.message);
  }
  return fieldErrors;
}

export async function createVehicleAction(
  _prev: VehicleActionState,
  formData: FormData
): Promise<VehicleActionState> {
  return saveVehicle(null, formData);
}

export async function updateVehicleAction(
  vehicleId: string,
  _prev: VehicleActionState,
  formData: FormData
): Promise<VehicleActionState> {
  return saveVehicle(vehicleId, formData);
}

export async function deleteVehicleAction(
  vehicleId: string
): Promise<void> {
  await requireAdmin();
  const removed = await deleteVehicle(vehicleId);
  if (removed) {
    await deleteUploadsForImages(removed.images);
  }
  refresh();
}
