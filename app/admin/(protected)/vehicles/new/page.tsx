import { VehicleForm } from "@/components/admin/VehicleForm";
import { requireAdmin } from "@/lib/admin/auth";

export default async function NewVehiclePage() {
  await requireAdmin();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-extrabold text-ink">Add vehicle</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Create a new listing for the public site.
      </p>
      <div className="mt-6">
        <VehicleForm />
      </div>
    </div>
  );
}
