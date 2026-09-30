import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Deal, Category, CacheMetadata, ActiveTab, SortOption } from './types/deal';
import { offlineStorage } from './services/offlineStorage';
import { dealsApi, INITIAL_CATEGORIES } from './services/dealsApi';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeModal } from './components/ThemeModal';
import { AndroidFrame } from './components/AndroidFrame';
import { Header } from './components/Header';
import { OfflineBanner } from './components/OfflineBanner';
import { DealsFeed } from './components/DealsFeed';
import { AndroidWebView } from './components/AndroidWebView';
import { CategoryBrowser } from './components/CategoryBrowser';
import { SavedDeals } from './components/SavedDeals';
import { OfflineManager } from './components/OfflineManager';
import { DealDetailModal } from './components/DealDetailModal';
import { BottomNav } from './components/BottomNav';

function AppContent() {
  const { isOnline, simulatedOffline, toggleSimulatedOffline } = useOnlineStatus();

  const [activeTab, setActiveTab] = useState<ActiveTab>('feed');
  const [deals, setDeals] = useState<Deal[]>([]);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [viewLayout, setViewLayout] = useState<'list' | 'grid'>('list');
  const [showThemeModal, setShowThemeModal] = useState<boolean>(false);

  const [bookmarks, setBookmarks] = useState<Deal[]>([]);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [cacheMeta, setCacheMeta] = useState<CacheMetadata>({
    lastSync: 0,
    totalDeals: 0,
    estimatedSizeKb: 0,
    version: '1.0',
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const loadInitialData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [cachedDeals, cachedBookmarks, cachedCats, meta] = await Promise.all([
        offlineStorage.getDeals(),
        offlineStorage.getBookmarks(),
        offlineStorage.getCategories(),
        offlineStorage.getCacheMetadata(),
      ]);

      if (cachedDeals.length > 0) {
        setDeals(cachedDeals);
      }
      setBookmarks(cachedBookmarks);
      if (cachedCats.length > 0) {
        setCategories(cachedCats);
      }
      setCacheMeta(meta);

      if (isOnline) {
        const result = await dealsApi.fetchDeals();
        if (result.deals && result.deals.length > 0) {
          setDeals(result.deals);
          const updatedMeta = await offlineStorage.getCacheMetadata();
          setCacheMeta(updatedMeta);
        }

        const freshCats = await dealsApi.fetchCategories();
        if (freshCats.length > 0) {
          setCategories(freshCats);
        }
      }
    } catch (err) {
      console.warn('Initialization error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isOnline]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const result = await dealsApi.fetchDeals({
        categoryId: selectedCategoryId > 0 ? selectedCategoryId : undefined,
        search: searchQuery || undefined,
      });

      if (result.deals && result.deals.length > 0) {
        setDeals(result.deals);
        const meta = await offlineStorage.getCacheMetadata();
        setCacheMeta(meta);
      }
    } catch (err) {
      console.error('Refresh error:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleToggleBookmark = async (deal: Deal) => {
    await offlineStorage.toggleBookmark(deal);
    const updatedBookmarks = await offlineStorage.getBookmarks();
    setBookmarks(updatedBookmarks);
  };

  const handleClearCache = async () => {
    await offlineStorage.clearCache();
    const meta = await offlineStorage.getCacheMetadata();
    setCacheMeta(meta);
    setDeals([]);
    await loadInitialData();
  };

  const handleSelectCategory = (id: number) => {
    setSelectedCategoryId(id);
    setActiveTab('feed');
  };

  const filteredDeals = useMemo(() => {
    let result = [...deals];

    if (selectedCategoryId > 0) {
      result = result.filter((deal) =>
        deal.categories.some((cat) => cat.id === selectedCategoryId)
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (deal) =>
          deal.title.toLowerCase().includes(q) ||
          deal.cleanTitle.toLowerCase().includes(q) ||
          deal.excerpt.toLowerCase().includes(q) ||
          deal.categories.some((c) => c.name.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'latest') {
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'discount') {
      result.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => (a.numericPrice || 0) - (b.numericPrice || 0));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => (b.numericPrice || 0) - (a.numericPrice || 0));
    }

    return result;
  }, [deals, selectedCategoryId, searchQuery, sortBy]);

  const isSelectedDealBookmarked = useMemo(() => {
    if (!selectedDeal) return false;
    return bookmarks.some((b) => b.id === selectedDeal.id);
  }, [selectedDeal, bookmarks]);

  return (
    <AndroidFrame isOnline={isOnline}>
      <OfflineBanner
        isOnline={isOnline}
        simulatedOffline={simulatedOffline}
        onToggleSimulated={toggleSimulatedOffline}
        cachedCount={deals.length}
        onRefresh={handleRefresh}
      />

      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showSearch={showSearch}
        onToggleSearch={() => setShowSearch(!showSearch)}
        viewLayout={viewLayout}
        onToggleLayout={() => setViewLayout((prev) => (prev === 'list' ? 'grid' : 'list'))}
        isOnline={isOnline}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        bookmarkCount={bookmarks.length}
        onOpenThemeModal={() => setShowThemeModal(true)}
      />

      <main className="flex-1 min-h-0 h-full w-full flex flex-col overflow-hidden relative">
        {activeTab === 'feed' && (
          <DealsFeed
            deals={filteredDeals}
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={setSelectedCategoryId}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onSelectDeal={setSelectedDeal}
            sortBy={sortBy}
            onSortChange={setSortBy}
            viewLayout={viewLayout}
            isLoading={isLoading}
            searchQuery={searchQuery}
            onRefresh={handleRefresh}
            isRefreshing={isRefreshing}
          />
        )}

        {activeTab === 'webview' && (
          <AndroidWebView
            url="https://clearancedeals.info/"
            isOnline={isOnline}
            onOpenCachedDeals={() => setActiveTab('feed')}
            cachedCount={deals.length}
          />
        )}

        {activeTab === 'categories' && (
          <CategoryBrowser
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {activeTab === 'saved' && (
          <SavedDeals
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onSelectDeal={setSelectedDeal}
            onBrowseDeals={() => setActiveTab('feed')}
            viewLayout={viewLayout}
          />
        )}

        {activeTab === 'offline' && (
          <OfflineManager
            cacheMeta={cacheMeta}
            isOnline={isOnline}
            simulatedOffline={simulatedOffline}
            onToggleSimulated={toggleSimulatedOffline}
            onRefreshData={handleRefresh}
            onClearCache={handleClearCache}
            onOpenThemeModal={() => setShowThemeModal(true)}
          />
        )}
      </main>

      <DealDetailModal
        deal={selectedDeal}
        isOpen={!!selectedDeal}
        onClose={() => setSelectedDeal(null)}
        isBookmarked={isSelectedDealBookmarked}
        onToggleBookmark={handleToggleBookmark}
      />

      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        bookmarkCount={bookmarks.length}
        isOffline={!isOnline}
      />

      <ThemeModal
        isOpen={showThemeModal}
        onClose={() => setShowThemeModal(false)}
      />
    </AndroidFrame>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
