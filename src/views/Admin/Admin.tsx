/* =========================================================
   GESTÃO.DEV — Admin View
   Phase 2b · src/views/Admin/Admin.tsx
========================================================= */

import { useEffect, useRef } from 'react';
import s from './Admin.module.css';

// ── Hardcoded admin data ──────────────────────────────────
interface AdminStat {
  label: string;
  value: string;
  sub: string;
  color: string;
}

const ADMIN_STATS: AdminStat[] = [
  { label: 'Total Users',    value: '5',    sub: '↑2 este mes',   color: '#7B4DC4' },
  { label: 'Projetos Ativos', value: '4',   sub: 'em andamento',  color: '#3b82f6' },
  { label: 'Tasks Totais',   value: '326',  sub: 'todos projetos', color: '#22c55e' },
  { label: 'Receita MRR',    value: 'R$145', sub: 'plano Pro',    color: '#f59e0b' },
];

interface Member {
  name: string;
  role: string;
  status: 'active' | 'inactive';
  initial: string;
  color: string;
}

const MEMBERS: Member[] = [
  { name: 'Victor Leffa', role: 'Owner',  status: 'active', initial: 'VL', color: '#7B4DC4' },
  { name: 'Lucas M.',     role: 'Dev',    status: 'active', initial: 'LM', color: '#3b82f6' },
  { name: 'Ana Costa',    role: 'Member', status: 'active', initial: 'AC', color: '#22c55e' },
];

const TERMINAL_LINES = [
  { text: '[2026-04-13 08:41:02] deploy:prod — Lin-Dev@0.9.2 — SUCCESS', color: '#22c55e' },
  { text: '[2026-04-13 08:40:55] sync:db — migrations applied (3 new)', color: '#22c55e' },
  { text: '[2026-04-13 08:40:48] build:vite — bundle 284kb gzip — OK', color: '#22c55e' },
  { text: '[2026-04-13 08:40:40] ci:lint — 0 errors, 0 warnings', color: '#94a3b8' },
];

// ── Usage bar component ───────────────────────────────────
function UsageBar({ label, value, max, unit, color }: {
  label: string;
  value: number;
  max: number;
  unit: string;
  color: string;
}) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className={s.usageRow}>
      <div className={s.usageTopRow}>
        <span className={s.usageLabel}>{label}</span>
        <span className={s.usageVal}>
          {value}{unit} <span className={s.usageMax}>/ {max}{unit}</span>
        </span>
      </div>
      <div className={s.usageBarBg}>
        <div className={s.usageBarFill} style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

// ── Admin view ────────────────────────────────────────────
export function Admin() {
  const headerRef  = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const bentoRef   = useRef<HTMLDivElement>(null);
  const termRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [headerRef.current, statsRef.current, bentoRef.current, termRef.current];
    els.forEach((el, i) => {
      if (!el) return;
      setTimeout(() => el.classList.add('visible'), 50 + i * 80);
    });
  }, []);

  return (
    <div id="view-admin">
      {/* Page header */}
      <div ref={headerRef} className="reveal page-header">
        <div className="page-header-left">
          <span className="section-tag">
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#f59e0b',
                boxShadow: '0 0 6px #f59e0b',
                display: 'inline-block',
              }}
            />
            Admin
          </span>
          <h1 className="page-title">
            <span className="gradient-text">Painel Administrativo</span>
          </h1>
          <p className="page-subtitle">Ceisc Tech · Plano Pro · 5 membros</p>
        </div>
      </div>

      {/* Stats row */}
      <div ref={statsRef} className={`reveal reveal-delay-1 admin-stats`}>
        {ADMIN_STATS.map((stat) => (
          <div key={stat.label} className={`card ${s.statCard}`} style={{ borderTopColor: stat.color }}>
            <div className={s.statValue} style={{ color: stat.color }}>{stat.value}</div>
            <div className={s.statLabel}>{stat.label}</div>
            <div className={s.statSub}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Bento grid */}
      <div ref={bentoRef} className={`reveal reveal-delay-2 admin-bento`}>
        {/* Left: Members table */}
        <div className="card">
          <div className="card-label">
            <span className="dot" />
            Membros
          </div>
          <table className={`admin-table ${s.membersTable}`}>
            <thead>
              <tr>
                <th>Membro</th>
                <th>Funcao</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {MEMBERS.map((m) => (
                <tr key={m.name}>
                  <td>
                    <div className={s.memberCell}>
                      <span
                        className={s.memberAvatar}
                        style={{ background: `${m.color}22`, color: m.color }}
                      >
                        {m.initial}
                      </span>
                      <span className={s.memberName}>{m.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className={s.memberRole}>{m.role}</span>
                  </td>
                  <td>
                    <span
                      className={`status-pill ${m.status === 'active' ? 's-approved' : 's-draft'}`}
                    >
                      {m.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: Plan + usage */}
        <div className="card">
          <div className="card-label">
            <span className="dot" />
            Plano & Uso
          </div>

          <div className={s.planInfoBox}>
            <div className={s.planName}>Pro</div>
            <div className={s.planPrice}>R$145<span className={s.planPer}>/mo</span></div>
            <div className={s.planMeta}>5 seats · Renova em Mai 2026</div>
          </div>

          <div className={s.usageSection}>
            <UsageBar label="Projetos"  value={4}   max={10} unit=""   color="#7B4DC4" />
            <UsageBar label="Membros"   value={5}   max={10} unit=""   color="#3b82f6" />
            <UsageBar label="Storage"   value={2.3} max={5}  unit=" GB" color="#f59e0b" />
          </div>
        </div>
      </div>

      {/* Terminal card */}
      <div ref={termRef} className={`reveal reveal-delay-3 card ${s.terminalCard}`}>
        <div className="card-label">
          <span className="dot" style={{ background: '#22c55e' }} />
          Deploy Log
        </div>
        <div className={s.terminalBody}>
          {TERMINAL_LINES.map((line, i) => (
            <div key={i} className={s.terminalLine} style={{ color: line.color }}>
              {line.text}
            </div>
          ))}
          <div className={s.terminalCursor} />
        </div>
      </div>
    </div>
  );
}
