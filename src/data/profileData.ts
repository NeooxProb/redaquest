import type {
  Achievement,
  EnemCompetency,
  ProfileStat,
  UserProfile,
} from '../types/profile'

export const userProfile: UserProfile = {
  name: 'Estudante RedaQuest',
  username: '@redaquest',
  avatar: '🚀',
  title: 'Argumentador em evolução',
  level: 12,
  currentXp: 2410,
  nextLevelXp: 3000,
  totalXp: 18350,
  rankingPosition: 5,
  streakDays: 7,
  unlockedCards: 7,
  totalCards: 12,
  completedMissions: 18,
  completedEssays: 4,
}

export const profileStats: ProfileStat[] = [
  {
    id: 1,
    icon: '⚡',
    value: userProfile.totalXp.toLocaleString('pt-BR'),
    label: 'XP total',
  },
  {
    id: 2,
    icon: '🏆',
    value: `#${userProfile.rankingPosition}`,
    label: 'Posição semanal',
  },
  {
    id: 3,
    icon: '🔥',
    value: `${userProfile.streakDays} dias`,
    label: 'Sequência atual',
  },
  {
    id: 4,
    icon: '⚔️',
    value: String(userProfile.completedMissions),
    label: 'Missões concluídas',
  },
  {
    id: 5,
    icon: '📝',
    value: String(userProfile.completedEssays),
    label: 'Redações escritas',
  },
  {
    id: 6,
    icon: '🃏',
    value: `${userProfile.unlockedCards}/${userProfile.totalCards}`,
    label: 'Cartas conquistadas',
  },
]

export const enemCompetencies: EnemCompetency[] = [
  {
    id: 1,
    code: 'C1',
    title: 'Domínio da norma padrão',
    description:
      'Uso adequado da gramática, ortografia, pontuação e concordância.',
    score: 160,
    maximumScore: 200,
  },
  {
    id: 2,
    code: 'C2',
    title: 'Compreensão do tema',
    description:
      'Desenvolvimento do tema e uso produtivo de repertório sociocultural.',
    score: 180,
    maximumScore: 200,
  },
  {
    id: 3,
    code: 'C3',
    title: 'Organização dos argumentos',
    description:
      'Seleção e organização das informações para defender um ponto de vista.',
    score: 140,
    maximumScore: 200,
  },
  {
    id: 4,
    code: 'C4',
    title: 'Coesão textual',
    description:
      'Uso de conectivos e mecanismos linguísticos para articular as ideias.',
    score: 180,
    maximumScore: 200,
  },
  {
    id: 5,
    code: 'C5',
    title: 'Proposta de intervenção',
    description:
      'Apresentação de uma solução detalhada e compatível com os direitos humanos.',
    score: 160,
    maximumScore: 200,
  },
]

export const achievements: Achievement[] = [
  {
    id: 1,
    title: 'Primeiros passos',
    description: 'Concluiu a primeira missão do RedaQuest.',
    icon: '👣',
    unlocked: true,
  },
  {
    id: 2,
    title: 'Mestre dos conectivos',
    description: 'Concluiu uma atividade de conectivos sem perder vidas.',
    icon: '🔗',
    unlocked: true,
  },
  {
    id: 3,
    title: 'Olhar de revisor',
    description: 'Encontrou cinco erros em atividades de revisão.',
    icon: '🔍',
    unlocked: true,
  },
  {
    id: 4,
    title: 'Semana perfeita',
    description: 'Estudou durante sete dias consecutivos.',
    icon: '🔥',
    unlocked: true,
  },
  {
    id: 5,
    title: 'Colecionador',
    description: 'Desbloqueie dez cartas na Biblioteca.',
    icon: '🃏',
    unlocked: false,
    progress: 7,
    goal: 10,
  },
  {
    id: 6,
    title: 'Autor dedicado',
    description: 'Escreva dez redações completas.',
    icon: '✍️',
    unlocked: false,
    progress: 4,
    goal: 10,
  },
  {
    id: 7,
    title: 'Rumo aos 1000',
    description: 'Conquiste uma nota superior a 900 pontos.',
    icon: '💯',
    unlocked: false,
    progress: 840,
    goal: 900,
  },
  {
    id: 8,
    title: 'Lenda do RedaQuest',
    description: 'Alcance o nível 30.',
    icon: '👑',
    unlocked: false,
    progress: 12,
    goal: 30,
  },
]