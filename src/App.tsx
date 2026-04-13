/* =========================================================
   GESTÃO.DEV — App Root
   Phase 1 · src/App.tsx
========================================================= */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AppShell } from './components/layout/AppShell';
import type { ViewId } from './types';

// ── Placeholder view components ──────────────────────────
// Phase 2 will replace these with real view implementations.

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
  'view-dash':     () => <PlaceholderView label="Dashboard" />,
  'view-projects': () => <PlaceholderView label="Projetos" />,
  'view-ideas':    () => <PlaceholderView label="Ideias" />,
  'view-board':    () => <PlaceholderView label="Board Kanban" />,
  'view-sprints':  () => <PlaceholderView label="Sprints" />,
  'view-admin':    () => <PlaceholderView label="Admin" />,
  'view-billing':  () => <PlaceholderView label="Billing" />,
  'view-org':      () => <PlaceholderView label="Organização" />,
  'view-account':  () => <PlaceholderView label="Minha Conta" />,
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
