import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../../data/products';
import { useFilterStore } from '../../store/useFilterStore';
import { useCartStore } from '../../store/useCartStore';
import { PotencyMeter } from './PotencyMeter';
import { Badge } from './Badge';
import { Button } from './Button';
import { X, ShoppingBag, Check, ShieldCheck, Truck, Sparkles, Star } from 'lucide-react';

export const QuickViewModal: React.FC<{ onNavigateToProduct?: (slug: string) => void }> = ({
  onNavigateToProduct,
}) => {
  const quickViewProductId = useFilterStore((state) => state.quickViewProductId);
  const setQuickViewProductId = useFilterStore((state) => state.setQuickViewProductId);
  const addItem = useCartStore((state) => state.addItem);

  const product = PRODUCTS.find((p) => p.id === quickViewProductId);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const currentVariant = product.variants[selectedVariantIndex] || product.variants[0];

  const handleAddToCart = () => {
    addItem(product, currentVariant, quantity);
    setQuickViewProductId(null);
  };

  const handleFullDetails = () => {
    setQuickViewProductId(null);
    onNavigateToProduct?.(product.slug);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProductId(null)}
          className="fixed inset-0 bg-white/80 "
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-4xl bg-ak-warm/95 border border-ak-teal/20  shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProductId(null)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 text-wd-gray600 hover:text-wd-gray900 hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Product Image & Badges */}
          <div className="w-full md:w-1/2 bg-white/80 p-6 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-gray-200">
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <Badge variant="cyan" glow>
                {product.brand}
              </Badge>
              {product.potency.totalMg > 0 && (
                <Badge variant="purple">
                  {product.potency.totalMg}mg Infused
                </Badge>
              )}
            </div>

            <div className="w-full aspect-square max-w-[280px] sm:max-w-[340px] flex items-center justify-center py-4">
              <img
                src={product.images[0]}
                alt={product.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
              />
            </div>

            <button
              onClick={handleFullDetails}
              className="text-xs text-ak-teal hover:underline flex items-center gap-1 mt-2 font-medium"
            >
              <span>View Full Lab Specs & Reviews</span>
              <Sparkles className="w-3 h-3" />
            </button>
          </div>

          {/* Right: Variants, Potency & Quick Add */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto max-h-[80vh] space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center text-amber-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                  {product.rating} ({product.reviewCount} reviews)
                </div>
                <span className="text-wd-gray400">â€¢</span>
                <span className="text-xs text-emerald-400 font-semibold">18+ South Africa</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold font-bold text-wd-gray900">
                {product.name}
              </h2>
              <p className="text-sm text-wd-gray600 mt-1 line-clamp-2">
                {product.description}
              </p>
            </div>

            {/* Potency Mini Meter */}
            <PotencyMeter potency={product.potency} showTerpenes={false} />

            {/* Variant Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-wd-gray500 block">
                Select Pack Size / Option:
              </label>
              <div className="grid grid-cols-1 gap-2">
                {product.variants.map((v, idx) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantIndex(idx)}
                    className={`flex items-center justify-between p-3 border text-left transition-all ${
                      selectedVariantIndex === idx
                        ? 'border-ak-teal bg-ak-warm shadow-wd-card'
                        : 'border-gray-200 bg-white hover:border-ak-teal'
                    }`}
                    style={{ borderRadius: 2 }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 border flex items-center justify-center ${
                          selectedVariantIndex === idx
                            ? 'border-ak-teal bg-ak-teal text-white'
                            : 'border-gray-300'
                        }`}
                        style={{ borderRadius: 2 }}
                      >
                        {selectedVariantIndex === idx && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-sm font-semibold text-wd-gray900">{v.label}</span>
                    </div>
                    <span className="text-sm font-bold text-ak-teal">R{v.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Add Button */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center border border-gray-200  bg-ak-warm overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-wd-gray600 hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <span className="px-3 py-2 font-mono font-bold text-wd-gray900 text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-wd-gray600 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>

              <Button
                variant="cyan"
                fullWidth
                leftIcon={<ShoppingBag className="w-4 h-4" />}
                onClick={handleAddToCart}
              >
                Add R{currentVariant.price * quantity} to Cart
              </Button>
            </div>

            {/* Trust Points */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-wd-gray500 pt-2 border-t border-gray-200">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-ak-teal" />
                <span>Lab Certified Purity</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-accent-lime" />
                <span>Discreet Nationwide Delivery</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

