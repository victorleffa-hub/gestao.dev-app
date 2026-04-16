import type { Idea } from '../types';

export const IDEAS: Idea[] = [
  { id: '1', title: 'IA para sugestão de sprints', description: 'Usar historico de tarefas para sugerir duracao e scope de sprints automaticamente', status: 'approved', category: 'ai', votes: 21, author: 'Victor Leffa' },
  { id: '2', title: 'Integracao GitHub', description: 'Sincronizar PRs e commits com tarefas do board automaticamente', status: 'discussing', category: 'integration', votes: 8, author: 'Lucas M.' },
  { id: '3', title: 'Sistema de pontos e conquistas', description: 'Gamificar entregas com badges e rankings por sprint', status: 'converted', category: 'gamification', votes: 0, author: 'Ana Costa' },
  { id: '4', title: 'Cache inteligente de queries', description: 'Reduzir latencia com cache adaptativo baseado em padroes de uso', status: 'discussing', category: 'performance', votes: 15, author: 'Carlos R.' },
  { id: '5', title: 'Resumo de projeto por IA', description: 'Gerar resumo executivo do projeto usando LLM com contexto do board', status: 'approved', category: 'ai', votes: 21, author: 'Victor Leffa' },
  { id: '6', title: 'Dark/light adaptativo por horario', description: 'Mudar tema automaticamente baseado no horario do usuario', status: 'draft', category: 'ux', votes: 5, author: 'Ana Costa' },
  { id: '7', title: 'Dashboard de metricas de time', description: 'Visualizar velocity, throughput e cycle time por membro', status: 'discussing', category: 'reports', votes: 9, author: 'Lucas M.' },
  { id: '8', title: 'App mobile nativo', description: 'Versao iOS/Android do Lin-Dev para acompanhamento em campo', status: 'converted', category: 'mobile', votes: 0, author: 'Victor Leffa' },
];
