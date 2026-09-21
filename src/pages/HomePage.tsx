import React from 'react';
import { HeroBanner } from '../components/home/HeroBanner';
import { MarionFeatures } from '../components/home/MarionFeatures';
import { MarionAboutSplit } from '../components/home/MarionAboutSplit';
import { MarionPromoBanners } from '../components/home/MarionPromoBanners';
import { CategoryRails } from '../components/home/CategoryRails';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { VisualShowcase } from '../components/home/VisualShowcase';
import { GrowTimelineWidget } from '../components/home/GrowTimelineWidget';
import { MarionFaqSection } from '../components/home/MarionFaqSection';
import { TrustBadges } from '../components/home/TrustBadges';
import { ReviewsCarousel } from '../components/home/ReviewsCarousel';
import { Product } from '../types';

interface HomePageProps {
  onNavigate: (page: string, params?: { category?: string; slug?: string }) => void;
  onSelectProduct: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectProduct }) => {
  return (
    <div className="space-y-0">
      {/* 1. Marion Dark Botanical Hero Banner */}
      <HeroBanner
        onExploreShop={() => onNavigate('shop')}
        onExploreGrow={() => onNavigate('grow-guide')}
      />

      {/* 2. Marion 4-Box Gold Circular Badge Feature Row */}
      <MarionFeatures />

      {/* 3. Marion Layered Circular About Split Section */}
      <MarionAboutSplit
        onNavigateToAbout={() => onNavigate('about')}
      />

      {/* 4. Marion 3-Column Promo Banners */}
      <MarionPromoBanners
        onSelectCategory={(slug) => onNavigate('shop', { category: slug })}
      />

      {/* 5. Sensory Bento Category Collections */}
      <CategoryRails
        onSelectCategory={(slug) => onNavigate('shop', { category: slug })}
      />

      {/* 6. Marion Tabbed Product Showcase */}
      <FeaturedProducts
        onSelectProduct={onSelectProduct}
        onExploreShop={() => onNavigate('shop')}
      />

      {/* 7. Authentic Lookbook & Visual Arts Gallery */}
      <VisualShowcase
        onExploreShop={() => onNavigate('shop')}
      />

      {/* 8. Interactive Botanical Cultivation Simulator */}
      <GrowTimelineWidget
        onNavigateToGrowGuide={() => onNavigate('grow-guide')}
      />

      {/* 9. Marion Accordion FAQ Section */}
      <MarionFaqSection />

      {/* 10. Gold Standard Holographic Trust Seals */}
      <TrustBadges />

      {/* 11. Client Testimonials */}
      <ReviewsCarousel />
    </div>
  );
};
