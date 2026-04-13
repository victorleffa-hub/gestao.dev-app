/* =========================================================
   GESTÃO.DEV — Ideas View
   Phase 2b · src/views/Ideas/Ideas.tsx
========================================================= */

import { useState, useEffect, useRef } from 'react';
import type { IdeaStatus, IdeaCategory } from '../../types';
import { IDEAS } from '../../data/ideas';
import s from './Ideas.module.css';

// ── Category badge colors ─────────────────────────────────
const CATEGORY_COLOR: Record<IdeaCategory, string> = {
  ai:            '#7B4DC4',
  integration:   '#3b82f6',
  gamification:  '#f59e0b',
  performance:   '#22c55e',
  ux:            '#ec4899',
  reports:       '#64748b',
  mobile:        '#6366f1',
  product:       '#14b8a6',
};

const CATEGORY_LABEL: Record<IdeaCategory, string> = {
  ai:            'IA',
  integration:   'Integracao',
  gamification:  'Gamificacao',
  performance:   'Performance',
  ux:            'UX',
  reports:       'Relatorios',
  mobile:        'Mobile',
  product:       'Produto',
};

// ── Status pill ───────────────────────────────────────────
const STATUS_CLASS: Record<IdeaStatus, string> = {
  approved:   's-approved',
  discussing: 's-discussing',
  draft:      's-draft',
  converted:  's-converted',
};

const STATUS_LABEL: Record<IdeaStatus, string> = {
  approved:   'Aprovada',
  discussing: 'Em discussao',
  draft:      'Rascunho',
  converted:  'Convertida',
};

// ── Filter definitions ────────────────────────────────────
type FilterKey = 'all' | IdeaStatus;

interface FilterDef {
  key: FilterKey;
  label: string;
}

const FILTERS: FilterDef[] = [
  { key: 'all',       label: 'Todas'        },
  { key: 'approved',  label: 'Aprovadas'    },
  { key: 'discussing', label: 'Em Discussao' },
  { key: 'draft',     label: 'Rascunho'     },
  { key: 'converted', label: 'Convertidas'  },
];

// ── Ideas view ────────────────────────────────────────────
export function Ideas() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const headerRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [headerRef.current, filterRef.current, gridRef.current];
    els.forEach((el, i) => {
      if (!el) return;
      setTimeout(() => el.classList.add('visible'), 50 + i * 80);
    });
  }, []);

  const filtered = activeFilter === 'all'
    ? IDEAS
    : IDEAS.filter((idea) => idea.status === activeFilter);

  return (
    <div id="view-ideas">
      {/* Page header */}
      <div ref={headerRef} className="reveal page-header">
        <div className="page-header-left">
          <span className="section-tag">
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#ec4899',
                boxShadow: '0 0 6px #ec4899',
                display: 'inline-block',
              }}
            />
            Ideias
          </span>
          <h1 className="page-title">
            <span className="gradient-text">Mural de Ideias</span>
          </h1>
          <p className="page-subtitle">
            8 ideias · 2 aprovadas · 2 convertidas
          </p>
        </div>
        <button className="gem-cta gem-cta--sm">+ Nova Ideia</button>
      </div>

      {/* Filter pills */}
      <div ref={filterRef} className={`reveal reveal-delay-1 filter-group ${s.filterRow}`}>
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`filter-pill${activeFilter === f.key ? ' active' : ''}`}
            onClick={() => setActiveFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Ideas grid */}
      <div ref={gridRef} className={`reveal reveal-delay-2 ideas-grid`}>
        {filtered.map((idea) => (
          <div key={idea.id} className="idea-card card">
            {/* Top row: category badge + vote count */}
            <div className={s.cardTop}>
              <span
                className={s.categoryBadge}
                style={{
                  background: `${CATEGORY_COLOR[idea.category]}22`,
                  color: CATEGORY_COLOR[idea.category],
                  borderColor: `${CATEGORY_COLOR[idea.category]}44`,
                }}
              >
                {CATEGORY_LABEL[idea.category]}
              </span>
              <span className={s.voteCount}>
                <span className={s.voteArrow}>▲</span>
                {idea.votes}
              </span>
            </div>

            {/* Title */}
            <div className={s.cardTitle}>{idea.title}</div>

            {/* Description */}
            <p className={s.cardDesc}>{idea.description}</p>

            {/* Bottom row: status pill + author */}
            <div className={s.cardBottom}>
              <span className={`status-pill ${STATUS_CLASS[idea.status]}`}>
                {STATUS_LABEL[idea.status]}
              </span>
              <span className={s.cardAuthor}>{idea.author}</span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className={s.emptyState}>
            <span>Nenhuma ideia encontrada para este filtro.</span>
          </div>
        )}
      </div>
    </div>
  );
}
