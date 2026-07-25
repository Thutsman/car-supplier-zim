import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { company, getPhoneUrl, getWhatsAppUrl } from "@/lib/data/company";

function FacebookGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.5 21v-7.5h2.5l.5-3H13.5V8.5c0-.87.24-1.5 1.53-1.5H16.5V4.36c-.26-.035-1.15-.11-2.19-.11-2.17 0-3.66 1.32-3.66 3.75V10.5H8v3h2.65V21h2.85Z" />
    </svg>
  );
}

function InstagramGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 448 512" fill="currentColor" aria-hidden {...props}>
      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.9 0-184.9zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
    </svg>
  );
}

function TikTokGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 448 512" fill="currentColor" aria-hidden {...props}>
      <path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25v178.72A162.55 162.55 0 1 1 185 188.31v88.67a74.62 74.62 0 1 0 52.23 71.18V0h87.14a121.18 121.18 0 0 0 1.86 22.17h.02A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14Z" />
    </svg>
  );
}

const socialLinks = [
  {
    href: company.facebook,
    label: "Follow us on Facebook",
    Icon: FacebookGlyph,
    className: "bg-[#1877F2] text-white",
  },
  {
    href: company.instagram,
    label: "Follow us on Instagram",
    Icon: InstagramGlyph,
    className:
      "bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285aeb_90%)] text-white",
  },
  {
    href: company.tiktok,
    label: "Follow us on TikTok",
    Icon: TikTokGlyph,
    className: "bg-black text-white",
  },
];

export function Footer() {
  return (
    <footer className="section-depth">
      <div className="section-padding mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/brand/emblem.png"
                alt=""
                width={44}
                height={44}
                className="h-10 w-10 shrink-0"
              />
              <h3 className="text-2xl font-extrabold text-white">
                Car Supplier{" "}
                <span className="text-brand-accent">Zimbabwe</span>
              </h3>
            </div>
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
          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, label, Icon, className }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-sm transition-transform hover:-translate-y-0.5 ${className}`}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
