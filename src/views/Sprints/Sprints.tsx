/* =========================================================
   GESTÃO.DEV — Sprints View
   Phase 2b · src/views/Sprints/Sprints.tsx
========================================================= */

import { useEffect, useRef } from 'react';
import type { SprintStatus } from '../../types';
import { SPRINTS } from '../../data/sprints';
import s from './Sprints.module.css';

// ── Status badge colors ───────────────────────────────────
const STATUS_COLOR: Record<SprintStatus, string> = {
  active:    '#6366f1',
  completed: '#22c55e',
  planning:  '#94a3b8',
  cancelled: '#ef4444',
};

const STATUS_LABEL: Record<SprintStatus, string> = {
  active:    'Ativa',
  completed: 'Concluida',
  planning:  'Planejada',
  cancelled: 'Cancelada',
};

// ── Helpers ───────────────────────────────────────────────
function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

// ── Sprint view ───────────────────────────────────────────
export function Sprints() {
  const headerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);
  const gridRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [headerRef.current, activeRef.current, gridRef.current];
    els.forEach((el, i) => {
      if (!el) return;
      setTimeout(() => el.classList.add('visible'), 50 + i * 80);
    });
  }, []);

  const activeSprint = SPRINTS.find((sp) => sp.status === 'active');
  const pastSprints  = SPRINTS.filter((sp) => sp.status !== 'active');

  return (
    <div id="view-sprints">
      {/* Page header */}
      <div ref={headerRef} className="reveal page-header">
        <div className="page-header-left">
          <span className="section-tag">
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#6366f1',
                boxShadow: '0 0 6px #6366f1',
                display: 'inline-block',
              }}
            />
            Sprints
          </span>
          <h1 className="page-title">
            <span className="gradient-text">Gerenciamento de Sprints</span>
          </h1>
          <p className="page-subtitle">
            Sprint 6 ativa · 62% concluido · 14 dias
          </p>
        </div>
        <button className="gem-cta gem-cta--sm">+ Nova Sprint</button>
      </div>

      {/* Active sprint card */}
      {activeSprint && (
        <div ref={activeRef} className={`reveal reveal-delay-1 card sprint-active ${s.activeCard}`}>
          <div className={s.activeHeader}>
            <div className={s.activeNameRow}>
              <h2 className={s.activeName}>{activeSprint.name}</h2>
              <span
                className={s.statusBadge}
                style={{
                  background: `${STATUS_COLOR[activeSprint.status]}22`,
                  color: STATUS_COLOR[activeSprint.status],
                  borderColor: `${STATUS_COLOR[activeSprint.status]}44`,
                }}
              >
                {STATUS_LABEL[activeSprint.status]}
              </span>
            </div>
            <p className={s.activeGoal}>{activeSprint.goal}</p>
            <span className={s.dateBadge}>
              {formatDate(activeSprint.startDate)} → {formatDate(activeSprint.endDate)}
            </span>
          </div>

          {/* Large progress bar */}
          <div className={s.progressSection}>
            <div className={s.progressTopRow}>
              <span className={s.progressLabel}>Progresso</span>
              <span className={s.progressPct}>{activeSprint.progress}%</span>
            </div>
            <div className={s.progressBarBg}>
              <div
                className={s.progressBarFill}
                style={{
                  width: `${activeSprint.progress}%`,
                  background: STATUS_COLOR[activeSprint.status],
                }}
              />
            </div>
          </div>

          {/* Stats row */}
          <div className={s.statsRow}>
            <div className={s.statBox}>
              <span className={s.statVal}>{activeSprint.tasksTotal}</span>
              <span className={s.statLabel}>Tarefas</span>
            </div>
            <div className={s.statDivider} />
            <div className={s.statBox}>
              <span className={s.statVal} style={{ color: '#22c55e' }}>{activeSprint.tasksDone}</span>
              <span className={s.statLabel}>Concluidas</span>
            </div>
            <div className={s.statDivider} />
            <div className={s.statBox}>
              <span className={s.statVal} style={{ color: '#f59e0b' }}>
                {activeSprint.tasksTotal - activeSprint.tasksDone}
              </span>
              <span className={s.statLabel}>Restantes</span>
            </div>
          </div>
        </div>
      )}

      {/* Past sprints grid */}
      {pastSprints.length > 0 && (
        <div ref={gridRef} className={`reveal reveal-delay-2 sprint-grid`}>
          {pastSprints.map((sprint) => (
            <div key={sprint.id} className={`card ${s.pastCard}`}>
              <div className={s.pastHeader}>
                <span className={s.pastName}>{sprint.name}</span>
                <span
                  className={s.statusBadge}
                  style={{
                    background: `${STATUS_COLOR[sprint.status]}22`,
                    color: STATUS_COLOR[sprint.status],
                    borderColor: `${STATUS_COLOR[sprint.status]}44`,
                  }}
                >
                  {STATUS_LABEL[sprint.status]}
                </span>
              </div>

              {/* Progress = 100% for completed */}
              <div className={s.pastProgressRow}>
                <div className={s.progressBarBg}>
                  <div
                    className={s.progressBarFill}
                    style={{
                      width: `${sprint.progress}%`,
                      background: STATUS_COLOR[sprint.status],
                    }}
                  />
                </div>
                <span className={s.pastPct}>{sprint.progress}%</span>
              </div>

              {/* Goal (truncated) */}
              <p className={s.pastGoal}>{sprint.goal}</p>

              {/* Date range */}
              <div className={s.pastDate}>
                {formatDate(sprint.startDate)} → {formatDate(sprint.endDate)}
              </div>

              {/* Task counts */}
              <div className={s.pastTaskRow}>
                <span className={s.pastTaskChip}>
                  {sprint.tasksDone}/{sprint.tasksTotal} tarefas
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
