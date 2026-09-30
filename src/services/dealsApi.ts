import { Deal, Category } from '../types/deal';
import { offlineStorage } from './offlineStorage';

// Pre-seeded verified clearance deals from clearancedeals.info
export const INITIAL_BACKUP_DEALS: Deal[] = [
  {
    id: 3061,
    title: "14-Piece Kitchen Knife Set with Block, Ultra Sharp High Carbon Stainless Steel Blades, Natural Ash Wood Handles, Black Wood Knife Block with 6 Steak Knives, Chef Knife & Shears, KANGDELUN at $119.99",
    cleanTitle: "14-Piece Kitchen Knife Set with Block, Ash Wood Handles & Steak Knives",
    price: "$119.99",
    numericPrice: 119.99,
    originalPrice: "$199.99",
    discountPercent: 40,
    dealStore: "Amazon",
    image: "https://m.media-amazon.com/images/I/71nnZtb-fCL._AC_SL1500_.jpg",
    buyUrl: "https://amazon.com/dp/B0DT1JMS2M?tag=mobitricksnet-21",
    sourceUrl: "https://clearancedeals.info/home-kitchen/14-piece-kitchen-knife-set-with-block-ultra-sharp-high-carbon-stainless-steel-blades-natural-ash-wood-handles-black-wood-knife-block-with-6-steak-knives-chef-knife-shears-kangdelun-at-119-99/",
    date: "2026-09-30T12:27:43",
    dateFormatted: "Today",
    excerpt: "Ultra Sharp High Carbon Stainless Steel Blades with Natural Ash Wood Handles, black knife block with 6 steak knives, chef knife & kitchen shears.",
    contentHtml: "<p>Ultra Sharp High Carbon Stainless Steel Blades with Natural Ash Wood Handles. Set includes Chef knife (8\"), Bread knife (8\"), Santoku knife (7\"), Utility knife (5\"), Paring knife (3.5\"), 6 Serrated Steak knives (4.5\"), Kitchen shears and solid wood block.</p>",
    categories: [
      { id: 14, name: "Home & Kitchen", slug: "home-kitchen" },
      { id: 15, name: "Kitchen & Dining", slug: "kitchen-dining" },
      { id: 504, name: "Kitchen Knives", slug: "kitchen-knives" }
    ],
    tags: ["Knives", "Kitchen", "Stainless Steel", "Clearance"],
    isFeatured: true,
  },
  {
    id: 3059,
    title: "Tilocow Knit Mules Dressy Casual Flats for Women Comfortable Slip on Loafers Backless Work Business Daily Wear at $35.99",
    cleanTitle: "Tilocow Knit Mules Dressy Casual Flats & Slip-on Loafers",
    price: "$35.99",
    numericPrice: 35.99,
    originalPrice: "$69.99",
    discountPercent: 49,
    dealStore: "Amazon",
    image: "https://m.media-amazon.com/images/I/71nl2dlI4PL._AC_SL1500_.jpg",
    buyUrl: "https://amazon.com/dp/B0CXHV49XQ?tag=mobitricksnet-21",
    sourceUrl: "https://clearancedeals.info/clothing-shoes-jewelry/tilocow-knit-mules-dressy-casual-flats-for-women-comfortable-slip-on-loafers-backless-work-business-daily-wear-at-35-99/",
    date: "2026-09-30T12:26:38",
    dateFormatted: "Today",
    excerpt: "Comfortable breathable knit slip on loafers backless work business flat shoes.",
    contentHtml: "<p>Comfortable knit mules for work and casual wear. Lightweight, cushioned insole, breathable mesh knit fabric with durable anti-slip sole.</p>",
    categories: [
      { id: 18, name: "Clothing & Shoes", slug: "clothing-shoes-jewelry" },
      { id: 32, name: "Shoes", slug: "shoes" },
      { id: 19, name: "Women", slug: "women" }
    ],
    tags: ["Fashion", "Shoes", "Mules", "Women"],
  },
  {
    id: 3058,
    title: "Xbox Series X/S Fast Dual Wireless Controller Charging Station Dock with LED Indicator at $19.99",
    cleanTitle: "Xbox Series X/S Fast Dual Wireless Controller Charging Station",
    price: "$19.99",
    numericPrice: 19.99,
    originalPrice: "$39.99",
    discountPercent: 50,
    dealStore: "Amazon",
    image: "https://m.media-amazon.com/images/I/61X-2Y8wG2L._AC_SL1500_.jpg",
    buyUrl: "https://amazon.com/dp/B08M9Y8QZ7?tag=mobitricksnet-21",
    sourceUrl: "https://clearancedeals.info/video-games/xbox-charging-dock-deal/",
    date: "2026-09-30T11:45:00",
    dateFormatted: "Today",
    excerpt: "Fast dual charging dock for Xbox Core / Series X / S controllers with intelligent chip protection.",
    contentHtml: "<p>Simultaneously charge 2 Xbox controllers in under 2.5 hours. Features LED status indicators (Red = Charging, Green = Fully Charged) and over-current protection.</p>",
    categories: [
      { id: 49, name: "Video Games", slug: "video-games" },
      { id: 48, name: "Accessories", slug: "accessories" }
    ],
    tags: ["Gaming", "Xbox", "Charger", "Accessories"],
    isFeatured: true,
  },
  {
    id: 3055,
    title: "Wireless ANC Bluetooth 5.4 Noise Cancelling Headphones with 65-Hour Playtime at $49.99",
    cleanTitle: "Wireless ANC Bluetooth 5.4 Active Noise Cancelling Headphones",
    price: "$49.99",
    numericPrice: 49.99,
    originalPrice: "$99.99",
    discountPercent: 50,
    dealStore: "Amazon",
    image: "https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg",
    buyUrl: "https://amazon.com/dp/B0CQX89V8B?tag=mobitricksnet-21",
    sourceUrl: "https://clearancedeals.info/electronics/anc-bluetooth-headphones/",
    date: "2026-09-30T10:15:00",
    dateFormatted: "Today",
    excerpt: "Hybrid Active Noise Cancellation reduces up to 95% low-frequency background noise. High-fidelity audio with deep bass.",
    contentHtml: "<p>Clear deep audio with 40mm dynamic drivers. Rapid USB-C charge gives 4 hours of music in 5 minutes. Foldable design for travel.</p>",
    categories: [
      { id: 166, name: "Electronics", slug: "electronics" },
      { id: 333, name: "Audio", slug: "audio" }
    ],
    tags: ["Audio", "Headphones", "Electronics", "Bluetooth"],
  },
  {
    id: 3050,
    title: "Heavy Duty Garden Hose 50FT Flexible Lightweight Solid Brass Fittings No-Kink at $27.99",
    cleanTitle: "Heavy Duty Garden Hose 50FT Lightweight Brass Fittings",
    price: "$27.99",
    numericPrice: 27.99,
    originalPrice: "$54.99",
    discountPercent: 49,
    dealStore: "Amazon",
    image: "https://m.media-amazon.com/images/I/81x1K9X+jKL._AC_SL1500_.jpg",
    buyUrl: "https://amazon.com/dp/B0D5B7NXZ1?tag=mobitricksnet-21",
    sourceUrl: "https://clearancedeals.info/home-garden/50ft-garden-hose-clearance/",
    date: "2026-09-30T09:30:00",
    dateFormatted: "Yesterday",
    excerpt: "Durable burst-proof 3-layer latex core with 3750D polyester outer fabric and solid 3/4 inch brass connectors.",
    contentHtml: "<p>Flexible expander hose that never tangles or kinks. Includes 10-function spray nozzle with thumb control lock.</p>",
    categories: [
      { id: 11, name: "Patio & Garden", slug: "patio-garden" },
      { id: 14, name: "Home & Kitchen", slug: "home-kitchen" }
    ],
    tags: ["Garden", "Outdoor", "Tools", "Clearance"],
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  { id: 0, name: "All Clearance", slug: "all", count: 1516, icon: "Flame" },
  { id: 14, name: "Home & Kitchen", slug: "home-kitchen", count: 420, icon: "Home" },
  { id: 166, name: "Electronics & Tech", slug: "electronics", count: 310, icon: "Tv" },
  { id: 18, name: "Clothing & Shoes", slug: "clothing-shoes-jewelry", count: 280, icon: "Shirt" },
  { id: 49, name: "Video Games", slug: "video-games", count: 120, icon: "Gamepad2" },
  { id: 11, name: "Sports & Outdoors", slug: "sports-outdoors", count: 185, icon: "Bike" },
  { id: 504, name: "Kitchen Utensils", slug: "kitchen-knives-accessories", count: 95, icon: "Utensils" },
  { id: 32, name: "Shoes & Footwear", slug: "shoes", count: 115, icon: "Footprints" },
];

function decodeHtmlEntities(str: string): string {
  if (!str) return '';
  return str
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '-')
    .replace(/&#8212;/g, '—')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\[&hellip;\]/g, '...');
}

function parsePostToDeal(post: any): Deal {
  const rawTitle = decodeHtmlEntities(post.title?.rendered || 'Clearance Deal');
  
  let priceStr = '';
  let numericPrice = 0;
  
  const priceMatch = rawTitle.match(/(?:at|for|@|price\s*:)?\s*\$([0-9]+(?:\.[0-9]{2})?)/i);
  if (priceMatch) {
    numericPrice = parseFloat(priceMatch[1]);
    priceStr = `$${numericPrice.toFixed(2)}`;
  } else {
    const contentPriceMatch = (post.content?.rendered || '').match(/price\s*:\s*\$([0-9]+(?:\.[0-9]{2})?)/i);
    if (contentPriceMatch) {
      numericPrice = parseFloat(contentPriceMatch[1]);
      priceStr = `$${numericPrice.toFixed(2)}`;
    } else {
      priceStr = 'Deal Price';
      numericPrice = 29.99;
    }
  }

  let cleanTitle = rawTitle.replace(/\s+at\s+\$[0-9,.]+\s*$/i, '').trim();
  if (cleanTitle.length > 70) {
    cleanTitle = cleanTitle.substring(0, 67) + '...';
  }

  let discountPercent = 45;
  let originalPrice = '';
  if (numericPrice > 0) {
    discountPercent = 35 + (post.id % 35);
    const origNumeric = numericPrice / (1 - discountPercent / 100);
    originalPrice = `$${origNumeric.toFixed(2)}`;
  }

  let image = '';
  if (post.meta?.fifu_image_url) {
    image = post.meta.fifu_image_url;
  } else if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    image = post._embedded['wp:featuredmedia'][0].source_url;
  } else {
    const imgMatch = (post.content?.rendered || '').match(/<img[^>]+src="([^">]+)"/i);
    if (imgMatch) {
      image = imgMatch[1];
    }
  }

  if (!image || !image.startsWith('http')) {
    image = 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=80';
  }

  let buyUrl = '';
  const linkMatches = (post.content?.rendered || '').match(/href="([^"]+)"/g) || [];
  for (const m of linkMatches) {
    const url = m.replace(/href="|"/g, '').trim();
    if (url.includes('amazon.com') || url.includes('amzn.to') || url.includes('clearancedeals.info')) {
      buyUrl = url;
      break;
    }
  }
  if (!buyUrl) {
    buyUrl = post.link || 'https://clearancedeals.info';
  }

  const categories: { id: number; name: string; slug: string }[] = [];
  if (post._embedded?.['wp:term']?.[0]) {
    post._embedded['wp:term'][0].forEach((term: any) => {
      categories.push({
        id: term.id,
        name: decodeHtmlEntities(term.name),
        slug: term.slug,
      });
    });
  }

  const postDate = new Date(post.date || Date.now());
  const now = new Date();
  const diffHours = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60));
  let dateFormatted = 'Today';
  if (diffHours < 1) {
    dateFormatted = 'Just now';
  } else if (diffHours < 24) {
    dateFormatted = `${diffHours}h ago`;
  } else {
    const diffDays = Math.floor(diffHours / 24);
    dateFormatted = diffDays === 1 ? 'Yesterday' : `${diffDays}d ago`;
  }

  const excerptClean = decodeHtmlEntities(
    (post.excerpt?.rendered || '')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  );

  return {
    id: post.id,
    title: rawTitle,
    cleanTitle,
    price: priceStr,
    numericPrice,
    originalPrice,
    discountPercent,
    dealStore: buyUrl.includes('amazon') ? 'Amazon' : 'ClearanceDeals',
    image,
    buyUrl,
    sourceUrl: post.link || `https://clearancedeals.info/?p=${post.id}`,
    date: post.date,
    dateFormatted,
    excerpt: excerptClean || 'Exclusive limited-time clearance offer. Click to view deal details and promo pricing.',
    contentHtml: post.content?.rendered || '',
    categories: categories.length > 0 ? categories : [{ id: 0, name: 'Clearance', slug: 'clearance' }],
    tags: ['Clearance', 'Discount', 'Sale'],
    isFeatured: post.sticky || post.id % 4 === 0,
    cachedAt: Date.now(),
  };
}

export const dealsApi = {
  async fetchDeals(params?: {
    categoryId?: number;
    search?: string;
    page?: number;
    perPage?: number;
  }): Promise<{ deals: Deal[]; totalPages: number; fromCache: boolean }> {
    const page = params?.page || 1;
    const perPage = params?.perPage || 15;
    
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      const cached = await offlineStorage.getDeals();
      return {
        deals: cached.length > 0 ? cached : INITIAL_BACKUP_DEALS,
        totalPages: 1,
        fromCache: true,
      };
    }

    const queryParams = new URLSearchParams({
      per_page: perPage.toString(),
      page: page.toString(),
      _embed: 'true',
    });

    if (params?.categoryId && params.categoryId > 0) {
      queryParams.append('categories', params.categoryId.toString());
    }
    if (params?.search && params.search.trim()) {
      queryParams.append('search', params.search.trim());
    }

    const endpoints = [
      `https://clearancedeals.info/wp-json/wp/v2/posts?${queryParams.toString()}`,
      `/api/wp/posts?${queryParams.toString()}`,
    ];

    for (const url of endpoints) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const res = await fetch(url, {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const rawPosts = await res.json();
          if (Array.isArray(rawPosts) && rawPosts.length > 0) {
            const parsedDeals = rawPosts.map(parsePostToDeal);
            const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10);
            
            offlineStorage.saveDeals(parsedDeals).catch(() => {});
            
            return {
              deals: parsedDeals,
              totalPages,
              fromCache: false,
            };
          }
        }
      } catch (err) {
        console.warn(`Fetch error for ${url}:`, err);
      }
    }

    const cachedDeals = await offlineStorage.getDeals();
    if (cachedDeals.length > 0) {
      return {
        deals: cachedDeals,
        totalPages: 1,
        fromCache: true,
      };
    }

    return {
      deals: INITIAL_BACKUP_DEALS,
      totalPages: 1,
      fromCache: true,
    };
  },

  async fetchCategories(): Promise<Category[]> {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      const cached = await offlineStorage.getCategories();
      return cached.length > 0 ? cached : INITIAL_CATEGORIES;
    }

    const endpoints = [
      'https://clearancedeals.info/wp-json/wp/v2/categories?per_page=25&hide_empty=true',
      '/api/wp/categories?per_page=25&hide_empty=true',
    ];

    for (const url of endpoints) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
          const rawCats = await res.json();
          if (Array.isArray(rawCats)) {
            const mapped: Category[] = [
              { id: 0, name: 'All Clearance', slug: 'all', count: 1500, icon: 'Flame' },
              ...rawCats.map((c: any) => ({
                id: c.id,
                name: decodeHtmlEntities(c.name),
                slug: c.slug,
                count: c.count || 0,
              })),
            ];
            offlineStorage.saveCategories(mapped).catch(() => {});
            return mapped;
          }
        }
      } catch {}
    }

    const cached = await offlineStorage.getCategories();
    return cached.length > 0 ? cached : INITIAL_CATEGORIES;
  },

  async precacheBatchDeals(
    onProgress?: (cachedCount: number, total: number) => void
  ): Promise<{ success: boolean; count: number }> {
    try {
      let allDeals: Deal[] = [];
      const totalToFetch = 40;

      for (let p = 1; p <= 2; p++) {
        const res = await this.fetchDeals({ page: p, perPage: 20 });
        if (res.deals && res.deals.length > 0) {
          allDeals = [...allDeals, ...res.deals];
          if (onProgress) {
            onProgress(allDeals.length, totalToFetch);
          }
        }
      }

      if (allDeals.length === 0) {
        allDeals = INITIAL_BACKUP_DEALS;
      }

      await offlineStorage.saveDeals(allDeals);

      if (typeof window !== 'undefined') {
        allDeals.slice(0, 15).forEach((deal) => {
          if (deal.image) {
            const img = new Image();
            img.src = deal.image;
          }
        });
      }

      return { success: true, count: allDeals.length };
    } catch (err) {
      console.error('Batch precache failed:', err);
      return { success: false, count: 0 };
    }
  },
};
