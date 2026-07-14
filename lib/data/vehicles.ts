import type { Vehicle } from "./types";

/**
 * Featured vehicles use real showroom photos from /public/vehicles.
 * Non-featured entries still carry representative stock photos —
 * replace with real showroom photos in Phase 2 CMS.
 */
export const vehicles: Vehicle[] = [
  {
    id: "mercedes-c200-2021",
    make: "Mercedes-Benz",
    model: "C200 Full Spec",
    year: 2021,
    price: 26500,
    mileage: 42000,
    transmission: "Automatic",
    fuelType: "Petrol",
    color: "Obsidian Black",
    description:
      "Immaculate Mercedes-Benz C200 in full specification. Panoramic roof, ambient lighting, premium leather interior, and a refined driving experience suited to Bulawayo's discerning buyer.",
    features: [
      "Panoramic sunroof",
      "Leather interior",
      "Ambient lighting",
      "Reverse camera",
      "Cruise control",
      "Bluetooth connectivity",
    ],
    images: [
      {
        id: "m1",
        url: "https://images.unsplash.com/photo-1616549934892-595cbeb38ef5?auto=format&fit=crop&w=1400&q=80",
        alt: "Mercedes-Benz C-Class sedan",
        sortOrder: 0,
      },
      {
        id: "m2",
        url: "https://images.unsplash.com/photo-1610469167200-3e7b77ddd398?auto=format&fit=crop&w=1400&q=80",
        alt: "Mercedes-Benz C-Class front view",
        sortOrder: 1,
      },
    ],
    featured: false,
    createdAt: "2026-07-13",
  },
  {
    id: "bmw-118d-f20",
    make: "BMW",
    model: "F20 118d",
    // TODO: confirm year and mileage with the yard
    year: 2016,
    price: 15000,
    mileage: 70000,
    transmission: "Automatic",
    fuelType: "Diesel",
    color: "Crimson Red",
    description:
      "Just Arrived ✨ — BMW F20 118d in striking crimson red. Efficient turbo-diesel hatch with LED headlights and sporty presence, fresh on the lot in Bulawayo.",
    features: [
      "Turbo-diesel engine",
      "LED headlights",
      "Automatic transmission",
      "Fog lamps",
      "Multifunction steering wheel",
    ],
    images: [
      {
        id: "b118-1",
        url: "/vehicles/bmw-118d.jpg",
        alt: "Red BMW F20 118d front view at Car Supplier Zimbabwe",
        sortOrder: 0,
      },
      {
        id: "b118-2",
        url: "/vehicles/bmw-118d-rear-quarter.jpg",
        alt: "Red BMW F20 118d rear three-quarter view with alloy wheels",
        sortOrder: 1,
      },
      {
        id: "b118-3",
        url: "/vehicles/bmw-118d-rear.jpg",
        alt: "Red BMW F20 118d rear view with 118d badge",
        sortOrder: 2,
      },
      {
        id: "b118-4",
        url: "/vehicles/bmw-118d-interior.jpg",
        alt: "BMW F20 118d cockpit with sport steering wheel and iDrive",
        sortOrder: 3,
      },
      {
        id: "b118-5",
        url: "/vehicles/bmw-118d-rear-seats.jpg",
        alt: "BMW F20 118d rear seats with red-stitched sport upholstery",
        sortOrder: 4,
      },
    ],
    featured: true,
    createdAt: "2026-07-14",
  },
  {
    id: "toyota-hiace-2017",
    make: "Toyota",
    model: "HiAce (Baby Quantum)",
    year: 2017,
    price: 21500,
    // TODO: confirm mileage and fuel type with the yard
    mileage: 80000,
    transmission: "Automatic",
    fuelType: "Diesel",
    color: "Silver",
    description:
      "Toyota Baby Quantum, recent import with duty paid. Automatic transmission, ready to work — ideal for commuter or business use.",
    features: [
      "Duty paid",
      "Recent import",
      "Automatic transmission",
      "Alloy wheels",
      "Sliding door",
    ],
    images: [
      {
        id: "hq-1",
        url: "/vehicles/toyota-hiace.jpg",
        alt: "Silver Toyota HiAce Baby Quantum at Car Supplier Zimbabwe",
        sortOrder: 0,
      },
    ],
    featured: true,
    createdAt: "2026-07-14",
  },
  {
    id: "bmw-420i-f32",
    make: "BMW",
    model: "F32 420i",
    // TODO: confirm price, year, and mileage with the yard
    year: 2015,
    price: 24500,
    mileage: 90000,
    transmission: "Automatic",
    fuelType: "Petrol",
    color: "Alpine White",
    description:
      "BMW F32 420i coupé in Alpine White with M styling, carbon mirror caps, and a front splitter. A head-turning two-door available in Bulawayo.",
    features: [
      "M Sport styling",
      "Carbon fibre mirror caps",
      "Front splitter",
      "Xenon headlights",
      "Red leather interior",
    ],
    images: [
      {
        id: "b420-1",
        url: "/vehicles/bmw-420i.jpg",
        alt: "White BMW F32 420i coupé at Car Supplier Zimbabwe",
        sortOrder: 0,
      },
    ],
    featured: true,
    createdAt: "2026-07-13",
  },
  {
    id: "audi-a4-2013",
    make: "Audi",
    model: "A4 Quattro",
    year: 2013,
    price: 13000,
    mileage: 99000,
    transmission: "Automatic",
    fuelType: "Petrol",
    color: "Glacier White",
    description:
      "Audi A4 Quattro in excellent condition — $13,000 negotiable. Full leather interior, automatic transmission, and all-wheel drive confidence. Bulawayo.",
    features: [
      "Quattro AWD",
      "Full leather interior",
      "Automatic transmission",
      "Price negotiable",
      "Excellent condition",
    ],
    images: [
      {
        id: "a4-1",
        url: "/vehicles/audi-a4.jpg",
        alt: "White Audi A4 Quattro at Car Supplier Zimbabwe",
        sortOrder: 0,
      },
    ],
    featured: true,
    createdAt: "2026-07-12",
  },
  {
    id: "range-rover-evoque-2019",
    make: "Land Rover",
    model: "Range Rover Evoque",
    year: 2019,
    price: 31200,
    mileage: 62000,
    transmission: "Automatic",
    fuelType: "Diesel",
    color: "Santorini Black",
    description:
      "Striking Range Rover Evoque with premium British craftsmanship. Compact luxury SUV with unmistakable presence.",
    features: [
      "Terrain response",
      "Meridian sound",
      "Panoramic roof",
      "Power tailgate",
    ],
    images: [
      {
        id: "r1",
        url: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=1400&q=80",
        alt: "Range Rover Evoque SUV",
        sortOrder: 0,
      },
    ],
    featured: false,
    createdAt: "2026-06-28",
  },
  {
    id: "honda-crv-2017",
    make: "Honda",
    model: "CR-V",
    year: 2017,
    price: 14200,
    mileage: 105000,
    transmission: "Automatic",
    fuelType: "Petrol",
    color: "Modern Steel",
    description:
      "Reliable Honda CR-V offering spacious family transport with excellent fuel economy and low maintenance costs.",
    features: [
      "Rear camera",
      "Bluetooth",
      "Cruise control",
      "Roof rails",
    ],
    images: [
      {
        id: "h1",
        url: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80",
        alt: "Honda CR-V crossover",
        sortOrder: 0,
      },
    ],
    featured: false,
    createdAt: "2026-06-20",
  },
  {
    id: "lexus-rx350-2018",
    make: "Lexus",
    model: "RX 350",
    year: 2018,
    price: 28900,
    mileage: 72000,
    transmission: "Automatic",
    fuelType: "Petrol",
    color: "Sonic Titanium",
    description:
      "Refined Lexus RX 350 with whisper-quiet cabin and buttery-smooth ride. Japanese luxury at its finest.",
    features: [
      "Mark Levinson audio",
      "Heated & ventilated seats",
      "Adaptive cruise",
      "Power liftgate",
    ],
    images: [
      {
        id: "l1",
        url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1400&q=80",
        alt: "Lexus RX luxury SUV",
        sortOrder: 0,
      },
    ],
    featured: false,
    createdAt: "2026-06-15",
  },
  {
    id: "ford-ranger-2020",
    make: "Ford",
    model: "Ranger Wildtrak",
    year: 2020,
    price: 27500,
    mileage: 58000,
    transmission: "Automatic",
    fuelType: "Diesel",
    color: "Saber Orange",
    description:
      "Ford Ranger Wildtrak — bold, capable, and ready for work or weekend adventure across Zimbabwe.",
    features: [
      "4x4",
      "Roll bar",
      "Leather Wildtrak seats",
      "Touchscreen",
      "Bed liner",
    ],
    images: [
      {
        id: "f1",
        url: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1400&q=80",
        alt: "Ford Ranger pickup truck",
        sortOrder: 0,
      },
    ],
    featured: false,
    createdAt: "2026-06-10",
  },
  {
    id: "mazda-cx5-2019",
    make: "Mazda",
    model: "CX-5",
    year: 2019,
    price: 16800,
    mileage: 78000,
    transmission: "Automatic",
    fuelType: "Petrol",
    color: "Soul Red",
    description:
      "Mazda CX-5 with Kodo design language and engaging dynamics. A crossover that feels genuinely special to drive.",
    features: [
      "Heads-up display",
      "Bose audio",
      "Blind spot monitor",
      "Power seats",
    ],
    images: [
      {
        id: "mz1",
        url: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1400&q=80",
        alt: "Mazda CX-5 crossover",
        sortOrder: 0,
      },
    ],
    featured: false,
    createdAt: "2026-06-05",
  },
];
