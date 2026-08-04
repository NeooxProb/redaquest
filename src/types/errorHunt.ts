export interface ErrorHuntOption {
  id: number
  text: string
  isCorrect: boolean
}

export interface ErrorHuntQuestion {
  id: number
  instruction: string
  textBefore: string
  options: ErrorHuntOption[]
  textAfter: string
  explanation: string
  correctedText: string
  xp: number
}