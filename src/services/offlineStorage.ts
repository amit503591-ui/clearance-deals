import { Deal, Category, CacheMetadata } from '../types/deal';

const DB_NAME = 'ClearanceDealsAppDB';
const DB_VERSION = 1;

let dbPromise: Promise<IDBDatabase> | null = null;

function getDB(): Promise<IDBDatabase> {
  if (typeof window === 'undefined' || !('indexedDB' in window)) {
    return Promise.reject(new Error('IndexedDB not supported'));
  }

  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('deals')) {
          db.createObjectStore('deals', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('bookmarks')) {
          db.createObjectStore('bookmarks', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('categories')) {
          db.createObjectStore('categories', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('meta')) {
          db.createObjectStore('meta', { keyPath: 'key' });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  return dbPromise;
}

const LOCAL_STORAGE_KEYS = {
  DEALS: 'cd_offline_deals',
  BOOKMARKS: 'cd_offline_bookmarks',
  CATEGORIES: 'cd_offline_categories',
  META: 'cd_offline_meta',
};

export const offlineStorage = {
  async saveDeals(deals: Deal[]): Promise<void> {
    try {
      const db = await getDB();
      const tx = db.transaction(['deals', 'meta'], 'readwrite');
      const store = tx.objectStore('deals');

      deals.forEach((deal) => {
        store.put({ ...deal, cachedAt: deal.cachedAt || Date.now() });
      });

      const metaStore = tx.objectStore('meta');
      const meta: CacheMetadata = {
        lastSync: Date.now(),
        totalDeals: deals.length,
        estimatedSizeKb: Math.round(JSON.stringify(deals).length / 1024),
        version: '1.0',
      };
      metaStore.put({ key: 'cacheMeta', ...meta });

      return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEYS.DEALS, JSON.stringify(deals));
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.META,
          JSON.stringify({
            lastSync: Date.now(),
            totalDeals: deals.length,
            estimatedSizeKb: Math.round(JSON.stringify(deals).length / 1024),
            version: '1.0',
          })
        );
      } catch (err) {
        console.warn('Could not save to localStorage fallback:', err);
      }
    }
  },

  async getDeals(): Promise<Deal[]> {
    try {
      const db = await getDB();
      const tx = db.transaction('deals', 'readonly');
      const store = tx.objectStore('deals');
      const request = store.getAll();

      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          const results = request.result as Deal[];
          resolve(results || []);
        };
        request.onerror = () => reject(request.error);
      });
    } catch {
      try {
        const cached = localStorage.getItem(LOCAL_STORAGE_KEYS.DEALS);
        return cached ? JSON.parse(cached) : [];
      } catch {
        return [];
      }
    }
  },

  async saveCategories(categories: Category[]): Promise<void> {
    try {
      const db = await getDB();
      const tx = db.transaction('categories', 'readwrite');
      const store = tx.objectStore('categories');
      categories.forEach((cat) => store.put(cat));
    } catch {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
      } catch {}
    }
  },

  async getCategories(): Promise<Category[]> {
    try {
      const db = await getDB();
      const tx = db.transaction('categories', 'readonly');
      const store = tx.objectStore('categories');
      const request = store.getAll();

      return new Promise((resolve) => {
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => resolve([]);
      });
    } catch {
      try {
        const cached = localStorage.getItem(LOCAL_STORAGE_KEYS.CATEGORIES);
        return cached ? JSON.parse(cached) : [];
      } catch {
        return [];
      }
    }
  },

  async getBookmarks(): Promise<Deal[]> {
    try {
      const db = await getDB();
      const tx = db.transaction('bookmarks', 'readonly');
      const store = tx.objectStore('bookmarks');
      const request = store.getAll();

      return new Promise((resolve) => {
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => resolve([]);
      });
    } catch {
      try {
        const cached = localStorage.getItem(LOCAL_STORAGE_KEYS.BOOKMARKS);
        return cached ? JSON.parse(cached) : [];
      } catch {
        return [];
      }
    }
  },

  async toggleBookmark(deal: Deal): Promise<boolean> {
    try {
      const db = await getDB();
      const tx = db.transaction('bookmarks', 'readwrite');
      const store = tx.objectStore('bookmarks');
      const checkReq = store.get(deal.id);

      return new Promise((resolve) => {
        checkReq.onsuccess = () => {
          if (checkReq.result) {
            store.delete(deal.id);
            tx.oncomplete = () => resolve(false);
          } else {
            store.put(deal);
            tx.oncomplete = () => resolve(true);
          }
        };
        checkReq.onerror = () => resolve(false);
      });
    } catch {
      try {
        const bookmarks: Deal[] = JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_KEYS.BOOKMARKS) || '[]'
        );
        const exists = bookmarks.some((b) => b.id === deal.id);
        const updated = exists
          ? bookmarks.filter((b) => b.id !== deal.id)
          : [...bookmarks, deal];
        localStorage.setItem(LOCAL_STORAGE_KEYS.BOOKMARKS, JSON.stringify(updated));
        return !exists;
      } catch {
        return false;
      }
    }
  },

  async isBookmarked(id: number): Promise<boolean> {
    try {
      const db = await getDB();
      const tx = db.transaction('bookmarks', 'readonly');
      const store = tx.objectStore('bookmarks');
      const request = store.get(id);

      return new Promise((resolve) => {
        request.onsuccess = () => resolve(!!request.result);
        request.onerror = () => resolve(false);
      });
    } catch {
      try {
        const bookmarks: Deal[] = JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_KEYS.BOOKMARKS) || '[]'
        );
        return bookmarks.some((b) => b.id === id);
      } catch {
        return false;
      }
    }
  },

  async getCacheMetadata(): Promise<CacheMetadata> {
    try {
      const db = await getDB();
      const tx = db.transaction('meta', 'readonly');
      const store = tx.objectStore('meta');
      const req = store.get('cacheMeta');

      return new Promise((resolve) => {
        req.onsuccess = () => {
          if (req.result) {
            resolve({
              lastSync: req.result.lastSync || Date.now(),
              totalDeals: req.result.totalDeals || 0,
              estimatedSizeKb: req.result.estimatedSizeKb || 0,
              version: req.result.version || '1.0',
            });
          } else {
            resolve({
              lastSync: 0,
              totalDeals: 0,
              estimatedSizeKb: 0,
              version: '1.0',
            });
          }
        };
        req.onerror = () => {
          resolve({
            lastSync: 0,
            totalDeals: 0,
            estimatedSizeKb: 0,
            version: '1.0',
          });
        };
      });
    } catch {
      try {
        const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.META);
        if (raw) return JSON.parse(raw);
      } catch {}
      return {
        lastSync: 0,
        totalDeals: 0,
        estimatedSizeKb: 0,
        version: '1.0',
      };
    }
  },

  async clearCache(): Promise<void> {
    try {
      const db = await getDB();
      const tx = db.transaction(['deals', 'meta'], 'readwrite');
      tx.objectStore('deals').clear();
      tx.objectStore('meta').clear();
      await new Promise((resolve) => {
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      });
    } catch {}

    try {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.DEALS);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.META);
    } catch {}
  },
};
