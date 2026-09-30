import React from 'react';
import {
  Zap,
  Search,
  LayoutGrid,
  List,
  RefreshCw,
  Globe,
  Heart,
  HardDrive,
  Flame,
  Palette,
  Sun,
  Moon,
  BookOpen,
  Download,
} from 'lucide-react';
import { ActiveTab } from '../types/deal';
import { PWAInstallButton } from './PWAInstallButton';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  showSearch: boolean;
  onToggleSearch: () => void;
  viewLayout: 'list' | 'grid';
  onToggleLayout: () => void;
  isOnline: boolean;
  onRefresh: () => void;
  isRefreshing: boolean;
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  bookmarkCount?: number;
  onOpenThemeModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  showSearch,
  onToggleSearch,
  viewLayout,
  onToggleLayout,
  onRefresh,
  isRefreshing,
  activeTab,
  onTabChange,
  bookmarkCount = 0,
  onOpenThemeModal,
}) => {
  const { accent, isAMOLED, isDark, toggleTheme } = useTheme();

  const desktopTabs: { id: ActiveTab; label: string; icon: any; badge?: number }[] = [
    { id: 'feed', label: 'Deals', icon: Flame },
    { id: 'webview', label: 'WebView', icon: Globe },
    { id: 'categories', label: 'Categories', icon: LayoutGrid },
    { id: 'saved', label: 'Saved', icon: Heart, badge: bookmarkCount > 0 ? bookmarkCount : undefined },
    { id: 'readme', label: 'Readme / Docs', icon: BookOpen },
    { id: 'offline', label: 'Offline', icon: HardDrive },
  ];

  return (
    <header
      className={`sticky top-0 z-20 backdrop-blur-md border-b px-3 sm:px-6 lg:px-8 py-2.5 transition-colors duration-200 ${
        isAMOLED
          ? 'bg-black/95 border-neutral-850'
          : isDark
          ? 'bg-slate-950/95 border-slate-800/80'
          : 'bg-white/95 border-slate-200/90 shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div
          onClick={() => onTabChange('feed')}
          className="flex items-center gap-2 cursor-pointer group shrink-0"
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition"
            style={{
              backgroundColor: accent.hex,
              boxShadow: `0 4px 12px ${accent.glowRgba}`,
            }}
          >
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span
                className={`font-extrabold text-sm sm:text-base tracking-tight transition ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                CLEARANCE
              </span>
              <span
                className="text-[10px] font-black px-1.5 py-0.2 rounded text-white shadow-sm"
                style={{ backgroundColor: accent.hex }}
              >
                DEALS
              </span>
            </div>
            <span
              className={`text-[10px] font-mono block mt-0.5 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              clearancedeals.info
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation Tabs */}
        <div
          className={`hidden lg:flex items-center gap-1 p-1 rounded-2xl border transition-colors duration-200 ${
            isAMOLED
              ? 'bg-neutral-950 border-neutral-850'
              : isDark
              ? 'bg-slate-900/80 border-slate-800/80'
              : 'bg-slate-100/90 border-slate-200'
          }`}
        >
          {desktopTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition relative ${
                  isActive
                    ? 'text-white shadow-sm'
                    : isDark
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
                style={{
                  backgroundColor: isActive ? accent.hex : undefined,
                  boxShadow: isActive ? `0 2px 10px ${accent.glowRgba}` : undefined,
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`ml-0.5 text-[10px] font-black px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white text-slate-950' : 'text-white'
                    }`}
                    style={{ backgroundColor: isActive ? undefined : accent.hex }}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Center/Right: Desktop Inline Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xs lg:max-w-sm relative items-center">
          <Search
            className={`w-3.5 h-3.5 absolute left-3 pointer-events-none ${
              isDark ? 'text-slate-400' : 'text-slate-400'
            }`}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search latest clearance deals..."
            className={`w-full rounded-xl pl-8 pr-7 py-1.5 text-xs focus:outline-none transition ${
              isAMOLED
                ? 'bg-neutral-900 border border-neutral-800 text-white placeholder-slate-400 focus:border-neutral-600'
                : isDark
                ? 'bg-slate-900 border border-slate-800 text-white placeholder-slate-400 focus:border-slate-700'
                : 'bg-slate-100 border border-slate-200 text-slate-900 placeholder-slate-500 focus:border-slate-400 focus:bg-white'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className={`absolute right-2 text-xs font-bold ${
                isDark ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-800'
              }`}
            >
              ✕
            </button>
          )}
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Direct APK Download Button */}
          <a
            href="/ClearanceDeals-v1.0.apk"
            download="ClearanceDeals-v1.0.apk"
            className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl text-white font-bold text-xs transition shadow-sm hover:scale-105 active:scale-95 shrink-0"
            style={{
              backgroundColor: accent.hex,
              boxShadow: `0 2px 10px ${accent.glowRgba}`,
            }}
            title="Download Android APK file directly (~73 KB)"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">APK</span>
          </a>

          {/* Readme / Docs Toggle */}
          <button
            onClick={() => onTabChange(activeTab === 'readme' ? 'feed' : 'readme')}
            className={`p-2 rounded-xl transition ${
              activeTab === 'readme'
                ? 'text-white shadow-sm'
                : isAMOLED
                ? 'bg-neutral-900 text-slate-300 hover:text-white'
                : isDark
                ? 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800'
                : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
            }`}
            style={{
              backgroundColor: activeTab === 'readme' ? accent.hex : undefined,
            }}
            title="App Readme & Features"
          >
            <BookOpen className="w-4 h-4" />
          </button>

          {/* Mobile search toggle */}
          <button
            onClick={onToggleSearch}
            className={`p-2 rounded-xl transition md:hidden ${
              showSearch
                ? 'text-white shadow-sm'
                : isAMOLED
                ? 'bg-neutral-900 text-slate-400 hover:text-white'
                : isDark
                ? 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
            style={{ backgroundColor: showSearch ? accent.hex : undefined }}
            title="Search deals"
          >
            <Search className="w-4 h-4" />
          </button>

          {activeTab === 'feed' && (
            <button
              onClick={onToggleLayout}
              className={`p-2 rounded-xl transition ${
                isAMOLED
                  ? 'bg-neutral-900 text-slate-400 hover:text-white'
                  : isDark
                  ? 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
              title={viewLayout === 'list' ? 'Switch to Grid view' : 'Switch to List view'}
            >
              {viewLayout === 'list' ? (
                <LayoutGrid className="w-4 h-4" />
              ) : (
                <List className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Quick 1-Tap Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl transition ${
              isAMOLED
                ? 'bg-neutral-900 text-amber-300 hover:text-amber-200'
                : isDark
                ? 'bg-slate-900 text-amber-400 hover:text-amber-300 hover:bg-slate-800'
                : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
            }`}
            title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Theme & Material You Accents Button */}
          <button
            onClick={onOpenThemeModal}
            className={`p-2 rounded-xl transition flex items-center gap-1 relative ${
              isAMOLED
                ? 'bg-neutral-900 text-slate-300 hover:text-white'
                : isDark
                ? 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800'
                : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
            }`}
            title="Customize AMOLED & Material You theme"
          >
            <Palette className="w-4 h-4" />
            <span
              className="w-2 h-2 rounded-full absolute top-1.5 right-1.5 shadow-sm"
              style={{ backgroundColor: accent.hex }}
            />
          </button>

          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className={`p-2 rounded-xl transition disabled:opacity-50 ${
              isAMOLED
                ? 'bg-neutral-900 text-slate-400 hover:text-white'
                : isDark
                ? 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
            title="Reload content"
          >
            <RefreshCw
              className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
              style={{ color: isRefreshing ? accent.hex : undefined }}
            />
          </button>

          <div className="hidden sm:block">
            <PWAInstallButton />
          </div>
        </div>
      </div>

      {/* Mobile Search Input Drawer */}
      {showSearch && (
        <div className="mt-2.5 pt-2 border-t border-slate-800/60 md:hidden animate-slideDown">
          <div className="relative flex items-center">
            <Search
              className={`w-4 h-4 absolute left-3 ${
                isDark ? 'text-slate-400' : 'text-slate-400'
              }`}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search latest clearance deals..."
              autoFocus
              className={`w-full rounded-xl pl-9 pr-8 py-2 text-xs focus:outline-none transition ${
                isAMOLED
                  ? 'bg-neutral-900 border border-neutral-800 text-white placeholder-slate-400'
                  : isDark
                  ? 'bg-slate-900 border border-slate-800 text-white placeholder-slate-400'
                  : 'bg-slate-100 border border-slate-200 text-slate-900 placeholder-slate-500 focus:bg-white'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 text-xs font-bold text-slate-400"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
