import FeaturesSection from "@/components/features-section";
import { Footer2 } from "@/components/footer-section";
import HeroSection from "@/components/hero-section";
import PricingSection from "@/components/pricing-section";
import { StatsSection } from "@/components/stats-section";
import { TextRevealSection } from "@/components/text-reveal-section";

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <PricingSection />
      <TextRevealSection />
      <Footer2 />
    </main>
  );
}