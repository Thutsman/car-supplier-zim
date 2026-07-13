"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company, getPhoneUrl, getWhatsAppUrl } from "@/lib/data/company";

export function ContactCTA() {
  return (
    <section className="section-padding mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="relative overflow-hidden rounded-3xl bg-brand px-8 py-14 text-center md:px-16 md:py-16"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(61,220,132,0.25),transparent_50%)]" />
        <div className="relative z-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accent">
            Ready to drive?
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-white md:text-4xl lg:text-5xl">
            Your dream car awaits
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/75">
            Visit us in Bulawayo or reach out today. Our team is always ready to
            help you find the perfect vehicle.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-white px-8 font-bold text-brand hover:bg-brand-accent hover:text-ink"
            >
              <Link href="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-2 border-white bg-transparent px-8 font-bold text-white hover:bg-white/15 hover:text-white"
            >
              <a href={getPhoneUrl()}>
                <Phone className="mr-2 h-4 w-4" />
                {company.phoneDisplay}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="font-bold text-brand-accent hover:bg-white/10 hover:text-white"
            >
              <a
                href={getWhatsAppUrl("Hello, I'm interested in your vehicles.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
