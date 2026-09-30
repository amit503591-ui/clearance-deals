import React, { useRef, useState } from 'react';
import {
  Download,
  Smartphone,
  ShieldCheck,
  Zap,
  Globe,
  Palette,
  Heart,
  Tag,
  ArrowUp,
  ArrowDown,
  Layers,
  FileCode,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Sparkles,
  HelpCircle,
  HardDrive,
  Copy,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../context/ThemeContext';
import { ScrollController } from './ScrollController';
import { PWAInstallButton } from './PWAInstallButton';
import { ActiveTab } from '../types/deal';

interface ReadmePageProps {
  onOpenTab: (tab: ActiveTab) => void;
}

export const ReadmePage: React.FC<ReadmePageProps> = ({ onOpenTab }) => {
  const { accent, isAMOLED, isDark } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleDownloadApk = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {}

    const link = document.createElement('a');
    link.href = '/ClearanceDeals-v1.0.apk';
    link.download = 'ClearanceDeals-v1.0.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyApkUrl = async () => {
    const fullUrl = `${window.location.origin}/ClearanceDeals-v1.0.apk`;
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {}
  };

  return (
    <div
      ref={scrollRef}
      className="relative w-full flex-1 h-full overflow-y-auto overscroll-y-contain touch-pan-y android-scrollbar"
    >
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-28 lg:pb-16 space-y-8">
        {/* Hero Section */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border shadow-xl relative overflow-hidden ${
            isAMOLED
              ? 'bg-neutral-950 border-neutral-800'
              : isDark
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200'
          }`}
        >
          {/* Ambient Glow */}
          <div
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ backgroundColor: accent.hex }}
          />

          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm flex items-center gap-1.5"
                style={{ backgroundColor: accent.hex }}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Android App v1.0.0</span>
              </span>

              <span
                className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${
                  isDark
                    ? 'border-slate-700 bg-slate-800/60 text-slate-300'
                    : 'border-slate-200 bg-slate-100 text-slate-700'
                }`}
              >
                Production Release • APK & PWA
              </span>
            </div>

            <div>
              <h1
                className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Clearance Deals Android App
              </h1>
              <p
                className={`text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                The official installable mobile application for{' '}
                <a
                  href="https://clearancedeals.info/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline hover:opacity-80"
                  style={{ color: accent.hex }}
                >
                  clearancedeals.info
                </a>
                . Engineered with 100% offline IndexedDB storage, Material You dynamic theming, AMOLED battery saver, and instant Amazon clearance markdown price tracking.
              </p>
            </div>

            {/* Main Action CTAs: Direct APK & PWA Install */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleDownloadApk}
                className="py-3 px-5 rounded-2xl text-white font-extrabold text-sm sm:text-base transition flex items-center gap-2.5 shadow-xl active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: accent.hex,
                  boxShadow: `0 8px 24px ${accent.glowRgba}`,
                }}
              >
                <Download className="w-5 h-5" />
                <span>Download APK (Direct Android File)</span>
                <span className="text-[11px] bg-black/25 px-2 py-0.5 rounded-full font-mono font-normal">
                  ~73 KB
                </span>
              </button>

              <PWAInstallButton />

              <button
                onClick={handleCopyApkUrl}
                className={`py-3 px-4 rounded-2xl border text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                  isDark
                    ? 'bg-slate-850 hover:bg-slate-800 text-slate-200 border-slate-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                }`}
                title="Copy direct APK download link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? 'Link Copied!' : 'Copy APK Link'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="space-y-4">
          <div className="border-b pb-2 flex items-center justify-between">
            <h2
              className={`text-lg sm:text-xl font-extrabold flex items-center gap-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              <Sparkles className="w-5 h-5" style={{ color: accent.hex }} />
              <span>Complete Feature Overview</span>
            </h2>
            <span
              className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
            >
              7 Major Modules Built-in
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Feature 1: Latest Clearance Deals */}
            <div
              className={`p-5 rounded-3xl border space-y-2.5 shadow-xs transition-colors duration-200 ${
                isAMOLED
                  ? 'bg-neutral-950 border-neutral-800'
                  : isDark
                  ? 'bg-slate-900/90 border-slate-800'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-2xl flex items-center justify-center text-white shrink-0"
                  style={{ backgroundColor: accent.hex }}
                >
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3
                    className={`font-bold text-sm sm:text-base ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    1. Real-Time Latest Deals Feed
                  </h3>
                  <span
                    className={`text-[11px] ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Direct sync with clearancedeals.info
                  </span>
                </div>
              </div>
              <p
                className={`text-xs leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Pulls active discount posts from the WordPress REST API, extracts clean product titles, parses markdown prices vs list prices, computes percentage off (-30% to -80%), checks in-stock status, and provides 1-tap direct Amazon checkout links.
              </p>
              <div className="pt-1">
                <button
                  onClick={() => onOpenTab('feed')}
                  className="text-xs font-bold transition inline-flex items-center gap-1 hover:underline"
                  style={{ color: accent.hex }}
                >
                  <span>Open Deals Feed</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Feature 2: 100% Offline IndexedDB */}
            <div
              className={`p-5 rounded-3xl border space-y-2.5 shadow-xs transition-colors duration-200 ${
                isAMOLED
                  ? 'bg-neutral-950 border-neutral-800'
                  : isDark
                  ? 'bg-slate-900/90 border-slate-800'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-2xl flex items-center justify-center text-white shrink-0 bg-emerald-600"
                >
                  <HardDrive className="w-4 h-4" />
                </div>
                <div>
                  <h3
                    className={`font-bold text-sm sm:text-base ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    2. 100% Offline IndexedDB Storage
                  </h3>
                  <span
                    className={`text-[11px] ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Zero-latency offline browsing anywhere
                  </span>
                </div>
              </div>
              <p
                className={`text-xs leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Every deal, image URL, category, and user bookmark is persisted inside your Android device's native IndexedDB database. Includes 1-tap "Preload 40+ Latest Deals" button and simulated offline toggling to test offline resilience.
              </p>
              <div className="pt-1">
                <button
                  onClick={() => onOpenTab('offline')}
                  className="text-xs font-bold transition inline-flex items-center gap-1 hover:underline text-emerald-500"
                >
                  <span>Open Offline Cache Manager</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Feature 3: Material You & AMOLED Themes */}
            <div
              className={`p-5 rounded-3xl border space-y-2.5 shadow-xs transition-colors duration-200 ${
                isAMOLED
                  ? 'bg-neutral-950 border-neutral-800'
                  : isDark
                  ? 'bg-slate-900/90 border-slate-800'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-2xl flex items-center justify-center text-white shrink-0 bg-purple-600"
                >
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <h3
                    className={`font-bold text-sm sm:text-base ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    3. Material You & AMOLED Themes
                  </h3>
                  <span
                    className={`text-[11px] ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Dynamic color system & battery saving
                  </span>
                </div>
              </div>
              <p
                className={`text-xs leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Supports 3 display modes: AMOLED Pure-Black (#000000 pixels turned off to save battery on OLED screens), Slate Dark mode, and High-Contrast Light mode. Includes 5 Android Material You dynamic accent palettes: Crimson, Emerald, Blue, Violet, and Amber.
              </p>
            </div>

            {/* Feature 4: Interactive Up/Down Arrows & Scroll Slider */}
            <div
              className={`p-5 rounded-3xl border space-y-2.5 shadow-xs transition-colors duration-200 ${
                isAMOLED
                  ? 'bg-neutral-950 border-neutral-800'
                  : isDark
                  ? 'bg-slate-900/90 border-slate-800'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-2xl flex items-center justify-center text-white shrink-0 bg-blue-600"
                >
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3
                    className={`font-bold text-sm sm:text-base ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    4. Up/Down Arrows & Touch Slider
                  </h3>
                  <span
                    className={`text-[11px] ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Smooth scrolling on all Android devices
                  </span>
                </div>
              </div>
              <p
                className={`text-xs leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Fixed Android touch scrolling with <code>touch-action: pan-y</code> and <code>100dvh</code> bounds. Features floating Up (▲) and Down (▼) arrow buttons with haptic vibration, plus a real-time vertical draggable slider track on the right edge to scrub through deals instantly.
              </p>
            </div>

            {/* Feature 5: Native Android WebView */}
            <div
              className={`p-5 rounded-3xl border space-y-2.5 shadow-xs transition-colors duration-200 ${
                isAMOLED
                  ? 'bg-neutral-950 border-neutral-800'
                  : isDark
                  ? 'bg-slate-900/90 border-slate-800'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-2xl flex items-center justify-center text-white shrink-0 bg-cyan-600"
                >
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h3
                    className={`font-bold text-sm sm:text-base ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    5. Native Android WebView Tab
                  </h3>
                  <span
                    className={`text-[11px] ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Embedded live site browser
                  </span>
                </div>
              </div>
              <p
                className={`text-xs leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Embedded WebView tab allows you to browse the live clearancedeals.info website directly inside the app, equipped with SSL lock badge, swipe-down reload, URL sharing, external browser launch, and offline fallback to cached deals.
              </p>
              <div className="pt-1">
                <button
                  onClick={() => onOpenTab('webview')}
                  className="text-xs font-bold transition inline-flex items-center gap-1 hover:underline text-cyan-500"
                >
                  <span>Open WebView Tab</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Feature 6: Categories & Budget Filters */}
            <div
              className={`p-5 rounded-3xl border space-y-2.5 shadow-xs transition-colors duration-200 ${
                isAMOLED
                  ? 'bg-neutral-950 border-neutral-800'
                  : isDark
                  ? 'bg-slate-900/90 border-slate-800'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-2xl flex items-center justify-center text-white shrink-0 bg-amber-600"
                >
                  <Tag className="w-4 h-4" />
                </div>
                <div>
                  <h3
                    className={`font-bold text-sm sm:text-base ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    6. Department & Budget Filters
                  </h3>
                  <span
                    className={`text-[11px] ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Find bargains fast by department
                  </span>
                </div>
              </div>
              <p
                className={`text-xs leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Browse clearance departments: Home & Kitchen, Electronics, Shoes, Video Games, Sports & Outdoors, and Clothing. Filter instantly with quick budget chips: "Under $25", "Under $50", or "50%+ OFF".
              </p>
              <div className="pt-1">
                <button
                  onClick={() => onOpenTab('categories')}
                  className="text-xs font-bold transition inline-flex items-center gap-1 hover:underline text-amber-500"
                >
                  <span>Browse Categories</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Android APK Installation Guide */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border shadow-md space-y-5 ${
            isAMOLED
              ? 'bg-neutral-950 border-neutral-800'
              : isDark
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-2xl flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: accent.hex }}
            >
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2
                className={`text-lg sm:text-xl font-extrabold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                How to Install the APK on Your Android Device
              </h2>
              <span
                className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
              >
                Direct installation instructions without Google Play Store
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 pt-2">
            {[
              {
                step: '01',
                title: 'Download APK',
                desc: 'Tap the "Download APK" button above to save ClearanceDeals-v1.0.apk to your phone.',
              },
              {
                step: '02',
                title: 'Open Downloaded File',
                desc: 'Tap the download notification or find the file in your Android "Files" or "Downloads" app.',
              },
              {
                step: '03',
                title: 'Enable Unknown Apps',
                desc: 'If prompted by Android security, toggle "Allow from this source" for your browser.',
              },
              {
                step: '04',
                title: 'Tap Install',
                desc: 'Confirm by pressing "Install". The Clearance Deals app icon will appear on your home screen!',
              },
            ].map((s) => (
              <div
                key={s.step}
                className={`p-4 rounded-2xl border space-y-2 ${
                  isAMOLED
                    ? 'bg-black border-neutral-850'
                    : isDark
                    ? 'bg-slate-950 border-slate-800/80'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div
                  className="text-xs font-black px-2 py-0.5 rounded-md inline-block text-white"
                  style={{ backgroundColor: accent.hex }}
                >
                  STEP {s.step}
                </div>
                <h4
                  className={`text-xs sm:text-sm font-bold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {s.title}
                </h4>
                <p
                  className={`text-[11px] leading-relaxed ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Alternative 1-Click PWA Installation note */}
          <div
            className={`p-4 rounded-2xl border text-xs flex items-center justify-between gap-3 ${
              isDark
                ? 'bg-slate-800/40 border-slate-700/60 text-slate-300'
                : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>
                <strong>Alternative (PWA):</strong> You can also tap <strong>"Install App"</strong> to install directly through your mobile browser without downloading external files!
              </span>
            </div>
            <PWAInstallButton />
          </div>
        </div>

        {/* Technical Specifications Table */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border shadow-md space-y-4 ${
            isAMOLED
              ? 'bg-neutral-950 border-neutral-800'
              : isDark
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5" style={{ color: accent.hex }} />
            <h2
              className={`text-lg font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              App Specifications & Architecture
            </h2>
          </div>

          <div
            className={`rounded-2xl border overflow-hidden text-xs divide-y ${
              isAMOLED
                ? 'border-neutral-800 divide-neutral-850'
                : isDark
                ? 'border-slate-800 divide-slate-800'
                : 'border-slate-200 divide-slate-100'
            }`}
          >
            {[
              { label: 'Application Name', val: 'Clearance Deals' },
              { label: 'Package Name', val: 'info.clearancedeals.app' },
              { label: 'Version', val: 'v1.0.0 (Build 2026.09.30)' },
              { label: 'Target Platform', val: 'Android 5.0+ (API 21 to 34) & Web' },
              { label: 'Direct Download File', val: '/ClearanceDeals-v1.0.apk (72.9 KB)' },
              { label: 'Data Source', val: 'https://clearancedeals.info/ (REST API)' },
              { label: 'Offline Storage', val: 'IndexedDB (stores: deals, settings) + CacheStorage' },
              { label: 'Service Worker', val: 'Workbox v7 with StaleWhileRevalidate & CacheFirst' },
              { label: 'Technology Stack', val: 'React 19, TypeScript, Vite 8, Tailwind CSS 4' },
            ].map((row, idx) => (
              <div
                key={idx}
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 gap-1 ${
                  idx % 2 === 0
                    ? isDark
                      ? 'bg-slate-950/40'
                      : 'bg-slate-50/60'
                    : 'bg-transparent'
                }`}
              >
                <span className={`font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {row.label}
                </span>
                <span className={`font-mono font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  {row.val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center pt-2 pb-4 space-y-2">
          <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            © 2026 Clearance Deals. All markdown prices and verified stock verified from{' '}
            <a
              href="https://clearancedeals.info/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              clearancedeals.info
            </a>
          </p>
        </div>
      </div>

      {/* Up/Down Arrows & Draggable Scroll Slider */}
      <ScrollController scrollContainerRef={scrollRef} />
    </div>
  );
};
