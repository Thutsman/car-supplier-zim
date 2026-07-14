import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Clock, Users } from "lucide-react";
import { company } from "@/lib/data/company";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${company.name} — a trusted premium car dealership in Bulawayo, Zimbabwe.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="relative h-[48vh] min-h-[360px] w-full overflow-hidden">
        <Image
          src="/hero.jpeg"
          alt="Car Supplier Zimbabwe showroom"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,131,70,0.45)_0%,rgba(0,99,48,0.85)_100%)]" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-14 md:px-10 lg:px-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accent">
            About
          </p>
          <h1 className="mt-3 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
            {company.name}
          </h1>
        </div>
      </section>

      <section className="section-padding mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold text-ink md:text-4xl">
              Your trusted partner in Bulawayo
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              {company.about}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {company.description}
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: MapPin,
                title: "Location",
                text: company.address.full,
              },
              {
                icon: Clock,
                title: "Hours",
                text: company.hours,
              },
              {
                icon: Users,
                title: "Community",
                text: `Trusted by ${company.followers} followers on Facebook`,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm"
              >
                <item.icon className="mt-1 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <h3 className="font-bold text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-brand">
        <div className="section-padding mx-auto max-w-7xl">
          <h2 className="text-3xl font-extrabold text-white md:text-4xl">
            What sets us apart
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Quality curation",
                text: "Every vehicle in our inventory is inspected and presented to a standard we would be proud to drive ourselves.",
              },
              {
                title: "Full-service support",
                text: "From imports and registration to change of ownership — we handle the paperwork so you enjoy the drive.",
              },
              {
                title: "Honest dealings",
                text: "Transparent pricing, clear communication, and a reputation built over years of serving Bulawayo.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="text-xl font-bold text-brand-accent">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
