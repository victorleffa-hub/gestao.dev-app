/* =========================================================
   GESTÃO.DEV — useTheme hook
   Phase 1 · src/hooks/useTheme.ts
========================================================= */

import { useApp } from '../context/AppContext';
import type { Theme } from '../types';

interface UseThemeReturn {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

export function useTheme(): UseThemeReturn {
  const { theme, setTheme, toggleTheme } = useApp();
  return { theme, setTheme, toggleTheme };
}
