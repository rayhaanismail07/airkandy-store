import { create } from 'zustand';
import { StrainType } from '../types';

export type SortOption = 'featured' | 'price-low' | 'price-high' | 'potency-high' | 'rating';

interface FilterStore {
  selectedCategory: string; // 'all' or category slug
  selectedStrains: StrainType[];
  potencyRange: [number, number]; // min, max in mg
  priceRange: [number, number]; // min, max in ZAR
  sortBy: SortOption;
  searchQuery: string;
  sugarFreeOnly: boolean;
  veganOnly: boolean;
  inStockOnly: boolean;
  viewMode: 'grid' | 'list';
  quickViewProductId: string | null;

  setSelectedCategory: (category: string) => void;
  toggleStrain: (strain: StrainType) => void;
  setPotencyRange: (range: [number, number]) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sort: SortOption) => void;
  setSearchQuery: (query: string) => void;
  setSugarFreeOnly: (value: boolean) => void;
  setVeganOnly: (value: boolean) => void;
  setInStockOnly: (value: boolean) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setQuickViewProductId: (id: string | null) => void;
  resetFilters: () => void;
}

const DEFAULT_POTENCY: [number, number] = [0, 1000];
const DEFAULT_PRICE: [number, number] = [0, 10000];

export const useFilterStore = create<FilterStore>((set) => ({
  selectedCategory: 'all',
  selectedStrains: [],
  potencyRange: DEFAULT_POTENCY,
  priceRange: DEFAULT_PRICE,
  sortBy: 'featured',
  searchQuery: '',
  sugarFreeOnly: false,
  veganOnly: false,
  inStockOnly: false,
  viewMode: 'grid',
  quickViewProductId: null,

  setSelectedCategory: (category) => set({ selectedCategory: category }),
  toggleStrain: (strain) =>
    set((state) => ({
      selectedStrains: state.selectedStrains.includes(strain)
        ? state.selectedStrains.filter((s) => s !== strain)
        : [...state.selectedStrains, strain],
    })),
  setPotencyRange: (range) => set({ potencyRange: range }),
  setPriceRange: (range) => set({ priceRange: range }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSugarFreeOnly: (sugarFreeOnly) => set({ sugarFreeOnly }),
  setVeganOnly: (veganOnly) => set({ veganOnly }),
  setInStockOnly: (inStockOnly) => set({ inStockOnly }),
  setViewMode: (viewMode) => set({ viewMode }),
  setQuickViewProductId: (quickViewProductId) => set({ quickViewProductId }),
  resetFilters: () =>
    set({
      selectedCategory: 'all',
      selectedStrains: [],
      potencyRange: DEFAULT_POTENCY,
      priceRange: DEFAULT_PRICE,
      sortBy: 'featured',
      searchQuery: '',
      sugarFreeOnly: false,
      veganOnly: false,
      inStockOnly: false,
    }),
}));
