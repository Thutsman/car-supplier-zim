import type { Metadata } from "next";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { company, getPhoneUrl, getWhatsAppUrl } from "@/lib/data/company";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${company.name} in Bulawayo. Call, WhatsApp, or send us a message.`,
};

export default function ContactPage() {
  return (
    <div className="section-padding mx-auto max-w-7xl">
      <div className="mb-12">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
          Contact
        </p>
        <h1 className="mt-3 text-4xl font-extrabold text-ink md:text-5xl">
          Get in touch
        </h1>
        <p className="mt-3 max-w-lg text-muted-foreground">
          Visit our showroom, call us directly, or send a message. We are always
          ready to help you find your next vehicle.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-5">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8 lg:col-span-3">
          <ContactForm />
        </div>

        <div className="space-y-5 lg:col-span-2">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-bold text-ink">Visit us</h2>
            <div className="mt-4 space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>{company.address.full}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-brand" />
                <a
                  href={getPhoneUrl()}
                  className="font-semibold text-brand transition-colors hover:text-brand-dark"
                >
                  {company.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 shrink-0 text-brand" />
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand transition-colors hover:text-brand-dark"
                >
                  WhatsApp
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-brand" />
                <span>{company.hours}</span>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-secondary">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <MapPin className="mx-auto h-8 w-8 text-brand" />
                <p className="mt-3 text-sm font-medium text-muted-foreground">
                  Corner Robert Mugabe &amp; Stockton Street
                </p>
                <p className="text-xs text-muted-foreground/70">
                  Map integration — Phase 2
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
