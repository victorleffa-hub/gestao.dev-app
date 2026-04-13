/* =========================================================
   GESTÃO.DEV — Topbar Component
   Phase 1 · src/components/layout/Topbar.tsx
========================================================= */

import { useTheme } from '../../hooks/useTheme';
import styles from './Topbar.module.css';

interface TopbarProps {
  onSearch: () => void;
  onHamburger?: () => void;
  onMobileSearch?: () => void;
}

export function Topbar({ onSearch, onHamburger, onMobileSearch }: TopbarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`${styles.topbar} topbar`}>
      {/* Mobile: hamburger */}
      <button
        className={`${styles.mobileHamburger} mobile-hamburger`}
        aria-label="Abrir menu"
        onClick={onHamburger}
      >
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Desktop: search box */}
      <div
        className={`${styles.searchBox} search-box`}
        role="button"
        tabIndex={0}
        aria-label="Pesquisar"
        onClick={onSearch}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSearch();
          }
        }}
      >
        <svg
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Pesquisar projetos, tarefas, membros..."
          readOnly
          tabIndex={-1}
        />
        <div className={styles.searchKbd}>
          <svg
            width="12"
            height="12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          <span>K</span>
        </div>
      </div>

      {/* Right-side actions */}
      <div className={`${styles.topbarActions} topbar-actions`}>
        {/* Mobile: search button */}
        <button
          className={`${styles.mobileSearchBtn} mobile-search-btn`}
          aria-label="Pesquisar"
          onClick={onMobileSearch}
        >
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

        {/* Theme toggle */}
        <button
          className={`${styles.themeToggle} theme-toggle`}
          title="Alternar tema"
          aria-label={`Alternar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
          onClick={toggleTheme}
        >
          {/* Moon icon (shown in dark mode) */}
          <svg
            className={styles.moonIcon}
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
          {/* Sun icon (shown in light mode) */}
          <svg
            className={styles.sunIcon}
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </button>

        {/* Notification bell */}
        <div
          className={`${styles.notifBtn} icon-btn`}
          role="button"
          tabIndex={0}
          title="Notificações"
          aria-label="Notificações"
        >
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className={styles.notifCount}>3</span>
        </div>

        {/* Sync indicator */}
        <div className={`${styles.syncIndicator} sync-indicator`}>
          <span className={styles.syncDot} />
          <span>Sincronizado</span>
        </div>

        {/* New project CTA */}
        <button className={`${styles.gemCta} gem-cta gem-cta--sm`}>
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Novo Projeto
        </button>
      </div>
    </header>
  );
}
