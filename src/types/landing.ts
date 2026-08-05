export interface LandingFeature {
  id: number
  icon: string
  title: string
  description: string
}

export interface LandingStep {
  id: number
  number: string
  title: string
  description: string
}

export interface LandingPlan {
  id: number
  name: string
  description: string
  price: string
  period?: string
  featured: boolean
  buttonLabel: string
  features: string[]
}

export interface LandingFaq {
  id: number
  question: string
  answer: string
}