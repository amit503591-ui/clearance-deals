import React from 'react';
import { Flame, LayoutGrid, Heart, HardDrive, Globe, BookOpen } from 'lucide-react';
import { ActiveTab } from '../types/deal';
import { useTheme } from '../context/ThemeContext';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  bookmarkCount: number;
  isOffline: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  bookmarkCount,
  isOffline,
}) => {
  const { accent, isAMOLED, isDark } = useTheme();

  const tabs = [
    {
      id: 'feed' as ActiveTab,
      label: 'Deals',
      icon: Flame,
    },
    {
      id: 'webview' as ActiveTab,
      label: 'WebView',
      icon: Globe,
    },
    {
      id: 'categories' as ActiveTab,
      label: 'Categories',
      icon: LayoutGrid,
    },
    {
      id: 'saved' as ActiveTab,
      label: 'Saved',
      icon: Heart,
      badge: bookmarkCount > 0 ? bookmarkCount : undefined,
    },
    {
      id: 'readme' as ActiveTab,
      label: 'Docs',
      icon: BookOpen,
    },
    {
      id: 'offline' as ActiveTab,
      label: 'Offline',
      icon: HardDrive,
      dot: isOffline,
    },
  ];

  return (
    <nav
      className={`w-full backdrop-blur-lg border-t px-2 py-1.5 flex items-center justify-around z-30 sticky bottom-0 select-none lg:hidden transition-colors duration-200 ${
        isAMOLED
          ? 'bg-black/95 border-neutral-850'
          : isDark
          ? 'bg-slate-950/95 border-slate-800/80'
          : 'bg-white/95 border-slate-200/90 shadow-md'
      }`}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 py-1 px-0.5 flex flex-col items-center justify-center transition-all duration-200 relative group rounded-xl ${
              isActive
                ? 'font-bold'
                : isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            style={{ color: isActive ? accent.hex : undefined }}
          >
            <div
              className={`p-1 rounded-full transition-all duration-200 relative ${
                isActive ? 'shadow-xs' : 'group-hover:opacity-80'
              }`}
              style={{
                backgroundColor: isActive ? `${accent.hex}22` : undefined,
              }}
            >
              <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />

              {tab.badge !== undefined && (
                <span
                  className="absolute -top-1 -right-2 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-scaleIn"
                  style={{ backgroundColor: accent.hex }}
                >
                  {tab.badge > 99 ? '99+' : tab.badge}
                </span>
              )}

              {tab.dot && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-slate-950 animate-pulse" />
              )}
            </div>

            <span className="text-[9px] sm:text-[10px] mt-0.5 tracking-tight font-medium">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
