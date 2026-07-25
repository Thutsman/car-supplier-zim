import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
        404
      </p>
      <h1 className="mt-3 text-3xl font-extrabold text-ink md:text-4xl">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The vehicle or page you&apos;re looking for may have been sold or
        moved. Browse our current inventory instead.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          asChild
          className="rounded-full bg-brand px-6 font-bold text-white hover:bg-brand-dark"
        >
          <Link href="/inventory">Browse Inventory</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="rounded-full border-brand/30 hover:bg-brand/5 hover:text-brand"
        >
          <Link href="/">Back Home</Link>
        </Button>
      </div>
    </div>
  );
}
