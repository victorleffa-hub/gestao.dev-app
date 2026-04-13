/* =========================================================
   GESTÃO.DEV — Sidebar Component
   Phase 1 · src/components/layout/Sidebar.tsx
========================================================= */

import React, { useCallback } from 'react';
import type { ViewId } from '../../types';
import { useApp } from '../../context/AppContext';
import styles from './Sidebar.module.css';

// ── SVG icon components ──────────────────────────────────

function IconHome() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4"
      />
    </svg>
  );
}

function IconClipboard() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
      />
    </svg>
  );
}

function IconLightbulb() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  );
}

function IconLightning() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function IconCreditCard() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
      />
    </svg>
  );
}

function IconBuilding() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  );
}

function IconShield() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );
}

function IconGear() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// ── Brand Gem SVG ────────────────────────────────────────

function GemMark() {
  return (
    <svg
      viewBox="0 0 32 32"
      width="36"
      height="36"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="hex-clip-sidebar">
          <polygon points="16,2.5 28,9 28,23 16,29.5 4,23 4,9" />
        </clipPath>
        <filter id="sym-glow-sidebar" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="0.7" floodColor="white" floodOpacity="0.28" />
        </filter>
      </defs>
      <g clipPath="url(#hex-clip-sidebar)">
        <polygon points="16,2.5 28,9 16,16" fill="#A060E8" />
        <polygon points="28,9 28,23 16,16" fill="#7030C0" />
        <polygon points="28,23 16,29.5 16,16" fill="#501888" />
        <polygon points="16,29.5 4,23 16,16" fill="#280858" />
        <polygon points="4,23 4,9 16,16" fill="#4B218E" />
        <polygon points="4,9 16,2.5 16,16" fill="#6030A8" />
        <path
          className="gem-chevron"
          d="M4,9 L16,16 L4,23"
          fill="none"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#sym-glow-sidebar)"
        />
        <rect
          className="gem-cursor"
          x="17"
          y="21.25"
          width="6"
          height="3.2"
          rx="1.2"
          fill="white"
          filter="url(#sym-glow-sidebar)"
        />
      </g>
      <polygon
        points="16,2.5 28,9 28,23 16,29.5 4,23 4,9"
        fill="none"
        stroke="#1E0642"
        strokeWidth="0.5"
      />
    </svg>
  );
}

// ── Nav item definition ──────────────────────────────────

interface NavItemDef {
  id: ViewId;
  label: string;
  icon: React.ReactElement;
  hasNotif?: boolean;
}

const TOP_NAV_ITEMS: NavItemDef[] = [
  { id: 'view-dash', label: 'Home', icon: <IconHome /> },
  { id: 'view-projects', label: 'Projetos', icon: <IconClipboard /> },
  { id: 'view-ideas', label: 'Ideias', icon: <IconLightbulb /> },
];

const DIVIDER_ITEMS: NavItemDef[] = [
  { id: 'view-sprints', label: 'Sprints', icon: <IconLightning /> },
];

const BOTTOM_ITEMS_A: NavItemDef[] = [
  { id: 'view-billing', label: 'Billing', icon: <IconCreditCard /> },
  { id: 'view-org', label: 'Org', icon: <IconBuilding /> },
];

const BOTTOM_ITEMS_B: NavItemDef[] = [
  { id: 'view-admin', label: 'Admin', icon: <IconShield />, hasNotif: true },
];

const BOTTOM_ITEMS_C: NavItemDef[] = [
  { id: 'view-account', label: 'Config', icon: <IconGear /> },
];

// ── NavItemButton ────────────────────────────────────────

interface NavItemButtonProps {
  item: NavItemDef;
  isActive: boolean;
  onClick: (id: ViewId) => void;
}

function NavItemButton({ item, isActive, onClick }: NavItemButtonProps) {
  const handleClick = useCallback(() => onClick(item.id), [onClick, item.id]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(item.id);
      }
    },
    [onClick, item.id],
  );

  return (
    <div
      className={`${styles.navItem} nav-item${isActive ? ` ${styles.active} active` : ''}`}
      role="button"
      tabIndex={0}
      aria-label={item.label}
      title={item.label}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {item.icon}
      <span className={`${styles.navLabel} nav-label`}>{item.label}</span>
      {item.hasNotif && <span className={styles.notifBadge} />}
    </div>
  );
}

// ── Sidebar component ────────────────────────────────────

export function Sidebar() {
  const { activeView, navigate } = useApp();

  return (
    <nav className={`${styles.sidebar} sidebar`}>
      {/* Brand mark */}
      <div className={`${styles.brandMark} brand-mark`}>
        <GemMark />
      </div>

      {/* Top nav group */}
      <div className={`${styles.navList} nav-list`}>
        {TOP_NAV_ITEMS.map((item) => (
          <NavItemButton
            key={item.id}
            item={item}
            isActive={activeView === item.id}
            onClick={navigate}
          />
        ))}

        <div className={`${styles.navDivider} nav-divider`} />

        {DIVIDER_ITEMS.map((item) => (
          <NavItemButton
            key={item.id}
            item={item}
            isActive={activeView === item.id}
            onClick={navigate}
          />
        ))}
      </div>

      {/* Bottom section */}
      <div className={`${styles.sidebarBottom} sidebar-bottom`}>
        {BOTTOM_ITEMS_A.map((item) => (
          <NavItemButton
            key={item.id}
            item={item}
            isActive={activeView === item.id}
            onClick={navigate}
          />
        ))}

        <div className={`${styles.navDivider} nav-divider`} />

        {BOTTOM_ITEMS_B.map((item) => (
          <NavItemButton
            key={item.id}
            item={item}
            isActive={activeView === item.id}
            onClick={navigate}
          />
        ))}

        <div className={`${styles.navDivider} nav-divider`} />

        {BOTTOM_ITEMS_C.map((item) => (
          <NavItemButton
            key={item.id}
            item={item}
            isActive={activeView === item.id}
            onClick={navigate}
          />
        ))}

        {/* Avatar */}
        <div
          className={`${styles.avatarBtn} avatar-btn`}
          role="button"
          aria-label="Perfil de Victor Leffa"
          title="Victor Leffa"
          tabIndex={0}
        />
      </div>
    </nav>
  );
}
