"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { company } from "@/lib/data/company";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Buy a Car" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
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
          <SheetContent side="right" className="border-white/10 bg-brand">
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <div className="mt-8 flex flex-col gap-6">
              <p className="text-2xl font-extrabold text-white">
                {company.name}
              </p>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-xl font-bold transition-colors hover:text-brand-accent",
                      pathname === link.href
                        ? "text-brand-accent"
                        : "text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <Button
                asChild
                className="mt-4 rounded-full bg-white font-semibold text-brand hover:bg-brand-accent hover:text-ink"
              >
                <Link href="/inventory" onClick={() => setOpen(false)}>
                  Shop Vehicles
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
