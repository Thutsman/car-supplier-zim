import Image from "next/image";
import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteVehicleButton } from "@/components/admin/DeleteVehicleButton";
import { StatusBadge } from "@/components/inventory/StatusBadge";
import { requireAdmin } from "@/lib/admin/auth";
import { getVehicles } from "@/lib/data/vehicles-repo";
import { formatMileage, formatPrice } from "@/lib/inventory/filters";

export default async function AdminVehiclesPage() {
  await requireAdmin();
  const vehicles = await getVehicles();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Vehicles</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {vehicles.length} listing{vehicles.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button
          asChild
          className="rounded-full bg-brand px-5 font-bold text-white hover:bg-brand-dark"
        >
          <Link href="/admin/vehicles/new">
            <Plus className="mr-1.5 h-4 w-4" />
            Add vehicle
          </Link>
        </Button>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-2 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Photo</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Mileage</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle) => {
              const photo = vehicle.images[0];
              return (
                <TableRow key={vehicle.id}>
                  <TableCell>
                    <div className="relative h-12 w-20 overflow-hidden rounded-lg bg-secondary">
                      {photo && (
                        <Image
                          src={photo.url}
                          alt={photo.alt}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold text-ink">
                      {vehicle.make} {vehicle.model}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {vehicle.color}
                    </p>
                  </TableCell>
                  <TableCell>{vehicle.year}</TableCell>
                  <TableCell className="font-semibold text-ink">
                    {formatPrice(vehicle.price)}
                  </TableCell>
                  <TableCell>{formatMileage(vehicle.mileage)}</TableCell>
                  <TableCell>
                    <StatusBadge status={vehicle.status} />
                  </TableCell>
                  <TableCell>{vehicle.featured ? "Yes" : "—"}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        aria-label={`Edit ${vehicle.make} ${vehicle.model}`}
                        className="text-muted-foreground hover:text-brand"
                      >
                        <Link href={`/admin/vehicles/${vehicle.id}/edit`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <DeleteVehicleButton
                        vehicleId={vehicle.id}
                        vehicleName={`${vehicle.make} ${vehicle.model}`}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
