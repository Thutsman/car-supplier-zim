import type { InventoryFilters, SortOption, Vehicle } from "@/lib/data/types";
import {
  getMileageBounds,
  getPriceBounds,
  getYearBounds,
} from "@/lib/data/vehicles-repo";

export function getDefaultFilters(): InventoryFilters {
  const price = getPriceBounds();
  const year = getYearBounds();
  const mileage = getMileageBounds();

  return {
    search: "",
    makes: [],
    minPrice: price.min,
    maxPrice: price.max,
    minYear: year.min,
    maxYear: year.max,
    minMileage: mileage.min,
    maxMileage: mileage.max,
    transmissions: [],
    fuelTypes: [],
    sort: "newest",
  };
}

export function filterAndSortVehicles(
  vehicles: Vehicle[],
  filters: InventoryFilters
): Vehicle[] {
  let result = vehicles.filter((vehicle) => {
    const searchLower = filters.search.toLowerCase();
    const matchesSearch =
      !searchLower ||
      `${vehicle.make} ${vehicle.model} ${vehicle.year} ${vehicle.color}`
        .toLowerCase()
        .includes(searchLower);

    const matchesMake =
      filters.makes.length === 0 || filters.makes.includes(vehicle.make);

    const matchesPrice =
      vehicle.price >= filters.minPrice && vehicle.price <= filters.maxPrice;

    const matchesYear =
      vehicle.year >= filters.minYear && vehicle.year <= filters.maxYear;

    const matchesMileage =
      vehicle.mileage >= filters.minMileage &&
      vehicle.mileage <= filters.maxMileage;

    const matchesTransmission =
      filters.transmissions.length === 0 ||
      filters.transmissions.includes(vehicle.transmission);

    const matchesFuel =
      filters.fuelTypes.length === 0 ||
      filters.fuelTypes.includes(vehicle.fuelType);

    return (
      matchesSearch &&
      matchesMake &&
      matchesPrice &&
      matchesYear &&
      matchesMileage &&
      matchesTransmission &&
      matchesFuel
    );
  });

  result = sortVehicles(result, filters.sort);
  return result;
}

export function sortVehicles(
  vehicles: Vehicle[],
  sort: SortOption
): Vehicle[] {
  const sorted = [...vehicles];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "year-desc":
      return sorted.sort((a, b) => b.year - a.year);
    case "year-asc":
      return sorted.sort((a, b) => a.year - b.year);
    case "mileage-asc":
      return sorted.sort((a, b) => a.mileage - b.mileage);
    case "newest":
    default:
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatMileage(mileage: number): string {
  return new Intl.NumberFormat("en-US").format(mileage) + " km";
}
