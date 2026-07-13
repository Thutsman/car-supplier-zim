export type Transmission = "Automatic" | "Manual";
export type FuelType = "Petrol" | "Diesel" | "Hybrid" | "Electric";

export interface VehicleImage {
  id: string;
  url: string;
  alt: string;
  sortOrder: number;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  transmission: Transmission;
  fuelType: FuelType;
  color: string;
  description: string;
  features: string[];
  images: VehicleImage[];
  featured: boolean;
  createdAt: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: "showroom" | "inventory" | "promo";
  sortOrder: number;
}

export type SortOption =
  | "price-asc"
  | "price-desc"
  | "year-desc"
  | "year-asc"
  | "mileage-asc"
  | "newest";

export interface InventoryFilters {
  search: string;
  makes: string[];
  minPrice: number;
  maxPrice: number;
  minYear: number;
  maxYear: number;
  minMileage: number;
  maxMileage: number;
  transmissions: Transmission[];
  fuelTypes: FuelType[];
  sort: SortOption;
}
