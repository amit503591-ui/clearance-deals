import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Wifi, WifiOff, BatteryCharging, Signal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface AndroidFrameProps {
  children: React.ReactNode;
  isOnline: boolean;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({ children, isOnline }) => {
  const { isAMOLED, isDark, accent } = useTheme();
  // Default to responsive mode for edge-to-edge adaptive look across all screens
  const [deviceMode, setDeviceMode] = useState<'responsive' | 'mobile'>('responsive');
  const [currentTime, setCurrentTime] = useState<string>('12:00');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`h-screen h-[100dvh] max-h-[100dvh] w-full flex flex-col items-center justify-start overflow-hidden transition-colors duration-200 selection:bg-rose-500 selection:text-white ${
        isAMOLED
          ? 'bg-black text-slate-100'
          : isDark
          ? 'bg-slate-950 text-slate-100'
          : 'bg-slate-100 text-slate-900'
      }`}
    >
      {/* Top Device Switcher Toolbar */}
      <div
        className={`w-full border-b px-4 py-2 flex items-center justify-between text-xs backdrop-blur z-30 shrink-0 transition-colors duration-200 ${
          isAMOLED
            ? 'bg-black/90 border-neutral-850 text-slate-400'
            : isDark
            ? 'bg-slate-900/90 border-slate-800/80 text-slate-400'
            : 'bg-white/95 border-slate-200/90 text-slate-600 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span
            className={`font-bold hidden sm:inline ${
              isDark ? 'text-slate-200' : 'text-slate-800'
            }`}
          >
            Clearance Deals Android App
          </span>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <a
            href="https://clearancedeals.info/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium transition truncate max-w-[200px] sm:max-w-none"
            style={{ color: accent.hex }}
          >
            clearancedeals.info
          </a>
        </div>

        {/* Viewport & Device Frame Toggle */}
        <div
          className={`flex items-center gap-1.5 p-1 rounded-xl border transition-colors duration-200 ${
            isAMOLED
              ? 'bg-neutral-950 border-neutral-850'
              : isDark
              ? 'bg-slate-950/80 border-slate-800'
              : 'bg-slate-100 border-slate-200'
          }`}
        >
          <button
            onClick={() => setDeviceMode('responsive')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
              deviceMode === 'responsive'
                ? 'text-white shadow-sm'
                : isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            style={{ backgroundColor: deviceMode === 'responsive' ? accent.hex : undefined }}
            title="Responsive fluid layout (auto-adapts to screen size)"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Responsive</span>
          </button>

          <button
            onClick={() => setDeviceMode('mobile')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
              deviceMode === 'mobile'
                ? 'text-white shadow-sm'
                : isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            style={{ backgroundColor: deviceMode === 'mobile' ? accent.hex : undefined }}
            title="Preview inside Android phone device bezel"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Android Frame</span>
          </button>
        </div>
      </div>

      {/* Frame Container */}
      <div
        className={`w-full transition-all duration-300 flex-1 min-h-0 flex flex-col overflow-hidden ${
          deviceMode === 'mobile'
            ? `my-2 md:my-6 max-w-[430px] rounded-[48px] border-[10px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4),0_0_0_1px_rgba(0,0,0,0.08)] overflow-hidden h-[880px] max-h-[92vh] ${
                isAMOLED
                  ? 'border-neutral-900 bg-black'
                  : isDark
                  ? 'border-slate-800 bg-slate-950'
                  : 'border-slate-300 bg-white'
              }`
            : `w-full h-full flex-1 ${
                isAMOLED ? 'bg-black' : isDark ? 'bg-slate-950' : 'bg-slate-50'
              }`
        }`}
      >
        {/* Android Phone Status Bar (Rendered when phone frame mode is active) */}
        {deviceMode === 'mobile' && (
          <div
            className={`w-full backdrop-blur-md px-6 pt-3 pb-2 flex items-center justify-between text-xs font-semibold select-none z-40 border-b shrink-0 transition-colors duration-200 ${
              isAMOLED
                ? 'bg-black/95 border-neutral-850 text-slate-300'
                : isDark
                ? 'bg-slate-950/95 border-slate-800/40 text-slate-300'
                : 'bg-white/95 border-slate-200 text-slate-700'
            }`}
          >
            <span>{currentTime}</span>

            {/* Front Camera Punch Hole */}
            <div className="w-4 h-4 rounded-full bg-black border border-neutral-700 shadow-inner flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
            </div>

            {/* Android Status Icons */}
            <div
              className={`flex items-center gap-2 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              {isOnline ? (
                <Wifi className="w-3.5 h-3.5" />
              ) : (
                <WifiOff className="w-3.5 h-3.5 text-amber-500" />
              )}
              <Signal className="w-3.5 h-3.5" />
              <div className="flex items-center gap-0.5">
                <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  98%
                </span>
                <BatteryCharging className="w-4 h-4 text-emerald-500" />
              </div>
            </div>
          </div>
        )}

        {/* Content Viewport with concrete 100% height */}
        <div
          className={`flex-1 min-h-0 h-full w-full flex flex-col relative overflow-hidden transition-colors duration-200 ${
            isAMOLED ? 'bg-black' : isDark ? 'bg-slate-950' : 'bg-slate-50'
          }`}
        >
          {children}
        </div>

        {/* Android Gesture Pill at Bottom */}
        {deviceMode === 'mobile' && (
          <div
            className={`w-full py-1.5 flex justify-center items-center select-none pointer-events-none z-40 shrink-0 ${
              isAMOLED ? 'bg-black' : isDark ? 'bg-slate-950' : 'bg-white'
            }`}
          >
            <div
              className={`w-32 h-1 rounded-full ${
                isDark ? 'bg-neutral-600' : 'bg-slate-300'
              }`}
            />
          </div>
        )}
      </div>
    </div>
  );
};
