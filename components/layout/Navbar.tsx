"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Car,
  ChevronRight,
  Home,
  Info,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { company, getPhoneUrl, getWhatsAppUrl } from "@/lib/data/company";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/inventory", label: "Buy a Car", icon: Car },
  { href: "/about", label: "About", icon: Info },
  { href: "/contact", label: "Contact", icon: Phone },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-brand shadow-sm"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6 md:px-10 lg:h-[4.25rem] lg:px-16">
        <Link href="/" className="shrink-0">
          <span className="text-lg font-extrabold tracking-tight text-white md:text-xl">
            Car Supplier{" "}
            <span className="text-brand-accent">Zimbabwe</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-semibold transition-colors hover:text-brand-accent",
                pathname === link.href ? "text-brand-accent" : "text-white/90"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <span className="hidden items-center gap-1.5 rounded-full bg-brand-dark px-3 py-1.5 text-xs font-semibold text-white xl:inline-flex">
            <MapPin className="h-3.5 w-3.5" />
            Bulawayo
          </span>
          <Button
            asChild
            className="rounded-full border-2 border-white bg-transparent px-5 font-semibold text-white hover:bg-white hover:text-brand"
          >
            <Link href="/inventory">Shop Vehicles</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              className="text-white hover:bg-white/15 hover:text-white"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            showCloseButton={false}
            className="w-[86%] gap-0 overflow-hidden border-l border-white/10 bg-gradient-to-b from-[#1b212c] to-[#12161e] p-0 text-white sm:max-w-sm"
          >
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_55%_at_100%_0%,rgba(0,131,70,0.32)_0%,transparent_65%)]" />

            <div className="relative flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <span className="text-lg font-extrabold tracking-tight text-white">
                  Car Supplier{" "}
                  <span className="text-brand-accent">Zimbabwe</span>
                </span>
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Close menu"
                    className="-mr-2 rounded-full text-white/70 hover:bg-white/10 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </SheetClose>
              </div>

              <nav className="flex flex-col gap-1.5 px-4 py-6">
                {navLinks.map((link, index) => {
                  const active = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.1 + index * 0.06,
                        ease: "easeOut",
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "group flex items-center gap-3.5 rounded-2xl px-4 py-3 text-base font-semibold transition-colors",
                          active
                            ? "bg-white/10 text-brand-accent"
                            : "text-white/85 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
                            active
                              ? "bg-brand text-white shadow-[0_4px_14px_-4px_rgba(0,131,70,0.8)]"
                              : "bg-white/10 text-white/80 group-hover:bg-white/15"
                          )}
                        >
                          <Icon className="h-[18px] w-[18px]" />
                        </span>
                        {link.label}
                        <ChevronRight
                          className={cn(
                            "ml-auto h-4 w-4 transition-transform group-hover:translate-x-0.5",
                            active ? "text-brand-accent" : "text-white/30"
                          )}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mt-auto border-t border-white/10 px-6 pb-8 pt-6">
                <Button
                  asChild
                  size="lg"
                  className="group h-12 w-full rounded-full bg-gradient-to-b from-[#00b562] to-[#007a41] text-base font-bold text-white shadow-[0_10px_30px_-10px_rgba(0,168,89,0.75),inset_0_1px_0_rgba(255,255,255,0.25)] ring-1 ring-white/20 transition-all duration-300 hover:from-[#00c76c] hover:to-[#008a4a]"
                >
                  <Link href="/inventory" onClick={() => setOpen(false)}>
                    Shop Vehicles
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <a
                    href={getPhoneUrl()}
                    className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 py-2.5 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Phone className="h-4 w-4 text-brand-accent" />
                    Call Us
                  </a>
                  <a
                    href={getWhatsAppUrl(
                      "Hi Car Supplier Zimbabwe! I'm interested in a vehicle."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 py-2.5 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <MessageCircle className="h-4 w-4 text-brand-accent" />
                    WhatsApp
                  </a>
                </div>

                <p className="mt-5 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                  <MapPin className="h-3.5 w-3.5 text-brand-accent/70" />
                  {company.address.city}, {company.address.country}
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
