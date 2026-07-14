"use client";

import { useMemo, useState } from "react";
import { CarCard } from "@/components/inventory/CarCard";
import { CarDetailModal } from "@/components/inventory/CarDetailModal";
import {
  InventoryFiltersPanel,
  InventorySortSelect,
} from "@/components/inventory/InventoryFilters";
import type { InventoryFilters, Vehicle } from "@/lib/data/types";
import {
  filterAndSortVehicles,
  getDefaultFilters,
} from "@/lib/inventory/filters";

interface InventoryPageClientProps {
  vehicles: Vehicle[];
  makes: string[];
  priceBounds: { min: number; max: number };
  yearBounds: { min: number; max: number };
  mileageBounds: { min: number; max: number };
}

export function InventoryPageClient({
  vehicles,
  makes,
  priceBounds,
  yearBounds,
  mileageBounds,
}: InventoryPageClientProps) {
  const bounds = {
    price: priceBounds,
    year: yearBounds,
    mileage: mileageBounds,
  };
  const [filters, setFilters] = useState<InventoryFilters>(() =>
    getDefaultFilters(bounds)
  );
  const [selected, setSelected] = useState<Vehicle | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(
    () => filterAndSortVehicles(vehicles, filters),
    [vehicles, filters]
  );

  const handleViewDetails = (vehicle: Vehicle) => {
    setSelected(vehicle);
    setModalOpen(true);
  };

  return (
    <div className="section-padding mx-auto max-w-7xl">
      <div className="mb-12">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">Inventory</p>
        <h1 className="mt-3 text-4xl font-extrabold text-ink md:text-5xl">
          Our collection
        </h1>
        <p className="mt-3 max-w-lg text-muted-foreground">
          Browse our current stock of premium vehicles. Use filters to find your
          perfect match.
        </p>
      </div>

      <div className="flex gap-10">
        {/* The panel renders a desktop sidebar plus a mobile sheet trigger.
            Scope each instance to one breakpoint so neither duplicates. */}
        <div className="hidden shrink-0 lg:block">
          <InventoryFiltersPanel
            filters={filters}
            makes={makes}
            priceBounds={priceBounds}
            yearBounds={yearBounds}
            mileageBounds={mileageBounds}
            onChange={setFilters}
            onReset={() => setFilters(getDefaultFilters(bounds))}
          />
        </div>

        <div className="flex-1">
          <div className="lg:hidden">
            <InventoryFiltersPanel
              filters={filters}
              makes={makes}
              priceBounds={priceBounds}
              yearBounds={yearBounds}
              mileageBounds={mileageBounds}
              onChange={setFilters}
              onReset={() => setFilters(getDefaultFilters(bounds))}
            />
          </div>

          <div className="mb-6 hidden items-center justify-between lg:flex">
            <p className="text-sm text-muted-foreground">
              {filtered.length} vehicle{filtered.length !== 1 ? "s" : ""} found
            </p>
            <InventorySortSelect filters={filters} onChange={setFilters} />
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center border border-border/60 py-20 text-center">
              <p className="text-2xl font-bold text-foreground">
                No vehicles match your filters
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your search criteria or reset filters.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((vehicle, index) => (
                <CarCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  index={index}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <CarDetailModal
        vehicle={selected}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
