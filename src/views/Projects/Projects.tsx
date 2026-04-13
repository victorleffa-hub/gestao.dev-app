import { useState, useEffect, useRef } from 'react';
import type { Project, ProjectHealth, ProjectStatus } from '../../types';
import { PROJECTS } from '../../data/projects';
import { ProjectDetail } from './ProjectDetail';
import s from './Projects.module.css';

// ── Gem health hexagon ────────────────────────────────────
const HEALTH_COLOR: Record<ProjectHealth, string> = {
  healthy: '#22c55e',
  warning: '#f59e0b',
  critical: '#ef4444',
  dim:     '#94a3b8',
};
const HEALTH_LABEL: Record<ProjectHealth, string> = {
  healthy: 'Saudável',
  warning: 'Atenção',
  critical: 'Crítico',
  dim:     'Encerrado',
};
const HEALTH_ANIM: Record<ProjectHealth, string> = {
  healthy:  'gem-health--pulse',
  warning:  'gem-health--shimmer',
  critical: 'gem-health--pulse',
  dim:      'gem-health--dim',
};

function GemHealthIcon({ health }: { health: ProjectHealth }) {
  const color = HEALTH_COLOR[health];
  return (
    <svg viewBox="0 0 32 32" width="14" height="14">
      <polygon points="16,4 26,8 26,24 16,28 6,24 6,8" fill={color} opacity="0.7" />
    </svg>
  );
}

// ── Project row ───────────────────────────────────────────
function ProjectRow({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const isCompleted = project.status === 'completed';
  const healthAnim = HEALTH_ANIM[project.health];

  return (
    <div
      className={`project-row ${isCompleted ? 'project-row--completed' : ''}`}
      style={{ position: 'relative', cursor: 'pointer' }}
      onClick={() => onOpen(project)}
    >
      {/* Accent bar */}
      <div
        className="accent-bar"
        style={{ background: HEALTH_COLOR[project.health] }}
      />

      {/* Col 1: Identity */}
      <div className="u-flex u-gap-12" style={{ minWidth: 0 }}>
        <div
          className="row-initials"
          style={{ background: project.initialsColor.bg, color: project.initialsColor.color, flexShrink: 0 }}
        >
          {project.initials}
        </div>
        <div style={{ minWidth: 0, overflow: 'hidden' }}>
          <div className="row-title">{project.title}</div>
          <div className="row-desc">{project.description}</div>
          <span className="row-sprint">{project.sprint}</span>
        </div>
      </div>

      {/* Col 2: Stack */}
      <div className="row-stack">
        <span className="code">{project.stack}</span>
      </div>

      {/* Col 3: Stats */}
      <div className="row-stats">
        <div className="row-stat">
          <span className="row-stat-val">{project.tasksTotal}</span>
          <span className="row-stat-label">Tarefas</span>
        </div>
        <div className="row-stat">
          <span className="row-stat-val">{project.tasksDone}</span>
          <span className="row-stat-label">Concluídas</span>
        </div>
        <div className="row-stat">
          <span className="row-stat-val" style={{ color: project.bugs > 0 ? 'var(--c-error)' : 'var(--t-main)' }}>
            {project.bugs}
          </span>
          <span className="row-stat-label">Bugs</span>
        </div>
        <div className="row-stat">
          <span className="row-stat-val">{project.sprintsCount}</span>
          <span className="row-stat-label">Sprints</span>
        </div>
      </div>

      {/* Col 4: Progress */}
      <div className="row-progress" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div className="row-bar">
          <div className="row-bar-fill" style={{ width: `${project.progress}%` }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="row-bar-pct">{project.progress}%</span>
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.4375rem', color: 'var(--t-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Progresso
          </span>
        </div>
      </div>

      {/* Col 5: Gem health */}
      <div className={`gem-health ${healthAnim}`} style={{ justifyContent: 'center' }}>
        <GemHealthIcon health={project.health} />
        <span style={{ fontSize: '0.6875rem', color: HEALTH_COLOR[project.health] }}>
          {HEALTH_LABEL[project.health]}
        </span>
      </div>

      {/* Col 6: Avatars + Quick actions */}
      <div className="u-flex u-gap-8" style={{ justifyContent: 'flex-end' }}>
        <div className="row-avatars">
          {project.avatars.slice(0, 3).map((av, idx) => (
            <img key={idx} src={av} alt="avatar" />
          ))}
          {project.avatarOverflow && (
            <span className="avatar-overflow">{project.avatarOverflow}</span>
          )}
        </div>
        <div className="quick-actions">
          <button className="quick-action" title="Abrir board" aria-label="Abrir board"
            onClick={(e) => { e.stopPropagation(); onOpen(project); }}>
            <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="1" y="3" width="4" height="10" rx="1" />
              <rect x="6" y="3" width="4" height="7" rx="1" />
              <rect x="11" y="3" width="4" height="5" rx="1" />
            </svg>
          </button>
          <button className="quick-action" title="Editar" aria-label="Editar projeto"
            onClick={(e) => e.stopPropagation()}>
            <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M11 2.5l2.5 2.5-8 8H3v-2.5l8-8z" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Filter types ──────────────────────────────────────────
type StatusFilter = 'all' | ProjectStatus;
type HealthFilter = ProjectHealth;

// ── Projects view ─────────────────────────────────────────
export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [statusFilters, setStatusFilters] = useState<StatusFilter[]>(['all']);
  const [healthFilters, setHealthFilters] = useState<HealthFilter[]>([]);

  const headerRef = useRef<HTMLDivElement>(null);
  const listRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [headerRef.current, listRef.current];
    els.forEach((el, i) => {
      if (!el) return;
      setTimeout(() => el.classList.add('visible'), 50 + i * 80);
    });
  }, []);

  // Status filter toggle
  function toggleStatus(f: StatusFilter) {
    if (f === 'all') {
      setStatusFilters(['all']);
      return;
    }
    setStatusFilters((prev) => {
      const without = prev.filter((x) => x !== 'all');
      if (without.includes(f)) {
        const next = without.filter((x) => x !== f);
        return next.length === 0 ? ['all'] : next;
      }
      return [...without, f];
    });
  }

  // Health filter toggle
  function toggleHealth(f: HealthFilter) {
    setHealthFilters((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
    );
  }

  function clearFilters() {
    setStatusFilters(['all']);
    setHealthFilters([]);
  }

  const hasFilters = !statusFilters.includes('all') || healthFilters.length > 0;

  // Apply filters
  const filtered = PROJECTS.filter((p) => {
    const statusOk = statusFilters.includes('all') || statusFilters.includes(p.status);
    const healthOk = healthFilters.length === 0 || healthFilters.includes(p.health);
    return statusOk && healthOk;
  });

  const activeRows    = filtered.filter((p) => p.status !== 'completed');
  const completedRows = filtered.filter((p) => p.status === 'completed');

  const statusFilterDefs: { label: string; value: StatusFilter }[] = [
    { label: 'Todos', value: 'all' },
    { label: 'Ativo', value: 'active' },
    { label: 'Concluído', value: 'completed' },
  ];

  const healthFilterDefs: { label: string; value: HealthFilter; color: string }[] = [
    { label: 'Saudável', value: 'healthy', color: '#22c55e' },
    { label: 'Atenção',  value: 'warning', color: '#f59e0b' },
    { label: 'Encerrado', value: 'dim',    color: '#94a3b8' },
  ];

  // ── Project detail sub-view ─────────────────────────────
  if (selectedProject) {
    return (
      <div id="view-project-detail">
        <ProjectDetail
          project={selectedProject}
          onBack={() => setSelectedProject(null)}
        />
      </div>
    );
  }

  return (
    <div id="view-projects">
      {/* Page header */}
      <div ref={headerRef} className="reveal page-header" style={{ alignItems: 'flex-start', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%' }}>
          <div className="page-header-left">
            <span className="section-tag">
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--c-primary-light)', boxShadow: '0 0 6px var(--c-primary-light)', display: 'inline-block' }} />
              Projetos
            </span>
            <h1 className="page-title">
              <span className="gradient-text">Projetos</span>
            </h1>
            <p className="page-subtitle">
              {PROJECTS.filter((p) => p.status === 'active').length} ativos · {PROJECTS.filter((p) => p.status === 'completed').length} encerrados
            </p>
          </div>
          <button className="gem-cta gem-cta--sm">+ Novo Projeto</button>
        </div>

        {/* Filter controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Status filter group */}
          <div className="filter-group">
            {statusFilterDefs.map((fd) => (
              <button
                key={fd.value}
                className={`filter-pill${statusFilters.includes(fd.value) ? ' active' : ''}`}
                onClick={() => toggleStatus(fd.value)}
              >
                {fd.label}
              </button>
            ))}
          </div>

          {/* Health filter group */}
          <div className="filter-group">
            {healthFilterDefs.map((fd) => (
              <button
                key={fd.value}
                className={`filter-pill${healthFilters.includes(fd.value) ? ' active' : ''}`}
                onClick={() => toggleHealth(fd.value)}
              >
                <span className="filter-gem" style={{ background: fd.color }} />
                {fd.label}
              </button>
            ))}
          </div>

          {hasFilters && (
            <button className="filter-clear" onClick={clearFilters}>
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* Projects list */}
      <div ref={listRef} className="reveal reveal-delay-1 projects-list">
        {activeRows.map((project) => (
          <ProjectRow key={project.id} project={project} onOpen={setSelectedProject} />
        ))}

        {completedRows.length > 0 && (
          <>
            <div className="projects-divider">
              <span>Encerrados</span>
            </div>
            {completedRows.map((project) => (
              <ProjectRow key={project.id} project={project} onOpen={setSelectedProject} />
            ))}
          </>
        )}

        {filtered.length === 0 && (
          <div className={s.emptyState}>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.75rem', color: 'var(--t-dim)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Nenhum projeto encontrado
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
