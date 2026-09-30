import React from 'react';
import { Heart, Share2, ExternalLink, Zap, Tag, Check } from 'lucide-react';
import { Deal } from '../types/deal';
import { useTheme } from '../context/ThemeContext';

interface DealCardProps {
  deal: Deal;
  isBookmarked: boolean;
  onToggleBookmark: (deal: Deal) => void;
  onSelectDeal: (deal: Deal) => void;
  layout?: 'grid' | 'list';
}

export const DealCard: React.FC<DealCardProps> = ({
  deal,
  isBookmarked,
  onToggleBookmark,
  onSelectDeal,
  layout = 'list',
}) => {
  const { accent, isAMOLED, isDark } = useTheme();
  const [copied, setCopied] = React.useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareData = {
      title: deal.title,
      text: `🔥 Hot Clearance Deal: ${deal.cleanTitle} for only ${deal.price}!`,
      url: deal.buyUrl || deal.sourceUrl,
    };

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(`${deal.cleanTitle} - ${deal.price} ${deal.buyUrl}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {}
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleBookmark(deal);
  };

  const handleBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(deal.buyUrl, '_blank', 'noopener,noreferrer');
  };

  if (layout === 'grid') {
    return (
      <div
        onClick={() => onSelectDeal(deal)}
        className={`group rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col cursor-pointer shadow-xs hover:shadow-lg active:scale-[0.99] ${
          isAMOLED
            ? 'bg-[#080808] border-neutral-800/80 hover:border-neutral-700'
            : isDark
            ? 'bg-slate-900/90 border-slate-800/80 hover:border-slate-700'
            : 'bg-white border-slate-200 hover:border-slate-300'
        }`}
      >
        <div
          className={`relative aspect-square w-full flex items-center justify-center p-3 overflow-hidden ${
            isAMOLED ? 'bg-black' : isDark ? 'bg-slate-950' : 'bg-slate-50'
          }`}
        >
          <img
            src={deal.image}
            alt={deal.cleanTitle}
            loading="lazy"
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&auto=format&fit=crop&q=80';
            }}
          />

          {deal.discountPercent && (
            <div
              className="absolute top-2 left-2 text-white font-black text-[10px] px-2 py-0.5 rounded-full shadow-md flex items-center gap-0.5"
              style={{ backgroundColor: accent.hex }}
            >
              <Zap className="w-2.5 h-2.5 fill-yellow-300 text-yellow-300" />
              <span>-{deal.discountPercent}%</span>
            </div>
          )}

          <div className="absolute top-2 right-2 flex flex-col gap-1">
            <button
              onClick={handleBookmark}
              className={`p-1.5 rounded-full backdrop-blur-md transition ${
                isBookmarked
                  ? 'text-white shadow-sm'
                  : isDark
                  ? 'bg-slate-950/70 text-slate-300 hover:text-white'
                  : 'bg-white/80 text-slate-600 hover:text-slate-900 shadow-xs'
              }`}
              style={{ backgroundColor: isBookmarked ? accent.hex : undefined }}
              title={isBookmarked ? 'Saved offline' : 'Save deal'}
            >
              <Heart
                className="w-3.5 h-3.5"
                fill={isBookmarked ? 'currentColor' : 'none'}
              />
            </button>
          </div>
        </div>

        <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
          <div>
            <div
              className={`flex items-center gap-1 text-[10px] mb-1 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              <span
                className={`font-semibold uppercase tracking-wider text-[9px] px-1.5 py-0.2 rounded ${
                  isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {deal.dealStore || 'Amazon'}
              </span>
              <span>•</span>
              <span className="truncate">{deal.categories[0]?.name || 'Clearance'}</span>
            </div>

            <h3
              className={`text-xs font-bold line-clamp-2 leading-snug transition ${
                isDark ? 'text-slate-100 group-hover:text-white' : 'text-slate-900 group-hover:text-slate-800'
              }`}
            >
              {deal.cleanTitle}
            </h3>
          </div>

          <div
            className={`pt-1 border-t flex items-baseline justify-between ${
              isDark ? 'border-slate-800/60' : 'border-slate-100'
            }`}
          >
            <div className="flex items-baseline gap-1.5">
              <span
                className="text-base font-black tracking-tight"
                style={{ color: accent.hex }}
              >
                {deal.price}
              </span>
              {deal.originalPrice && (
                <span
                  className={`text-[10px] line-through ${
                    isDark ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  {deal.originalPrice}
                </span>
              )}
            </div>

            <button
              onClick={handleBuy}
              className={`p-1.5 rounded-lg transition ${
                isDark
                  ? 'bg-slate-800 text-slate-300 hover:text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
              title="Open deal link"
            >
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div
      onClick={() => onSelectDeal(deal)}
      className={`group rounded-2xl border transition-all duration-200 p-3 sm:p-3.5 flex gap-3.5 cursor-pointer shadow-xs hover:shadow-lg active:scale-[0.99] ${
        isAMOLED
          ? 'bg-[#080808] border-neutral-800/80 hover:border-neutral-700'
          : isDark
          ? 'bg-slate-900/90 border-slate-800/80 hover:border-slate-700'
          : 'bg-white border-slate-200 hover:border-slate-300'
      }`}
    >
      <div
        className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl flex items-center justify-center p-2 shrink-0 border overflow-hidden ${
          isAMOLED
            ? 'bg-black border-neutral-850'
            : isDark
            ? 'bg-slate-950 border-slate-800/40'
            : 'bg-slate-50 border-slate-100'
        }`}
      >
        <img
          src={deal.image}
          alt={deal.cleanTitle}
          loading="lazy"
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&auto=format&fit=crop&q=80';
          }}
        />

        {deal.discountPercent && (
          <div
            className="absolute top-1.5 left-1.5 text-white font-black text-[9px] px-1.5 py-0.5 rounded-full shadow-sm flex items-center gap-0.5"
            style={{ backgroundColor: accent.hex }}
          >
            <Zap className="w-2.5 h-2.5 fill-yellow-300 text-yellow-300" />
            <span>-{deal.discountPercent}%</span>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <div
            className={`flex items-center gap-1.5 text-[10px] mb-1 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            <span
              className={`font-semibold uppercase tracking-wider text-[9px] px-1.5 py-0.2 rounded ${
                isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {deal.dealStore || 'Amazon'}
            </span>
            <span>•</span>
            <span className="truncate">{deal.categories[0]?.name || 'Clearance'}</span>
          </div>

          <h3
            className={`text-xs sm:text-sm font-bold line-clamp-2 leading-snug transition ${
              isDark ? 'text-slate-100 group-hover:text-white' : 'text-slate-900 group-hover:text-slate-800'
            }`}
          >
            {deal.cleanTitle}
          </h3>
        </div>

        <div className="flex items-end justify-between gap-2 pt-2">
          <div className="flex items-baseline gap-2">
            <span
              className="text-lg sm:text-xl font-black tracking-tight"
              style={{ color: accent.hex }}
            >
              {deal.price}
            </span>
            {deal.originalPrice && (
              <span
                className={`text-xs line-through ${
                  isDark ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                {deal.originalPrice}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleShare}
              className={`p-1.5 rounded-xl transition ${
                isDark
                  ? 'bg-slate-800/80 text-slate-400 hover:text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
              title="Share"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Share2 className="w-3.5 h-3.5" />
              )}
            </button>

            <button
              onClick={handleBookmark}
              className={`p-1.5 rounded-xl transition ${
                isBookmarked
                  ? 'text-white shadow-sm'
                  : isDark
                  ? 'bg-slate-800/80 text-slate-400 hover:text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
              style={{ backgroundColor: isBookmarked ? accent.hex : undefined }}
              title={isBookmarked ? 'Saved offline' : 'Save for later'}
            >
              <Heart
                className="w-3.5 h-3.5"
                fill={isBookmarked ? 'currentColor' : 'none'}
              />
            </button>

            <button
              onClick={handleBuy}
              className="p-1.5 rounded-xl text-white transition shadow-sm"
              style={{ backgroundColor: accent.hex }}
              title="Buy Now"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
