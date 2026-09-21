import React, { useState } from 'react';
import { Product, PackVariant } from '../types';
import { PRODUCTS } from '../data/products';
import { useCartStore } from '../store/useCartStore';
import { PotencyMeter } from '../components/ui/PotencyMeter';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/ui/ProductCard';
import {
  ShoppingBag,
  Star,
  Check,
  Truck,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Share2,
  Heart,
  Zap,
  ArrowLeft,
  Package,
} from 'lucide-react';
import { clsx } from 'clsx';

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (page: string, params?: { slug?: string; category?: string }) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug,
  onNavigate,
  onSelectProduct,
}) => {
  const addItem = useCartStore((state) => state.addItem);

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  // Accordions open/close state
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    flavors: true,
    lab: false,
    dosage: true,
    delivery: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const currentVariant: PackVariant =
    product.variants[selectedVariantIndex] || product.variants[0];

  const handleAddToCart = () => {
    addItem(product, currentVariant, quantity);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Frequently bought together items
  const frequentlyBoughtTogether = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Breadcrumbs / Back navigation */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <button
          onClick={() => onNavigate('shop')}
          className="inline-flex items-center gap-1.5 hover:text-ak-teal transition-colors font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sweet Catalog</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-ak-teal400 text-slate-300 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Main Product Stage: 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Media Gallery */}
        <div className="lg:col-span-6 space-y-4 sticky top-28">
          {/* Main Large Image Box with Ambient Backlight Glow */}
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white border border-gray-200 border border-ak-teal500/25 bg-slate-950/80 p-6 flex items-center justify-center shadow-2xl">
            <div className="absolute inset-0 bg-radial-gradient from-cyan-500/15 via-transparent to-transparent opacity-70" />

            {/* Badges in Image */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              <Badge variant="cyan" glow>
                {product.brand}
              </Badge>
              {product.potency.totalMg > 0 && (
                <Badge variant="purple">
                  <Zap className="w-3 h-3 mr-0.5" />
                  {product.potency.totalMg}mg Infused
                </Badge>
              )}
            </div>

            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="max-h-full max-w-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] transition-all duration-300"
            />
          </div>

          {/* Thumbnails Row */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={clsx(
                    'w-20 h-20 rounded-2xl p-2 bg-slate-950/80 border overflow-hidden transition-all flex-shrink-0 cursor-pointer',
                    selectedImageIndex === idx
                      ? 'border-ak-teal400 shadow-wd-hover/30 scale-105'
                      : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-700'
                  )}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}

          {/* Quick Trust Highlights */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>HPLC Lab Tested (18+)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Truck className="w-4 h-4 text-ak-teal flex-shrink-0" />
              <span>Discreet Overnight SA Post</span>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Potency Gauge, Variants & Buy Action */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header Info */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
              <span className="text-ak-400 uppercase tracking-widest">{product.categoryLabel}</span>
              <span>â€¢</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono">
                {product.strainType}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-display font-black text-wd-gray900 leading-tight">
              {product.name}
            </h1>
            <p className="text-sm font-medium text-ak-teal mt-1">
              {product.tagline}
            </p>

            {/* Rating Stars */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-200">{product.rating}</span>
              <span className="text-xs text-slate-400">({product.reviewCount} verified reviews)</span>
            </div>
          </div>

          {/* Price Header */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-ak-teal500/20 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block font-medium">Selected Variant Price:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-display font-black text-wd-gray900">
                  R{currentVariant.price * quantity}
                </span>
                {currentVariant.originalPrice && (
                  <span className="text-sm text-slate-500 line-through">
                    R{currentVariant.originalPrice * quantity}
                  </span>
                )}
              </div>
            </div>

            <Badge variant="lime" size="md">
              <Package className="w-3.5 h-3.5 mr-1" />
              In Stock & Ready
            </Badge>
          </div>

          {/* Potency & Terpene Gauge */}
          <PotencyMeter potency={product.potency} terpenes={product.terpenes} />

          {/* Pack Size Variants Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Choose Pack / Size Option:
            </label>
            <div className="grid grid-cols-1 gap-2.5">
              {product.variants.map((variant, idx) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariantIndex(idx)}
                  className={clsx(
                    'p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer',
                    selectedVariantIndex === idx
                      ? 'border-ak-teal400 bg-ak-warm/40 shadow-wd-hover/20'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={clsx(
                        'w-4 h-4 rounded-full border flex items-center justify-center',
                        selectedVariantIndex === idx
                          ? 'border-ak-teal400 bg-ak-teal text-slate-950'
                          : 'border-slate-600'
                      )}
                    >
                      {selectedVariantIndex === idx && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-wd-gray900 block">{variant.label}</span>
                      <span className="text-[11px] text-slate-400">
                        {variant.servingsCount} active servings
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black font-display text-ak-teal">
                      R{variant.price}
                    </span>
                    {variant.originalPrice && (
                      <span className="text-[11px] text-slate-500 line-through block">
                        R{variant.originalPrice}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Buy Action Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-slate-700 rounded-2xl bg-slate-950/80 overflow-hidden w-full sm:w-auto justify-between sm:justify-start">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-3 text-slate-300 hover:bg-slate-800 font-bold transition-colors cursor-pointer"
              >
                -
              </button>
              <span className="px-4 py-3 font-mono font-bold text-wd-gray900 text-base">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-3 text-slate-300 hover:bg-slate-800 font-bold transition-colors cursor-pointer"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <Button
              variant="cyan"
              size="lg"
              fullWidth
              onClick={handleAddToCart}
              leftIcon={<ShoppingBag className="w-5 h-5 stroke-[2.5]" />}
            >
              Add R{currentVariant.price * quantity} to Cart
            </Button>
          </div>

          {/* Interactive Information Accordions */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            {/* Accordion 1: Flavor Profile & Aroma */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden">
              <button
                onClick={() => toggleAccordion('flavors')}
                className="w-full p-4 flex items-center justify-between text-left text-sm font-bold text-wd-gray900 hover:bg-slate-800/40 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span>ðŸ¬</span>
                  <span>Flavor Profile & Sensory Notes</span>
                </span>
                {openAccordions.flavors ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordions.flavors && (
                <div className="p-4 pt-0 text-xs text-slate-300 space-y-3">
                  <p>{product.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.flavorProfile.map((f) => (
                      <span
                        key={f}
                        className="px-2.5 py-1 rounded-lg bg-pink-500/10 text-pink-300 border border-pink-500/20 font-semibold"
                      >
                        ðŸ­ {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 2: Lab Results & Potency */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden">
              <button
                onClick={() => toggleAccordion('lab')}
                className="w-full p-4 flex items-center justify-between text-left text-sm font-bold text-wd-gray900 hover:bg-slate-800/40 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span>ðŸ”¬</span>
                  <span>HPLC Lab Results & Batch Certificate</span>
                </span>
                {openAccordions.lab ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordions.lab && (
                <div className="p-4 pt-0 text-xs text-slate-300 space-y-2">
                  <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px]">
                    <div>Batch: <strong className="text-ak-400">{product.batchNumber}</strong></div>
                    <div>Solvent Residuals: <strong className="text-emerald-400">Pass (0 PPM)</strong></div>
                    <div>Pesticides: <strong className="text-emerald-400">Non-Detected</strong></div>
                    <div>Heavy Metals: <strong className="text-emerald-400">Pass</strong></div>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    All AirKandy inventory undergoes strict independent chromatography testing.
                  </p>
                </div>
              )}
            </div>

            {/* Accordion 3: Safe Consumption & Dosage Advice */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden">
              <button
                onClick={() => toggleAccordion('dosage')}
                className="w-full p-4 flex items-center justify-between text-left text-sm font-bold text-wd-gray900 hover:bg-slate-800/40 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span>ðŸ’¡</span>
                  <span>Consumption & Microdosing Advice</span>
                </span>
                {openAccordions.dosage ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordions.dosage && (
                <div className="p-4 pt-0 text-xs text-slate-300 space-y-2">
                  <p>{product.consumptionAdvice}</p>
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px]">
                    âš ï¸ Edible onset takes 45-90 minutes. Never consume more while waiting for initial onset.
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 4: Discreet Delivery Info */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden">
              <button
                onClick={() => toggleAccordion('delivery')}
                className="w-full p-4 flex items-center justify-between text-left text-sm font-bold text-wd-gray900 hover:bg-slate-800/40 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span>ðŸ“¦</span>
                  <span>Discreet Courier & Shipping Info</span>
                </span>
                {openAccordions.delivery ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordions.delivery && (
                <div className="p-4 pt-0 text-xs text-slate-300 space-y-2">
                  <p>{product.deliveryInfo}</p>
                  <p className="text-[11px] text-slate-400">
                    Dispatched in tamper-proof, odor-proof, unbranded packaging directly to your doorstep.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Picked Together Bundle */}
      <section className="pt-8 border-t border-slate-800/80 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold text-ak-teal tracking-wider block">
              Bundle & Save
            </span>
            <h2 className="text-2xl font-display font-black text-wd-gray900">
              Frequently Picked Together
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {frequentlyBoughtTogether.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

