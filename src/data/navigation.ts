import type { MainTab } from '../types/navigation'

export interface NavigationItem {
  id: MainTab
  icon: string
  label: string
  description: string
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: 'home', icon: '🏠', label: 'Início', description: 'Seu progresso de hoje' },
  { id: 'missions', icon: '⚔️', label: 'Missões', description: 'Aprenda por etapas' },
  { id: 'library', icon: '📚', label: 'Biblioteca', description: 'Cartas e repertórios' },
  { id: 'ranking', icon: '🏆', label: 'Ranking', description: 'Compare seu desempenho' },
  { id: 'profile', icon: '👤', label: 'Perfil', description: 'Estatísticas e conquistas' },
]
