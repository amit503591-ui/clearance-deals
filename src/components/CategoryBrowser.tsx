import React, { useRef } from 'react';
import {
  Flame,
  Home,
  Tv,
  Shirt,
  Gamepad2,
  Bike,
  Utensils,
  Footprints,
  ShoppingBag,
  Tag,
  ChevronRight,
} from 'lucide-react';
import { Category } from '../types/deal';
import { useTheme } from '../context/ThemeContext';
import { ScrollController } from './ScrollController';

interface CategoryBrowserProps {
  categories: Category[];
  selectedCategoryId: number;
  onSelectCategory: (id: number) => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  all: <Flame className="w-5 h-5 text-rose-500" />,
  'home-kitchen': <Home className="w-5 h-5 text-amber-500" />,
  electronics: <Tv className="w-5 h-5 text-sky-500" />,
  'clothing-shoes-jewelry': <Shirt className="w-5 h-5 text-pink-500" />,
  'video-games': <Gamepad2 className="w-5 h-5 text-purple-500" />,
  'sports-outdoors': <Bike className="w-5 h-5 text-emerald-500" />,
  'kitchen-knives-accessories': <Utensils className="w-5 h-5 text-orange-500" />,
  shoes: <Footprints className="w-5 h-5 text-indigo-500" />,
};

export const CategoryBrowser: React.FC<CategoryBrowserProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
}) => {
  const { accent, isAMOLED, isDark } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={scrollRef} className="relative w-full flex-1 h-full overflow-y-auto overscroll-y-contain touch-pan-y android-scrollbar">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-28 lg:pb-12 space-y-4 sm:space-y-6">
        <div
          className={`border-b pb-3 ${
            isAMOLED ? 'border-neutral-850' : isDark ? 'border-slate-800' : 'border-slate-200'
          }`}
        >
          <h2
            className={`text-xl sm:text-2xl font-bold flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            <Tag className="w-6 h-6" style={{ color: accent.hex }} />
            Clearance Departments & Categories
          </h2>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Browse deeply discounted clearance items by department from clearancedeals.info
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {categories.map((cat) => {
            const isSelected = selectedCategoryId === cat.id;
            const icon =
              CATEGORY_ICONS[cat.slug] || <ShoppingBag className="w-5 h-5 text-rose-500" />;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between text-left active:scale-[0.98] ${
                  isSelected
                    ? 'border-2 shadow-md text-white'
                    : isAMOLED
                    ? 'bg-neutral-950 border-neutral-850 hover:border-neutral-700 text-slate-200'
                    : isDark
                    ? 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800 shadow-xs'
                }`}
                style={{
                  backgroundColor: isSelected
                    ? isDark
                      ? `${accent.hex}25`
                      : `${accent.hex}15`
                    : undefined,
                  borderColor: isSelected ? accent.hex : undefined,
                  boxShadow: isSelected ? `0 2px 12px ${accent.glowRgba}` : undefined,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-xl border shrink-0 ${
                      isAMOLED
                        ? 'bg-black border-neutral-800'
                        : isDark
                        ? 'bg-slate-950 border-slate-800/80'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    {icon}
                  </div>
                  <div>
                    <h4
                      className={`text-xs sm:text-sm font-bold line-clamp-1 ${
                        isSelected
                          ? isDark
                            ? 'text-white'
                            : 'text-slate-900'
                          : isDark
                          ? 'text-slate-100'
                          : 'text-slate-900'
                      }`}
                    >
                      {cat.name}
                    </h4>
                    <span
                      className={`text-[11px] ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {cat.count ? `${cat.count}+ deals` : 'Clearance items'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-slate-400">
                  {isSelected && (
                    <span
                      className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-xs"
                      style={{
                        color: accent.hex,
                        borderColor: `${accent.hex}40`,
                        backgroundColor: `${accent.hex}20`,
                      }}
                    >
                      Active
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <ScrollController scrollContainerRef={scrollRef} />
    </div>
  );
};
