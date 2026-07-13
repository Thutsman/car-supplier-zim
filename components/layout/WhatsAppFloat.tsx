import { MessageCircle } from "lucide-react";
import { company, getWhatsAppUrl } from "@/lib/data/company";

export function WhatsAppFloat() {
  return (
    <a
      href={getWhatsAppUrl(
        `Hello ${company.name}, I'd like to enquire about a vehicle.`
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-brand/30 transition-transform hover:scale-105 hover:bg-brand-dark"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
