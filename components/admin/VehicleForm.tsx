"use client";

import { useActionState, useState, useTransition } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ImageManager,
  type ManagedImage,
} from "@/components/admin/ImageManager";
import {
  createVehicleAction,
  updateVehicleAction,
  type VehicleActionState,
} from "@/app/admin/(protected)/vehicles/actions";
import {
  vehicleFormSchema,
  type ImagePlanEntry,
  type ParsedVehicleForm,
} from "@/lib/validations/vehicle";
import type { Vehicle } from "@/lib/data/types";

interface VehicleFormProps {
  vehicle?: Vehicle;
}

const TRANSMISSIONS = ["Automatic", "Manual"] as const;
const FUEL_TYPES = ["Petrol", "Diesel", "Hybrid", "Electric"] as const;
const STATUSES = [
  { value: "available", label: "Available" },
  { value: "reserved", label: "Reserved" },
  { value: "sold", label: "Sold" },
] as const;

const initialState: VehicleActionState = {};

export function VehicleForm({ vehicle }: VehicleFormProps) {
  const [images, setImages] = useState<ManagedImage[]>(
    vehicle?.images.map((img) => ({
      kind: "existing" as const,
      id: img.id,
      url: img.url,
      alt: img.alt,
    })) ?? []
  );
  const [imagesError, setImagesError] = useState<string | null>(null);

  const boundAction = vehicle
    ? updateVehicleAction.bind(null, vehicle.id)
    : createVehicleAction;
  const [state, dispatch] = useActionState(boundAction, initialState);
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ParsedVehicleForm>({
    resolver: zodResolver(vehicleFormSchema) as Resolver<ParsedVehicleForm>,
    defaultValues: vehicle
      ? {
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          price: vehicle.price,
          mileage: vehicle.mileage,
          transmission: vehicle.transmission,
          fuelType: vehicle.fuelType,
          color: vehicle.color,
          description: vehicle.description,
          featuresText: vehicle.features.join("\n"),
          status: vehicle.status,
          featured: vehicle.featured,
        }
      : {
          transmission: "Automatic",
          fuelType: "Petrol",
          status: "available",
          featured: false,
          featuresText: "",
        },
  });

  const onSubmit = (values: ParsedVehicleForm) => {
    if (images.length === 0) {
      setImagesError("Add at least one photo.");
      return;
    }
    setImagesError(null);

    const formData = new FormData();
    formData.set("make", values.make);
    formData.set("model", values.model);
    formData.set("year", String(values.year));
    formData.set("price", String(values.price));
    formData.set("mileage", String(values.mileage));
    formData.set("transmission", values.transmission);
    formData.set("fuelType", values.fuelType);
    formData.set("color", values.color);
    formData.set("description", values.description);
    formData.set("featuresText", values.featuresText);
    formData.set("status", values.status);
    formData.set("featured", values.featured ? "true" : "");

    let newIndex = 0;
    const plan: ImagePlanEntry[] = images.map((image) => {
      if (image.kind === "existing") {
        return { kind: "existing", id: image.id };
      }
      formData.append("newImages", image.file);
      return { kind: "new", index: newIndex++ };
    });
    formData.set("imagePlan", JSON.stringify(plan));

    startTransition(() => dispatch(formData));
  };

  const fieldError = (name: string) =>
    errors[name as keyof ParsedVehicleForm]?.message ??
    state.fieldErrors?.[name]?.[0];

  const selectField = (
    name: "transmission" | "fuelType" | "status",
    label: string,
    options: readonly { value: string; label: string }[]
  ) => (
    <div>
      <Label className="text-sm text-muted-foreground">{label}</Label>
      <Select
        value={watch(name)}
        onValueChange={(value) =>
          setValue(name, value as never, { shouldValidate: true })
        }
      >
        <SelectTrigger className="mt-2 w-full border-border bg-background">
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {fieldError(name) && (
        <p className="mt-1 text-xs text-destructive">{fieldError(name)}</p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {state.error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive">
          {state.error}
        </div>
      )}

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-brand">
          Vehicle details
        </h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="make" className="text-sm text-muted-foreground">
              Make
            </Label>
            <Input
              id="make"
              {...register("make")}
              className="mt-2 border-border bg-background"
              placeholder="e.g. BMW"
            />
            {fieldError("make") && (
              <p className="mt-1 text-xs text-destructive">
                {fieldError("make")}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="model" className="text-sm text-muted-foreground">
              Model
            </Label>
            <Input
              id="model"
              {...register("model")}
              className="mt-2 border-border bg-background"
              placeholder="e.g. F20 118d"
            />
            {fieldError("model") && (
              <p className="mt-1 text-xs text-destructive">
                {fieldError("model")}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="year" className="text-sm text-muted-foreground">
              Year
            </Label>
            <Input
              id="year"
              type="number"
              {...register("year", { valueAsNumber: true })}
              className="mt-2 border-border bg-background"
              placeholder="2017"
            />
            {fieldError("year") && (
              <p className="mt-1 text-xs text-destructive">
                {fieldError("year")}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="color" className="text-sm text-muted-foreground">
              Color
            </Label>
            <Input
              id="color"
              {...register("color")}
              className="mt-2 border-border bg-background"
              placeholder="e.g. Crimson Red"
            />
            {fieldError("color") && (
              <p className="mt-1 text-xs text-destructive">
                {fieldError("color")}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="price" className="text-sm text-muted-foreground">
              Price (USD)
            </Label>
            <Input
              id="price"
              type="number"
              {...register("price", { valueAsNumber: true })}
              className="mt-2 border-border bg-background"
              placeholder="15000"
            />
            {fieldError("price") && (
              <p className="mt-1 text-xs text-destructive">
                {fieldError("price")}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="mileage" className="text-sm text-muted-foreground">
              Mileage (km)
            </Label>
            <Input
              id="mileage"
              type="number"
              {...register("mileage", { valueAsNumber: true })}
              className="mt-2 border-border bg-background"
              placeholder="70000"
            />
            {fieldError("mileage") && (
              <p className="mt-1 text-xs text-destructive">
                {fieldError("mileage")}
              </p>
            )}
          </div>
          {selectField(
            "transmission",
            "Transmission",
            TRANSMISSIONS.map((t) => ({ value: t, label: t }))
          )}
          {selectField(
            "fuelType",
            "Fuel type",
            FUEL_TYPES.map((f) => ({ value: f, label: f }))
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-brand">
          Listing
        </h2>
        <div className="mt-4 space-y-5">
          <div>
            <Label
              htmlFor="description"
              className="text-sm text-muted-foreground"
            >
              Description
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              className="mt-2 min-h-28 border-border bg-background"
              placeholder="Condition, import status, standout features…"
            />
            {fieldError("description") && (
              <p className="mt-1 text-xs text-destructive">
                {fieldError("description")}
              </p>
            )}
          </div>
          <div>
            <Label
              htmlFor="featuresText"
              className="text-sm text-muted-foreground"
            >
              Features{" "}
              <span className="text-muted-foreground/60">(one per line)</span>
            </Label>
            <Textarea
              id="featuresText"
              {...register("featuresText")}
              className="mt-2 min-h-28 border-border bg-background"
              placeholder={"Leather interior\nReverse camera\nDuty paid"}
            />
            {fieldError("featuresText") && (
              <p className="mt-1 text-xs text-destructive">
                {fieldError("featuresText")}
              </p>
            )}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {selectField("status", "Status", STATUSES)}
            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                <Checkbox
                  checked={watch("featured")}
                  onCheckedChange={(checked) =>
                    setValue("featured", checked === true)
                  }
                />
                Feature on homepage
              </label>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-brand">
          Photos
        </h2>
        <div className="mt-4">
          <ImageManager images={images} onChange={setImages} />
          {imagesError && (
            <p className="mt-2 text-sm font-medium text-destructive">
              {imagesError}
            </p>
          )}
        </div>
      </section>

      <div className="flex items-center gap-3">
        <Button
          type="submit"
          disabled={pending}
          className="rounded-full bg-brand px-8 font-bold text-white hover:bg-brand-dark"
        >
          {pending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          {pending
            ? "Saving…"
            : vehicle
              ? "Save changes"
              : "Create listing"}
        </Button>
        <Button
          asChild
          variant="ghost"
          className="rounded-full font-semibold text-muted-foreground"
        >
          <a href="/admin/vehicles">Cancel</a>
        </Button>
      </div>
    </form>
  );
}
