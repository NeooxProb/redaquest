import { useState } from 'react'
import type { NavProps } from '../types/navigation'

type Rarity = 'Comum' | 'Rara' | 'Épica' | 'Lendária'

interface LibCard {
  id: number
  name: string
  description: string
  usage: string
  example: string
  themes: string[]
  rarity: Rarity
  emoji: string
  category: string
}

const CARDS: LibCard[] = [
  {
    id: 1,
    name: 'Entretanto',
    description: 'Conectivo adversativo que indica contraste ou oposição entre ideias.',
    usage: 'Use para opor argumentos ou introduzir ressalvas.',
    example: 'O Brasil avança economicamente; entretanto, a desigualdade social persiste.',
    themes: ['Social', 'Economia', 'Política'],
    rarity: 'Comum',
    emoji: '🔗',
    category: 'Conectivos',
  },
  {
    id: 2,
    name: 'Ademais',
    description: 'Conectivo aditivo formal que acrescenta ideias e reforça argumentos.',
    usage: 'Use para adicionar um argumento ainda mais forte ao anterior.',
    example: 'A educação melhora a renda; ademais, reduz a criminalidade.',
    themes: ['Educação', 'Social'],
    rarity: 'Rara',
    emoji: '➕',
    category: 'Conectivos',
  },
  {
    id: 3,
    name: 'Aristóteles',
    description: 'Filósofo grego que definiu o ser humano como "animal político".',
    usage: 'Referencie ao tratar de cidadania, política ou ética.',
    example: 'Conforme Aristóteles, o homem é um animal político e, portanto, necessita conviver em sociedade.',
    themes: ['Cidadania', 'Filosofia', 'Política'],
    rarity: 'Épica',
    emoji: '🏛️',
    category: 'Filósofos',
  },
  {
    id: 4,
    name: 'Zygmunt Bauman',
    description: 'Sociólogo que cunhou o conceito de "modernidade líquida" e relações fluidas.',
    usage: 'Use em temas sobre relações humanas, tecnologia ou contemporaneidade.',
    example: 'Para Bauman, vivemos na modernidade líquida, onde vínculos são frágeis e voláteis.',
    themes: ['Tecnologia', 'Relações', 'Contemporâneo'],
    rarity: 'Épica',
    emoji: '💧',
    category: 'Filósofos',
  },
  {
    id: 5,
    name: 'Constituição Federal',
    description: 'A Lei Maior do Brasil, promulgada em 1988, que garante direitos fundamentais.',
    usage: 'Cite ao tratar de direitos humanos, saúde, educação ou segurança.',
    example: 'O artigo 5° da Constituição Federal garante a todos o direito à igualdade perante a lei.',
    themes: ['Direitos', 'Cidadania', 'Democracia'],
    rarity: 'Lendária',
    emoji: '📜',
    category: 'Constituição',
  },
  {
    id: 6,
    name: 'Black Mirror',
    description: 'Série britânica que explora os impactos negativos da tecnologia na sociedade.',
    usage: 'Use em temas sobre tecnologia, privacidade ou desumanização.',
    example: 'Como demonstra Black Mirror, a vigilância excessiva pode transformar a liberdade em ilusão.',
    themes: ['Tecnologia', 'Privacidade', 'Futuro'],
    rarity: 'Rara',
    emoji: '📺',
    category: 'Filmes',
  },
  {
    id: 7,
    name: 'Dados IBGE 2023',
    description: 'Instituto Brasileiro de Geografia e Estatística — referência máxima em dados socioeconômicos.',
    usage: 'Cite dados concretos para embasar argumentos com autoridade.',
    example: 'Segundo o IBGE (2023), 33 milhões de brasileiros vivem em situação de insegurança alimentar.',
    themes: ['Social', 'Pobreza', 'Educação'],
    rarity: 'Épica',
    emoji: '📊',
    category: 'Dados Estatísticos',
  },
  {
    id: 8,
    name: 'Dom Casmurro',
    description: 'Romance de Machado de Assis que explora ciúme, memória e a subjetividade do narrador.',
    usage: 'Cite em temas sobre machismo, subjetividade ou literatura brasileira.',
    example: 'Assim como Bentinho em Dom Casmurro, muitos perpetuam julgamentos sem evidências concretas.',
    themes: ['Gênero', 'Literatura', 'Subjetividade'],
    rarity: 'Rara',
    emoji: '📖',
    category: 'Livros',
  },
]

const CATEGORIES = ['Todos', 'Conectivos', 'Filósofos', 'Constituição', 'Filmes', 'Livros', 'Dados Estatísticos']

const RARITY_CONFIG: Record<Rarity, { color: string; border: string; bg: string; label: string }> = {
  'Comum':    { color: '#64748b', border: '#cbd5e1', bg: '#f8fafc', label: '⚪ Comum' },
  'Rara':     { color: '#3B82F6', border: '#3B82F6', bg: '#EFF6FF', label: '🔵 Rara' },
  'Épica':    { color: '#7C3AED', border: '#7C3AED', bg: '#F5F3FF', label: '🟣 Épica' },
  'Lendária': { color: '#D97706', border: '#F59E0B', bg: '#FFFBEB', label: '🟡 Lendária' },
}

export default function LibraryScreen({ navigate: _navigate, events: _events }: NavProps) {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [favorites, setFavorites] = useState<Set<number>>(new Set([3, 5]))
  const [selectedCard, setSelectedCard] = useState<LibCard | null>(null)

  const filtered = activeCategory === 'Todos' ? CARDS : CARDS.filter((c) => c.category === activeCategory)

  if (selectedCard) {
    const rc = RARITY_CONFIG[selectedCard.rarity]
    return (
      <div style={{ fontFamily: 'Nunito, sans-serif', minHeight: '100%', background: '#F0F4FF' }}>
        {/* Back header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #3B82F6 0%, #7C3AED 100%)',
            padding: '8px 20px 24px',
          }}
        >
          <button
            onClick={() => setSelectedCard(null)}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: 12,
              color: 'white',
              fontSize: 14,
              fontWeight: 800,
              padding: '6px 12px',
              cursor: 'pointer',
              marginBottom: 12,
              fontFamily: 'Nunito',
            }}
          >
            ← Voltar
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                background: rc.bg,
                border: `3px solid ${rc.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
              }}
            >
              {selectedCard.emoji}
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: 'white' }}>{selectedCard.name}</div>
              <div
                style={{
                  display: 'inline-block',
                  background: rc.bg,
                  color: rc.color,
                  borderRadius: 20,
                  padding: '2px 10px',
                  fontSize: 12,
                  fontWeight: 800,
                  marginTop: 4,
                }}
              >
                {rc.label}
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '20px 20px' }}>
          {[
            { label: '📌 Descrição', content: selectedCard.description },
            { label: '💡 Quando usar', content: selectedCard.usage },
            { label: '✍️ Exemplo na redação', content: `"${selectedCard.example}"` },
          ].map((section) => (
            <div
              key={section.label}
              style={{
                background: 'white',
                borderRadius: 16,
                padding: '16px',
                marginBottom: 14,
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ fontWeight: 900, fontSize: 14, color: '#1e293b', marginBottom: 8 }}>
                {section.label}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: '#475569',
                  fontWeight: 600,
                  lineHeight: 1.6,
                  fontStyle: section.label.includes('Exemplo') ? 'italic' : 'normal',
                }}
              >
                {section.content}
              </div>
            </div>
          ))}

          {/* Themes */}
          <div style={{ background: 'white', borderRadius: 16, padding: '16px', marginBottom: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ fontWeight: 900, fontSize: 14, color: '#1e293b', marginBottom: 10 }}>
              🏷️ Temas relacionados
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {selectedCard.themes.map((t) => (
                <span
                  key={t}
                  style={{
                    background: '#EDE9FE',
                    color: '#7C3AED',
                    borderRadius: 20,
                    padding: '4px 12px',
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              setFavorites((prev) => {
                const n = new Set(prev)
                if (n.has(selectedCard.id)) n.delete(selectedCard.id)
                else n.add(selectedCard.id)
                return n
              })
            }}
            style={{
              width: '100%',
              background: favorites.has(selectedCard.id)
                ? 'linear-gradient(135deg, #F97316, #EF4444)'
                : 'linear-gradient(135deg, #3B82F6, #7C3AED)',
              color: 'white',
              border: 'none',
              borderRadius: 16,
              padding: '16px',
              fontSize: 16,
              fontWeight: 800,
              cursor: 'pointer',
              fontFamily: 'Nunito',
            }}
          >
            {favorites.has(selectedCard.id) ? '💔 Remover dos favoritos' : '❤️ Adicionar aos favoritos'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: 'Nunito, sans-serif', minHeight: '100%' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #7C3AED 100%)', padding: '8px 20px 24px' }}>
        <div style={{ fontSize: 24, fontWeight: 900, color: 'white', marginBottom: 4 }}>📚 Biblioteca</div>
        <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: 600 }}>
          {CARDS.length} cartas desbloqueadas · {favorites.size} favoritas
        </div>
      </div>

      {/* Category tabs */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          padding: '16px 20px 12px',
          overflowX: 'auto',
          background: 'white',
          borderBottom: '1px solid #f1f5f9',
        }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              flexShrink: 0,
              background: activeCategory === cat ? '#7C3AED' : '#F0F4FF',
              color: activeCategory === cat ? 'white' : '#64748b',
              border: 'none',
              borderRadius: 20,
              padding: '6px 14px',
              fontSize: 13,
              fontWeight: 800,
              cursor: 'pointer',
              fontFamily: 'Nunito',
              transition: 'all 0.2s',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {filtered.map((card) => {
          const rc = RARITY_CONFIG[card.rarity]
          return (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card)}
              style={{
                background: 'white',
                borderRadius: 18,
                padding: '16px',
                border: `2px solid ${rc.border}`,
                cursor: 'pointer',
                boxShadow: `0 4px 16px ${rc.color}22`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Rarity glow */}
              <div
                style={{
                  position: 'absolute',
                  top: -20,
                  right: -20,
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: rc.color + '18',
                }}
              />

              {/* Favorite */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setFavorites((prev) => {
                    const n = new Set(prev)
                    if (n.has(card.id)) n.delete(card.id)
                    else n.add(card.id)
                    return n
                  })
                }}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 16,
                  padding: 0,
                }}
              >
                {favorites.has(card.id) ? '❤️' : '🤍'}
              </button>

              <div style={{ fontSize: 32, marginBottom: 10 }}>{card.emoji}</div>
              <div style={{ fontWeight: 900, fontSize: 14, color: '#1e293b', marginBottom: 4, lineHeight: 1.2 }}>
                {card.name}
              </div>
              <div
                style={{
                  background: rc.bg,
                  color: rc.color,
                  borderRadius: 20,
                  padding: '2px 8px',
                  fontSize: 10,
                  fontWeight: 800,
                  display: 'inline-block',
                  marginBottom: 8,
                }}
              >
                {rc.label}
              </div>
              <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {card.description}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
