import type { EssayTopic } from './essay'

export type FeedbackType =
  | 'positive'
  | 'warning'
  | 'critical'

export interface SubmittedEssay {
  topic: EssayTopic
  content: string
  wordCount: number
  submittedAt: string
}

export interface CompetencyCorrection {
  id: number
  code: string
  title: string
  score: number
  maximumScore: number
  feedback: string
  strengths: string[]
  improvements: string[]
}

export interface TextHighlight {
  id: number
  excerpt: string
  type: FeedbackType
  message: string
}

export interface EssayCorrection {
  totalScore: number
  maximumScore: number
  summary: string
  competencies: CompetencyCorrection[]
  highlights: TextHighlight[]
  strengths: string[]
  improvements: string[]
  correctedAt: string
}