"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/lib/data/company";

export function AboutTeaser() {
  return (
    <section className="section-padding mx-auto max-w-7xl">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl shadow-depth/10"
        >
          <Image
            src="/about%20us%20image.jpeg"
            alt="Premium vehicles at Car Supplier Zimbabwe"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
            About Us
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-ink md:text-4xl lg:text-5xl">
            Curated vehicles.
            <br />
            <span className="text-brand">Trusted service.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            {company.about}
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            From imports and registration to change of ownership — we handle
            every detail so you can focus on the drive.
          </p>
          <Button
            asChild
            variant="link"
            className="mt-6 h-auto p-0 text-base font-bold text-brand hover:text-brand-dark"
          >
            <Link href="/about">
              Learn more about us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
