import type { AppScreen } from './navigation'

export interface HomeStat {
  icon: string
  label: string
  value: string
}

export interface RecommendedMission {
  title: string
  time: string
  xp: number
  color: string
  icon: string
  screen: AppScreen
}
