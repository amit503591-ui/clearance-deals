import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type ThemeMode = 'amoled' | 'dark' | 'light';
export type AccentColor = 'crimson' | 'emerald' | 'blue' | 'violet' | 'amber';

export interface AccentDefinition {
  id: AccentColor;
  name: string;
  hex: string;
  previewClass: string;
  bgClass: string;
  textClass: string;
  textLightClass: string;
  borderClass: string;
  borderSubtleClass: string;
  surfaceClass: string;
  gradientClass: string;
  glowRgba: string;
}

export const ACCENT_PALETTES: Record<AccentColor, AccentDefinition> = {
  crimson: {
    id: 'crimson',
    name: 'Crimson Flame',
    hex: '#f43f5e',
    previewClass: 'bg-rose-500',
    bgClass: 'bg-rose-600',
    textClass: 'text-rose-500',
    textLightClass: 'text-rose-400',
    borderClass: 'border-rose-600',
    borderSubtleClass: 'border-rose-900/40',
    surfaceClass: 'bg-rose-950/60',
    gradientClass: 'from-rose-600 to-red-600',
    glowRgba: 'rgba(244, 63, 94, 0.4)',
  },
  emerald: {
    id: 'emerald',
    name: 'Cyber Emerald',
    hex: '#10b981',
    previewClass: 'bg-emerald-500',
    bgClass: 'bg-emerald-600',
    textClass: 'text-emerald-500',
    textLightClass: 'text-emerald-400',
    borderClass: 'border-emerald-600',
    borderSubtleClass: 'border-emerald-900/40',
    surfaceClass: 'bg-emerald-950/60',
    gradientClass: 'from-emerald-600 to-teal-600',
    glowRgba: 'rgba(16, 185, 129, 0.4)',
  },
  blue: {
    id: 'blue',
    name: 'Electric Blue',
    hex: '#0284c7',
    previewClass: 'bg-sky-500',
    bgClass: 'bg-sky-600',
    textClass: 'text-sky-500',
    textLightClass: 'text-sky-400',
    borderClass: 'border-sky-600',
    borderSubtleClass: 'border-sky-900/40',
    surfaceClass: 'bg-sky-950/60',
    gradientClass: 'from-sky-600 to-blue-600',
    glowRgba: 'rgba(2, 132, 199, 0.4)',
  },
  violet: {
    id: 'violet',
    name: 'Neon Violet',
    hex: '#a855f7',
    previewClass: 'bg-purple-500',
    bgClass: 'bg-purple-600',
    textClass: 'text-purple-500',
    textLightClass: 'text-purple-400',
    borderClass: 'border-purple-600',
    borderSubtleClass: 'border-purple-900/40',
    surfaceClass: 'bg-purple-950/60',
    gradientClass: 'from-purple-600 to-indigo-600',
    glowRgba: 'rgba(168, 85, 247, 0.4)',
  },
  amber: {
    id: 'amber',
    name: 'Solar Gold',
    hex: '#f59e0b',
    previewClass: 'bg-amber-500',
    bgClass: 'bg-amber-600',
    textClass: 'text-amber-500',
    textLightClass: 'text-amber-400',
    borderClass: 'border-amber-600',
    borderSubtleClass: 'border-amber-900/40',
    surfaceClass: 'bg-amber-950/60',
    gradientClass: 'from-amber-600 to-orange-600',
    glowRgba: 'rgba(245, 158, 11, 0.4)',
  },
};

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  accentColor: AccentColor;
  setAccentColor: (accent: AccentColor) => void;
  accent: AccentDefinition;
  isAMOLED: boolean;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'clearance_theme_config';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.themeMode) return parsed.themeMode;
      }
    } catch {}

    // Check device system preference (dark or light)
    if (typeof window !== 'undefined' && window.matchMedia) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }

    return 'dark';
  });

  const [accentColor, setAccentColorState] = useState<AccentColor>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.accentColor && ACCENT_PALETTES[parsed.accentColor as AccentColor]) {
          return parsed.accentColor as AccentColor;
        }
      }
    } catch {}
    return 'crimson';
  });

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const prev = saved ? JSON.parse(saved) : {};
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prev, themeMode: mode }));
    } catch {}
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeModeState((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        const prevObj = saved ? JSON.parse(saved) : {};
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prevObj, themeMode: next }));
      } catch {}
      return next;
    });
  }, []);

  const setAccentColor = (accent: AccentColor) => {
    setAccentColorState(accent);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const prev = saved ? JSON.parse(saved) : {};
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prev, accentColor: accent }));
    } catch {}
  };

  const accent = ACCENT_PALETTES[accentColor] || ACCENT_PALETTES.crimson;
  const isAMOLED = themeMode === 'amoled';
  const isDark = themeMode !== 'light';

  // Apply classes and meta theme-color
  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove('theme-amoled', 'theme-dark', 'theme-light');
    root.classList.add(`theme-${themeMode}`);

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Set CSS Custom properties for dynamic accent & surfaces
    root.style.setProperty('--accent-hex', accent.hex);
    root.style.setProperty('--accent-glow', accent.glowRgba);

    if (isAMOLED) {
      root.style.setProperty('--bg-app', '#000000');
      root.style.setProperty('--bg-surface', '#070707');
      root.style.setProperty('--bg-card', '#0e0e0e');
      root.style.setProperty('--border-subtle', '#1a1a1a');
    } else if (themeMode === 'light') {
      root.style.setProperty('--bg-app', '#f8fafc');
      root.style.setProperty('--bg-surface', '#ffffff');
      root.style.setProperty('--bg-card', '#ffffff');
      root.style.setProperty('--border-subtle', '#e2e8f0');
    } else {
      root.style.setProperty('--bg-app', '#020617');
      root.style.setProperty('--bg-surface', '#0f172a');
      root.style.setProperty('--bg-card', '#1e293b');
      root.style.setProperty('--border-subtle', '#1e293b');
    }

    // Update Android status bar theme-color
    let metaTheme = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
    if (!metaTheme) {
      metaTheme = document.createElement('meta');
      metaTheme.name = 'theme-color';
      document.head.appendChild(metaTheme);
    }
    metaTheme.content = isAMOLED ? '#000000' : themeMode === 'light' ? '#ffffff' : '#020617';
  }, [themeMode, accent, isAMOLED, isDark]);

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        setThemeMode,
        toggleTheme,
        accentColor,
        setAccentColor,
        accent,
        isAMOLED,
        isDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
