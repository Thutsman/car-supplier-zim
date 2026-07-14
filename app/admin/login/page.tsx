import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";
import { company } from "@/lib/data/company";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary px-6">
      <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-[0_20px_50px_-20px_rgba(30,36,48,0.25)]">
        <p className="text-lg font-extrabold tracking-tight text-ink">
          {company.name.replace(" Zimbabwe", "")}{" "}
          <span className="text-brand">Zimbabwe</span>
        </p>
        <h1 className="mt-6 text-2xl font-extrabold text-ink">Admin sign in</h1>
        <p className="mt-1 mb-6 text-sm text-muted-foreground">
          Manage your vehicle listings.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
