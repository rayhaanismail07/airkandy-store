import { create } from 'zustand';
import { CartItem, Product, PackVariant } from '../types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  freeShippingThreshold: number; // R850
  toastMessage: string | null;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, variant?: PackVariant, quantity?: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTotalItems: () => number;
  getShippingCost: () => number;
  getFinalTotal: () => number;
  getFreeShippingProgress: () => { remaining: number; percentage: number; qualified: boolean };
}

const STORAGE_KEY = 'airkandy_cart_v1';

const getInitialItems = (): CartItem[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: getInitialItems(),
  isOpen: false,
  freeShippingThreshold: 850,
  toastMessage: null,

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  addItem: (product: Product, variant?: PackVariant, quantity = 1) => {
    const selectedVariant = variant || product.variants[0] || {
      id: 'default',
      label: 'Standard Pack',
      price: product.price,
      inStock: true,
      servingsCount: 1,
    };

    set((state) => {
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant.id === selectedVariant.id
      );

      let newItems: CartItem[];
      if (existingIndex > -1) {
        newItems = [...state.items];
        newItems[existingIndex].quantity += quantity;
      } else {
        newItems = [...state.items, { product, selectedVariant, quantity }];
      }

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
      } catch (e) {
        console.error('Failed to save cart', e);
      }

      return {
        items: newItems,
        isOpen: true,
        toastMessage: `Added ${product.name} to sweet cart!`,
      };
    });

    setTimeout(() => {
      set({ toastMessage: null });
    }, 3500);
  },

  removeItem: (productId: string, variantId: string) => {
    set((state) => {
      const newItems = state.items.filter(
        (item) => !(item.product.id === productId && item.selectedVariant.id === variantId)
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
      return { items: newItems };
    });
  },

  updateQuantity: (productId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(productId, variantId);
      return;
    }

    set((state) => {
      const newItems = state.items.map((item) => {
        if (item.product.id === productId && item.selectedVariant.id === variantId) {
          return { ...item, quantity };
        }
        return item;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
      return { items: newItems };
    });
  },

  clearCart: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ items: [] });
  },

  getSubtotal: () => {
    return get().items.reduce((sum, item) => sum + item.selectedVariant.price * item.quantity, 0);
  },

  getTotalItems: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },

  getShippingCost: () => {
    const subtotal = get().getSubtotal();
    if (subtotal === 0) return 0;
    return subtotal >= get().freeShippingThreshold ? 0 : 120; // R120 flat express delivery
  },

  getFinalTotal: () => {
    return get().getSubtotal() + get().getShippingCost();
  },

  getFreeShippingProgress: () => {
    const subtotal = get().getSubtotal();
    const threshold = get().freeShippingThreshold;
    const remaining = Math.max(0, threshold - subtotal);
    const percentage = Math.min(100, Math.round((subtotal / threshold) * 100));
    return {
      remaining,
      percentage,
      qualified: subtotal >= threshold,
    };
  },
}));
