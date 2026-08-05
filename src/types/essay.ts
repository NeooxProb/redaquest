export type EssayDifficulty = 'Fácil' | 'Médio' | 'Difícil'

export type EssayCategory =
  | 'Educação'
  | 'Tecnologia'
  | 'Saúde'
  | 'Sociedade'
  | 'Meio ambiente'
  | 'Cultura'

export interface MotivationalText {
  id: number
  title: string
  content: string
  source: string
}

export interface EssayTopic {
  id: number
  title: string
  shortTitle: string
  description: string
  icon: string
  category: EssayCategory
  difficulty: EssayDifficulty
  estimatedMinutes: number
  rewardXp: number
  featured: boolean
  motivationalTexts: MotivationalText[]
}

export interface EssayDraft {
  topicId: number
  content: string
  wordCount: number
  updatedAt: string
}