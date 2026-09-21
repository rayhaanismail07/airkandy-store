import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../ui/ProductCard';
import { Product } from '../../types';
import { ArrowRight } from 'lucide-react';

interface FeaturedProductsProps {
  onSelectProduct: (product: Product) => void;
  onExploreShop: () => void;
}

const TABS = [
  { id: 'all',        label: 'All Products' },
  { id: 'edibles',    label: 'Edibles' },
  { id: 'herbs',      label: 'Craft Herbs' },
  { id: 'extraction', label: 'Concentrates' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  onSelectProduct,
  onExploreShop,
}) => {
  const [activeTab, setActiveTab] = useState<TabId>('all');

  const filtered =
    activeTab === 'all'
      ? PRODUCTS.slice(0, 8)
      : PRODUCTS.filter((p) => p.category === activeTab).slice(0, 8);

  return (
    <section className="py-14 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">

        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ak-teal mb-1">
              Handpicked Selection
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-wd-gray900">
              Featured Products
            </h2>
          </div>

          {/* Woodmart Tab Bar */}
          <div className="flex items-center border-b border-gray-200 self-stretch sm:self-end">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`wd-tab whitespace-nowrap ${activeTab === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <button
            onClick={onExploreShop}
            className="btn-outline inline-flex items-center gap-2"
          >
            Browse All Products
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
