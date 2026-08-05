export interface ProfileStat {
  id: number
  icon: string
  value: string
  label: string
}

export interface EnemCompetency {
  id: number
  code: string
  title: string
  description: string
  score: number
  maximumScore: number
}

export interface Achievement {
  id: number
  title: string
  description: string
  icon: string
  unlocked: boolean
  progress?: number
  goal?: number
}

export interface UserProfile {
  name: string
  username: string
  avatar: string
  title: string
  level: number
  currentXp: number
  nextLevelXp: number
  totalXp: number
  rankingPosition: number
  streakDays: number
  unlockedCards: number
  totalCards: number
  completedMissions: number
  completedEssays: number
}