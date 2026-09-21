import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface MarionAboutSplitProps {
  onNavigateToAbout: () => void;
}

const points = [
  'Strict 0 PPM residual hydrocarbon and solventless extraction protocols',
  'Pectin-based and sugar-free formulas suitable for wellness lifestyles',
  'Direct cold-chain terpene preservation with Boveda 62% humidity packs',
  'Discrete express courier satchels with real-time SMS delivery dispatch',
];

export const MarionAboutSplit: React.FC<MarionAboutSplitProps> = ({ onNavigateToAbout }) => (
  <section className="py-16 bg-white border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 lg:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* Image Side */}
        <div className="relative">
          {/* Decorative offset border */}
          <div
            className="hidden lg:block absolute -top-3 -left-3 w-full h-full border-2 border-ak-gold/40"
            style={{ borderRadius: 2 }}
          />
          <div
            className="relative overflow-hidden aspect-[4/3] lg:aspect-[5/4] bg-ak-warm"
            style={{ borderRadius: 2 }}
          >
            <img
              src="/assets/branding/Cannabis culture in south africa.jpg"
              alt="AirKandy Craft"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback gradient if image missing
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
            {/* Fallback gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-ak-teal to-ak-teal-dark flex items-center justify-center -z-10">
              <span className="text-6xl">🌿</span>
            </div>
          </div>

          {/* Floating stat badge */}
          <div
            className="absolute bottom-5 right-5 bg-ak-teal text-white p-4 shadow-lg text-center"
            style={{ borderRadius: 2 }}
          >
            <span className="block text-3xl font-bold">100%</span>
            <span className="block text-[10px] font-semibold uppercase tracking-wider mt-0.5 text-ak-gold">
              Pure Distillate
            </span>
          </div>
        </div>

        {/* Text Side */}
        <div className="space-y-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ak-teal mb-2">
              The AirKandy Philosophy
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-wd-gray900 leading-tight">
              We Craft Confectionery With{' '}
              <span className="text-ak-teal">Pharmaceutical Precision</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-wd-gray600 leading-relaxed">
            AirKandy is dedicated to providing adult South Africans with clean, precisely-dosed,
            and exceptionally delicious botanical formulations. Through our exclusive collaboration
            with Lifted Snacks, every gummy, pop, and blossom delivers consistent elevation without compromise.
          </p>

          {/* Checklist */}
          <ul className="space-y-3">
            {points.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-wd-gray700">
                <CheckCircle2 className="w-5 h-5 text-ak-teal flex-shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={onNavigateToAbout}
            className="btn-primary inline-flex items-center gap-2 mt-2"
          >
            Read Our Story
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </section>
);
