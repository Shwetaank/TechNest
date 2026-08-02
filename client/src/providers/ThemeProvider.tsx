import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Theme } from '@/types';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const initialState: ThemeProviderState = {
  theme: 'system',
  resolvedTheme: 'dark',
  setTheme: () => null,
  toggleTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

/**
 * Manages theme selection (light, dark, system), persists choices to localStorage,
 * and synchronizes HTML root classes & color-scheme meta styles for browser UI components.
 */
export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  storageKey = 'technest-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey) as Theme | null;
      if (stored) return stored;
    }
    return defaultTheme;
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');

  // Sync active theme with document root class and color-scheme meta property
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    let effectiveTheme: 'light' | 'dark' = 'dark';

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      effectiveTheme = systemTheme;
    } else {
      effectiveTheme = theme;
    }

    setResolvedTheme(effectiveTheme);
    root.classList.add(effectiveTheme);
    root.style.colorScheme = effectiveTheme;
  }, [theme]);

  // Listen for OS system theme preference changes when mode is set to 'system'
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      const newTheme = e.matches ? 'dark' : 'light';
      setResolvedTheme(newTheme);
      root.classList.add(newTheme);
      root.style.colorScheme = newTheme;
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  return (
    <ThemeProviderContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
