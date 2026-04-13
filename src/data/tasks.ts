import type { KanbanTask } from '../types';

export const TASKS: KanbanTask[] = [
  { id: 'T-101', title: 'Setup Drizzle ORM migrations', status: 'done', projectId: 'bq-api', tags: ['backend', 'db'], priority: 'high', assignee: 'Victor' },
  { id: 'T-102', title: 'Endpoint POST /auth/register', status: 'done', projectId: 'bq-api', tags: ['backend', 'auth'], priority: 'high', assignee: 'Victor' },
  { id: 'T-103', title: 'Endpoint POST /auth/login + JWT', status: 'in-progress', projectId: 'bq-api', tags: ['backend', 'auth'], priority: 'high', assignee: 'Lucas' },
  { id: 'T-104', title: 'Tela de login React Native', status: 'in-progress', projectId: 'bq-app', tags: ['mobile', 'auth'], priority: 'high', assignee: 'Ana' },
  { id: 'T-105', title: 'Middleware de autenticacao', status: 'review', projectId: 'bq-api', tags: ['backend'], priority: 'medium', assignee: 'Victor' },
  { id: 'T-106', title: 'Resolver bug #243 no parser de questoes', status: 'todo', projectId: 'bq-api', tags: ['bug', 'backend'], priority: 'high', assignee: 'Lucas' },
  { id: 'T-107', title: 'Componente QuestionCard', status: 'todo', projectId: 'bq-app', tags: ['mobile', 'ui'], priority: 'medium', assignee: 'Ana' },
  { id: 'T-108', title: 'Integrar SDK de pagamento', status: 'backlog', projectId: 'gd-app', tags: ['billing'], priority: 'low', assignee: 'Victor' },
  { id: 'T-109', title: 'Sidebar responsiva (slim mode)', status: 'done', projectId: 'gd-app', tags: ['ui', 'responsive'], priority: 'medium', assignee: 'Victor' },
  { id: 'T-110', title: 'Dashboard KPI cards', status: 'done', projectId: 'gd-app', tags: ['ui', 'dashboard'], priority: 'medium', assignee: 'Victor' },
  { id: 'T-111', title: 'Kanban DnD cross-column', status: 'done', projectId: 'gd-app', tags: ['feature'], priority: 'high', assignee: 'Victor' },
  { id: 'T-112', title: 'Board auto-refresh 30s', status: 'review', projectId: 'gd-app', tags: ['feature'], priority: 'low', assignee: 'Victor' },
  { id: 'T-113', title: 'Endpoint GET /projects', status: 'done', projectId: 'bq-api', tags: ['backend'], priority: 'medium', assignee: 'Lucas' },
  { id: 'T-114', title: 'Configurar Expo EAS Build', status: 'backlog', projectId: 'bq-app', tags: ['devops'], priority: 'low', assignee: 'Ana' },
];
