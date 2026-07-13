"use client";

import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  Car,
  FileCheck,
  Globe,
  RefreshCw,
  ShoppingBag,
} from "lucide-react";
import { company } from "@/lib/data/company";

const iconMap = {
  Buying: ShoppingBag,
  Selling: Car,
  Swaps: RefreshCw,
  Imports: Globe,
  Registration: FileCheck,
  "Change of Ownership": ArrowLeftRight,
} as const;

export function Services() {
  return (
    <section className="section-brand">
      <div className="section-padding mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12 text-center"
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accent">
            What We Offer
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-white md:text-4xl lg:text-5xl">
            Checked by us, selected for you
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">
            Every step from enquiry to ownership — buying, selling, swaps,
            imports, registration, and change of ownership.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {company.services.map((service, index) => {
            const Icon =
              iconMap[service.title as keyof typeof iconMap] ?? Car;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="rounded-3xl border border-white/15 bg-brand-dark/40 p-7 transition-colors hover:border-brand-accent/50 hover:bg-brand-dark/60"
              >
                <Icon className="h-6 w-6 text-brand-accent" />
                <h3 className="mt-4 text-xl font-bold text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
