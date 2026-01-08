export interface ProductSpecs {
  frame?: string;
  fork?: string;
  shock?: string;
  gear?: string;
  brake?: string;
  tire?: string;
  engine?: string;
  battery?: string;
  material?: string;
  weight?: string;
  fit?: string;
  [key: string]: string | undefined;
}

export interface Product {
  id: string;
  slug: string;
  brand: 'Orbea' | 'Santa Cruz' | 'Giant' | 'Merch' | '2GETHER';
  category: 'Планински' | 'Шосейни' | 'Електрически' | 'Детски' | 'Градски' | 'Екипировка' | 'Merchandise';
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  sizes: string[];
  description: string;
  specs: ProductSpecs;
  inStock: boolean;
  isSale?: boolean;
}

export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}

export interface LegalContent {
  title: string;
  content: string[];
}

export interface PricingTier {
  duration: string;
  price: number;
}

export interface TourPackage {
  id: string;
  name: string;
  description: string;
  prices: PricingTier[];
  suitability: string;
  image: string;
}