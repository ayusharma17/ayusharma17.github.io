'use client';

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react';

export type ThemeMode = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'keita-minimal-theme';
const THEME_CLASS_MAP: Record<ThemeMode, string> = {
  light: 'theme-light',
  dark: 'theme-dark'
};

const themeOrder: ThemeMode[] = ['light', 'dark'];

function getSystemPreference(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

export function readStoredTheme(): ThemeMode | null {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
  if (!stored) return null;
  return THEME_CLASS_MAP[stored] ? stored : null;
}

export function applyThemeClass(theme: ThemeMode) {
  if (typeof document === 'undefined') return;
  const html = document.documentElement;
  Object.values(THEME_CLASS_MAP).forEach((cls) => html.classList.remove(cls));
  html.classList.add(THEME_CLASS_MAP[theme]);
  html.setAttribute('data-theme', theme);
}

const ThemeContext = createContext<{
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
} | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('light');

  useLayoutEffect(() => {
    const initial = readStoredTheme() ?? getSystemPreference();
    setTheme(initial);
    applyThemeClass(initial);
  }, []);

  useEffect(() => {
    applyThemeClass(theme);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}

export function getThemeCycle(current: ThemeMode): ThemeMode {
  const idx = themeOrder.indexOf(current);
  const nextIdx = (idx + 1) % themeOrder.length;
  return themeOrder[nextIdx];
}
