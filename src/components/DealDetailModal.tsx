import React from 'react';
import {
  X,
  ExternalLink,
  Heart,
  Share2,
  Clock,
  ShieldCheck,
  Tag,
  Zap,
  ShoppingBag,
  ArrowLeft,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Deal } from '../types/deal';
import { useTheme } from '../context/ThemeContext';

interface DealDetailModalProps {
  deal: Deal | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (deal: Deal) => void;
}

export const DealDetailModal: React.FC<DealDetailModalProps> = ({
  deal,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark,
}) => {
  const { accent, isAMOLED, isDark } = useTheme();
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !deal) return null;

  const handleBuy = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch {}
    window.open(deal.buyUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async () => {
    const shareData = {
      title: deal.title,
      text: `🔥 Clearance deal: ${deal.cleanTitle} for ${deal.price}!`,
      url: deal.buyUrl || deal.sourceUrl,
    };

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(`${deal.cleanTitle} - ${deal.price} \n${deal.buyUrl}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {}
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 md:p-6 animate-fadeIn">
      <div
        className={`w-full max-w-lg md:max-w-3xl lg:max-w-4xl border-t sm:border rounded-t-[32px] sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh] sm:max-h-[85vh] overflow-hidden ${
          isAMOLED
            ? 'bg-black border-neutral-800 text-slate-100'
            : isDark
            ? 'bg-slate-900 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Top Modal Navigation Header */}
        <div
          className={`px-4 sm:px-6 py-3 border-b flex items-center justify-between backdrop-blur sticky top-0 z-10 shrink-0 ${
            isAMOLED
              ? 'bg-black/90 border-neutral-800'
              : isDark
              ? 'bg-slate-950/80 border-slate-800/80'
              : 'bg-white/90 border-slate-200'
          }`}
        >
          <button
            onClick={onClose}
            className={`flex items-center gap-1.5 text-xs font-semibold transition p-1.5 rounded-xl ${
              isDark
                ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Deals</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(deal)}
              className={`p-2 rounded-xl transition ${
                isBookmarked
                  ? 'text-white shadow-md'
                  : isDark
                  ? 'bg-slate-800 text-slate-300 hover:text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
              style={{ backgroundColor: isBookmarked ? accent.hex : undefined }}
              title={isBookmarked ? 'Saved to Offline Bookmarks' : 'Save for offline'}
            >
              <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-white' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className={`p-2 rounded-xl transition ${
                isDark
                  ? 'bg-slate-800 text-slate-300 hover:text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
              title="Share deal"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className={`p-2 rounded-xl transition ${
                isDark
                  ? 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Content - Dual Column */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7 items-start">
            {/* Left Column: Image & Stock */}
            <div className="space-y-3">
              <div
                className={`relative w-full aspect-square rounded-3xl p-4 sm:p-6 flex items-center justify-center border overflow-hidden shadow-inner ${
                  isAMOLED
                    ? 'bg-black border-neutral-800'
                    : isDark
                    ? 'bg-slate-950 border-slate-800/80'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <img
                  src={deal.image}
                  alt={deal.cleanTitle}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&auto=format&fit=crop&q=80';
                  }}
                />

                {deal.discountPercent && (
                  <div
                    className="absolute top-3 left-3 text-white font-black text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5"
                    style={{ backgroundColor: accent.hex }}
                  >
                    <Zap className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
                    <span>SAVE {deal.discountPercent}%</span>
                  </div>
                )}

                <div
                  className={`absolute bottom-3 right-3 backdrop-blur-md px-2.5 py-1 rounded-lg border text-[11px] font-medium ${
                    isDark
                      ? 'bg-slate-950/80 border-slate-800 text-slate-300'
                      : 'bg-white/90 border-slate-200 text-slate-700 shadow-xs'
                  }`}
                >
                  Verified In Stock
                </div>
              </div>

              <div
                className={`flex items-center gap-2.5 p-3 rounded-2xl border text-xs ${
                  isDark
                    ? 'bg-slate-950/60 border-slate-800 text-slate-300'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  Cached in your local Android IndexedDB database for offline access.
                </span>
              </div>
            </div>

            {/* Right Column: Pricing, Specs, and Actions */}
            <div className="space-y-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {deal.categories.map((cat) => (
                    <span
                      key={cat.id || cat.name}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border"
                      style={{
                        color: accent.hex,
                        borderColor: `${accent.hex}40`,
                        backgroundColor: `${accent.hex}15`,
                      }}
                    >
                      <Tag className="w-3 h-3" />
                      {cat.name}
                    </span>
                  ))}
                  <span
                    className={`text-[11px] flex items-center gap-1 ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    {deal.dateFormatted}
                  </span>
                </div>

                <h2
                  className={`text-base sm:text-lg md:text-xl font-bold leading-snug ${
                    isDark ? 'text-slate-100' : 'text-slate-900'
                  }`}
                >
                  {deal.title}
                </h2>
              </div>

              {/* Price Breakdown Banner */}
              <div
                className={`p-4 rounded-2xl border flex items-center justify-between ${
                  isAMOLED
                    ? 'bg-neutral-950 border-neutral-800'
                    : isDark
                    ? 'bg-slate-950 border-slate-800'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div
                    className={`text-xs font-medium ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Clearance Sale Price
                  </div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span
                      className="text-2xl sm:text-3xl lg:text-4xl font-black"
                      style={{ color: accent.hex }}
                    >
                      {deal.price}
                    </span>
                    {deal.originalPrice && (
                      <span
                        className={`text-sm line-through ${
                          isDark ? 'text-slate-500' : 'text-slate-400'
                        }`}
                      >
                        List: {deal.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {deal.discountPercent && (
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800/50 px-3 py-1.5 rounded-xl">
                      {deal.discountPercent}% OFF
                    </span>
                  </div>
                )}
              </div>

              {/* Product Highlights */}
              <div
                className={`p-4 rounded-2xl border text-xs space-y-2 leading-relaxed ${
                  isAMOLED
                    ? 'bg-neutral-950 border-neutral-850 text-slate-300'
                    : isDark
                    ? 'bg-slate-950/80 border-slate-800 text-slate-300'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <h4
                  className={`font-bold uppercase tracking-wider text-[11px] ${
                    isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}
                >
                  Product Highlights
                </h4>
                <p>{deal.excerpt}</p>
              </div>

              {/* How to claim */}
              <div
                className={`p-4 rounded-2xl border space-y-2 ${
                  isAMOLED
                    ? 'bg-neutral-950 border-neutral-850'
                    : isDark
                    ? 'bg-slate-950/80 border-slate-800'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <h4
                  className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                    isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" style={{ color: accent.hex }} />
                  How To Claim On {deal.dealStore || 'Amazon'}
                </h4>
                <ol
                  className={`space-y-1.5 text-xs list-decimal list-inside leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  <li>Click the "Buy Now on {deal.dealStore || 'Amazon'}" button below.</li>
                  <li>Clip any on-page promotional vouchers or instant coupons.</li>
                  <li>Check out before clearance inventory depletes.</li>
                </ol>
              </div>

              {/* Buy CTA */}
              <div className="pt-2">
                <button
                  onClick={handleBuy}
                  className="w-full py-3.5 px-6 rounded-2xl text-white font-extrabold text-sm sm:text-base transition flex items-center justify-center gap-2.5 shadow-xl active:scale-98"
                  style={{
                    backgroundColor: accent.hex,
                    boxShadow: `0 6px 20px ${accent.glowRgba}`,
                  }}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Buy Now on {deal.dealStore || 'Amazon'}</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center pt-1">
                <a
                  href={deal.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-[11px] transition underline ${
                    isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  View original post on clearancedeals.info
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
