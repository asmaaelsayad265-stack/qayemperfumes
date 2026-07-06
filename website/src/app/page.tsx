import PublicShell from "./components/layout/PublicShell";
import HeroSection from "./components/sections/HeroSection";
import BrandStory from "./components/sections/BrandStory";
import FeaturedPerfumes from "./components/sections/FeaturedPerfumes";
import LuxuryTestimonials from "./components/sections/LuxuryTestimonials";
import CategoryCards from "./components/sections/CategoryCards";
import OffersSection from "./components/sections/OffersSection";

export default function Home() {
  return (
    <PublicShell>
      <div className="space-y-24 md:space-y-32 pb-24">
        {/* Cinematic Hero */}
        <HeroSection />

        <div className="space-y-32">
          {/* New Exclusive Offers Preview */}
          <OffersSection />
          
          {/* Brand Identity */}
          <BrandStory />
          
          {/* Top Sellers */}
          <FeaturedPerfumes />
          
          {/* Social Proof */}
          <LuxuryTestimonials />
        </div>

        {/* Collections */}
        <CategoryCards />
      </div>
    </PublicShell>
  );
}


