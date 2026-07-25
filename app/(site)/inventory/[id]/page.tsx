import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, MessageCircle, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/inventory/StatusBadge";
import { VehicleGallery } from "@/components/inventory/VehicleGallery";
import { CarCard } from "@/components/inventory/CarCard";
import { company, getPhoneUrl, getWhatsAppUrl } from "@/lib/data/company";
import { siteUrl } from "@/lib/site";
import { getVehicleById, getVehicles } from "@/lib/data/vehicles-repo";
import { formatMileage, formatPrice } from "@/lib/inventory/filters";

export const dynamic = "force-dynamic";

interface VehiclePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: VehiclePageProps): Promise<Metadata> {
  const { id } = await params;
  const vehicle = await getVehicleById(id);
  if (!vehicle) return {};

  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model} for Sale in Bulawayo`;
  const description = `${vehicle.year} ${vehicle.make} ${vehicle.model} — ${formatPrice(vehicle.price)}, ${formatMileage(vehicle.mileage)}, ${vehicle.transmission}, ${vehicle.fuelType}. Available at ${company.name} in Bulawayo, Zimbabwe.`;
  const image = vehicle.images[0]?.url;

  return {
    title,
    description,
    alternates: {
      canonical: `/inventory/${vehicle.id}`,
    },
    openGraph: {
      title,
      description,
      url: `/inventory/${vehicle.id}`,
      images: image ? [{ url: image, alt: vehicle.images[0].alt }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  const { id } = await params;
  const vehicle = await getVehicleById(id);
  if (!vehicle) notFound();

  const allVehicles = await getVehicles();
  const related = allVehicles
    .filter((v) => v.id !== vehicle.id && v.status === "available")
    .filter((v) => v.make === vehicle.make)
    .slice(0, 3);
  const fallbackRelated =
    related.length > 0
      ? related
      : allVehicles
          .filter((v) => v.id !== vehicle.id && v.status === "available")
          .slice(0, 3);

  const whatsappMessage = `Hello ${company.name}, I'm interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model} (${formatPrice(vehicle.price)}). Please share more details.`;

  const availability =
    vehicle.status === "available"
      ? "https://schema.org/InStock"
      : vehicle.status === "reserved"
        ? "https://schema.org/LimitedAvailability"
        : "https://schema.org/SoldOut";

  const vehicleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    brand: vehicle.make,
    model: vehicle.model,
    vehicleModelDate: String(vehicle.year),
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: vehicle.mileage,
      unitCode: "KMT",
    },
    fuelType: vehicle.fuelType,
    vehicleTransmission: vehicle.transmission,
    color: vehicle.color,
    description: vehicle.description,
    image: vehicle.images.map((img) => img.url),
    offers: {
      "@type": "Offer",
      price: vehicle.price,
      priceCurrency: "USD",
      availability,
      url: `${siteUrl}/inventory/${vehicle.id}`,
      seller: {
        "@type": "AutoDealer",
        name: company.name,
        telephone: `+${company.whatsapp}`,
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Inventory",
        item: `${siteUrl}/inventory`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
        item: `${siteUrl}/inventory/${vehicle.id}`,
      },
    ],
  };

  return (
    <div className="section-padding mx-auto max-w-7xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="transition-colors hover:text-brand">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/inventory" className="transition-colors hover:text-brand">
          Inventory
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-medium text-ink">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-5">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm lg:col-span-3">
          <VehicleGallery
            images={vehicle.images}
            title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          />
        </div>

        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
              {vehicle.make}
            </p>
            {vehicle.status !== "available" && (
              <StatusBadge status={vehicle.status} />
            )}
          </div>
          <h1 className="mt-1 text-3xl font-extrabold text-ink md:text-4xl">
            {vehicle.year} {vehicle.model}
          </h1>
          <p className="mt-1 text-muted-foreground">{vehicle.color}</p>

          <p className="mt-5 font-extrabold text-3xl text-brand">
            {formatPrice(vehicle.price)}
            <span className="ml-2 text-sm font-medium text-muted-foreground">
              negotiable
            </span>
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge variant="secondary">{formatMileage(vehicle.mileage)}</Badge>
            <Badge variant="secondary">{vehicle.transmission}</Badge>
            <Badge variant="secondary">{vehicle.fuelType}</Badge>
          </div>

          <Separator className="my-6 bg-border" />

          <p className="leading-relaxed text-muted-foreground">
            {vehicle.description}
          </p>

          {vehicle.features.length > 0 && (
            <>
              <h2 className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-brand">
                Features
              </h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {vehicle.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                    {feature}
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="flex-1 rounded-full bg-brand text-white hover:bg-brand-dark"
            >
              <a
                href={getWhatsAppUrl(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Enquire on WhatsApp
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex-1 rounded-full border-brand/30 hover:bg-brand/5 hover:text-brand"
            >
              <a href={getPhoneUrl()}>
                <Phone className="mr-2 h-4 w-4" />
                Call {company.phoneDisplay}
              </a>
            </Button>
          </div>
        </div>
      </div>

      {fallbackRelated.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-extrabold text-ink md:text-3xl">
            More from our inventory
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {fallbackRelated.map((v, index) => (
              <CarCard key={v.id} vehicle={v} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
