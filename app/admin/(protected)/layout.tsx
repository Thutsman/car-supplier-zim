import type { Metadata } from "next";
import Link from "next/link";
import { Car, ExternalLink, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin/auth";
import { logoutAction } from "@/app/admin/login/actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAdmin();

  return (
    <div className="flex min-h-screen flex-col bg-secondary md:flex-row">
      <aside className="flex items-center justify-between gap-4 border-b border-border bg-depth px-5 py-4 text-white md:w-60 md:shrink-0 md:flex-col md:items-stretch md:justify-start md:border-b-0 md:border-r md:px-4 md:py-6">
        <Link href="/admin/vehicles" className="font-extrabold tracking-tight">
          CSZ <span className="text-brand-accent">Admin</span>
        </Link>

        <nav className="flex items-center gap-1 md:mt-8 md:flex-1 md:flex-col md:items-stretch">
          <Link
            href="/admin/vehicles"
            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold text-white/85 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Car className="h-4 w-4" />
            Vehicles
          </Link>
        </nav>

        <div className="flex items-center gap-1 md:flex-col md:items-stretch md:gap-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="hidden md:inline">View site</span>
          </Link>
          <form action={logoutAction}>
            <Button
              type="submit"
              variant="ghost"
              className="w-full justify-start gap-2.5 rounded-xl px-3 text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Log out</span>
            </Button>
          </form>
        </div>
      </aside>

      <main className="flex-1 px-5 py-6 md:px-8 md:py-8">{children}</main>
    </div>
  );
}
