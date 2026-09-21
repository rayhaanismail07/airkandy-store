export type StrainType = 'Indica' | 'Sativa' | 'Hybrid' | 'Distillate' | 'CBD';

export interface TerpeneProfile {
  myrcene: number; // percentage / ratio 0-100
  limonene: number;
  caryophyllene: number;
  pinene: number;
  linalool: number;
}

export interface PackVariant {
  id: string;
  label: string; // e.g. "1 Pack (10 Pieces)", "3 Pack Bundle", "500g Jar"
  price: number; // in ZAR (R)
  originalPrice?: number;
  inStock: boolean;
  servingsCount: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: 'Lifted Snacks' | 'AirKandy Signature' | 'High Sweety' | 'Botanical Labs' | 'Grow Pro';
  tagline: string;
  category: 'edibles' | 'herbs' | 'extraction' | 'smoking-gear' | 'grow-tech';
  categoryLabel: string;
  price: number; // Base price in ZAR
  originalPrice?: number;
  potency: {
    totalMg: number;
    perServingMg: number;
    thcMg: number;
    cbdMg: number;
    strengthLevel: 'Mild' | 'Moderate' | 'Potent' | 'Ultra Strong';
  };
  strainType: StrainType;
  rating: number;
  reviewCount: number;
  isSugarFree?: boolean;
  isVegan?: boolean;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
  stockCount: number;
  images: string[];
  description: string;
  flavorProfile: string[];
  effects: string[];
  terpenes: TerpeneProfile;
  variants: PackVariant[];
  labTested: boolean;
  batchNumber: string;
  consumptionAdvice: string;
  deliveryInfo: string;
}

export interface CartItem {
  product: Product;
  selectedVariant: PackVariant;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: 'edibles' | 'herbs' | 'extraction' | 'smoking-gear' | 'grow-tech';
  description: string;
  iconName: string;
  image: string;
  badge: string;
  itemCount: number;
  gradient: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  verifiedBuyer: boolean;
  rating: number;
  date: string;
  title: string;
  comment: string;
  productName: string;
  potencyExperience: string;
}

export interface GrowStage {
  id: string;
  step: number;
  name: string;
  durationWeeks: string;
  summary: string;
  lightSchedule: string;
  temperature: string;
  humidity: string;
  nutrients: string;
  proTip: string;
  recommendedGear: string[];
}
