"use client";

import { MessageCircle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { VehicleGallery } from "@/components/inventory/VehicleGallery";
import type { Vehicle } from "@/lib/data/types";
import { company, getWhatsAppUrl } from "@/lib/data/company";
import { formatMileage, formatPrice } from "@/lib/inventory/filters";

interface CarDetailModalProps {
  vehicle: Vehicle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CarDetailModal({
  vehicle,
  open,
  onOpenChange,
}: CarDetailModalProps) {
  if (!vehicle) return null;

  const whatsappMessage = `Hello ${company.name}, I'm interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model} (${formatPrice(vehicle.price)}). Please share more details.`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-border bg-card p-0 sm:max-w-4xl">
        <DialogHeader className="sr-only">
          <DialogTitle>
            {vehicle.year} {vehicle.make} {vehicle.model}
          </DialogTitle>
        </DialogHeader>

        <VehicleGallery
          key={vehicle.id}
          images={vehicle.images}
          title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
        />

        <div className="p-6 md:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
                {vehicle.make}
              </p>
              <h2 className="text-3xl font-extrabold text-ink">
                {vehicle.model}
              </h2>
              <p className="mt-1 text-muted-foreground">{vehicle.year} · {vehicle.color}</p>
            </div>
            <p className="font-extrabold text-3xl text-brand">
              {formatPrice(vehicle.price)}
              <span className="ml-2 text-sm font-medium text-muted-foreground">
                negotiable
              </span>
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge variant="secondary">{formatMileage(vehicle.mileage)}</Badge>
            <Badge variant="secondary">{vehicle.transmission}</Badge>
            <Badge variant="secondary">{vehicle.fuelType}</Badge>
          </div>

          <Separator className="my-6 bg-border" />

          <p className="leading-relaxed text-muted-foreground">
            {vehicle.description}
          </p>

          <h3 className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-brand">
            Features
          </h3>
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
              variant="outline"
              className="flex-1 rounded-full border-brand/30 hover:bg-brand/5 hover:text-brand"
              onClick={() => onOpenChange(false)}
            >
              <X className="mr-2 h-4 w-4" />
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
