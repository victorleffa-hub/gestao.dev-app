/* =========================================================
   GESTÃO.DEV — Mobile Tab Bar Component
   Phase 1 · src/components/layout/MobileTabBar.tsx
========================================================= */

import React, { useCallback } from 'react';
import type { ViewId } from '../../types';
import styles from './MobileTabBar.module.css';

interface TabDef {
  id: ViewId;
  label: string;
  icon: React.ReactElement;
}

const TABS: TabDef[] = [
  {
    id: 'view-dash',
    label: 'Home',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4"
        />
      </svg>
    ),
  },
  {
    id: 'view-projects',
    label: 'Projetos',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
  },
  {
    id: 'view-sprints',
    label: 'Sprints',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 'view-ideas',
    label: 'Ideias',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
];

interface MobileTabBarProps {
  activeView: ViewId;
  onNavigate: (view: ViewId) => void;
}

export function MobileTabBar({ activeView, onNavigate }: MobileTabBarProps) {
  const handleClick = useCallback(
    (id: ViewId) => {
      onNavigate(id);
    },
    [onNavigate],
  );

  return (
    <nav className={`${styles.mobileTabBar} mobile-tab-bar`} id="mobileTabBar">
      {TABS.map((tab) => (
        <div
          key={tab.id}
          className={`${styles.mobileTab} mobile-tab${activeView === tab.id ? ` ${styles.active} active` : ''}`}
          data-target={tab.id}
          role="button"
          tabIndex={0}
          aria-label={tab.label}
          onClick={() => handleClick(tab.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClick(tab.id);
            }
          }}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </div>
      ))}
    </nav>
  );
}
