import type { AppScreen } from './navigation'

export type MissionStatus = 'completed' | 'current' | 'locked'

export type MissionDifficulty =
  | 'Fácil'
  | 'Médio'
  | 'Difícil'
  | 'Expert'
  | 'Lendário'

export interface Mission {
  id: number
  icon: string
  title: string
  description: string
  difficulty: MissionDifficulty
  xp: number
  duration: string
  reward: string
  status: MissionStatus
  destination?: AppScreen
}