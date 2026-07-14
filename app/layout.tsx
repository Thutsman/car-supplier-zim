import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { company } from "@/lib/data/company";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: `${company.name} | Premium Cars in Bulawayo`,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  keywords: [
    "car dealer",
    "Bulawayo",
    "Zimbabwe",
    "used cars",
    "imports",
    "Mercedes",
    "Audi",
    "luxury cars",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
