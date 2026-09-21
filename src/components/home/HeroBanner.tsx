import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroBannerProps {
  onExploreShop: () => void;
  onExploreGrow: () => void;
}

const slides = [
  {
    id: 0,
    badge: 'New Arrivals',
    subtitle: 'LIFTED CONFECTIONERY',
    title: 'Gourmet Infused',
    titleAccent: 'Edibles & Candy',
    description:
      'South Africa\'s finest adult confectionery — Buzz Pops, Rainbow Stripz, 400mg sugar-free hearts and artisan gummies. Lab-tested. Discreetly delivered.',
    cta: 'Shop Edibles',
    ctaPage: 'edibles',
    bgColor: 'bg-ak-teal',
    accentColor: 'text-ak-gold',
    image: '/assets/posters/lifted_snacks_poster.jpg',
  },
  {
    id: 1,
    badge: 'AAA+ Diamond Grade',
    subtitle: 'CRAFT INDOOR HARVEST',
    title: 'Triple-Cured',
    titleAccent: 'Craft Flower',
    description:
      'Trichome-frosted AAA+ indoor strains with candy terpene profiles. Hand-trimmed, Boveda-preserved and shipped express nationwide.',
    cta: 'View Flower',
    ctaPage: 'herbs',
    bgColor: 'bg-[#1e4740]',
    accentColor: 'text-ak-gold',
    image: '/assets/products/herbs.png',
  },
  {
    id: 2,
    badge: 'Solventless 90u',
    subtitle: 'THE LIQUID AMBER VAULT',
    title: 'Cold-Cure Live',
    titleAccent: 'Rosin & Concentrates',
    description:
      'First-wash 90u cold-cure rosin, THCA diamonds and terpene sauce. Potent, pure and completely solventless.',
    cta: 'Open Rosin Vault',
    ctaPage: 'extraction',
    bgColor: 'bg-[#2d1f0a]',
    accentColor: 'text-ak-gold',
    image: '/assets/products/14.png',
  },
];

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreShop, onExploreGrow }) => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const goTo = (idx: number, dir: 1 | -1 = 1) => {
    setDirection(dir);
    setActive(idx);
  };

  const next = () => goTo((active + 1) % slides.length, 1);
  const prev = () => goTo((active - 1 + slides.length) % slides.length, -1);

  // Auto-advance
  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [active]);

  const slide = slides[active];

  const slideVariants = {
    enter:  (dir: number) => ({ x: dir > 0 ? '8%'  : '-8%',  opacity: 0 }),
    center:                   { x: 0,                          opacity: 1 },
    exit:   (dir: number) => ({ x: dir > 0 ? '-8%' : '8%',   opacity: 0 }),
  };

  return (
    <section className="relative overflow-hidden w-full" style={{ minHeight: 520 }}>
      {/* Slide background */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={slide.id + '-bg'}
          className={`absolute inset-0 ${slide.bgColor}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        />
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-0 min-h-[520px] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full items-center">

          {/* ── TEXT COLUMN ── */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide.id + '-text'}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              className="space-y-5 py-10 lg:py-16"
            >
              {/* Badge */}
              <span
                className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-ak-teal bg-ak-gold"
                style={{ borderRadius: 2 }}
              >
                {slide.badge}
              </span>

              {/* Subtitle */}
              <p className={`text-xs font-bold tracking-[0.2em] uppercase ${slide.accentColor}`}>
                {slide.subtitle}
              </p>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {slide.title}<br />
                <span className={slide.accentColor}>{slide.titleAccent}</span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-white/75 leading-relaxed max-w-lg">
                {slide.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => onExploreShop()}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-ak-gold text-wd-gray900 font-bold text-sm uppercase tracking-wide hover:bg-ak-gold-dark transition-colors"
                  style={{ borderRadius: 2 }}
                >
                  {slide.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onExploreGrow}
                  className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/40 text-white font-semibold text-sm uppercase tracking-wide hover:border-white hover:bg-white/10 transition-colors"
                  style={{ borderRadius: 2 }}
                >
                  Grow Guide
                </button>
              </div>

              {/* Trust micro-badges */}
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-white/60">
                <span>✓ HPLC Lab Tested</span>
                <span>✓ Discreet Delivery</span>
                <span>✓ 18+ South Africa</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── IMAGE COLUMN ── */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide.id + '-img'}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
              className="hidden lg:flex items-center justify-center py-8"
            >
              <div className="relative w-full max-w-md aspect-square">
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full bg-white/5 scale-110" />
                <img
                  src={slide.image}
                  alt={slide.titleAccent}
                  className="w-full h-full object-contain drop-shadow-2xl"
                  loading="eager"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── PREV / NEXT CONTROLS ── */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white transition-colors"
        style={{ borderRadius: 2 }}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white transition-colors"
        style={{ borderRadius: 2 }}
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* ── DOT NAVIGATION ── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > active ? 1 : -1)}
            className={`transition-all duration-300 ${
              i === active
                ? 'w-6 h-2 bg-ak-gold'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
            style={{ borderRadius: 2 }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
