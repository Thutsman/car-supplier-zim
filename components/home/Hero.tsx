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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,131,70,0.28)_0%,rgba(0,99,48,0.62)_55%,rgba(30,36,48,0.78)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand/65 via-brand/28 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-6 pb-16 pt-24 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-brand-accent">
            Bulawayo, Zimbabwe
          </p>
          <h1 className="notranslate uppercase" translate="no">
            <span className="block text-[clamp(1.35rem,1vw+1.05rem,2rem)] font-bold leading-[1.15] tracking-[0.02em] text-white/90">
              Drive what you love
            </span>
            <span className="hero-gradient-text hero-glow-pulse mt-1 block text-[clamp(2.75rem,3vw+2rem,5.25rem)] font-black leading-[1.05] tracking-[-0.015em]">
              Get your{" "}
              <span className="hero-gradient-text-dream hero-glow-pulse-strong inline-block">
                dream
              </span>{" "}
              car
            </span>
          </h1>
          <div className="mt-5 h-[3px] w-14 rounded-full bg-gradient-to-r from-[#7dff5a] to-[#00b86b] shadow-[0_0_12px_rgba(69,226,107,0.55)]" />
          <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-white/85 md:text-xl">
            {company.tagline}. Buying, selling, swaps, imports, and registration
            — handled with care.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-gradient-to-b from-white to-[#eafbf1] px-8 text-base font-bold text-brand shadow-[0_8px_24px_-8px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:from-white hover:to-[#d9f8e6] hover:shadow-[0_12px_28px_-8px_rgba(0,184,107,0.45)]"
            >
              <Link href="/inventory">
                Shop Vehicles
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-2 border-white/80 bg-white/5 px-8 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/15"
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
