export type LibraryCategory =
  | 'Conectivos'
  | 'Filósofos'
  | 'Repertórios'

export type CardRarity =
  | 'Comum'
  | 'Rara'
  | 'Épica'
  | 'Lendária'

export interface LibraryCard {
  id: number
  title: string
  subtitle: string
  description: string
  example: string
  icon: string
  category: LibraryCategory
  rarity: CardRarity
  unlocked: boolean
  favorite: boolean
}