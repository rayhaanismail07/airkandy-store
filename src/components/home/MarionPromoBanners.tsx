import React from 'react';
import { ArrowRight } from 'lucide-react';

interface MarionPromoBannersProps {
  onSelectCategory: (slug: string) => void;
}

const banners = [
  {
    id: 'b-1',
    slug: 'edibles',
    subtitle: 'LIFTED CONFECTIONERY',
    title: 'Buzz Pops & Infused Gummies',
    cta: 'Shop Edibles',
    image: '/assets/posters/lifted_snacks_poster.jpg',
    bg: 'bg-ak-teal',
  },
  {
    id: 'b-2',
    slug: 'herbs',
    subtitle: 'TRIPLE-CURED HARVEST',
    title: 'AAA+ Trichome Indoor Flower',
    cta: 'View Craft Flower',
    image: '/assets/products/herbs.png',
    bg: 'bg-[#1e4740]',
  },
  {
    id: 'b-3',
    slug: 'extraction',
    subtitle: '90U COLD-CURE SOLVENTLESS',
    title: 'Live Rosin & Concentrates',
    cta: 'Open Rosin Vault',
    image: '/assets/products/14.png',
    bg: 'bg-[#2d1f0a]',
  },
];

export const MarionPromoBanners: React.FC<MarionPromoBannersProps> = ({ onSelectCategory }) => (
  <section className="py-14 bg-ak-warm border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 lg:px-6">

      {/* Section label */}
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ak-teal mb-1">
          Top Collections
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-wd-gray900">
          Shop by Highlight
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {banners.map((b) => (
          <div
            key={b.id}
            onClick={() => onSelectCategory(b.slug)}
            className={`relative overflow-hidden cursor-pointer group min-h-[320px] ${b.bg}`}
            style={{ borderRadius: 2 }}
          >
            {/* Background image */}
            <div className="absolute inset-0 z-0">
              <img
                src={b.image}
                alt={b.title}
                className="w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between h-full p-7 min-h-[320px]">
              {/* Subtitle top */}
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-ak-gold">
                {b.subtitle}
              </span>

              {/* Title + CTA bottom */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white group-hover:text-ak-gold transition-colors leading-snug">
                  {b.title}
                </h3>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 group-hover:text-ak-gold group-hover:translate-x-1 transition-all">
                  {b.cta} <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
