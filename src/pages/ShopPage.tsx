import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { Product, StrainType } from '../types';
import { ProductCard } from '../components/ui/ProductCard';
import { Button } from '../components/ui/Button';
import { useFilterStore, SortOption } from '../store/useFilterStore';
import {
  SlidersHorizontal,
  Grid,
  List,
  X,
  RotateCcw,
  Check,
  Search,
} from 'lucide-react';
import { clsx } from 'clsx';

interface ShopPageProps {
  onSelectProduct: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onSelectProduct }) => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedStrains,
    toggleStrain,
    potencyRange,
    setPotencyRange,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    sugarFreeOnly,
    setSugarFreeOnly,
    veganOnly,
    setVeganOnly,
    inStockOnly,
    setInStockOnly,
    viewMode,
    setViewMode,
    resetFilters,
  } = useFilterStore();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const strainOptions: StrainType[] = ['Indica', 'Sativa', 'Hybrid', 'Distillate', 'CBD'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedStrains.length > 0 && !selectedStrains.includes(p.strainType)) return false;
      if (p.potency.totalMg > 0) {
        if (p.potency.totalMg < potencyRange[0] || p.potency.totalMg > potencyRange[1]) return false;
      }
      if (sugarFreeOnly && !p.isSugarFree) return false;
      if (veganOnly && !p.isVegan) return false;
      if (inStockOnly && !p.inStock) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.flavorProfile.some((f) => f.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low')    return a.price - b.price;
      if (sortBy === 'price-high')   return b.price - a.price;
      if (sortBy === 'potency-high') return b.potency.totalMg - a.potency.totalMg;
      if (sortBy === 'rating')       return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, selectedStrains, potencyRange, sugarFreeOnly, veganOnly, inStockOnly, searchQuery, sortBy]);

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    selectedStrains.length +
    (potencyRange[0] > 0 || potencyRange[1] < 1000 ? 1 : 0) +
    (sugarFreeOnly ? 1 : 0) +
    (veganOnly ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  // ── FILTER SIDEBAR CONTENT ─────────────────────────────────────
  const FilterSidebarContent = (
    <div className="space-y-6 text-sm">

      {/* Header + Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
        <span className="font-bold text-sm text-wd-gray900 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-ak-teal" />
          Filter Products
        </span>
        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-xs text-ak-teal hover:text-ak-teal-dark flex items-center gap-1 font-semibold"
          >
            <RotateCcw className="w-3 h-3" />
            Reset ({activeFiltersCount})
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-wd-gray400 mb-2">Category</p>
        <button
          onClick={() => setSelectedCategory('all')}
          className={clsx(
            'w-full text-left px-3 py-2 flex items-center justify-between text-sm transition-colors',
            selectedCategory === 'all'
              ? 'bg-ak-warm text-ak-teal font-semibold border-l-2 border-ak-teal'
              : 'text-wd-gray700 hover:bg-gray-50 hover:text-ak-teal',
          )}
          style={{ borderRadius: 2 }}
        >
          <span>All Categories</span>
          <span className="text-xs text-wd-gray400">{PRODUCTS.length}</span>
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.slug)}
            className={clsx(
              'w-full text-left px-3 py-2 flex items-center justify-between text-sm transition-colors',
              selectedCategory === cat.slug
                ? 'bg-ak-warm text-ak-teal font-semibold border-l-2 border-ak-teal'
                : 'text-wd-gray700 hover:bg-gray-50 hover:text-ak-teal',
            )}
            style={{ borderRadius: 2 }}
          >
            <span>{cat.name}</span>
            <span className="text-xs text-wd-gray400">{cat.itemCount}</span>
          </button>
        ))}
      </div>

      {/* Strain type pills */}
      <div className="space-y-2 pt-2 border-t border-gray-100">
        <p className="text-[10px] font-bold uppercase tracking-widest text-wd-gray400 mb-2">Strain / Extract Type</p>
        <div className="flex flex-wrap gap-1.5">
          {strainOptions.map((strain) => {
            const on = selectedStrains.includes(strain);
            return (
              <button
                key={strain}
                onClick={() => toggleStrain(strain)}
                className={clsx(
                  'px-3 py-1 border text-xs font-medium flex items-center gap-1 transition-all',
                  on
                    ? 'bg-ak-teal border-ak-teal text-white'
                    : 'bg-white border-gray-200 text-wd-gray700 hover:border-ak-teal hover:text-ak-teal',
                )}
                style={{ borderRadius: 2 }}
              >
                {on && <Check className="w-3 h-3 stroke-[3]" />}
                {strain}
              </button>
            );
          })}
        </div>
      </div>

      {/* Potency Slider */}
      <div className="space-y-2 pt-2 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-widest text-wd-gray400">Potency (THC mg)</p>
          <span className="text-xs font-semibold text-ak-teal">{potencyRange[0]}–{potencyRange[1]}mg</span>
        </div>
        <input
          type="range"
          min="0"
          max="1000"
          step="50"
          value={potencyRange[1]}
          onChange={(e) => setPotencyRange([potencyRange[0], parseInt(e.target.value)])}
          className="w-full accent-ak-teal h-1.5"
          style={{ accentColor: '#275C53' }}
        />
        <div className="flex justify-between text-[10px] text-wd-gray400">
          <span>0mg</span><span>500mg</span><span>1000mg</span>
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-3 pt-2 border-t border-gray-100">
        <p className="text-[10px] font-bold uppercase tracking-widest text-wd-gray400">Preferences</p>
        {[
          { label: 'Sugar-Free Only', value: sugarFreeOnly, setter: setSugarFreeOnly },
          { label: 'Vegan Only',      value: veganOnly,     setter: setVeganOnly },
          { label: 'In Stock Only',   value: inStockOnly,   setter: setInStockOnly },
        ].map(({ label, value, setter }) => (
          <label key={label} className="flex items-center gap-2.5 cursor-pointer select-none text-sm text-wd-gray700">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => setter(e.target.checked)}
              className="w-4 h-4"
              style={{ accentColor: '#275C53' }}
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">

      {/* ── PAGE HERO BAR ───────────────────────────────── */}
      <div className="bg-ak-warm border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-ak-teal mb-1">AirKandy Catalog</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-wd-gray900">
              {selectedCategory === 'all'
                ? 'All Products'
                : CATEGORIES.find((c) => c.slug === selectedCategory)?.name ?? 'Shop'}
            </h1>
            <p className="text-sm text-wd-gray500 mt-0.5">
              {filteredProducts.length} products — nationwide delivery available
            </p>
          </div>
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-wd-gray400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full border border-gray-200 pl-9 pr-9 py-2.5 text-sm focus:outline-none focus:border-ak-teal transition-colors bg-white"
              style={{ borderRadius: 2 }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-wd-gray400 hover:text-ak-teal">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white border border-gray-200 p-6 sticky top-28" style={{ borderRadius: 2 }}>
            {FilterSidebarContent}
          </aside>

          {/* Main */}
          <main className="lg:col-span-9 space-y-5">

            {/* Controls bar */}
            <div className="flex items-center justify-between gap-3 py-3 border-b border-gray-200">
              {/* Mobile filter button */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 text-sm text-wd-gray700 hover:border-ak-teal hover:text-ak-teal transition-colors"
                style={{ borderRadius: 2 }}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </button>

              <div className="flex items-center gap-3 ml-auto">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="border border-gray-200 px-3 py-2 text-sm text-wd-gray700 focus:outline-none focus:border-ak-teal bg-white"
                  style={{ borderRadius: 2 }}
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="potency-high">Highest Potency</option>
                  <option value="rating">Customer Rating</option>
                </select>

                {/* View mode */}
                <div className="flex items-center border border-gray-200" style={{ borderRadius: 2 }}>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={clsx('p-2 transition-colors', viewMode === 'grid' ? 'bg-ak-teal text-white' : 'text-wd-gray400 hover:text-ak-teal')}
                    title="Grid View"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={clsx('p-2 transition-colors border-l border-gray-200', viewMode === 'list' ? 'bg-ak-teal text-white' : 'text-wd-gray400 hover:text-ak-teal')}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active filter tags */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-wd-gray500">Active filters:</span>
                {selectedCategory !== 'all' && (
                  <span className="flex items-center gap-1 px-2.5 py-1 bg-ak-warm border border-ak-teal/30 text-ak-teal font-medium" style={{ borderRadius: 2 }}>
                    {selectedCategory}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
                  </span>
                )}
                {selectedStrains.map((s) => (
                  <span key={s} className="flex items-center gap-1 px-2.5 py-1 bg-ak-warm border border-ak-teal/30 text-ak-teal font-medium" style={{ borderRadius: 2 }}>
                    {s}<X className="w-3 h-3 cursor-pointer" onClick={() => toggleStrain(s)} />
                  </span>
                ))}
                {sugarFreeOnly && (
                  <span className="flex items-center gap-1 px-2.5 py-1 bg-ak-warm border border-ak-teal/30 text-ak-teal font-medium" style={{ borderRadius: 2 }}>
                    Sugar-Free<X className="w-3 h-3 cursor-pointer" onClick={() => setSugarFreeOnly(false)} />
                  </span>
                )}
                {veganOnly && (
                  <span className="flex items-center gap-1 px-2.5 py-1 bg-ak-warm border border-ak-teal/30 text-ak-teal font-medium" style={{ borderRadius: 2 }}>
                    Vegan<X className="w-3 h-3 cursor-pointer" onClick={() => setVeganOnly(false)} />
                  </span>
                )}
                <button onClick={resetFilters} className="text-wd-gray500 hover:text-ak-teal underline ml-1">Clear all</button>
              </div>
            )}

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 border border-gray-200 space-y-4" style={{ borderRadius: 2 }}>
                <Search className="w-10 h-10 text-gray-300 mx-auto" />
                <h3 className="text-base font-bold text-wd-gray900">No products found</h3>
                <p className="text-sm text-wd-gray500">Try adjusting your filters or search term.</p>
                <Button variant="outline" size="sm" onClick={resetFilters}>Clear All Filters</Button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} onSelectProduct={onSelectProduct} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => onSelectProduct(p)}
                    className="flex items-center gap-4 p-4 bg-white border border-gray-200 hover:border-ak-teal hover:shadow-wd-card cursor-pointer group transition-all"
                    style={{ borderRadius: 2 }}
                  >
                    <div className="w-24 h-24 flex-shrink-0 bg-ak-warm overflow-hidden" style={{ borderRadius: 2 }}>
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain p-2" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-ak-teal mb-0.5">{p.brand}</p>
                      <h3 className="text-sm font-bold text-wd-gray900 group-hover:text-ak-teal transition-colors line-clamp-2">{p.name}</h3>
                      <p className="text-xs text-wd-gray500 mt-1 line-clamp-2">{p.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-base font-bold text-wd-gray900">R{p.price}</p>
                      {p.originalPrice && <p className="text-xs text-wd-gray400 line-through">R{p.originalPrice}</p>}
                      <Button variant="primary" size="sm" className="mt-2">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-[500] flex items-end bg-black/40 lg:hidden" onClick={() => setMobileFilterOpen(false)}>
          <div
            className="w-full bg-white p-6 max-h-[85vh] overflow-y-auto rounded-t-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-wd-gray900">Filter Products</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-wd-gray400">
                <X className="w-5 h-5" />
              </button>
            </div>
            {FilterSidebarContent}
            <div className="mt-6">
              <Button variant="primary" fullWidth size="lg" onClick={() => setMobileFilterOpen(false)}>
                Apply Filters ({filteredProducts.length} results)
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
