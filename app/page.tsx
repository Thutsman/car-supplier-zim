import { Hero } from "@/components/home/Hero";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { FeaturedVehicles } from "@/components/home/FeaturedVehicles";
import { Services } from "@/components/home/Services";
import { ContactCTA } from "@/components/home/ContactCTA";
import { getFeaturedVehicles } from "@/lib/data/vehicles-repo";

export default async function HomePage() {
  const featured = await getFeaturedVehicles();

  return (
    <>
      <Hero />
      <AboutTeaser />
      <FeaturedVehicles vehicles={featured} />
      <Services />
      <ContactCTA />
    </>
  );
}
