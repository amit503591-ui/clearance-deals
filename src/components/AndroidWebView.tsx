import React, { useState, useRef } from 'react';
import {
  RefreshCw,
  ExternalLink,
  Globe,
  Share2,
  Lock,
  WifiOff,
  Database,
  ArrowRight,
  Check,
} from 'lucide-react';
import { SwipeRefreshLayout } from './SwipeRefreshLayout';
import { useTheme } from '../context/ThemeContext';

interface AndroidWebViewProps {
  url?: string;
  isOnline: boolean;
  onOpenCachedDeals: () => void;
  cachedCount: number;
}

export const AndroidWebView: React.FC<AndroidWebViewProps> = ({
  url = 'https://clearancedeals.info/',
  isOnline,
  onOpenCachedDeals,
  cachedCount,
}) => {
  const { accent, isAMOLED, isDark } = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleReload = async () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
    await new Promise((resolve) => setTimeout(resolve, 800));
  };

  const handleOpenExternal = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Clearance Deals',
          url: url,
        });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {}
    }
  };

  return (
    <div
      className={`w-full flex-1 flex flex-col min-h-0 transition-colors duration-200 ${
        isAMOLED ? 'bg-black' : isDark ? 'bg-slate-950' : 'bg-slate-100'
      }`}
    >
      {/* Native-style Android Browser Address / App Bar */}
      <div
        className={`px-3 py-2 border-b flex items-center justify-between gap-2 text-xs shrink-0 transition-colors duration-200 ${
          isAMOLED
            ? 'bg-neutral-950 border-neutral-850'
            : isDark
            ? 'bg-slate-900 border-slate-800'
            : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        {/* Address pill */}
        <div
          className={`flex-1 flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs max-w-sm ${
            isAMOLED
              ? 'bg-black border-neutral-800'
              : isDark
              ? 'bg-slate-950 border-slate-800'
              : 'bg-slate-100 border-slate-200'
          }`}
        >
          <Lock className="w-3 h-3 text-emerald-500 shrink-0" />
          <span
            className={`font-mono truncate ${
              isDark ? 'text-slate-200' : 'text-slate-700'
            }`}
          >
            clearancedeals.info
          </span>
          <span
            className="text-[9px] font-semibold px-1.5 py-0.2 rounded ml-auto shrink-0 text-white"
            style={{ backgroundColor: accent.hex }}
          >
            WebView
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={handleReload}
            disabled={isLoading}
            className={`p-1.5 rounded-lg transition ${
              isDark
                ? 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
            title="Reload webview"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`}
              style={{ color: isLoading ? accent.hex : undefined }}
            />
          </button>

          <button
            onClick={handleShare}
            className={`p-1.5 rounded-lg transition ${
              isDark
                ? 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
            title="Share site"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Share2 className="w-3.5 h-3.5" />
            )}
          </button>

          <button
            onClick={handleOpenExternal}
            className={`p-1.5 rounded-lg transition ${
              isDark
                ? 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
            title="Open in External Browser"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Loading Progress Bar */}
      {isLoading && (
        <div
          className={`w-full h-1 overflow-hidden z-20 ${
            isDark ? 'bg-slate-900' : 'bg-slate-200'
          }`}
        >
          <div
            className="h-full animate-pulse w-full"
            style={{
              background: `linear-gradient(90deg, ${accent.hex}, #f59e0b)`,
            }}
          />
        </div>
      )}

      {/* Swipe to Refresh Gesture Wrapper */}
      <SwipeRefreshLayout
        onRefresh={handleReload}
        isRefreshing={isLoading}
        className="flex-1 flex flex-col"
      >
        {/* Pull Down Handle & Hint */}
        <div
          className={`w-full py-1.5 flex items-center justify-center gap-1.5 text-[10px] border-b ${
            isDark
              ? 'bg-slate-900/60 text-slate-400 border-slate-800/40'
              : 'bg-slate-100 text-slate-500 border-slate-200'
          }`}
        >
          <RefreshCw className="w-3 h-3" style={{ color: accent.hex }} />
          <span>Swipe down anywhere from top to reload clearancedeals.info</span>
        </div>

        {/* If Offline, Show Android Offline Fallback */}
        {!isOnline ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div
              className={`w-16 h-16 rounded-full border flex items-center justify-center text-amber-500 shadow-inner ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <WifiOff className="w-8 h-8" />
            </div>

            <div>
              <h3
                className={`font-bold text-base ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                WebView is Offline
              </h3>
              <p
                className={`text-xs mt-1 max-w-xs mx-auto ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Cannot connect to https://clearancedeals.info/ right now. Swipe down to refresh when back online.
              </p>
            </div>

            <div
              className={`p-3 rounded-2xl border text-xs max-w-xs space-y-2 ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-300'
                  : 'bg-white border-slate-200 text-slate-700 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 text-emerald-500 font-semibold">
                <Database className="w-4 h-4" />
                <span>{cachedCount} Latest Deals Available Offline</span>
              </div>
              <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                You can browse all previously cached latest clearance deals, prices, and specs in your offline cache storage.
              </p>
            </div>

            <button
              onClick={onOpenCachedDeals}
              className="px-5 py-2.5 rounded-xl text-white font-bold text-xs transition shadow-lg flex items-center gap-2 active:scale-98"
              style={{
                backgroundColor: accent.hex,
                boxShadow: `0 4px 14px ${accent.glowRgba}`,
              }}
            >
              <Database className="w-4 h-4" />
              <span>Open Offline Deals Cache</span>
            </button>
          </div>
        ) : (
          /* Live Website Iframe */
          <div className="flex-1 relative w-full h-[calc(100vh-160px)] min-h-[600px]">
            <iframe
              key={iframeKey}
              ref={iframeRef}
              src={url}
              title="Clearance Deals Website"
              className="w-full h-full border-none bg-white"
              onLoad={() => setIsLoading(false)}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation-by-user-activation"
            />
          </div>
        )}
      </SwipeRefreshLayout>
    </div>
  );
};
