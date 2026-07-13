"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import type { FuelType, InventoryFilters, Transmission } from "@/lib/data/types";
import { formatPrice } from "@/lib/inventory/filters";

interface InventoryFiltersPanelProps {
  filters: InventoryFilters;
  makes: string[];
  priceBounds: { min: number; max: number };
  yearBounds: { min: number; max: number };
  mileageBounds: { min: number; max: number };
  onChange: (filters: InventoryFilters) => void;
  onReset: () => void;
}

const transmissions: Transmission[] = ["Automatic", "Manual"];
const fuelTypes: FuelType[] = ["Petrol", "Diesel", "Hybrid", "Electric"];

function FiltersContent({
  filters,
  makes,
  priceBounds,
  yearBounds,
  mileageBounds,
  onChange,
  onReset,
}: InventoryFiltersPanelProps) {
  const toggleMake = (make: string) => {
    const updated = filters.makes.includes(make)
      ? filters.makes.filter((m) => m !== make)
      : [...filters.makes, make];
    onChange({ ...filters, makes: updated });
  };

  const toggleTransmission = (t: Transmission) => {
    const updated = filters.transmissions.includes(t)
      ? filters.transmissions.filter((x) => x !== t)
      : [...filters.transmissions, t];
    onChange({ ...filters, transmissions: updated });
  };

  const toggleFuel = (f: FuelType) => {
    const updated = filters.fuelTypes.includes(f)
      ? filters.fuelTypes.filter((x) => x !== f)
      : [...filters.fuelTypes, f];
    onChange({ ...filters, fuelTypes: updated });
  };

  return (
    <div className="space-y-8">
      <div>
        <Label htmlFor="search" className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
          Search
        </Label>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Make, model, year..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="border-border bg-background pl-10"
          />
        </div>
      </div>

      <div>
        <Label className="text-xs uppercase tracking-widest text-brand">Make</Label>
        <div className="mt-3 space-y-2">
          {makes.map((make) => (
            <label key={make} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Checkbox
                checked={filters.makes.includes(make)}
                onCheckedChange={() => toggleMake(make)}
              />
              {make}
            </label>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-xs uppercase tracking-widest text-brand">
          Price: {formatPrice(filters.minPrice)} – {formatPrice(filters.maxPrice)}
        </Label>
        <Slider
          className="mt-4"
          min={priceBounds.min}
          max={priceBounds.max}
          step={500}
          value={[filters.minPrice, filters.maxPrice]}
          onValueChange={([min, max]) =>
            onChange({ ...filters, minPrice: min, maxPrice: max })
          }
        />
      </div>

      <div>
        <Label className="text-xs uppercase tracking-widest text-brand">
          Year: {filters.minYear} – {filters.maxYear}
        </Label>
        <Slider
          className="mt-4"
          min={yearBounds.min}
          max={yearBounds.max}
          step={1}
          value={[filters.minYear, filters.maxYear]}
          onValueChange={([min, max]) =>
            onChange({ ...filters, minYear: min, maxYear: max })
          }
        />
      </div>

      <div>
        <Label className="text-xs uppercase tracking-widest text-brand">
          Mileage (km)
        </Label>
        <Slider
          className="mt-4"
          min={mileageBounds.min}
          max={mileageBounds.max}
          step={1000}
          value={[filters.minMileage, filters.maxMileage]}
          onValueChange={([min, max]) =>
            onChange({ ...filters, minMileage: min, maxMileage: max })
          }
        />
      </div>

      <div>
        <Label className="text-xs uppercase tracking-widest text-brand">Transmission</Label>
        <div className="mt-3 space-y-2">
          {transmissions.map((t) => (
            <label key={t} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Checkbox
                checked={filters.transmissions.includes(t)}
                onCheckedChange={() => toggleTransmission(t)}
              />
              {t}
            </label>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-xs uppercase tracking-widest text-brand">Fuel Type</Label>
        <div className="mt-3 space-y-2">
          {fuelTypes.map((f) => (
            <label key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Checkbox
                checked={filters.fuelTypes.includes(f)}
                onCheckedChange={() => toggleFuel(f)}
              />
              {f}
            </label>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full border-brand/30 hover:bg-brand/10 hover:text-brand"
        onClick={onReset}
      >
        Reset Filters
      </Button>
    </div>
  );
}

export function InventoryFiltersPanel(props: InventoryFiltersPanelProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <aside className="hidden w-72 shrink-0 lg:block">
        <div className="sticky top-24 rounded-3xl border border-border bg-card p-6 shadow-[0_2px_12px_rgba(24,26,27,0.04)]">
          <h2 className="text-2xl font-bold text-ink">
            Filters
          </h2>
          <div className="mt-6">
            <FiltersContent {...props} />
          </div>
        </div>
      </aside>

      <div className="mb-6 flex items-center gap-4 lg:hidden">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="border-brand/30">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="overflow-y-auto border-border bg-card">
            <SheetTitle className="text-xl font-bold">Filters</SheetTitle>
            <div className="mt-6">
              <FiltersContent
                {...props}
                onChange={(f) => {
                  props.onChange(f);
                }}
              />
            </div>
          </SheetContent>
        </Sheet>

        <Select
          value={props.filters.sort}
          onValueChange={(value) =>
            props.onChange({
              ...props.filters,
              sort: value as InventoryFilters["sort"],
            })
          }
        >
          <SelectTrigger className="w-full border-border bg-card">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="year-desc">Year: Newest</SelectItem>
            <SelectItem value="year-asc">Year: Oldest</SelectItem>
            <SelectItem value="mileage-asc">Mileage: Low to High</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}

export function InventorySortSelect({
  filters,
  onChange,
}: {
  filters: InventoryFilters;
  onChange: (filters: InventoryFilters) => void;
}) {
  return (
    <div className="hidden lg:block">
      <Select
        value={filters.sort}
        onValueChange={(value) =>
          onChange({
            ...filters,
            sort: value as InventoryFilters["sort"],
          })
        }
      >
        <SelectTrigger className="w-52 border-border bg-card">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
          <SelectItem value="year-desc">Year: Newest</SelectItem>
          <SelectItem value="year-asc">Year: Oldest</SelectItem>
          <SelectItem value="mileage-asc">Mileage: Low to High</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
