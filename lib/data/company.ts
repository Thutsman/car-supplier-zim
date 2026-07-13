export const company = {
  name: "Car Supplier Zimbabwe",
  shortName: "CSZ",
  tagline: "Get your dream car from us today",
  description:
    "A trusted Bulawayo dealership specialising in premium used and select new vehicles. We handle buying, selling, swaps, imports, registration, and change of ownership — delivering a seamless, white-glove experience from first enquiry to keys in hand.",
  about:
    "Based at the corner of Robert Mugabe and Stockton Street, Car Supplier Zimbabwe has built a reputation for quality imports and honest dealings across Bulawayo. Our curated inventory spans elegant sedans, capable SUVs, and refined luxury vehicles — each inspected and presented to the standard our clients expect.",
  address: {
    street: "Corner Robert Mugabe and Stockton Street",
    city: "Bulawayo",
    region: "Bulawayo Outlying",
    country: "Zimbabwe",
    full: "Corner Robert Mugabe and Stockton Street, Bulawayo Outlying, Zimbabwe",
  },
  phone: "0772858359",
  phoneDisplay: "077 285 8359",
  whatsapp: "263772858359",
  email: "TODO: replace with real email",
  facebook: "https://www.facebook.com/share/18hZxoMf4R/",
  hours: "Always open",
  followers: "17K",
  services: [
    { title: "Buying", description: "Sell your vehicle with confidence and fair valuation." },
    { title: "Selling", description: "Curated inventory of quality used and import vehicles." },
    { title: "Swaps", description: "Trade in your current vehicle toward your next dream car." },
    { title: "Imports", description: "Sourced imports handled with care from port to pavement." },
    { title: "Registration", description: "Full vehicle registration assistance and guidance." },
    { title: "Change of Ownership", description: "Seamless ownership transfer paperwork handled for you." },
  ],
} as const;

export function getWhatsAppUrl(message?: string) {
  const base = `https://wa.me/${company.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function getPhoneUrl() {
  return `tel:+${company.whatsapp}`;
}
