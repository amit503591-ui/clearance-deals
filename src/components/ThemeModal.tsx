import React from 'react';
import {
  X,
  Palette,
  Moon,
  Sun,
  Zap,
  Check,
  BatteryCharging,
  Sparkles,
  Smartphone,
} from 'lucide-react';
import { useTheme, ACCENT_PALETTES, ThemeMode, AccentColor } from '../context/ThemeContext';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeModal: React.FC<ThemeModalProps> = ({ isOpen, onClose }) => {
  const { themeMode, setThemeMode, accentColor, setAccentColor, accent, isAMOLED, isDark } = useTheme();

  if (!isOpen) return null;

  const triggerHaptic = () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(15);
      } catch {}
    }
  };

  const handleSelectMode = (mode: ThemeMode) => {
    triggerHaptic();
    setThemeMode(mode);
  };

  const handleSelectAccent = (color: AccentColor) => {
    triggerHaptic();
    setAccentColor(color);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 animate-fadeIn">
      <div
        className={`w-full max-w-lg border-t sm:border rounded-t-[32px] sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden ${
          isAMOLED
            ? 'bg-black border-neutral-800 text-slate-100'
            : isDark
            ? 'bg-slate-900 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div
          className={`px-5 py-4 border-b flex items-center justify-between backdrop-blur shrink-0 ${
            isAMOLED
              ? 'bg-black/90 border-neutral-800'
              : isDark
              ? 'bg-slate-950/80 border-slate-800'
              : 'bg-white/90 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-md"
              style={{ backgroundColor: accent.hex }}
            >
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3
                className={`font-bold text-sm sm:text-base flex items-center gap-1.5 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Display & Material You Accents
              </h3>
              <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Personalize dark/light contrast and Android colors
              </span>
            </div>
          </div>

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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Theme Mode Options: AMOLED, Slate Dark, Light Mode */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label
                className={`text-xs font-bold uppercase tracking-wider ${
                  isDark ? 'text-slate-200' : 'text-slate-700'
                }`}
              >
                Display Appearance
              </label>
              {isAMOLED && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                  <BatteryCharging className="w-3 h-3" />
                  <span>OLED Battery Saver</span>
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* AMOLED Pure-Black */}
              <button
                onClick={() => handleSelectMode('amoled')}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 relative ${
                  themeMode === 'amoled'
                    ? 'bg-black border-2 shadow-lg shadow-black/80 ring-1'
                    : isDark
                    ? 'bg-black/60 border-slate-800 hover:border-slate-700'
                    : 'bg-neutral-900 text-white border-neutral-800 hover:border-neutral-700'
                }`}
                style={{
                  borderColor: themeMode === 'amoled' ? accent.hex : undefined,
                  boxShadow: themeMode === 'amoled' ? `0 0 16px ${accent.glowRgba}` : undefined,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-6 h-6 rounded-lg bg-black border border-neutral-700 flex items-center justify-center text-white">
                    <Zap className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  </div>
                  {themeMode === 'amoled' && <Check className="w-4 h-4 text-emerald-400" />}
                </div>

                <div className="font-bold text-xs text-white">AMOLED Black</div>
                <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                  #000000 pixels off for OLED battery saving
                </div>
              </button>

              {/* Slate Dark */}
              <button
                onClick={() => handleSelectMode('dark')}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 relative ${
                  themeMode === 'dark'
                    ? 'bg-slate-900 border-2 shadow-lg ring-1 text-white'
                    : isDark
                    ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-white'
                    : 'bg-slate-800 text-white border-slate-700 hover:border-slate-600'
                }`}
                style={{
                  borderColor: themeMode === 'dark' ? accent.hex : undefined,
                  boxShadow: themeMode === 'dark' ? `0 0 16px ${accent.glowRgba}` : undefined,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-6 h-6 rounded-lg bg-slate-850 border border-slate-700 flex items-center justify-center text-slate-300">
                    <Moon className="w-3.5 h-3.5" />
                  </div>
                  {themeMode === 'dark' && <Check className="w-4 h-4 text-emerald-400" />}
                </div>

                <div className="font-bold text-xs text-white">Slate Dark</div>
                <div className="text-[10px] text-slate-300 mt-0.5 leading-tight">
                  Deep modern contrast
                </div>
              </button>

              {/* Light Mode */}
              <button
                onClick={() => handleSelectMode('light')}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 relative ${
                  themeMode === 'light'
                    ? 'bg-white border-2 shadow-lg ring-1 text-slate-900'
                    : isDark
                    ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-900'
                }`}
                style={{
                  borderColor: themeMode === 'light' ? accent.hex : undefined,
                  boxShadow: themeMode === 'light' ? `0 0 16px ${accent.glowRgba}` : undefined,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-500">
                    <Sun className="w-3.5 h-3.5" />
                  </div>
                  {themeMode === 'light' && <Check className="w-4 h-4 text-emerald-600" />}
                </div>

                <div
                  className={`font-bold text-xs ${
                    themeMode === 'light' || !isDark ? 'text-slate-900' : 'text-slate-200'
                  }`}
                >
                  Light Mode
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                  Clean daylight high-contrast
                </div>
              </button>
            </div>
          </div>

          {/* Material You Accent Color Picker */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label
                className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  isDark ? 'text-slate-200' : 'text-slate-700'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" style={{ color: accent.hex }} />
                Material You Accent Palette
              </label>
              <span className={`text-[11px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {accent.name}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {Object.values(ACCENT_PALETTES).map((pal) => {
                const isSelected = accentColor === pal.id;
                return (
                  <button
                    key={pal.id}
                    onClick={() => handleSelectAccent(pal.id)}
                    className={`p-3 rounded-2xl border transition-all duration-200 flex flex-col items-center gap-2 relative ${
                      isSelected
                        ? 'border-2 shadow-md'
                        : isDark
                        ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                    style={{
                      borderColor: isSelected ? pal.hex : undefined,
                      boxShadow: isSelected ? `0 0 12px ${pal.glowRgba}` : undefined,
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md relative"
                      style={{ backgroundColor: pal.hex }}
                    >
                      {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>
                    <span
                      className={`text-[11px] font-bold text-center leading-tight ${
                        isDark ? 'text-slate-200' : 'text-slate-800'
                      }`}
                    >
                      {pal.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="space-y-2 pt-1">
            <label
              className={`text-xs font-bold uppercase tracking-wider ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Live Theme Preview
            </label>

            <div
              className={`p-4 rounded-2xl border transition-colors duration-300 ${
                isAMOLED
                  ? 'bg-black border-neutral-800 text-white'
                  : isDark
                  ? 'bg-slate-950 border-slate-800 text-white'
                  : 'bg-white border-slate-200 text-slate-900 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full text-white shadow-sm flex items-center gap-1"
                  style={{ backgroundColor: accent.hex }}
                >
                  <Zap className="w-3 h-3 fill-white" />
                  65% OFF CLEARANCE
                </span>

                <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  clearancedeals.info
                </span>
              </div>

              <h4 className="text-xs sm:text-sm font-bold truncate">
                Sony Wireless Noise Cancelling Headphones
              </h4>

              <div className="flex items-baseline justify-between mt-2.5">
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-xl font-black tracking-tight"
                    style={{ color: accent.hex }}
                  >
                    $69.99
                  </span>
                  <span className={`text-xs line-through ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    $199.99
                  </span>
                </div>

                <div
                  className="text-[11px] font-bold text-white px-3 py-1 rounded-xl shadow-md transition"
                  style={{ backgroundColor: accent.hex }}
                >
                  Claim Deal
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`p-4 border-t flex items-center justify-between ${
            isAMOLED
              ? 'bg-black/90 border-neutral-800'
              : isDark
              ? 'bg-slate-950/80 border-slate-800'
              : 'bg-white border-slate-200'
          }`}
        >
          <span className={`text-xs flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <Smartphone className="w-3.5 h-3.5" />
            <span>Auto-persisted to local device storage</span>
          </span>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-white font-bold text-xs transition shadow-md active:scale-98"
            style={{ backgroundColor: accent.hex }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
