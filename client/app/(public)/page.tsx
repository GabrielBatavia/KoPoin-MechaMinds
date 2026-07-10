import { HeroSection } from "@/components/hero-section";
import { FeatureSection } from "@/components/feature";
import { StatsSection } from "@/components/stats";
import Logo from "@/components/logo-cloud";

export default function Page() {
  return (
    <main className="min-h-screen bg-transparent">
      <HeroSection />
      <FeatureSection />
      <StatsSection />
      <Logo />
    </main>
  );
}
