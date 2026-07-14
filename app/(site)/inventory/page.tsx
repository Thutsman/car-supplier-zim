import type { Metadata } from "next";
import { InventoryPageClient } from "@/components/inventory/InventoryPageClient";
import {
  getMakes,
  getMileageBounds,
  getPriceBounds,
  getVehicles,
  getYearBounds,
} from "@/lib/data/vehicles-repo";
import { company } from "@/lib/data/company";

export const metadata: Metadata = {
  title: "Inventory",
  description: `Browse premium vehicles at ${company.name} in Bulawayo, Zimbabwe.`,
};

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
  const [vehicles, makes, priceBounds, yearBounds, mileageBounds] =
    await Promise.all([
      getVehicles(),
      getMakes(),
      getPriceBounds(),
      getYearBounds(),
      getMileageBounds(),
    ]);

  return (
    <InventoryPageClient
      vehicles={vehicles}
      makes={makes}
      priceBounds={priceBounds}
      yearBounds={yearBounds}
      mileageBounds={mileageBounds}
    />
  );
}
