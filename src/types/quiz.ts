export type QuizPhase = 'question' | 'correct' | 'wrong'

export interface QuizQuestion {
  id: number
  text: string
  blank: string
  options: string[]
  correct: number
  explanation: string
  rule: string
  xp: number
}