import React, { useState } from 'react';
import { Download, Smartphone, CheckCircle, X, ExternalLink, ShieldCheck } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);
  const [installing, setInstalling] = useState(false);

  if (isInstalled) {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-medium">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Installed App</span>
      </div>
    );
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      setInstalling(true);
      try {
        const success = await install();
        if (!success) {
          setShowGuide(true);
        }
      } catch {
        setShowGuide(true);
      } finally {
        setInstalling(false);
      }
    } else {
      setShowGuide(true);
    }
  };

  return (
    <>
      <button
        onClick={handleInstallClick}
        disabled={installing}
        className={`flex items-center gap-1.5 font-semibold transition active:scale-95 shadow-md ${
          compact
            ? 'px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs'
            : 'px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-sm shadow-rose-950/50'
        }`}
        title="Install Clearance Deals App to Android"
      >
        <Download className="w-4 h-4 animate-bounce" />
        <span>{installing ? 'Installing...' : 'Install App'}</span>
      </button>

      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-700/80 p-6 shadow-2xl text-slate-100 relative">
            <button
              onClick={() => setShowGuide(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-600 to-red-700 flex items-center justify-center shadow-lg shadow-rose-900/40">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Install on Android</h3>
                <p className="text-xs text-rose-400 font-medium">Clearance Deals (APK / PWA)</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Install this app directly onto your Android device home screen for lightning-fast deals, offline cache storage, and instant price alerts without visiting the browser!
            </p>

            <div className="space-y-3 bg-slate-950/70 p-4 rounded-2xl border border-slate-800 text-xs">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-rose-600/30 text-rose-400 flex items-center justify-center font-bold text-[10px] mt-0.5 shrink-0">
                  1
                </div>
                <p className="text-slate-300">
                  {isIOS ? (
                    <span>
                      Tap the <strong className="text-white">Share</strong> button in Safari's navigation bar.
                    </span>
                  ) : (
                    <span>
                      Tap the <strong className="text-white">Three Dots (⋮)</strong> menu in Google Chrome / Browser.
                    </span>
                  )}
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-rose-600/30 text-rose-400 flex items-center justify-center font-bold text-[10px] mt-0.5 shrink-0">
                  2
                </div>
                <p className="text-slate-300">
                  Select <strong className="text-white">"Install app"</strong> or{' '}
                  <strong className="text-white">"Add to Home screen"</strong>.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-rose-600/30 text-rose-400 flex items-center justify-center font-bold text-[10px] mt-0.5 shrink-0">
                  3
                </div>
                <p className="text-slate-300">
                  Confirm <strong className="text-white">"Install"</strong>. The Android launcher will create the standalone app with full offline cache capability!
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 p-2.5 rounded-xl">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Full offline caching enabled: Browse deals even with no internet connection.</span>
            </div>

            <div className="mt-5 flex gap-2">
              {isInstallable && (
                <button
                  onClick={async () => {
                    await install();
                    setShowGuide(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 font-bold text-white text-xs transition"
                >
                  Prompt Install Dialog
                </button>
              )}
              <button
                onClick={() => setShowGuide(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
