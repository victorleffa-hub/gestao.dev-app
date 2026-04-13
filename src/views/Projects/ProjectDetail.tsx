/* =========================================================
   GESTÃO.DEV — ProjectDetail Sub-view
   Phase 3 · src/views/Projects/ProjectDetail.tsx

   Shown when user clicks a project row.
   Tabs: Board (Kanban DnD) | Sprints (mini-cards + burndown)
         | Bugs
========================================================= */

import { useState } from 'react';
import type { Project, Sprint } from '../../types';
import { PROJECT_SPRINTS } from '../../data/sprints';
import { KanbanBoard } from '../../components/board/KanbanBoard';
import { BurndownChart, BurnStatusBadge, computeBurnStatus } from '../../components/board/BurndownChart';
import s from './ProjectDetail.module.css';

// ── Bug data (per-project) ────────────────────────────────
interface Bug {
  id: string;
  title: string;
  severity: 'high' | 'medium' | 'low';
  assignee?: string;
}

const PROJECT_BUGS: Record<string, Bug[]> = {
  'bq-api': [
    { id: 'BUG-001', title: 'JWT expiration nao invalida sessao no cliente',       severity: 'high',   assignee: 'Victor' },
    { id: 'BUG-002', title: 'PUT /questions retorna 500 com body vazio',            severity: 'high',   assignee: 'Lucas'  },
    { id: 'BUG-003', title: 'Race condition no upload de imagens de questoes',      severity: 'medium', assignee: 'Victor' },
    { id: 'BUG-004', title: 'Paginacao retorna items duplicados na pagina 2',       severity: 'medium', assignee: 'Lucas'  },
    { id: 'BUG-005', title: 'Webhook Stripe ignora eventos de subscription',        severity: 'low',    assignee: 'Victor' },
  ],
  'bq-app': [
    { id: 'BUG-010', title: 'Crash ao abrir QuestionCard com imagens grandes',     severity: 'high',   assignee: 'Ana'    },
    { id: 'BUG-011', title: 'Modo offline nao persiste progresso corretamente',    severity: 'medium', assignee: 'Ana'    },
  ],
  'gd-app': [
    { id: 'BUG-020', title: 'Sidebar slim mode pisca em viewports 1140-1180px',   severity: 'low',    assignee: 'Victor' },
    { id: 'BUG-021', title: 'Theme toggle nao persiste apos reload',               severity: 'medium', assignee: 'Victor' },
    { id: 'BUG-022', title: 'Burndown mini-chart quebra em Safari 16',             severity: 'low',    assignee: 'Victor' },
  ],
};

const SEVERITY_CSS: Record<Bug['severity'], string> = {
  high:   s.bugHigh,
  medium: s.bugMedium,
  low:    s.bugLow,
};

const SEVERITY_LABEL: Record<Bug['severity'], string> = {
  high:   'Alta',
  medium: 'Média',
  low:    'Baixa',
};

// ── Health helpers ────────────────────────────────────────
const HEALTH_COLOR: Record<string, string> = {
  healthy:  '#22c55e',
  warning:  '#f59e0b',
  critical: '#ef4444',
  dim:      '#94a3b8',
};

// ── Tab type ──────────────────────────────────────────────
type Tab = 'board' | 'sprints' | 'bugs';

const TABS: { id: Tab; label: string }[] = [
  { id: 'board',   label: 'Board'   },
  { id: 'sprints', label: 'Sprints' },
  { id: 'bugs',    label: 'Bugs'    },
];

// ── Sprint date label ─────────────────────────────────────
function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

// ── Sprint mini-card ──────────────────────────────────────
function SprintCard({ sprint }: { sprint: Sprint }) {
  const isPlanning  = sprint.status === 'planning';
  const isCompleted = sprint.status === 'completed';
  const isActive    = sprint.status === 'active';

  const days        = sprint.burndownReal ? sprint.burndownReal.length - 1 : 14;
  const burnStatus  = computeBurnStatus(
    sprint.totalPoints ?? 0,
    sprint.currentDay ?? 0,
    days,
    sprint.burndownReal,
    isCompleted,
    isPlanning,
  );

  const statusPillClass = isActive
    ? 's-active'
    : isCompleted
    ? 's-completed'
    : 's-planning';

  const statusPillLabel = isActive
    ? 'Ativa'
    : isCompleted
    ? 'Concluída'
    : 'Planejada';

  return (
    <div className={`card ${s.sprintCard} ${isPlanning ? s.sprintCardPlanning : ''}`}>
      {/* Header row */}
      <div className={s.sprintNameRow}>
        <div className={s.sprintNameLeft}>
          <span
            className={s.sprintDot}
            style={{
              background: sprint.burndownColor ?? '#94a3b8',
              opacity: isPlanning ? 0.5 : 1,
            }}
          />
          <span className={s.sprintName}>{sprint.name}</span>
          <span className={`status-pill ${statusPillClass}`}>{statusPillLabel}</span>
        </div>
        <span className={s.sprintDateRange}>
          {fmtDate(sprint.startDate)} — {fmtDate(sprint.endDate)}
        </span>
      </div>

      {/* Goal */}
      <p className={s.sprintGoal}>&ldquo;{sprint.goal}&rdquo;</p>

      {/* Stats */}
      <div className={s.sprintStats}>
        {(sprint.totalPoints ?? 0) > 0 && (
          <span className={s.sprintStat}><strong>{sprint.totalPoints}</strong> pts</span>
        )}
        <span className={s.sprintStat}><strong>{sprint.tasksTotal}</strong> tarefas</span>
        <span className={s.sprintStat} style={{ color: 'var(--c-success)' }}>
          <strong>{sprint.tasksDone}</strong> concluídas
        </span>
        {isActive && sprint.currentDay !== undefined && (
          <span className={s.sprintDayBadge}>Dia {sprint.currentDay} / {days}</span>
        )}
      </div>

      {/* Burndown chart */}
      <BurndownChart
        totalPoints={sprint.totalPoints ?? 0}
        days={days}
        currentDay={sprint.currentDay ?? 0}
        color={sprint.burndownColor ?? '#94a3b8'}
        real={sprint.burndownReal}
        mini
      />

      {/* Status badge */}
      <BurnStatusBadge status={burnStatus} pct={sprint.progress} />
    </div>
  );
}

// ── Bugs tab ──────────────────────────────────────────────
function BugsTab({ project }: { project: Project }) {
  const bugs = PROJECT_BUGS[project.id] ?? [];

  return (
    <div>
      <div className={s.bugsHeader}>
        <div className="filter-group">
          <button className="filter-pill active">Todos</button>
          <button className="filter-pill">Abertos</button>
          <button className="filter-pill">Resolvidos</button>
        </div>
        <button className="gem-cta gem-cta--sm">+ Reportar Bug</button>
      </div>

      {bugs.length === 0 ? (
        <div style={{ padding: '40px 0', textAlign: 'center',
          fontFamily: 'var(--f-mono)', fontSize: '0.75rem',
          color: 'var(--t-dim)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          Nenhum bug aberto — tudo certo ✓
        </div>
      ) : (
        <div className={s.bugList}>
          {bugs.map((bug) => (
            <div key={bug.id} className={s.bugRow}>
              <span className={s.bugId}>{bug.id}</span>
              <span className={s.bugTitle}>{bug.title}</span>
              <span className={`${s.bugSeverity} ${SEVERITY_CSS[bug.severity]}`}>
                {SEVERITY_LABEL[bug.severity]}
              </span>
              {bug.assignee && (
                <span className={s.bugAssignee}>{bug.assignee}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── ProjectDetail ─────────────────────────────────────────
interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const [activeTab, setActiveTab] = useState<Tab>('board');

  const sprints   = PROJECT_SPRINTS[project.id] ?? [];
  const activeSpr = sprints.find((sp) => sp.status === 'active');
  const bugCount  = (PROJECT_BUGS[project.id] ?? []).length;

  const healthColor = HEALTH_COLOR[project.health] ?? '#94a3b8';

  return (
    <div>
      {/* Breadcrumb */}
      <nav className={s.breadcrumb} aria-label="Breadcrumb">
        <button className={s.breadcrumbLink} onClick={onBack}>
          Projetos
        </button>
        <span className={s.breadcrumbSep}>/</span>
        <span className={s.breadcrumbCurrent}>{project.title}</span>
        <span className={s.breadcrumbSep}>/</span>
        <span className={s.breadcrumbCurrent}>
          {TABS.find((t) => t.id === activeTab)?.label}
        </span>
      </nav>

      {/* Project header */}
      <div className={s.projectHeader}>
        <div
          className={s.initials}
          style={{ background: project.initialsColor.bg, color: project.initialsColor.color }}
        >
          {project.initials}
        </div>
        <div className={s.projectMeta}>
          <h1 className={`${s.projectTitle} gradient-text`}>{project.title}</h1>
          <p className={s.projectDesc}>{project.description}</p>
        </div>
        {/* Health gem */}
        <div className="gem-health" style={{ flexShrink: 0 }}>
          <svg viewBox="0 0 32 32" width="16" height="16">
            <polygon points="16,4 26,8 26,24 16,28 6,24 6,8"
              fill={healthColor} opacity="0.7" />
          </svg>
          <span style={{ fontSize: '0.6875rem', color: healthColor }}>
            {project.health === 'healthy' ? 'Saudável'
             : project.health === 'warning' ? 'Atenção'
             : project.health === 'critical' ? 'Crítico'
             : 'Encerrado'}
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className={s.statsRow}>
        <div className={s.stat}>
          <span className={`${s.statVal} gradient-text`}>{project.progress}%</span>
          <span className={s.statLabel}>Progresso</span>
        </div>
        <div className={s.stat}>
          <span className={s.statVal}>{project.tasksTotal}</span>
          <span className={s.statLabel}>Tarefas</span>
        </div>
        <div className={s.stat}>
          <span className={s.statVal} style={{ color: 'var(--c-success)' }}>
            {project.tasksDone}
          </span>
          <span className={s.statLabel}>Concluídas</span>
        </div>
        <div className={s.stat}>
          <span className={s.statVal}
            style={{ color: project.bugs > 0 ? 'var(--c-error)' : 'var(--t-main)' }}>
            {project.bugs}
          </span>
          <span className={s.statLabel}>Bugs</span>
        </div>
        <div className={s.stat}>
          <span className={s.statVal}>{project.sprintsCount || sprints.length}</span>
          <span className={s.statLabel}>Sprints</span>
        </div>
        <div className={s.stat}>
          <span className={s.statVal}>{project.avatars.length}</span>
          <span className={s.statLabel}>Membros</span>
        </div>
      </div>

      {/* Tabs */}
      <div className={s.tabs} role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`${s.tab} ${activeTab === tab.id ? s.tabActive : ''}`}
            onClick={() => setActiveTab(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
          >
            {tab.label}
            {tab.id === 'bugs' && bugCount > 0 && (
              <span style={{
                marginLeft: '6px',
                fontSize: '0.4375rem',
                background: 'rgba(239,68,68,0.15)',
                color: '#ef4444',
                border: '1px solid rgba(239,68,68,0.25)',
                borderRadius: '999px',
                padding: '1px 6px',
                fontFamily: 'var(--f-mono)',
              }}>
                {bugCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      {activeTab === 'board' && (
        <KanbanBoard
          projectId={project.id}
          sprints={sprints}
          activeSprint={activeSpr}
        />
      )}

      {activeTab === 'sprints' && (
        <div className={s.sprintGrid}>
          {sprints.length === 0 ? (
            <div style={{ padding: '40px 0', fontFamily: 'var(--f-mono)',
              fontSize: '0.75rem', color: 'var(--t-dim)',
              textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              Nenhuma sprint cadastrada
            </div>
          ) : (
            sprints.map((sp) => <SprintCard key={sp.id} sprint={sp} />)
          )}
        </div>
      )}

      {activeTab === 'bugs' && (
        <BugsTab project={project} />
      )}
    </div>
  );
}
