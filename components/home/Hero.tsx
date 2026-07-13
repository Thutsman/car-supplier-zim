"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/lib/data/company";

export function Hero() {
  return (
    <section className="relative min-h-[88vh] w-full overflow-hidden">
      <Image
        src="/hero.jpeg"
        alt="Car Supplier Zimbabwe showroom lot in Bulawayo"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,131,70,0.35)_0%,rgba(0,99,48,0.75)_55%,rgba(30,36,48,0.88)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand/80 via-brand/40 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-6 pb-16 pt-24 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-brand-accent">
            Bulawayo, Zimbabwe
          </p>
          <h1 className="text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Drive what you love
            <br />
            <span className="text-brand-accent">Get your dream car</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-white/85 md:text-xl">
            {company.tagline}. Buying, selling, swaps, imports, and registration
            — handled with care.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-white px-8 text-base font-bold text-brand hover:bg-brand-accent hover:text-ink"
            >
              <Link href="/inventory">
                Shop Vehicles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-2 border-white bg-transparent px-8 text-base font-bold text-white hover:bg-white/15 hover:text-white"
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
