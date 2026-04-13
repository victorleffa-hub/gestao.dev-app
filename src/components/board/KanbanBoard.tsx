/* =========================================================
   GESTÃO.DEV — KanbanBoard Component
   Phase 3 · src/components/board/KanbanBoard.tsx

   HTML5 drag-and-drop (no external library).
   Sprint filter: dropdown, filters cards by sprintId.
   Columns: Backlog → Todo → In Progress → Review → Done.
========================================================= */

import { useState, useCallback } from 'react';
import type { KanbanTask, KanbanStatus, Sprint } from '../../types';
import { TASKS } from '../../data/tasks';
import s from './KanbanBoard.module.css';

// ── Column definitions ────────────────────────────────────
const COLUMNS: { status: KanbanStatus; label: string }[] = [
  { status: 'backlog',     label: 'Backlog'      },
  { status: 'todo',        label: 'To Do'        },
  { status: 'in-progress', label: 'Em Progresso' },
  { status: 'review',      label: 'Review'       },
  { status: 'done',        label: 'Concluído'    },
];

// ── Priority helpers ──────────────────────────────────────
const PRIORITY_CSS: Record<KanbanTask['priority'], string> = {
  high:   s.priorityHigh,
  medium: s.priorityMedium,
  low:    s.priorityLow,
};

const PRIORITY_LABEL: Record<KanbanTask['priority'], string> = {
  high:   'Alta',
  medium: 'Média',
  low:    'Baixa',
};

// ── KanbanCard ────────────────────────────────────────────
interface KanbanCardProps {
  task: KanbanTask;
  isDragging: boolean;
  onDragStart: (id: string) => void;
}

function KanbanCard({ task, isDragging, onDragStart }: KanbanCardProps) {
  return (
    <div
      className={`${s.card} ${isDragging ? s.cardDragging : ''}`}
      draggable
      onDragStart={() => onDragStart(task.id)}
    >
      <div className={s.cardId}>{task.id}</div>
      <div className={s.cardTitle}>{task.title}</div>

      {task.tags.length > 0 && (
        <div className={s.tagRow}>
          {task.tags.map((tag) => (
            <span key={tag} className={s.tag}>{tag}</span>
          ))}
        </div>
      )}

      <div className={s.cardFooter}>
        <span className={`${s.priorityBadge} ${PRIORITY_CSS[task.priority]}`}>
          {PRIORITY_LABEL[task.priority]}
        </span>
        {task.assignee && (
          <span className={s.assignee}>{task.assignee}</span>
        )}
      </div>
    </div>
  );
}

// ── KanbanBoard ───────────────────────────────────────────
interface KanbanBoardProps {
  projectId: string;
  sprints?: Sprint[];        // available sprints for the sprint dropdown
  activeSprint?: Sprint;     // pre-selected sprint
}

export function KanbanBoard({ projectId, sprints = [], activeSprint }: KanbanBoardProps) {
  // ── State ─────────────────────────────────────────────
  const [tasks, setTasks]           = useState<KanbanTask[]>(() =>
    TASKS.filter((t) => t.projectId === projectId),
  );
  const [selectedSprint, setSprint] = useState<string>(
    activeSprint?.id ?? 'all',
  );
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overColumn, setOverColumn] = useState<KanbanStatus | null>(null);

  // ── Filtered tasks ─────────────────────────────────────
  const filtered = selectedSprint === 'all'
    ? tasks
    : tasks.filter((t) => t.sprintId === selectedSprint);

  const tasksByColumn = useCallback(
    (status: KanbanStatus) => filtered.filter((t) => t.status === status),
    [filtered],
  );

  // ── DnD handlers ──────────────────────────────────────
  function handleDragStart(id: string) {
    setDraggingId(id);
  }

  function handleDragOver(e: React.DragEvent, col: KanbanStatus) {
    e.preventDefault();
    setOverColumn(col);
  }

  function handleDrop(col: KanbanStatus) {
    if (!draggingId) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === draggingId ? { ...t, status: col } : t)),
    );
    setDraggingId(null);
    setOverColumn(null);
  }

  function handleDragEnd() {
    setDraggingId(null);
    setOverColumn(null);
  }

  // ── Sprint option label ────────────────────────────────
  function sprintLabel(sp: Sprint) {
    const statusMap: Record<string, string> = {
      active:    '● Ativa',
      completed: '✓ Concluída',
      planning:  '○ Planejada',
      cancelled: '✕ Cancelada',
    };
    return `${sp.name} — ${statusMap[sp.status] ?? sp.status}`;
  }

  const visibleCount = filtered.length;

  return (
    <div>
      {/* Sprint filter bar */}
      <div className={s.filterBar}>
        <span className={s.filterLabel}>
          <svg width="11" height="11" fill="none" stroke="currentColor"
            viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Sprint
        </span>

        <select
          className={s.sprintSelect}
          value={selectedSprint}
          onChange={(e) => setSprint(e.target.value)}
        >
          <option value="all">Todas as sprints</option>
          {sprints.map((sp) => (
            <option key={sp.id} value={sp.id}>{sprintLabel(sp)}</option>
          ))}
        </select>

        <span className={s.taskCount}>
          {visibleCount === 0
            ? 'nenhuma tarefa'
            : visibleCount === 1
            ? '1 tarefa'
            : `${visibleCount} tarefas`}
        </span>
      </div>

      {/* Board */}
      <div className={s.board}>
        {COLUMNS.map(({ status, label }) => {
          const colTasks = tasksByColumn(status);
          const isOver   = overColumn === status;

          return (
            <div
              key={status}
              className={`${s.column} ${isOver ? s.columnOver : ''}`}
              onDragOver={(e) => handleDragOver(e, status)}
              onDrop={() => handleDrop(status)}
              onDragLeave={() => setOverColumn(null)}
            >
              {/* Column header */}
              <div className={s.columnHeader}>
                <span className={s.columnTitle}>{label}</span>
                <span className={s.columnCount}>{colTasks.length}</span>
              </div>

              {/* Cards */}
              {colTasks.length === 0 ? (
                <div className={s.colEmpty}>vazio</div>
              ) : (
                colTasks.map((task) => (
                  <KanbanCard
                    key={task.id}
                    task={task}
                    isDragging={draggingId === task.id}
                    onDragStart={handleDragStart}
                  />
                ))
              )}
            </div>
          );
        })}
      </div>

      {/* Global drag-end safety */}
      <div style={{ display: 'none' }} onDragEnd={handleDragEnd} />
    </div>
  );
}
