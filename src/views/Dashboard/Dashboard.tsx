import React, { useEffect, useRef } from 'react';
import { PROJECTS } from '../../data/projects';
import { SPRINTS } from '../../data/sprints';
import s from './Dashboard.module.css';

// ── KPI stat card data ───────────────────────────────────
interface StatDef {
  label: string;
  value: string;
  sub: string;
  trend: string;
  trendUp: boolean;
  border: string;
  sparkId: string;
  icon: React.ReactNode;
}

const STATS: StatDef[] = [
  {
    label: 'Projetos',
    value: '4',
    sub: 'Ativos agora',
    trend: '',
    trendUp: true,
    border: 'border-purple',
    sparkId: 'spark-projects',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="7" height="6" rx="1.5" />
        <rect x="11" y="4" width="7" height="6" rx="1.5" />
        <rect x="2" y="12" width="7" height="4" rx="1.5" />
        <rect x="11" y="12" width="7" height="4" rx="1.5" />
      </svg>
    ),
  },
  {
    label: 'Total Tarefas',
    value: '326',
    sub: 'Todos os projetos',
    trend: '↑8%',
    trendUp: true,
    border: 'border-slate',
    sparkId: 'spark-tasks',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 10h10M5 6h10M5 14h6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Concluídas',
    value: '211',
    sub: '64.7% do total',
    trend: '↑12%',
    trendUp: true,
    border: 'border-green',
    sparkId: 'spark-done',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 10l4.5 4.5L16 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Pontos',
    value: '827',
    sub: 'de 1370 · Sprint 6',
    trend: '↑15%',
    trendUp: true,
    border: 'border-blue',
    sparkId: 'spark-points',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="10,2.5 12.5,8 18,8.5 14,12.5 15.5,18 10,15 4.5,18 6,12.5 2,8.5 7.5,8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Atrasadas',
    value: '1',
    sub: 'Requer atenção',
    trend: '↓67%',
    trendUp: false,
    border: 'border-red',
    sparkId: 'spark-late',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="10" cy="10" r="7.5" />
        <path d="M10 6v4.5l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

// ── Sparkline paths (bezier curves matching mockup style) ─
const SPARKLINES: Record<string, { path: string; color: string }> = {
  'spark-projects': { path: 'M0,40 C20,38 40,35 60,32 C80,29 100,28 120,25 C140,22 160,20 180,18 C200,16 220,14 240,12', color: '#7B4DC4' },
  'spark-tasks':    { path: 'M0,42 C30,40 50,36 80,30 C110,24 130,22 160,18 C185,15 210,13 240,10', color: '#607D8B' },
  'spark-done':     { path: 'M0,44 C40,40 70,32 100,25 C130,18 160,14 200,10 C215,8 228,7 240,6', color: '#22c55e' },
  'spark-points':   { path: 'M0,38 C20,36 50,32 80,26 C110,20 140,16 170,12 C200,8 220,7 240,5', color: '#3b82f6' },
  'spark-late':     { path: 'M0,20 C30,22 60,28 90,35 C120,42 150,44 180,42 C200,40 220,38 240,36', color: '#ef4444' },
};

// ── Gem facet visualizer (project progress arcs) ─────────
const GEM_COLORS = ['#7B4DC4', '#22c55e', '#f59e0b', '#3b82f6', '#94a3b8'];

function GemViz() {
  const activeProjects = PROJECTS.filter((p) => p.status === 'active');
  const totalTasks = activeProjects.reduce((a, p) => a + p.tasksTotal, 0);
  const doneTasks = activeProjects.reduce((a, p) => a + p.tasksDone, 0);
  const overallPct = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className={s.gemVizWrap}>
      <div className="gem-viz">
        <svg viewBox="0 0 240 240" width="240" height="240">
          <defs>
            {activeProjects.map((p, i) => (
              <linearGradient key={p.id} id={`gv-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={GEM_COLORS[i % GEM_COLORS.length]} stopOpacity="0.6" />
                <stop offset="100%" stopColor={GEM_COLORS[i % GEM_COLORS.length]} stopOpacity="1" />
              </linearGradient>
            ))}
          </defs>
          {/* Background ring */}
          <circle cx="120" cy="120" r="96" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="20" />
          {/* Project arcs */}
          {activeProjects.map((p, i) => {
            const circumference = 2 * Math.PI * 96;
            const segLen = circumference / activeProjects.length;
            const fillLen = (p.progress / 100) * segLen;
            const gapBetween = 6;
            const offset = i * segLen + gapBetween / 2;
            return (
              <circle
                key={p.id}
                className="gem-facet"
                cx="120"
                cy="120"
                r="96"
                fill="none"
                stroke={`url(#gv-grad-${i})`}
                strokeWidth="20"
                strokeDasharray={`${fillLen - gapBetween} ${circumference - fillLen + gapBetween}`}
                strokeDashoffset={-offset + circumference / 4}
                strokeLinecap="round"
              />
            );
          })}
        </svg>
        <div className="gem-viz-center">
          <div className="gem-viz-value gradient-text">{overallPct}%</div>
          <div style={{ fontSize: '0.625rem', color: 'var(--t-muted)', fontFamily: 'var(--f-mono)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '4px' }}>
            Progresso
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="gem-legend">
        {activeProjects.map((p, i) => (
          <div key={p.id} className="gem-legend-item">
            <span className="gem-legend-dot" style={{ background: GEM_COLORS[i % GEM_COLORS.length] }} />
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>{p.initials}</span>
            <span className="gem-legend-val">{p.progress}%</span>
          </div>
        ))}
      </div>

      {/* Project progress bars */}
      <div className={s.projectBars}>
        {activeProjects.map((p, i) => (
          <div key={p.id} className={s.projectBarRow}>
            <div className={s.projectBarLabel}>
              <span style={{ color: GEM_COLORS[i % GEM_COLORS.length], fontFamily: 'var(--f-mono)', fontSize: '0.625rem', fontWeight: 700 }}>
                {p.initials}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--t-muted)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {p.title}
              </span>
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.625rem', color: 'var(--t-dim)', flexShrink: 0 }}>
                {p.progress}%
              </span>
            </div>
            <div className="bar-bg">
              <div
                className="bar-fill"
                style={{ width: `${p.progress}%`, background: GEM_COLORS[i % GEM_COLORS.length] }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Sprint tracker ────────────────────────────────────────
function SprintTracker() {
  const recent = SPRINTS.slice(0, 5);

  const statusColor: Record<string, string> = {
    active: 'var(--s-active)',
    completed: 'var(--s-completed)',
    planning: 'var(--s-planning)',
    cancelled: 'var(--s-cancelled)',
  };

  const statusLabel: Record<string, string> = {
    active: 'Em curso',
    completed: 'Concluído',
    planning: 'Planejado',
    cancelled: 'Cancelado',
  };

  return (
    <div className={s.sprintTrackerWrap}>
      <div className="card-label">
        <span className="dot" />
        Sprints
      </div>
      <div className="sprint-list">
        {recent.map((sprint) => (
          <div key={sprint.id} className="sprint-row">
            <div className="s-info">
              <span
                className="s-dot"
                style={{ color: statusColor[sprint.status], background: statusColor[sprint.status] }}
              />
              <span className="s-name">{sprint.name}</span>
            </div>
            <div className="s-status">
              <span className="pill-status" style={{ color: statusColor[sprint.status] }}>
                {statusLabel[sprint.status]}
              </span>
              <div className="s-mini-bar">
                <div
                  className="s-mini-fill"
                  style={{ width: `${sprint.progress}%`, background: statusColor[sprint.status] }}
                />
              </div>
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.625rem', color: 'var(--t-dim)', width: '30px', textAlign: 'right' }}>
                {sprint.progress}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Sprint health bars */}
      <div className={s.healthSection}>
        <div className="card-label" style={{ marginTop: '24px' }}>
          <span className="dot" />
          Saúde do Sprint
        </div>
        <div className="sprint-health">
          {[
            { label: 'Velocity', pct: 78, color: 'var(--c-primary-light)' },
            { label: 'Qualidade', pct: 91, color: 'var(--c-success)' },
            { label: 'Prazo', pct: 62, color: 'var(--c-warning)' },
          ].map((bar) => (
            <div key={bar.label} className="health-row">
              <span className="health-label">{bar.label}</span>
              <div className="health-bar">
                <div className="health-fill" style={{ width: `${bar.pct}%`, background: bar.color }} />
              </div>
              <span className="health-val">{bar.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Mini project list (bottom card) ──────────────────────
function ProjectMiniList() {
  const top3 = PROJECTS.filter((p) => p.status === 'active').slice(0, 3);

  return (
    <div className={`card ${s.miniListCard}`}>
      <div className="card-label">
        <span className="dot" />
        Projetos Ativos
      </div>
      <div className={s.miniList}>
        {top3.map((p) => (
          <div key={p.id} className="project-item">
            <div className="project-top">
              <div>
                <div className="project-name">{p.title}</div>
                <div className="project-stack">{p.stack}</div>
              </div>
              <div
                className="row-initials"
                style={{ background: p.initialsColor.bg, color: p.initialsColor.color }}
              >
                {p.initials}
              </div>
            </div>
            <div className="project-progress-bar">
              <div className="project-progress-fill" style={{ width: `${p.progress}%` }} />
            </div>
            <div className="project-meta">
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.625rem' }}>
                {p.tasksDone}/{p.tasksTotal} tarefas · {p.sprint}
              </span>
              <div className="project-avatars">
                {p.avatars.slice(0, 3).map((av, idx) => (
                  <img key={idx} src={av} alt="avatar" />
                ))}
                {p.avatarOverflow && (
                  <span className="avatar-overflow">{p.avatarOverflow}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Dashboard root ────────────────────────────────────────
export function Dashboard() {
  const headerRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [headerRef.current, metricsRef.current, bentoRef.current, bottomRef.current];
    els.forEach((el, i) => {
      if (!el) return;
      setTimeout(() => el.classList.add('visible'), 50 + i * 80);
    });
  }, []);

  return (
    <div>
      {/* Page header */}
      <div ref={headerRef} className="reveal page-header">
        <div className="page-header-left">
          <span className="section-tag">
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--c-success)', boxShadow: '0 0 6px var(--c-success)', display: 'inline-block' }} />
            gestao.dev · Sprint 6
          </span>
          <h1 className="page-title">
            Bom dia, <span className="gradient-text">Victor</span>
          </h1>
          <p className="page-subtitle">4 projetos ativos · Sprint 6 em curso · 15 tarefas concluídas esta semana</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span className="page-action-chip">Atualizado há 2min</span>
          <button className="gem-cta gem-cta--sm">+ Nova Tarefa</button>
        </div>
      </div>

      {/* KPI metrics row */}
      <div ref={metricsRef} className="reveal reveal-delay-1 metrics-row">
        {STATS.map((stat) => {
          const spark = SPARKLINES[stat.sparkId];
          return (
            <div key={stat.label} className={`card stat-card ${stat.border}`}>
              <div className="stat-kpi-row">
                <div className="stat-icon-wrap">{stat.icon}</div>
                <div>
                  <div className="kpi-value">
                    {stat.value}
                    {stat.trend && (
                      <span
                        className="kpi-trend"
                        style={{ color: stat.trendUp ? 'var(--c-success)' : 'var(--c-error)' }}
                      >
                        {stat.trend}
                      </span>
                    )}
                  </div>
                  <div className="kpi-sub">{stat.sub}</div>
                </div>
              </div>
              <div className="card-label" style={{ marginTop: 'auto', paddingTop: '16px' }}>
                {stat.label}
              </div>
              {/* Sparkline */}
              <div className="sparkline-box">
                <svg viewBox="0 0 240 60" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id={`fill-${stat.sparkId}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={spark.color} stopOpacity="0.25" />
                      <stop offset="100%" stopColor={spark.color} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={`${spark.path} L240,60 L0,60 Z`}
                    fill={`url(#fill-${stat.sparkId})`}
                  />
                  <path
                    d={spark.path}
                    fill="none"
                    stroke={spark.color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bento core: gem viz + sprint tracker */}
      <div ref={bentoRef} className="reveal reveal-delay-2 bento-core">
        <div className="card">
          <div className="card-label">
            <span className="dot" />
            Visão Geral dos Projetos
          </div>
          <GemViz />
        </div>
        <div className="card">
          <SprintTracker />
        </div>
      </div>

      {/* Bottom: project mini-list */}
      <div ref={bottomRef} className="reveal reveal-delay-3">
        <ProjectMiniList />
      </div>
    </div>
  );
}
