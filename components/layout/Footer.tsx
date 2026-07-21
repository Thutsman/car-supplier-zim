import { MapPin, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { company, getPhoneUrl, getWhatsAppUrl } from "@/lib/data/company";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.5 21v-7.5h2.5l.5-3H13.5V8.5c0-.87.24-1.5 1.53-1.5H16.5V4.36c-.26-.035-1.15-.11-2.19-.11-2.17 0-3.66 1.32-3.66 3.75V10.5H8v3h2.65V21h2.85Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="section-depth">
      <div className="section-padding mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="text-2xl font-extrabold text-white">
              Car Supplier <span className="text-brand-accent">Zimbabwe</span>
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
              {company.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-brand-accent">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/65">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                <span>{company.address.full}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-brand-accent" />
                <a
                  href={getPhoneUrl()}
                  className="transition-colors hover:text-brand-accent"
                >
                  {company.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-brand-accent"
                >
                  WhatsApp: {company.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-brand-accent">
              Services
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-white/65">
              {company.services.map((service) => (
                <li key={service.title}>{service.title}</li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-white/45 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {company.name}. All rights
            reserved.
          </p>
          <a
            href={company.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Facebook"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all hover:-translate-y-0.5 hover:border-brand-accent/40 hover:bg-brand-accent/15 hover:text-brand-accent"
          >
            <FacebookIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
