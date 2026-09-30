import React, { useState } from 'react';
import {
  Flame,
  Zap,
  Sparkles,
  ArrowRight,
  TrendingDown,
  ShoppingBag,
} from 'lucide-react';
import { Deal, Category, SortOption } from '../types/deal';
import { DealCard } from './DealCard';
import { SwipeRefreshLayout } from './SwipeRefreshLayout';
import { useTheme } from '../context/ThemeContext';

interface DealsFeedProps {
  deals: Deal[];
  categories: Category[];
  selectedCategoryId: number;
  onSelectCategory: (id: number) => void;
  bookmarks: Deal[];
  onToggleBookmark: (deal: Deal) => void;
  onSelectDeal: (deal: Deal) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewLayout: 'list' | 'grid';
  isLoading: boolean;
  onLoadMore?: () => void;
  searchQuery: string;
  onRefresh: () => Promise<void>;
  isRefreshing?: boolean;
}

export const DealsFeed: React.FC<DealsFeedProps> = ({
  deals,
  categories,
  selectedCategoryId,
  onSelectCategory,
  bookmarks,
  onToggleBookmark,
  onSelectDeal,
  sortBy,
  onSortChange,
  viewLayout,
  isLoading,
  searchQuery,
  onRefresh,
  isRefreshing = false,
}) => {
  const { accent, isAMOLED, isDark } = useTheme();
  const [priceFilter, setPriceFilter] = useState<'all' | 'under25' | 'under50' | 'deepDiscount'>('all');

  const bookmarkIds = new Set(bookmarks.map((b) => b.id));

  // Quick budget filtering
  const filteredByBudget = React.useMemo(() => {
    if (priceFilter === 'under25') {
      return deals.filter((d) => d.numericPrice > 0 && d.numericPrice <= 25);
    }
    if (priceFilter === 'under50') {
      return deals.filter((d) => d.numericPrice > 0 && d.numericPrice <= 50);
    }
    if (priceFilter === 'deepDiscount') {
      return deals.filter((d) => (d.discountPercent || 0) >= 50);
    }
    return deals;
  }, [deals, priceFilter]);

  const selectedCategoryName = React.useMemo(() => {
    if (selectedCategoryId === 0) return 'All Categories';
    return categories.find((c) => c.id === selectedCategoryId)?.name || 'Category';
  }, [categories, selectedCategoryId]);

  return (
    <SwipeRefreshLayout
      onRefresh={onRefresh}
      isRefreshing={isRefreshing}
      className="w-full flex-1"
    >
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-5 pb-28 lg:pb-12 space-y-4 sm:space-y-5">
        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-3 sm:mx-0 px-3 sm:px-0">
          {categories.slice(0, 10).map((cat) => {
            const isSelected = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition active:scale-95 flex items-center gap-1.5 ${
                  isSelected
                    ? 'text-white shadow-md'
                    : isAMOLED
                    ? 'bg-neutral-900 border border-neutral-800 text-slate-300 hover:text-white'
                    : isDark
                    ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                    : 'bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 shadow-xs'
                }`}
                style={{
                  backgroundColor: isSelected ? accent.hex : undefined,
                  boxShadow: isSelected ? `0 2px 10px ${accent.glowRgba}` : undefined,
                }}
              >
                {cat.id === 0 && <Flame className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />}
                <span>{cat.name}</span>
                {cat.count ? (
                  <span className="text-[10px] opacity-75">({cat.count})</span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Section Header: Latest Deals Title & Quick Stats */}
        <div
          className={`flex items-center justify-between border-b pb-3 transition-colors duration-200 ${
            isAMOLED ? 'border-neutral-850' : isDark ? 'border-slate-800/80' : 'border-slate-200'
          }`}
        >
          <div>
            <h2
              className={`text-lg sm:text-xl font-extrabold flex items-center gap-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              <Sparkles className="w-5 h-5" style={{ color: accent.hex }} />
              <span>{searchQuery ? `Search Results: "${searchQuery}"` : `Latest Clearance Deals`}</span>
              {selectedCategoryId > 0 && !searchQuery && (
                <span
                  className="text-xs font-medium px-2.5 py-0.5 rounded-full hidden sm:inline"
                  style={{
                    backgroundColor: `${accent.hex}20`,
                    color: accent.hex,
                  }}
                >
                  {selectedCategoryName}
                </span>
              )}
            </h2>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Fresh discounts & verified markdown prices from clearancedeals.info
            </p>
          </div>

          <span
            className="text-xs font-bold px-3 py-1 rounded-full shadow-xs"
            style={{
              backgroundColor: `${accent.hex}18`,
              color: accent.hex,
              border: `1px solid ${accent.hex}35`,
            }}
          >
            {filteredByBudget.length} Latest Deals
          </span>
        </div>

        {/* Toolbar: Budget Filter Chips & Sort Controls */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-0 pb-1`}
        >
          {/* Quick Budget Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <span
              className={`text-[11px] font-medium mr-1 shrink-0 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Price Filter:
            </span>
            {[
              { id: 'all', label: 'All Deals' },
              { id: 'under25', label: 'Under $25' },
              { id: 'under50', label: 'Under $50' },
              { id: 'deepDiscount', label: '50%+ OFF' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setPriceFilter(f.id as any)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 transition ${
                  priceFilter === f.id
                    ? 'text-white shadow-sm'
                    : isAMOLED
                    ? 'bg-neutral-900 border border-neutral-800 text-slate-400 hover:text-slate-200'
                    : isDark
                    ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-xs'
                }`}
                style={{
                  backgroundColor: priceFilter === f.id ? accent.hex : undefined,
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Sort Controls */}
          <div className="flex items-center justify-between sm:justify-end gap-2 text-xs">
            <div className="flex items-center gap-1">
              <span
                className={`text-[11px] hidden sm:inline mr-1 ${
                  isDark ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                Sort:
              </span>
              {(['latest', 'discount', 'price-low'] as SortOption[]).map((option) => {
                const labels: Record<SortOption, string> = {
                  latest: 'Latest',
                  discount: 'Max % Off',
                  'price-low': 'Under $',
                  'price-high': 'Price High',
                };
                const isSelected = sortBy === option;
                return (
                  <button
                    key={option}
                    onClick={() => onSortChange(option)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                      isSelected
                        ? 'border shadow-xs'
                        : isAMOLED
                        ? 'bg-neutral-900 text-slate-400 hover:text-slate-200 border border-neutral-800'
                        : isDark
                        ? 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                        : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                    }`}
                    style={{
                      color: isSelected ? accent.hex : undefined,
                      borderColor: isSelected ? `${accent.hex}80` : undefined,
                      backgroundColor: isSelected ? `${accent.hex}15` : undefined,
                    }}
                  >
                    {labels[option]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Loading Skeletons */}
        {isLoading && filteredByBudget.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl border animate-pulse space-y-3 ${
                  isAMOLED
                    ? 'bg-neutral-900/60 border-neutral-800'
                    : isDark
                    ? 'bg-slate-900/60 border-slate-800'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div
                  className={`w-full aspect-square rounded-xl ${
                    isDark ? 'bg-slate-800' : 'bg-slate-200'
                  }`}
                />
                <div
                  className={`w-2/3 h-4 rounded ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}
                />
                <div
                  className={`w-1/2 h-4 rounded ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}
                />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredByBudget.length === 0 && (
          <div
            className={`text-center py-16 px-4 rounded-3xl border space-y-3 max-w-md mx-auto ${
              isAMOLED
                ? 'bg-neutral-950 border-neutral-800'
                : isDark
                ? 'bg-slate-900/50 border-slate-800'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <Flame className="w-12 h-12 text-slate-400 mx-auto" />
            <h4
              className={`font-bold text-base ${
                isDark ? 'text-slate-200' : 'text-slate-800'
              }`}
            >
              No Latest Clearance Deals Found
            </h4>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Try switching back to "All Deals" or select another clearance category.
            </p>
            <button
              onClick={() => setPriceFilter('all')}
              className="px-4 py-2 rounded-xl text-white font-bold text-xs transition shadow-sm"
              style={{ backgroundColor: accent.hex }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Responsive Deals Layout: Only Latest Deals */}
        <div
          className={
            viewLayout === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
              : 'grid grid-cols-1 lg:grid-cols-2 gap-3.5'
          }
        >
          {filteredByBudget.map((deal) => (
            <DealCard
              key={deal.id}
              deal={deal}
              isBookmarked={bookmarkIds.has(deal.id)}
              onToggleBookmark={onToggleBookmark}
              onSelectDeal={onSelectDeal}
              layout={viewLayout}
            />
          ))}
        </div>
      </div>
    </SwipeRefreshLayout>
  );
};
