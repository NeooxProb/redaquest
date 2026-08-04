import type { HomeStat, RecommendedMission } from '../types/home'

export const HOME_STATS: HomeStat[] = [
  { icon: '📝', label: 'Redações', value: '47' },
  { icon: '⭐', label: 'Média', value: '820' },
  { icon: '🏆', label: 'Melhor', value: '960' },
]

export const RECOMMENDED_MISSIONS: RecommendedMission[] = [
  {
    title: 'Escolha o conectivo',
    time: '3 min',
    xp: 80,
    color: '#22C55E',
    icon: '🔗',
    screen: 'quiz',
  },
  {
    title: 'Complete a introdução',
    time: '5 min',
    xp: 120,
    color: '#3B82F6',
    icon: '📝',
    screen: 'missions',
  },
]
