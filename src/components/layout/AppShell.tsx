/* =========================================================
   GESTÃO.DEV — AppShell Component
   Phase 1 · src/components/layout/AppShell.tsx
========================================================= */

import React, { useState, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useTheme } from '../../hooks/useTheme';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileTabBar } from './MobileTabBar';
import { MobileDrawer } from './MobileDrawer';
import styles from './AppShell.module.css';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { activeView, navigate } = useApp();
  const { toggleTheme } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Breakpoints
  const isMobile = useMediaQuery('(max-width: 1116px)');
  const isShortMobile = useMediaQuery('(max-height: 520px)');
  const showMobile = isMobile || isShortMobile;

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const handleSearch = useCallback(() => {
    // Command palette placeholder — Phase 2 will implement
    console.log('[gestao.dev] search / command palette');
  }, []);

  return (
    <>
      {/* Ambient fluid background orbs */}
      <div className={styles.fluidBg} aria-hidden="true">
        <div className={styles.fluidOrb + ' ' + styles.fluidOrb1} />
        <div className={styles.fluidOrb + ' ' + styles.fluidOrb2} />
        <div className={styles.fluidOrb + ' ' + styles.fluidOrb3} />
      </div>

      {/* Mobile: bottom tab bar */}
      {showMobile && (
        <MobileTabBar activeView={activeView} onNavigate={navigate} />
      )}

      {/* Mobile: slide-in drawer */}
      {showMobile && (
        <MobileDrawer
          open={drawerOpen}
          onClose={closeDrawer}
          onNavigate={navigate}
          onThemeToggle={toggleTheme}
        />
      )}

      {/* Main shell */}
      <div className={`${styles.appShell} app-shell`}>
        {/* Desktop sidebar */}
        {!showMobile && <Sidebar />}

        {/* Workspace: topbar + scrollable content */}
        <main className={`${styles.workspace} workspace`}>
          <Topbar
            onSearch={handleSearch}
            onHamburger={openDrawer}
            onMobileSearch={handleSearch}
          />
          <div className={`${styles.viewScroll} view-scroll`}>
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
