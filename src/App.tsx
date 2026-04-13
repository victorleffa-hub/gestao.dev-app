/* =========================================================
   GESTÃO.DEV — App Root
   Phase 1 · src/App.tsx
========================================================= */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AppShell } from './components/layout/AppShell';
import { Dashboard } from './views/Dashboard/Dashboard';
import { Projects } from './views/Projects/Projects';
import { Ideas } from './views/Ideas/Ideas';
import { Sprints } from './views/Sprints/Sprints';
import { Admin } from './views/Admin/Admin';
import { Billing } from './views/Billing/Billing';
import { Org } from './views/Org/Org';
import { Account } from './views/Account/Account';
import type { ViewId } from './types';

// ── Placeholder view components (Phase 2b+ will replace) ─

function PlaceholderView({ label }: { label: string }) {
  return (
    <div
      style={{
        padding: '40px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '12px',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--f-mono)',
          fontSize: '0.5625rem',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--c-primary-light)',
          fontWeight: 600,
        }}
      >
        Em desenvolvimento
      </span>
      <h1
        style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: 'var(--t-main)',
        }}
      >
        {label}
      </h1>
      <p
        style={{
          fontSize: '0.9375rem',
          color: 'var(--t-muted)',
          maxWidth: '480px',
          lineHeight: 1.6,
        }}
      >
        Esta view será implementada na Fase 2. O shell de layout, design tokens e navegação já estão
        funcionando.
      </p>
      <div
        style={{
          marginTop: '24px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          background: 'var(--bg-glass)',
          border: '1px solid var(--b-subtle)',
          borderRadius: 'var(--r-full)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--c-success)',
            boxShadow: '0 0 6px var(--c-success)',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--f-mono)',
            fontSize: '0.5625rem',
            color: 'var(--t-dim)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          Phase 1 — Shell pronto
        </span>
      </div>
    </div>
  );
}

const VIEW_COMPONENTS: Record<ViewId, React.FC> = {
  'view-dash':     Dashboard,
  'view-projects': Projects,
  'view-ideas':    Ideas,
  'view-board':    () => <PlaceholderView label="Board Kanban" />,
  'view-sprints':  Sprints,
  'view-admin':    Admin,
  'view-billing':  Billing,
  'view-org':      Org,
  'view-account':  Account,
};

// ── Inner app (needs context) ────────────────────────────

function AppInner() {
  const { activeView } = useApp();
  const ActiveView = VIEW_COMPONENTS[activeView];

  return (
    <AppShell>
      <ActiveView />
    </AppShell>
  );
}

// ── Root App ─────────────────────────────────────────────

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
