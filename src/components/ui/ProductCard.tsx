import React from 'react';
import { Product } from '../../types';
import { useCartStore } from '../../store/useCartStore';
import { useFilterStore } from '../../store/useFilterStore';
import { ShoppingBag, Eye, Star, Heart } from 'lucide-react';
import { clsx } from 'clsx';

interface ProductCardProps {
  product: Product;
  onSelectProduct?: (product: Product) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  className,
}) => {
  const addItem              = useCartStore((s) => s.addItem);
  const setQuickViewProductId = useFilterStore((s) => s.setQuickViewProductId);

  const discountPct = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAdd = (e: React.MouseEvent) => { e.stopPropagation(); addItem(product); };
  const handleQV  = (e: React.MouseEvent) => { e.stopPropagation(); setQuickViewProductId(product.id); };

  return (
    <div
      onClick={() => onSelectProduct?.(product)}
      className={clsx('wd-product-card group cursor-pointer', className)}
    >
      {/* ── IMAGE AREA ── */}
      <div className="relative aspect-square overflow-hidden bg-ak-warm">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges — top-left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discountPct > 0 && (
            <span className="px-2 py-0.5 bg-red-500 text-white text-[11px] font-bold" style={{ borderRadius: 2 }}>
              -{discountPct}%
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2 py-0.5 bg-ak-teal text-white text-[11px] font-bold" style={{ borderRadius: 2 }}>
              Best Seller
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2 py-0.5 bg-ak-gold text-wd-gray900 text-[11px] font-bold" style={{ borderRadius: 2 }}>
              New
            </span>
          )}
          {product.isSugarFree && (
            <span className="px-2 py-0.5 bg-white border border-gray-200 text-wd-gray700 text-[11px] font-medium" style={{ borderRadius: 2 }}>
              Sugar-Free
            </span>
          )}
        </div>

        {/* Wishlist — top-right */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-3 right-3 w-8 h-8 bg-white border border-gray-200 flex items-center justify-center text-wd-gray400 hover:text-red-500 hover:border-red-200 transition-colors opacity-0 group-hover:opacity-100"
          style={{ borderRadius: 2 }}
          aria-label="Add to wishlist"
        >
          <Heart className="w-4 h-4" />
        </button>

        {/* Hover action overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-0">
          {/* Quick View */}
          <button
            onClick={handleQV}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-ak-teal text-white text-xs font-semibold hover:bg-ak-teal-dark transition-colors"
            aria-label="Quick view"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
          {/* Add to Cart */}
          <button
            onClick={handleAdd}
            className="flex items-center justify-center w-11 bg-ak-gold text-wd-gray900 hover:bg-ak-gold-dark transition-colors border-l border-ak-gold-dark"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── PRODUCT INFO ── */}
      <div className="p-4">
        {/* Brand */}
        <p className="text-[10px] font-bold uppercase tracking-widest text-ak-teal mb-1">
          {product.brand}
        </p>

        {/* Name */}
        <h3 className="text-sm font-semibold text-wd-gray900 group-hover:text-ak-teal transition-colors line-clamp-2 leading-snug mb-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.round(product.rating) ? 'fill-ak-gold text-ak-gold' : 'text-gray-200'}`}
              />
            ))}
          </div>
          <span className="text-xs text-wd-gray400">({product.reviewCount})</span>
        </div>

        {/* Price row */}
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-wd-gray900">R{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-wd-gray400 line-through">R{product.originalPrice}</span>
          )}
        </div>

        {/* Potency tag */}
        {product.potency.totalMg > 0 && (
          <div className="mt-2">
            <span
              className="text-[10px] font-bold px-2 py-0.5 bg-ak-warm text-ak-teal border border-ak-teal/20"
              style={{ borderRadius: 2 }}
            >
              {product.potency.totalMg}mg THC · {product.strainType}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
