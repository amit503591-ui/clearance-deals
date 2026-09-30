import React, { useState, useRef } from 'react';
import {
  HardDrive,
  Download,
  Trash2,
  Wifi,
  WifiOff,
  CheckCircle2,
  Smartphone,
  Database,
  Palette,
  BatteryCharging,
  Sparkles,
  Sun,
  Moon,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CacheMetadata } from '../types/deal';
import { dealsApi } from '../services/dealsApi';
import { PWAInstallButton } from './PWAInstallButton';
import { useTheme } from '../context/ThemeContext';
import { ScrollController } from './ScrollController';

interface OfflineManagerProps {
  cacheMeta: CacheMetadata;
  isOnline: boolean;
  simulatedOffline: boolean;
  onToggleSimulated: () => void;
  onRefreshData: () => Promise<void>;
  onClearCache: () => Promise<void>;
  onOpenThemeModal: () => void;
}

export const OfflineManager: React.FC<OfflineManagerProps> = ({
  cacheMeta,
  isOnline,
  simulatedOffline,
  onToggleSimulated,
  onRefreshData,
  onClearCache,
  onOpenThemeModal,
}) => {
  const { themeMode, accent, isAMOLED, isDark, toggleTheme } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [clearing, setClearing] = useState(false);

  const handlePrecacheAll = async () => {
    setDownloading(true);
    setDownloadProgress(10);
    setDownloadSuccess(false);

    try {
      await dealsApi.precacheBatchDeals((count, total) => {
        const pct = Math.min(95, Math.round((count / total) * 100));
        setDownloadProgress(pct);
      });

      setDownloadProgress(100);
      setDownloadSuccess(true);
      await onRefreshData();

      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {}

      setTimeout(() => {
        setDownloading(false);
      }, 1500);
    } catch {
      setDownloading(false);
    }
  };

  const handleClear = async () => {
    if (window.confirm('Are you sure you want to clear your offline clearance deals cache?')) {
      setClearing(true);
      await onClearCache();
      setClearing(false);
    }
  };

  const formatLastSync = (timestamp: number) => {
    if (!timestamp) return 'Never';
    const diffMin = Math.floor((Date.now() - timestamp) / 60000);
    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin} min ago`;
    const diffHours = Math.floor(diffMin / 60);
    return `${diffHours} hour(s) ago`;
  };

  return (
    <div ref={scrollRef} className="relative w-full flex-1 h-full overflow-y-auto overscroll-y-contain touch-pan-y android-scrollbar">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-28 lg:pb-12 space-y-6">
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
          <Database className="w-6 h-6" style={{ color: accent.hex }} />
          Offline Cache & App Settings
        </h2>
        <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Manage local IndexedDB storage, Dark / Light mode, and Android Material You themes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Storage Stats Card */}
        <div
          className={`p-5 rounded-3xl border shadow-xs space-y-4 ${
            isAMOLED
              ? 'bg-neutral-950 border-neutral-800'
              : isDark
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200'
          }`}
        >
          <h3
            className={`font-bold text-sm flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            <HardDrive className="w-4 h-4" style={{ color: accent.hex }} />
            Device Storage Status
          </h3>

          <div className="grid grid-cols-2 gap-3.5">
            <div
              className={`p-4 rounded-2xl border ${
                isAMOLED
                  ? 'bg-black border-neutral-850'
                  : isDark
                  ? 'bg-slate-950 border-slate-800/80'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <span
                className={`text-xs font-medium block ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Stored Deals
              </span>
              <span
                className="text-2xl sm:text-3xl font-black"
                style={{ color: accent.hex }}
              >
                {cacheMeta.totalDeals || 0}
              </span>
              <span
                className={`text-[11px] block mt-0.5 ${
                  isDark ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                Deals in IndexedDB
              </span>
            </div>

            <div
              className={`p-4 rounded-2xl border ${
                isAMOLED
                  ? 'bg-black border-neutral-850'
                  : isDark
                  ? 'bg-slate-950 border-slate-800/80'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <span
                className={`text-xs font-medium block ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Cache Footprint
              </span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-500">
                {cacheMeta.estimatedSizeKb || 0} <span className="text-sm font-normal">KB</span>
              </span>
              <span
                className={`text-[11px] block mt-0.5 ${
                  isDark ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                High-speed storage
              </span>
            </div>
          </div>

          <div
            className={`space-y-2.5 pt-1 text-xs ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            <div
              className={`flex items-center justify-between py-1.5 border-t ${
                isDark ? 'border-slate-800/60' : 'border-slate-100'
              }`}
            >
              <span>Last Synchronized:</span>
              <span className={`font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                {formatLastSync(cacheMeta.lastSync)}
              </span>
            </div>

            <div
              className={`flex items-center justify-between py-1.5 border-t ${
                isDark ? 'border-slate-800/60' : 'border-slate-100'
              }`}
            >
              <span>Service Worker Cache:</span>
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-500">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Active (Deals & Product Photos)
              </span>
            </div>
          </div>
        </div>

        {/* Display Appearance & Quick Theme Card */}
        <div
          className={`p-5 rounded-3xl border shadow-xs space-y-4 flex flex-col justify-between ${
            isAMOLED
              ? 'bg-neutral-950 border-neutral-800'
              : isDark
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200'
          }`}
        >
          <div>
            <div className="flex items-center justify-between">
              <h3
                className={`text-sm sm:text-base font-bold flex items-center gap-2 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                <Palette className="w-4 h-4" style={{ color: accent.hex }} />
                Dark / Light Mode & Material You
              </h3>
              {isAMOLED && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                  <BatteryCharging className="w-3 h-3" />
                  <span>OLED Saver</span>
                </span>
              )}
            </div>

            <p className={`text-xs mt-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Current theme:{' '}
              <strong className={isDark ? 'text-white capitalize' : 'text-slate-900 capitalize'}>
                {themeMode === 'amoled' ? 'AMOLED Pure-Black' : `${themeMode} Mode`}
              </strong>
              {' '}with{' '}
              <strong style={{ color: accent.hex }}>{accent.name}</strong> accent.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <button
              onClick={toggleTheme}
              className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                isDark
                  ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              <span>{isDark ? 'Switch to Light' : 'Switch to Dark'}</span>
            </button>

            <button
              onClick={onOpenThemeModal}
              className="py-2.5 px-3 rounded-xl text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-md active:scale-98"
              style={{
                backgroundColor: accent.hex,
                boxShadow: `0 3px 10px ${accent.glowRgba}`,
              }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Customize Colors</span>
            </button>
          </div>
        </div>

        {/* 1-Tap Preload Deals */}
        <div
          className={`p-5 rounded-3xl border space-y-4 flex flex-col justify-between ${
            isAMOLED
              ? 'bg-neutral-950 border-neutral-800'
              : isDark
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200'
          }`}
        >
          <div>
            <h3
              className={`text-base font-bold flex items-center gap-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              <Download className="w-5 h-5" style={{ color: accent.hex }} />
              Preload Deals for Offline Reading
            </h3>
            <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Save the latest clearance deals and preload images onto your device so you can browse anywhere without Wi-Fi or cellular service.
            </p>
          </div>

          <div className="pt-2">
            {downloading ? (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold" style={{ color: accent.hex }}>
                  <span>Caching clearance deals & images...</span>
                  <span>{downloadProgress}%</span>
                </div>
                <div
                  className={`w-full h-3 rounded-full overflow-hidden border ${
                    isAMOLED
                      ? 'bg-black border-neutral-800'
                      : isDark
                      ? 'bg-slate-950 border-slate-800'
                      : 'bg-slate-100 border-slate-200'
                  }`}
                >
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      width: `${downloadProgress}%`,
                      backgroundColor: accent.hex,
                    }}
                  />
                </div>
              </div>
            ) : (
              <button
                onClick={handlePrecacheAll}
                disabled={downloading}
                className="w-full py-3 px-4 rounded-xl text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-lg active:scale-98"
                style={{
                  backgroundColor: accent.hex,
                  boxShadow: `0 4px 14px ${accent.glowRgba}`,
                }}
              >
                <Download className="w-4 h-4" />
                <span>Preload 40+ Latest Deals Now</span>
              </button>
            )}

            {downloadSuccess && (
              <div className="text-xs text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/40 p-3 rounded-xl flex items-center gap-2 mt-3">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>All latest clearance deals and images cached offline successfully!</span>
              </div>
            )}
          </div>
        </div>

        {/* Offline Simulator & Install Card */}
        <div
          className={`p-5 rounded-3xl border space-y-4 flex flex-col justify-between ${
            isAMOLED
              ? 'bg-neutral-950 border-neutral-800'
              : isDark
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200'
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2.5 rounded-2xl shrink-0 ${
                    isDark ? 'bg-slate-800 text-amber-400' : 'bg-amber-50 text-amber-600 border border-amber-200'
                  }`}
                >
                  {simulatedOffline ? (
                    <WifiOff className="w-6 h-6 text-amber-500" />
                  ) : (
                    <Wifi className="w-6 h-6 text-emerald-500" />
                  )}
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Simulate Offline Mode
                  </h4>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Test offline cache without turning off device Wi-Fi
                  </p>
                </div>
              </div>

              <button
                onClick={onToggleSimulated}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  simulatedOffline ? 'bg-amber-500' : isDark ? 'bg-slate-700' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    simulatedOffline ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <p
              className={`text-xs p-3 rounded-2xl border ${
                isAMOLED
                  ? 'bg-black border-neutral-850'
                  : isDark
                  ? 'bg-slate-950 border-slate-800/80 text-slate-300'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              Network State:{' '}
              <strong className={isOnline ? 'text-emerald-500 font-bold' : 'text-amber-500 font-bold'}>
                {isOnline ? 'ONLINE (Connecting directly to live REST API)' : 'OFFLINE (Serving purely from local IndexedDB cache)'}
              </strong>
            </p>
          </div>

          <div
            className={`flex items-center justify-between pt-1 border-t ${
              isDark ? 'border-slate-800/60' : 'border-slate-100'
            }`}
          >
            <PWAInstallButton />
            <button
              onClick={handleClear}
              disabled={clearing}
              className={`flex items-center gap-1.5 text-xs transition p-2 rounded-xl ${
                isDark
                  ? 'text-slate-400 hover:text-red-400 hover:bg-slate-800/60'
                  : 'text-slate-500 hover:text-red-600 hover:bg-slate-100'
              }`}
            >
              <Trash2 className="w-4 h-4" />
              <span>{clearing ? 'Clearing...' : 'Clear Cache'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <ScrollController scrollContainerRef={scrollRef} />
  </div>
);
};
