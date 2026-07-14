"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/lib/data/company";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,131,70,0.18)_0%,rgba(0,99,48,0.48)_55%,rgba(18,23,32,0.85)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />

      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-6 pb-16 pt-24 md:px-10 lg:px-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-5xl"
        >
          <motion.div variants={item} className="mb-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.4)] backdrop-blur-md">
              <MapPin className="h-3.5 w-3.5 text-brand-accent" aria-hidden />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/90">
                Bulawayo, Zimbabwe
              </span>
            </span>
          </motion.div>
          <h1 className="notranslate uppercase" translate="no">
            <motion.span
              variants={item}
              className="block text-[clamp(1.35rem,1vw+1.05rem,2rem)] font-bold leading-[1.15] tracking-[0.02em] text-brand-accent"
            >
              Drive what you love
            </motion.span>
            <motion.span
              variants={item}
              className="hero-gradient-text mt-1 block text-[clamp(3rem,3.4vw+2.1rem,5.75rem)] font-black leading-[1.02] tracking-[-0.02em]"
            >
              Find your{" "}
              <span className="hero-gradient-text-focus hero-glow-pulse-strong">
                perfect
              </span>{" "}
              car
            </motion.span>
          </h1>
          <motion.div
            variants={item}
            className="mt-5 h-[4px] w-20 rounded-full bg-gradient-to-r from-[#7dff5a] to-[#00b86b] shadow-[0_0_16px_rgba(69,226,107,0.65)]"
          />
          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-white/85 md:text-xl"
          >
            {company.tagline}. Buying, selling, swaps, imports, and registration
            — handled with care.
          </motion.p>
          <motion.div
            variants={item}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="group h-12 rounded-full bg-gradient-to-b from-[#00b562] to-[#007a41] px-8 text-base font-bold text-white shadow-[0_10px_30px_-10px_rgba(0,168,89,0.75),inset_0_1px_0_rgba(255,255,255,0.25)] ring-1 ring-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-[#00c76c] hover:to-[#008a4a] hover:shadow-[0_16px_38px_-10px_rgba(0,200,110,0.85),inset_0_1px_0_rgba(255,255,255,0.3)]"
            >
              <Link href="/inventory">
                Shop Vehicles
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
