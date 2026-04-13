/* =========================================================
   GESTÃO.DEV — Org View
   Phase 2b · src/views/Org/Org.tsx
========================================================= */

import { useEffect, useRef } from 'react';

// ── Org member data ───────────────────────────────────────
interface OrgMember {
  name: string;
  role: string;
  status: 'active' | 'inactive';
  initial: string;
  color: string;
}

const ORG_MEMBERS: OrgMember[] = [
  { name: 'Victor Leffa', role: 'Owner',  status: 'active', initial: 'VL', color: '#7B4DC4' },
  { name: 'Lucas M.',     role: 'Dev',    status: 'active', initial: 'LM', color: '#3b82f6' },
  { name: 'Ana Costa',    role: 'Member', status: 'active', initial: 'AC', color: '#22c55e' },
];

// ── Field display row ─────────────────────────────────────
function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        padding: '12px 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--f-mono)',
          fontSize: '0.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--t-dim)',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: '0.9375rem',
          fontWeight: 500,
          color: 'var(--t-main)',
        }}
      >
        {value}
      </span>
    </div>
  );
}

// ── Org view ──────────────────────────────────────────────
export function Org() {
  const headerRef  = useRef<HTMLDivElement>(null);
  const layoutRef  = useRef<HTMLDivElement>(null);
  const inviteRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [headerRef.current, layoutRef.current, inviteRef.current];
    els.forEach((el, i) => {
      if (!el) return;
      setTimeout(() => el.classList.add('visible'), 50 + i * 80);
    });
  }, []);

  return (
    <div id="view-org">
      {/* Page header */}
      <div ref={headerRef} className="reveal page-header">
        <div className="page-header-left">
          <span className="section-tag">
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#14b8a6',
                boxShadow: '0 0 6px #14b8a6',
                display: 'inline-block',
              }}
            />
            Org
          </span>
          <h1 className="page-title">
            <span className="gradient-text">Organizacao</span>
          </h1>
          <p className="page-subtitle">Ceisc Tech</p>
        </div>
      </div>

      {/* Two-column layout */}
      <div ref={layoutRef} className="reveal reveal-delay-1 org-layout">
        {/* Left: Org info */}
        <div className="card">
          <div className="card-label">
            <span className="dot" />
            Informacoes da Organizacao
          </div>
          <div style={{ marginTop: '8px' }}>
            <FieldRow label="Nome"          value="Ceisc Tech" />
            <FieldRow label="Slug"          value="ceisc-tech" />
            <FieldRow label="Timezone"      value="America/Sao_Paulo (GMT-3)" />
            <FieldRow label="Plano"         value="Pro" />
            <FieldRow label="Criado em"     value="Jan 2026" />
          </div>
          <button
            className="gem-cta gem-cta--sm"
            style={{ marginTop: '20px' }}
          >
            Editar informacoes
          </button>
        </div>

        {/* Right: Members list */}
        <div className="card">
          <div className="card-label">
            <span className="dot" />
            Membros ({ORG_MEMBERS.length})
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginTop: '16px',
            }}
          >
            {ORG_MEMBERS.map((m) => (
              <div
                key={m.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: `${m.color}22`,
                    color: m.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--f-mono)',
                    fontSize: '0.5625rem',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {m.initial}
                </div>

                {/* Name + role */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--t-main)',
                    }}
                  >
                    {m.name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--f-mono)',
                      fontSize: '0.5rem',
                      color: 'var(--t-dim)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginTop: '2px',
                    }}
                  >
                    {m.role}
                  </div>
                </div>

                {/* Status badge */}
                <span
                  className={`status-pill ${m.status === 'active' ? 's-approved' : 's-draft'}`}
                >
                  {m.status === 'active' ? 'Ativo' : 'Inativo'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Invite section */}
      <div ref={inviteRef} className="reveal reveal-delay-2 card" style={{ marginTop: '24px' }}>
        <div className="card-label">
          <span className="dot" />
          Convidar Membro
        </div>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginTop: '16px',
            flexWrap: 'wrap',
          }}
        >
          <input
            type="email"
            placeholder="email@exemplo.com"
            readOnly
            style={{
              flex: 1,
              minWidth: '200px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--b-subtle)',
              borderRadius: 'var(--r-md)',
              padding: '8px 14px',
              fontFamily: 'var(--f-mono)',
              fontSize: '0.75rem',
              color: 'var(--t-muted)',
              outline: 'none',
            }}
          />
          <button className="gem-cta gem-cta--sm">Enviar convite</button>
        </div>
        <p
          style={{
            fontFamily: 'var(--f-mono)',
            fontSize: '0.5rem',
            color: 'var(--t-dim)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginTop: '10px',
          }}
        >
          Slots disponiveis: 5/10
        </p>
      </div>
    </div>
  );
}
