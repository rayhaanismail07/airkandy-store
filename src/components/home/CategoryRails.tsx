import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useFilterStore } from '../../store/useFilterStore';

interface CategoryRailsProps {
  onSelectCategory: (slug: string) => void;
}

const categories = [
  {
    id: 'edibles',
    slug: 'edibles',
    name: 'Infused Edibles',
    count: '14 products',
    image: '/assets/posters/lifted_snacks_poster.jpg',
    accent: '#275C53',
    light: '#e8f2f0',
  },
  {
    id: 'herbs',
    slug: 'herbs',
    name: 'Craft Herbs & Flower',
    count: '18 products',
    image: '/assets/products/herbs.png',
    accent: '#1e4740',
    light: '#e3eeec',
  },
  {
    id: 'extraction',
    slug: 'extraction',
    name: 'Concentrates',
    count: '9 products',
    image: '/assets/products/14.png',
    accent: '#5c3a00',
    light: '#faf0e0',
  },
  {
    id: 'smoking-gear',
    slug: 'smoking-gear',
    name: 'Glass & Gear',
    count: '22 products',
    image: '/assets/products/18.png',
    accent: '#1a3060',
    light: '#e8edf8',
  },
  {
    id: 'grow-tech',
    slug: 'grow-tech',
    name: 'Grow Tech',
    count: '16 products',
    image: '/assets/products/Nutrients-Banner-6-365x430.jpg',
    accent: '#2d5a1b',
    light: '#eaf3e5',
  },
];

export const CategoryRails: React.FC<CategoryRailsProps> = ({ onSelectCategory }) => {
  const setSelectedCategory = useFilterStore((s) => s.setSelectedCategory);

  const handleClick = (slug: string) => {
    setSelectedCategory(slug);
    onSelectCategory(slug);
  };

  return (
    <section className="py-14 bg-ak-warm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">

        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ak-teal mb-1">
              Browse Categories
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-wd-gray900">
              Shop by Collection
            </h2>
          </div>
          <button
            onClick={() => handleClick('all')}
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-ak-teal hover:text-ak-teal-dark transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleClick(cat.slug)}
              className="group text-left focus:outline-none"
            >
              {/* Image Box */}
              <div
                className="relative overflow-hidden w-full aspect-square mb-3 border border-gray-200 bg-white"
                style={{ borderRadius: 2 }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-ak-teal/0 group-hover:bg-ak-teal/20 transition-colors duration-300" />

                {/* Shop Now badge on hover */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-ak-teal py-2 px-3">
                  <span className="text-white text-xs font-semibold flex items-center gap-1.5">
                    Shop Now <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Category Name */}
              <div className="text-sm font-semibold text-wd-gray900 group-hover:text-ak-teal transition-colors leading-snug">
                {cat.name}
              </div>
              <div className="text-xs text-wd-gray500 mt-0.5">{cat.count}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
