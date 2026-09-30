import React, { useRef } from 'react';
import { Heart, ShieldCheck, ArrowRight } from 'lucide-react';
import { Deal } from '../types/deal';
import { DealCard } from './DealCard';
import { useTheme } from '../context/ThemeContext';
import { ScrollController } from './ScrollController';

interface SavedDealsProps {
  bookmarks: Deal[];
  onToggleBookmark: (deal: Deal) => void;
  onSelectDeal: (deal: Deal) => void;
  onBrowseDeals: () => void;
  viewLayout: 'list' | 'grid';
}

export const SavedDeals: React.FC<SavedDealsProps> = ({
  bookmarks,
  onToggleBookmark,
  onSelectDeal,
  onBrowseDeals,
  viewLayout,
}) => {
  const { accent, isAMOLED, isDark } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={scrollRef} className="relative w-full flex-1 h-full overflow-y-auto overscroll-y-contain touch-pan-y android-scrollbar">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-28 lg:pb-12 space-y-5">
        <div
          className={`flex items-center justify-between border-b pb-3 ${
            isAMOLED ? 'border-neutral-850' : isDark ? 'border-slate-800' : 'border-slate-200'
          }`}
        >
          <div>
            <h2
              className={`text-xl sm:text-2xl font-bold flex items-center gap-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              <Heart className="w-6 h-6" style={{ color: accent.hex, fill: accent.hex }} />
              Saved Clearance Deals
            </h2>
            <p className={`text-xs sm:text-sm mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Stored locally in IndexedDB for 100% offline access anywhere without internet
            </p>
          </div>

          <span
            className="text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full border shadow-xs"
            style={{
              backgroundColor: `${accent.hex}18`,
              color: accent.hex,
              borderColor: `${accent.hex}40`,
            }}
          >
            {bookmarks.length} Saved
          </span>
        </div>

        {bookmarks.length === 0 ? (
          <div
            className={`text-center py-20 px-4 rounded-3xl border space-y-3 max-w-md mx-auto ${
              isAMOLED
                ? 'bg-neutral-950 border-neutral-850'
                : isDark
                ? 'bg-slate-900/60 border-slate-800'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-inner ${
                isDark ? 'bg-slate-800/80' : 'bg-slate-100'
              }`}
              style={{ color: accent.hex }}
            >
              <Heart className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h3
              className={`font-bold text-base ${
                isDark ? 'text-slate-200' : 'text-slate-800'
              }`}
            >
              No Saved Deals Yet
            </h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Tap the heart icon on any clearance deal to save it here for offline reading or quick price tracking.
            </p>
            <div className="pt-2">
              <button
                onClick={onBrowseDeals}
                className="px-5 py-2.5 rounded-xl text-white font-bold text-xs transition inline-flex items-center gap-1.5 shadow-md active:scale-98"
                style={{
                  backgroundColor: accent.hex,
                  boxShadow: `0 4px 14px ${accent.glowRgba}`,
                }}
              >
                <span>Explore Latest Deals</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div
              className={`flex items-center gap-2 text-xs p-3 rounded-2xl border ${
                isDark
                  ? 'text-emerald-400 bg-emerald-950/40 border-emerald-900/40'
                  : 'text-emerald-700 bg-emerald-50 border-emerald-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>All saved clearance items and images remain available even in airplane mode.</span>
            </div>

            <div
              className={
                viewLayout === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
                  : 'grid grid-cols-1 lg:grid-cols-2 gap-3.5'
              }
            >
              {bookmarks.map((deal) => (
                <DealCard
                  key={deal.id}
                  deal={deal}
                  isBookmarked={true}
                  onToggleBookmark={onToggleBookmark}
                  onSelectDeal={onSelectDeal}
                  layout={viewLayout}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <ScrollController scrollContainerRef={scrollRef} />
    </div>
  );
};
