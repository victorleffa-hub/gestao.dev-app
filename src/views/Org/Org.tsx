/* =========================================================
   GESTÃO.DEV — Org View
   Phase 3 · src/views/Org/Org.tsx
========================================================= */

import { useEffect, useRef } from 'react';
import s from './Org.module.css';

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
    <div className={s.fieldRow}>
      <span className={s.fieldLabel}>{label}</span>
      <span className={s.fieldValue}>{value}</span>
    </div>
  );
}

// ── Org view ──────────────────────────────────────────────
export function Org() {
  const headerRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const inviteRef = useRef<HTMLDivElement>(null);

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
              style={{ width: '6px', height: '6px', borderRadius: '50%',
                background: '#14b8a6', boxShadow: '0 0 6px #14b8a6', display: 'inline-block' }}
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
      <div ref={layoutRef} className={`reveal reveal-delay-1 ${s.layout}`}>
        {/* Left: Org info */}
        <div className="card">
          <div className="card-label">
            <span className="dot" />
            Informacoes da Organizacao
          </div>
          <div style={{ marginTop: '8px' }}>
            <FieldRow label="Nome"      value="Ceisc Tech" />
            <FieldRow label="Slug"      value="ceisc-tech" />
            <FieldRow label="Timezone"  value="America/Sao_Paulo (GMT-3)" />
            <FieldRow label="Plano"     value="Pro" />
            <FieldRow label="Criado em" value="Jan 2026" />
          </div>
          <button className="gem-cta gem-cta--sm" style={{ marginTop: '20px' }}>
            Editar informacoes
          </button>
        </div>

        {/* Right: Members list */}
        <div className="card">
          <div className="card-label">
            <span className="dot" />
            Membros ({ORG_MEMBERS.length})
          </div>
          <div className={s.memberList}>
            {ORG_MEMBERS.map((m) => (
              <div key={m.name} className={s.memberRow}>
                <div
                  className={s.memberAvatar}
                  style={{ background: `${m.color}22`, color: m.color }}
                >
                  {m.initial}
                </div>
                <div className={s.memberInfo}>
                  <div className={s.memberName}>{m.name}</div>
                  <div className={s.memberRole}>{m.role}</div>
                </div>
                <span className={`status-pill ${m.status === 'active' ? 's-approved' : 's-draft'}`}>
                  {m.status === 'active' ? 'Ativo' : 'Inativo'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Invite section */}
      <div ref={inviteRef} className={`reveal reveal-delay-2 card ${s.inviteCard}`}>
        <div className="card-label">
          <span className="dot" />
          Convidar Membro
        </div>
        <div className={s.inviteRow}>
          <input
            type="email"
            placeholder="email@exemplo.com"
            readOnly
            className={s.inviteInput}
          />
          <button className="gem-cta gem-cta--sm">Enviar convite</button>
        </div>
        <p className={s.inviteHint}>Slots disponiveis: 5/10</p>
      </div>
    </div>
  );
}
