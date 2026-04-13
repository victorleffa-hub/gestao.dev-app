/* =========================================================
   GESTÃO.DEV — Account View
   Phase 3 · src/views/Account/Account.tsx
========================================================= */

import { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import s from './Account.module.css';

const PROFILE_FIELDS = [
  { label: 'Nome completo', value: 'Victor Leffa' },
  { label: 'Email',         value: 'victor@ceisc.tech' },
  { label: 'Organizacao',   value: 'Ceisc Tech' },
  { label: 'Funcao',        value: 'Owner' },
] as const;

// ── Account view ──────────────────────────────────────────
export function Account() {
  const { theme, toggleTheme } = useApp();

  const headerRef  = useRef<HTMLDivElement>(null);
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
              style={{ width: '6px', height: '6px', borderRadius: '50%',
                background: 'var(--c-primary-light)',
                boxShadow: '0 0 6px var(--c-primary-light)', display: 'inline-block' }}
            />
            Conta
          </span>
          <h1 className="page-title">
            <span className="gradient-text">Minha Conta</span>
          </h1>
        </div>
      </div>

      {/* Profile card */}
      <div ref={profileRef} className={`reveal reveal-delay-1 card ${s.profileCard}`}>
        <div className="card-label">
          <span className="dot" />
          Perfil
        </div>

        <div className={s.profileRow}>
          {/* Avatar */}
          <div className={s.avatar}>VL</div>

          {/* Name + email + badge */}
          <div className={s.profileMeta}>
            <div className={s.profileName}>Victor Leffa</div>
            <div className={s.profileEmail}>victor@ceisc.tech</div>
            <span className={s.roleBadge}>Owner</span>
          </div>

          {/* Edit */}
          <button className={`gem-cta gem-cta--sm ${s.editBtn}`}>
            Editar perfil
          </button>
        </div>

        {/* Profile fields grid */}
        <div className={s.profileFields}>
          {PROFILE_FIELDS.map((field) => (
            <div key={field.label} className={s.fieldEntry}>
              <span className={s.fieldLabel}>{field.label}</span>
              <span className={s.fieldValue}>{field.value}</span>
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

        <div className={s.prefsList}>
          {/* Theme */}
          <div className={s.prefRow}>
            <div className={s.prefInfo}>
              <span className={s.prefLabel}>Tema</span>
              <span className={s.prefDesc}>{theme === 'dark' ? 'Escuro' : 'Claro'}</span>
            </div>
            <button
              className={s.themeBtn}
              onClick={toggleTheme}
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? (
                <>
                  <svg viewBox="0 0 16 16" width="12" height="12" fill="none"
                    stroke="currentColor" strokeWidth="1.5">
                    <circle cx="8" cy="8" r="3.5" />
                    <path d="M8 1.5v1M8 13.5v1M1.5 8h1M13.5 8h1M3.4 3.4l.7.7M11.9 11.9l.7.7M11.9 3.4l-.7.7M3.4 11.9l.7-.7"
                      strokeLinecap="round" />
                  </svg>
                  Claro
                </>
              ) : (
                <>
                  <svg viewBox="0 0 16 16" width="12" height="12" fill="none"
                    stroke="currentColor" strokeWidth="1.5">
                    <path d="M13 9.5A5.5 5.5 0 016.5 3a5.5 5.5 0 100 10A5.5 5.5 0 0013 9.5z"
                      strokeLinecap="round" />
                  </svg>
                  Escuro
                </>
              )}
            </button>
          </div>

          {/* Language */}
          <div className={s.prefRow}>
            <div className={s.prefInfo}>
              <span className={s.prefLabel}>Idioma</span>
              <span className={s.prefDesc}>Portugues do Brasil</span>
            </div>
            <span className={s.prefBadge}>PT-BR</span>
          </div>

          {/* Timezone */}
          <div className={s.prefRow}>
            <div className={s.prefInfo}>
              <span className={s.prefLabel}>Fuso horario</span>
              <span className={s.prefDesc}>GMT-3 · Brasilia</span>
            </div>
            <span className={s.prefBadge}>America/Sao_Paulo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
