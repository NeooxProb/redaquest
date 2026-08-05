export type AppScreen =
  | 'landing'
  | 'auth'
  | 'home'
  | 'missions'
  | 'library'
  | 'ranking'
  | 'profile'
  | 'write'
  | 'correction'
  | 'quiz'
  | 'error-hunt'

export type MainTab = Extract<
  AppScreen,
  'home' | 'missions' | 'library' | 'ranking' | 'profile'
>

export interface Achievement {
  icon: string
  title: string
  xp: number
}

export interface AppEvents {
  triggerAchievement: (achievement: Achievement) => void
  triggerXP: (amount: number, x?: number, y?: number) => void
}

export interface NavProps {
  navigate: (screen: AppScreen) => void
  events: AppEvents
}