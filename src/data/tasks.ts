import type { KanbanTask } from '../types';

export const TASKS: KanbanTask[] = [
  // ── bq-api — Sprint 4 (historical) ──────────────────────
  { id: 'T-101', title: 'Setup Drizzle ORM migrations',      status: 'done',        projectId: 'bq-api', sprintId: 'bq-api-s4', tags: ['backend', 'db'],   priority: 'high',   assignee: 'Victor' },
  { id: 'T-113', title: 'Endpoint GET /projects',            status: 'done',        projectId: 'bq-api', sprintId: 'bq-api-s4', tags: ['backend'],         priority: 'medium', assignee: 'Lucas'  },

  // ── bq-api — Sprint 5 (active) ──────────────────────────
  { id: 'T-102', title: 'Endpoint POST /auth/register',      status: 'done',        projectId: 'bq-api', sprintId: 'bq-api-s5', tags: ['backend', 'auth'], priority: 'high',   assignee: 'Victor' },
  { id: 'T-103', title: 'Endpoint POST /auth/login + JWT',   status: 'in-progress', projectId: 'bq-api', sprintId: 'bq-api-s5', tags: ['backend', 'auth'], priority: 'high',   assignee: 'Lucas'  },
  { id: 'T-105', title: 'Middleware de autenticacao',        status: 'review',      projectId: 'bq-api', sprintId: 'bq-api-s5', tags: ['backend'],         priority: 'medium', assignee: 'Victor' },
  { id: 'T-106', title: 'Resolver bug #243 no parser',       status: 'todo',        projectId: 'bq-api', sprintId: 'bq-api-s5', tags: ['bug', 'backend'],  priority: 'high',   assignee: 'Lucas'  },
  { id: 'T-115', title: 'Rate limiting nos endpoints Auth',  status: 'todo',        projectId: 'bq-api', sprintId: 'bq-api-s5', tags: ['backend', 'auth'], priority: 'medium', assignee: 'Victor' },
  { id: 'T-116', title: 'Integrar webhook Stripe',           status: 'backlog',     projectId: 'bq-api', sprintId: 'bq-api-s5', tags: ['billing'],         priority: 'low',    assignee: 'Victor' },

  // ── bq-app tasks ─────────────────────────────────────────
  { id: 'T-104', title: 'Tela de login React Native',        status: 'in-progress', projectId: 'bq-app', sprintId: 'bq-app-s6', tags: ['mobile', 'auth'],  priority: 'high',   assignee: 'Ana'    },
  { id: 'T-107', title: 'Componente QuestionCard',           status: 'todo',        projectId: 'bq-app', sprintId: 'bq-app-s6', tags: ['mobile', 'ui'],    priority: 'medium', assignee: 'Ana'    },
  { id: 'T-114', title: 'Configurar Expo EAS Build',         status: 'backlog',     projectId: 'bq-app', sprintId: 'bq-app-s6', tags: ['devops'],          priority: 'low',    assignee: 'Ana'    },

  // ── gd-app tasks ──────────────────────────────────────────
  { id: 'T-108', title: 'Integrar SDK de pagamento',         status: 'backlog',     projectId: 'gd-app', sprintId: 'gd-app-s6', tags: ['billing'],         priority: 'low',    assignee: 'Victor' },
  { id: 'T-109', title: 'Sidebar responsiva (slim mode)',    status: 'done',        projectId: 'gd-app', sprintId: 'gd-app-s5', tags: ['ui', 'responsive'], priority: 'medium', assignee: 'Victor' },
  { id: 'T-110', title: 'Dashboard KPI cards',              status: 'done',        projectId: 'gd-app', sprintId: 'gd-app-s5', tags: ['ui', 'dashboard'], priority: 'medium', assignee: 'Victor' },
  { id: 'T-111', title: 'Kanban DnD cross-column',          status: 'in-progress', projectId: 'gd-app', sprintId: 'gd-app-s6', tags: ['feature'],         priority: 'high',   assignee: 'Victor' },
  { id: 'T-112', title: 'Board auto-refresh 30s',           status: 'review',      projectId: 'gd-app', sprintId: 'gd-app-s6', tags: ['feature'],         priority: 'low',    assignee: 'Victor' },
  { id: 'T-117', title: 'ProjectDetail + breadcrumbs',      status: 'todo',        projectId: 'gd-app', sprintId: 'gd-app-s6', tags: ['ui', 'nav'],       priority: 'high',   assignee: 'Victor' },
  { id: 'T-118', title: 'BurndownChart component React',    status: 'todo',        projectId: 'gd-app', sprintId: 'gd-app-s6', tags: ['ui', 'chart'],     priority: 'medium', assignee: 'Victor' },
];
