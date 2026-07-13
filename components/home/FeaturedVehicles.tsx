"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CarCard } from "@/components/inventory/CarCard";
import { CarDetailModal } from "@/components/inventory/CarDetailModal";
import type { Vehicle } from "@/lib/data/types";

interface FeaturedVehiclesProps {
  vehicles: Vehicle[];
}

export function FeaturedVehicles({ vehicles }: FeaturedVehiclesProps) {
  const [selected, setSelected] = useState<Vehicle | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewDetails = (vehicle: Vehicle) => {
    setSelected(vehicle);
    setModalOpen(true);
  };

  return (
    <section className="border-y border-border bg-secondary">
      <div className="section-padding mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
              Featured
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-ink md:text-4xl lg:text-5xl">
              Selected inventory
            </h2>
            <p className="mt-3 max-w-lg text-muted-foreground">
              Hand-picked vehicles from our current stock — each inspected and
              ready for the road.
            </p>
          </div>
          <Button
            asChild
            className="rounded-full bg-brand px-6 font-bold text-white hover:bg-brand-dark"
          >
            <Link href="/inventory">
              View all inventory
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.slice(0, 6).map((vehicle, index) => (
            <CarCard
              key={vehicle.id}
              vehicle={vehicle}
              index={index}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        <CarDetailModal
          vehicle={selected}
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      </div>
    </section>
  );
}
