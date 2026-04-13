/* =========================================================
   GESTÃO.DEV — Account View
   Phase 2b · src/views/Account/Account.tsx
========================================================= */

import { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

// ── Account view ──────────────────────────────────────────
export function Account() {
  const { theme, toggleTheme } = useApp();

  const headerRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const prefsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [headerRef.current, profileRef.current, prefsRef.current];
    els.forEach((el, i) => {
      if (!el) return;
      setTimeout(() => el.classList.add('visible'), 50 + i * 80);
    });
  }, []);

  return (
    <div id="view-account">
      {/* Page header */}
      <div ref={headerRef} className="reveal page-header">
        <div className="page-header-left">
          <span className="section-tag">
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--c-primary-light)',
                boxShadow: '0 0 6px var(--c-primary-light)',
                display: 'inline-block',
              }}
            />
            Conta
          </span>
          <h1 className="page-title">
            <span className="gradient-text">Minha Conta</span>
          </h1>
        </div>
      </div>

      {/* Profile card */}
      <div ref={profileRef} className="reveal reveal-delay-1 card" style={{ marginBottom: '16px' }}>
        <div className="card-label">
          <span className="dot" />
          Perfil
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginTop: '20px',
            flexWrap: 'wrap',
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #7B4DC4 0%, #3b82f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--f-mono)',
              fontSize: '1.125rem',
              fontWeight: 700,
              color: '#fff',
              flexShrink: 0,
              boxShadow: '0 0 0 3px rgba(123, 77, 196, 0.25)',
            }}
          >
            VL
          </div>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div
              style={{
                fontSize: '1.125rem',
                fontWeight: 700,
                color: 'var(--t-main)',
                letterSpacing: '-0.02em',
              }}
            >
              Victor Leffa
            </div>
            <div
              style={{
                fontFamily: 'var(--f-mono)',
                fontSize: '0.75rem',
                color: 'var(--t-muted)',
              }}
            >
              victor@ceisc.tech
            </div>
            <span
              style={{
                display: 'inline-flex',
                padding: '2px 10px',
                borderRadius: '999px',
                background: 'rgba(123, 77, 196, 0.15)',
                color: '#7B4DC4',
                border: '1px solid rgba(123, 77, 196, 0.3)',
                fontFamily: 'var(--f-mono)',
                fontSize: '0.5rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginTop: '4px',
                width: 'fit-content',
              }}
            >
              Owner
            </span>
          </div>

          {/* Edit button */}
          <button
            className="gem-cta gem-cta--sm"
            style={{ marginLeft: 'auto' }}
          >
            Editar perfil
          </button>
        </div>

        {/* Profile fields */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          {[
            { label: 'Nome completo', value: 'Victor Leffa' },
            { label: 'Email',         value: 'victor@ceisc.tech' },
            { label: 'Organizacao',   value: 'Ceisc Tech' },
            { label: 'Funcao',        value: 'Owner' },
          ].map((field) => (
            <div key={field.label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--t-dim)',
                }}
              >
                {field.label}
              </span>
              <span
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--t-main)',
                }}
              >
                {field.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences card */}
      <div ref={prefsRef} className="reveal reveal-delay-2 card">
        <div className="card-label">
          <span className="dot" />
          Preferencias
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
            marginTop: '16px',
          }}
        >
          {/* Theme toggle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 0',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--t-main)' }}>
                Tema
              </span>
              <span
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '0.5rem',
                  color: 'var(--t-dim)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {theme === 'dark' ? 'Escuro' : 'Claro'}
              </span>
            </div>
            {/* Toggle button */}
            <button
              onClick={toggleTheme}
              aria-label="Alternar tema"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--bg-glass)',
                border: '1px solid var(--b-subtle)',
                borderRadius: 'var(--r-full)',
                padding: '6px 14px',
                cursor: 'pointer',
                color: 'var(--t-main)',
                fontFamily: 'var(--f-mono)',
                fontSize: '0.5625rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                transition: 'background 0.2s ease',
              }}
            >
              {theme === 'dark' ? (
                <>
                  <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="8" cy="8" r="3.5" />
                    <path d="M8 1.5v1M8 13.5v1M1.5 8h1M13.5 8h1M3.4 3.4l.7.7M11.9 11.9l.7.7M11.9 3.4l-.7.7M3.4 11.9l.7-.7" strokeLinecap="round" />
                  </svg>
                  Claro
                </>
              ) : (
                <>
                  <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M13 9.5A5.5 5.5 0 016.5 3a5.5 5.5 0 100 10A5.5 5.5 0 0013 9.5z" strokeLinecap="round" />
                  </svg>
                  Escuro
                </>
              )}
            </button>
          </div>

          {/* Language */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 0',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--t-main)' }}>
                Idioma
              </span>
              <span
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '0.5rem',
                  color: 'var(--t-dim)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                Portugues do Brasil
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--f-mono)',
                fontSize: '0.625rem',
                color: 'var(--t-dim)',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--b-subtle)',
                borderRadius: 'var(--r-sm)',
                padding: '4px 10px',
              }}
            >
              PT-BR
            </span>
          </div>

          {/* Timezone */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 0',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--t-main)' }}>
                Fuso horario
              </span>
              <span
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '0.5rem',
                  color: 'var(--t-dim)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                GMT-3 · Brasilia
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--f-mono)',
                fontSize: '0.625rem',
                color: 'var(--t-dim)',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--b-subtle)',
                borderRadius: 'var(--r-sm)',
                padding: '4px 10px',
                whiteSpace: 'nowrap',
              }}
            >
              America/Sao_Paulo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
