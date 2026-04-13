import type { Sprint } from '../types';

export const SPRINTS: Sprint[] = [
  { id: 'sprint-6', name: 'Sprint 6', status: 'active', progress: 62, goal: 'Finalizar autenticacao e onboarding do gestao.dev', startDate: '2026-04-01', endDate: '2026-04-14', tasksTotal: 24, tasksDone: 15 },
  { id: 'sprint-5', name: 'Sprint 5', status: 'completed', progress: 100, goal: 'MVP do backend BQ com endpoints de autenticacao', startDate: '2026-03-18', endDate: '2026-03-31', tasksTotal: 21, tasksDone: 21 },
  { id: 'sprint-4', name: 'Sprint 4', status: 'completed', progress: 100, goal: 'Infraestrutura de CI/CD e deploy automatizado', startDate: '2026-03-04', endDate: '2026-03-17', tasksTotal: 18, tasksDone: 18 },
  { id: 'sprint-3', name: 'Sprint 3', status: 'completed', progress: 100, goal: 'Admin panel v1 completo com gestao de usuarios', startDate: '2026-02-18', endDate: '2026-03-03', tasksTotal: 22, tasksDone: 22 },
  { id: 'sprint-2', name: 'Sprint 2', status: 'completed', progress: 100, goal: 'Design system e componentes base', startDate: '2026-02-04', endDate: '2026-02-17', tasksTotal: 16, tasksDone: 16 },
  { id: 'sprint-1', name: 'Sprint 1', status: 'completed', progress: 100, goal: 'Setup inicial, arquitetura e repositorios', startDate: '2026-01-21', endDate: '2026-02-03', tasksTotal: 12, tasksDone: 12 },
];
