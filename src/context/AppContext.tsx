/* =========================================================
   GESTÃO.DEV — App Context
   Phase 1 · src/context/AppContext.tsx
========================================================= */

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Theme, ViewId, AppState } from '../types';

interface AppContextValue extends AppState {
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  navigate: (view: ViewId) => void;
  setSidebarSlim: (slim: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [activeView, setActiveView] = useState<ViewId>('view-dash');
  const [sidebarSlim, setSidebarSlimState] = useState(false);

  // Sync theme attribute on <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);

  const toggleTheme = useCallback(
    () => setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark')),
    [],
  );

  const navigate = useCallback((view: ViewId) => setActiveView(view), []);

  const setSidebarSlim = useCallback((slim: boolean) => setSidebarSlimState(slim), []);

  return (
    <AppContext.Provider
      value={{ theme, activeView, sidebarSlim, setTheme, toggleTheme, navigate, setSidebarSlim }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
