/* =========================================================
   GESTÃO.DEV — TypeScript Types
   Phase 1 · src/types/index.ts
========================================================= */

// ── Views ────────────────────────────────────────────────
export type ViewId =
  | 'view-dash'
  | 'view-projects'
  | 'view-ideas'
  | 'view-board'
  | 'view-sprints'
  | 'view-admin'
  | 'view-billing'
  | 'view-org'
  | 'view-account';

// ── Theme ────────────────────────────────────────────────
export type Theme = 'dark' | 'light';

// ── Navigation item ──────────────────────────────────────
export interface NavItem {
  id: ViewId;
  label: string;
  icon: string; // SVG path(s) as string
}

// ── Project ──────────────────────────────────────────────
export type ProjectStatus = 'active' | 'delayed' | 'completed';
export type ProjectHealth = 'healthy' | 'warning' | 'critical' | 'dim';

export interface Project {
  id: string;
  title: string;
  description: string;
  sprint: string;
  status: ProjectStatus;
  health: ProjectHealth;
  progress: number; // 0-100
  tasksTotal: number;
  tasksDone: number;
  avatars: string[];
}

// ── Kanban / Board ───────────────────────────────────────
export type KanbanStatus = 'backlog' | 'todo' | 'in-progress' | 'review' | 'done';

export interface KanbanTask {
  id: string;
  title: string;
  status: KanbanStatus;
  projectId: string;
  tags: string[];
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
}

// ── Sprint ───────────────────────────────────────────────
export type SprintStatus = 'planning' | 'active' | 'completed' | 'cancelled';

export interface Sprint {
  id: string;
  name: string;
  status: SprintStatus;
  progress: number;
  goal: string;
  startDate: string;
  endDate: string;
  tasksTotal: number;
  tasksDone: number;
}

// ── Idea ─────────────────────────────────────────────────
export type IdeaStatus = 'draft' | 'discussing' | 'approved' | 'converted';
export type IdeaCategory =
  | 'product'
  | 'integration'
  | 'gamification'
  | 'performance'
  | 'ai'
  | 'ux'
  | 'reports'
  | 'mobile';

export interface Idea {
  id: string;
  title: string;
  description: string;
  status: IdeaStatus;
  category: IdeaCategory;
  votes: number;
  author: string;
}

// ── Dashboard KPI ────────────────────────────────────────
export interface KpiCard {
  label: string;
  value: number;
  trend: string;
  accent: 'purple' | 'blue' | 'green' | 'orange' | 'red';
}

// ── App State ────────────────────────────────────────────
export interface AppState {
  theme: Theme;
  activeView: ViewId;
  sidebarSlim: boolean;
}
