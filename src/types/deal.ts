export interface Deal {
  id: number;
  title: string;
  cleanTitle: string;
  price: string;
  numericPrice: number;
  originalPrice?: string;
  discountPercent?: number;
  dealStore?: string;
  image: string;
  buyUrl: string;
  sourceUrl: string;
  date: string;
  dateFormatted: string;
  excerpt: string;
  contentHtml: string;
  categories: { id: number; name: string; slug: string }[];
  tags: string[];
  isFeatured?: boolean;
  cachedAt?: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
  icon?: string;
}

export interface CacheMetadata {
  lastSync: number;
  totalDeals: number;
  estimatedSizeKb: number;
  version: string;
}

export type ActiveTab = 'feed' | 'webview' | 'categories' | 'saved' | 'offline' | 'readme' | 'settings';

export type SortOption = 'latest' | 'discount' | 'price-low' | 'price-high';
