import { notFound } from "next/navigation";
import { VehicleForm } from "@/components/admin/VehicleForm";
import { requireAdmin } from "@/lib/admin/auth";
import { getVehicleById } from "@/lib/data/vehicles-repo";

export default async function EditVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const vehicle = await getVehicleById(id);
  if (!vehicle) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-extrabold text-ink">
        Edit {vehicle.make} {vehicle.model}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Changes go live on the site as soon as you save.
      </p>
      <div className="mt-6">
        <VehicleForm vehicle={vehicle} />
      </div>
    </div>
  );
}
