import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { company } from "@/lib/data/company";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} | Premium Cars in Bulawayo, Zimbabwe`,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  keywords: [
    "car dealer Zimbabwe",
    "car dealer Bulawayo",
    "cars for sale in Zimbabwe",
    "used cars Bulawayo",
    "buy a car in Zimbabwe",
    "car imports Zimbabwe",
    "Toyota Zimbabwe",
    "Mercedes Zimbabwe",
    "Audi Zimbabwe",
    "luxury cars Zimbabwe",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_ZW",
    url: "/",
    siteName: company.name,
    title: `${company.name} | Premium Cars in Bulawayo, Zimbabwe`,
    description: company.description,
    images: [{ url: "/hero.jpeg", width: 1600, height: 900, alt: company.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} | Premium Cars in Bulawayo, Zimbabwe`,
    description: company.description,
    images: ["/hero.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#008346",
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: company.name,
  description: company.description,
  url: siteUrl,
  image: `${siteUrl}/hero.jpeg`,
  telephone: `+${company.whatsapp}`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.street,
    addressLocality: company.address.city,
    addressRegion: company.address.region,
    addressCountry: "ZW",
  },
  sameAs: [company.facebook],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
      </body>
    </html>
  );
}
