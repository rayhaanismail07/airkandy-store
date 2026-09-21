import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface VisualShowcaseProps {
  onExploreShop: () => void;
}

const galleryItems = [
  {
    id: 'g-1',
    title: 'Lifted Snacks Official Confectionery',
    category: 'posters',
    image: '/assets/posters/lifted_snacks_poster.jpg',
    tag: 'Official Campaign',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'g-2',
    title: 'South African Cannabis Culture',
    category: 'culture',
    image: '/assets/branding/Cannabis culture in south africa.jpg',
    tag: 'Mzanzi Heritage',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'g-3',
    title: 'The Sweet Life Edition',
    category: 'posters',
    image: '/assets/posters/airkandy_sweet_life_poster.jpg',
    tag: 'High Sweety Series',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'g-4',
    title: 'Medical Grade HPLC Concentrates',
    category: 'craft',
    image: '/assets/branding/Get Legal Pharmaceutical Medical Grade Cannabis in South Africa.jpg',
    tag: '0 PPM Solvents',
    aspect: 'aspect-video',
  },
  {
    id: 'g-5',
    title: 'Scientific Dispensary Menu',
    category: 'craft',
    image: '/assets/branding/Scientific Dispensary Menu_page-1.jpg',
    tag: 'Dispensary Vault',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'g-6',
    title: 'AirKandy Street Drop Culture',
    category: 'culture',
    image: '/assets/posters/post1_square.png',
    tag: 'Street Edition',
    aspect: 'aspect-square',
  },
];

const FILTERS = [
  { id: 'all',     label: 'All' },
  { id: 'posters', label: 'Art Posters' },
  { id: 'culture', label: 'SA Culture' },
  { id: 'craft',   label: 'Craft' },
] as const;

type FilterId = (typeof FILTERS)[number]['id'];

export const VisualShowcase: React.FC<VisualShowcaseProps> = ({ onExploreShop }) => {
  const [filter, setFilter] = useState<FilterId>('all');

  const filtered = filter === 'all'
    ? galleryItems
    : galleryItems.filter((i) => i.category === filter);

  return (
    <section className="py-14 bg-ak-warm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ak-teal mb-1">
              The Visual Lookbook
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-wd-gray900">
              AirKandy Gallery
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 border-b border-gray-200">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`wd-tab ${filter === f.id ? 'active' : ''}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="group relative overflow-hidden bg-white border border-gray-200"
                style={{ borderRadius: 2 }}
              >
                <div className={`relative w-full ${item.aspect} overflow-hidden`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-ak-teal/0 group-hover:bg-ak-teal/60 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-semibold px-4 text-center">
                      {item.title}
                    </span>
                  </div>

                  {/* Tag badge */}
                  <span
                    className="absolute top-3 left-3 px-2.5 py-1 bg-white text-wd-gray800 text-[10px] font-bold shadow-sm"
                    style={{ borderRadius: 2 }}
                  >
                    {item.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA Banner */}
        <div
          className="bg-ak-teal text-white p-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderRadius: 2 }}
        >
          <div>
            <h3 className="text-lg font-bold text-white">Want Custom Merch & Poster Prints?</h3>
            <p className="text-sm text-white/70 mt-0.5">
              High-resolution 300DPI physical prints and festival editions available.
            </p>
          </div>
          <button
            onClick={onExploreShop}
            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-ak-gold text-wd-gray900 font-bold text-sm hover:bg-ak-gold-dark transition-colors"
            style={{ borderRadius: 2 }}
          >
            Explore Merch & Gear <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
