import PublicShell from "./components/layout/PublicShell";
import HeroSection from "./components/sections/HeroSection";
import BrandStory from "./components/sections/BrandStory";
import FeaturedPerfumes from "./components/sections/FeaturedPerfumes";
import LuxuryTestimonials from "./components/sections/LuxuryTestimonials";
import CategoryCards from "./components/sections/CategoryCards";

export default function Home() {
  return (
    <PublicShell>
      <div className="space-y-12">
        <HeroSection />

        <div className="space-y-10">
          <BrandStory />
          <FeaturedPerfumes />
          <LuxuryTestimonials />
        </div>

        <CategoryCards />
      </div>
    </PublicShell>
  );
}


