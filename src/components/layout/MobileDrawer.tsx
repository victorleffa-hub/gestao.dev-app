/* =========================================================
   GESTÃO.DEV — Mobile Drawer Component
   Phase 1 · src/components/layout/MobileDrawer.tsx
========================================================= */

import { useCallback, useEffect } from 'react';
import type { ViewId } from '../../types';
import styles from './MobileDrawer.module.css';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (view: ViewId) => void;
  onThemeToggle: () => void;
}

export function MobileDrawer({ open, onClose, onNavigate, onThemeToggle }: MobileDrawerProps) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Prevent scroll on body when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleNavigate = useCallback(
    (view: ViewId) => {
      onNavigate(view);
      onClose();
    },
    [onNavigate, onClose],
  );

  return (
    <div
      className={`${styles.overlay} mobile-drawer-overlay${open ? ` ${styles.open} open` : ''}`}
      id="mobileDrawer"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={`${styles.drawer} mobile-drawer`} role="dialog" aria-modal="true" aria-label="Menu de navegação">
        {/* Header */}
        <div className={`${styles.header} drawer-header`}>
          <div className={`${styles.avatar} drawer-avatar`} />
          <div>
            <div className={`${styles.userName} drawer-user-name`}>Victor Leffa</div>
            <div className={`${styles.userRole} drawer-user-role`}>Owner · Ceisc Tech</div>
          </div>
        </div>

        {/* Navigation section */}
        <div className={`${styles.sectionLabel} drawer-section-label`}>Navegação</div>

        <div
          className={`${styles.item} drawer-item`}
          role="button"
          tabIndex={0}
          onClick={() => handleNavigate('view-billing')}
          onKeyDown={(e) => e.key === 'Enter' && handleNavigate('view-billing')}
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          <span>Planos &amp; Billing</span>
        </div>

        <div
          className={`${styles.item} drawer-item`}
          role="button"
          tabIndex={0}
          onClick={() => handleNavigate('view-org')}
          onKeyDown={(e) => e.key === 'Enter' && handleNavigate('view-org')}
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <span>Organização</span>
        </div>

        <div
          className={`${styles.item} drawer-item`}
          role="button"
          tabIndex={0}
          onClick={() => handleNavigate('view-admin')}
          onKeyDown={(e) => e.key === 'Enter' && handleNavigate('view-admin')}
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span>Painel Admin</span>
        </div>

        <div
          className={`${styles.item} drawer-item`}
          role="button"
          tabIndex={0}
          onClick={() => handleNavigate('view-account')}
          onKeyDown={(e) => e.key === 'Enter' && handleNavigate('view-account')}
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span>Minha Conta</span>
        </div>

        <div
          className={`${styles.item} drawer-item`}
          role="button"
          tabIndex={0}
          onClick={() => handleNavigate('view-account')}
          onKeyDown={(e) => e.key === 'Enter' && handleNavigate('view-account')}
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span>Configurações</span>
        </div>

        {/* Divider */}
        <div className={`${styles.divider} drawer-divider`} />

        {/* Preferences section */}
        <div className={`${styles.sectionLabel} drawer-section-label`}>Preferências</div>

        {/* Theme toggle */}
        <div
          className={`${styles.themeRow} drawer-item`}
          id="drawerThemeToggle"
          role="button"
          tabIndex={0}
          onClick={onThemeToggle}
          onKeyDown={(e) => e.key === 'Enter' && onThemeToggle()}
        >
          <svg
            className="moon-icon"
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
          <span>Alternar tema</span>
        </div>

        {/* Sync status */}
        <div className={`${styles.item} ${styles.disabled} drawer-item`}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            Sincronizado
            <span className={styles.syncDot} />
          </span>
        </div>

        {/* Bottom divider (pushes logout to bottom) */}
        <div className={`${styles.divider} ${styles.pushTop} drawer-divider`} />

        {/* Logout */}
        <div className={`${styles.item} ${styles.danger} drawer-item`} role="button" tabIndex={0}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>Sair</span>
        </div>
      </div>
    </div>
  );
}
