"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Gauge, Calendar, Settings2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/inventory/StatusBadge";
import type { Vehicle } from "@/lib/data/types";
import { formatMileage, formatPrice } from "@/lib/inventory/filters";

interface CarCardProps {
  vehicle: Vehicle;
  index?: number;
  onViewDetails: (vehicle: Vehicle) => void;
}

export function CarCard({ vehicle, index = 0, onViewDetails }: CarCardProps) {
  const primaryImage = vehicle.images[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg hover:shadow-brand/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <Image
          src={primaryImage.url}
          alt={primaryImage.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {vehicle.status !== "available" ? (
          <StatusBadge
            status={vehicle.status}
            className="absolute left-4 top-4"
          />
        ) : (
          vehicle.featured && (
            <Badge className="absolute left-4 top-4 rounded-full bg-brand px-3 text-white hover:bg-brand">
              Featured
            </Badge>
          )
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
              {vehicle.make}
            </p>
            <h3 className="mt-1 text-xl font-bold leading-tight text-ink">
              {vehicle.model}
            </h3>
          </div>
          <p className="shrink-0 text-xl font-extrabold text-brand">
            {formatPrice(vehicle.price)}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4 text-xs font-medium text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-brand" />
            {vehicle.year}
          </span>
          <span className="flex items-center gap-1.5">
            <Gauge className="h-3.5 w-3.5 text-brand" />
            {formatMileage(vehicle.mileage)}
          </span>
          <span className="flex items-center gap-1.5">
            <Settings2 className="h-3.5 w-3.5 text-brand" />
            {vehicle.transmission}
          </span>
        </div>

        <Button
          className="mt-6 w-full rounded-full bg-brand font-bold text-white hover:bg-brand-dark"
          onClick={() => onViewDetails(vehicle)}
        >
          View Details
        </Button>
      </div>
    </motion.article>
  );
}
