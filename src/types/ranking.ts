export type RankingPeriod =
  | 'Semanal'
  | 'Mensal'
  | 'Amigos'
  | 'Global'

export interface RankingUser {
  id: number
  name: string
  avatar: string
  level: number
  xp: number
  position: number
  isCurrentUser: boolean
  isFriend: boolean
}