import { useMemo, useState } from 'react'
import { LibraryCardItem } from '../components/cards/LibraryCardItem'
import { libraryCards } from '../data/libraryCards'
import type {
  LibraryCard,
  LibraryCategory,
} from '../types/library'
import type { NavProps } from '../types/navigation'

type CategoryFilter = 'Todas' | LibraryCategory

const categories: CategoryFilter[] = [
  'Todas',
  'Conectivos',
  'Filósofos',
  'Repertórios',
]

export default function LibraryScreen({
  navigate,
}: NavProps) {
  const [cards, setCards] = useState(libraryCards)
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>('Todas')
  const [showOnlyFavorites, setShowOnlyFavorites] =
    useState(false)
  const [selectedCard, setSelectedCard] =
    useState<LibraryCard | null>(null)

  const unlockedCards = cards.filter(
    (card) => card.unlocked,
  ).length

  const favoriteCards = cards.filter(
    (card) => card.favorite && card.unlocked,
  ).length

  const collectionProgress = Math.round(
    (unlockedCards / cards.length) * 100,
  )

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const matchesCategory =
        selectedCategory === 'Todas' ||
        card.category === selectedCategory

      const matchesFavorite =
        !showOnlyFavorites || card.favorite

      return matchesCategory && matchesFavorite
    })
  }, [cards, selectedCategory, showOnlyFavorites])

  function toggleFavorite(cardId: number) {
    setCards((currentCards) =>
      currentCards.map((card) =>
        card.id === cardId && card.unlocked
          ? {
              ...card,
              favorite: !card.favorite,
            }
          : card,
      ),
    )

    setSelectedCard((currentCard) => {
      if (
        !currentCard ||
        currentCard.id !== cardId ||
        !currentCard.unlocked
      ) {
        return currentCard
      }

      return {
        ...currentCard,
        favorite: !currentCard.favorite,
      }
    })
  }

  function openCard(card: LibraryCard) {
    if (!card.unlocked) {
      return
    }

    setSelectedCard(card)
  }

  return (
    <div
      style={{
        background: '#f0f4ff',
        fontFamily: 'Nunito, sans-serif',
        minHeight: '100%',
        width: '100%',
      }}
    >
      <header
        style={{
          background:
            'linear-gradient(135deg, #2563eb 0%, #4f46e5 48%, #7c3aed 100%)',
          color: '#ffffff',
          padding: '30px clamp(20px, 4vw, 58px) 36px',
        }}
      >
        <div
          style={{
            margin: '0 auto',
            maxWidth: 1320,
            width: '100%',
          }}
        >
          <div
            style={{
              alignItems: 'flex-start',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 25,
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span
                style={{
                  color: 'rgba(255,255,255,0.72)',
                  fontSize: 12,
                  fontWeight: 900,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}
              >
                Coleção de conhecimento
              </span>

              <h1
                style={{
                  fontSize: 'clamp(28px, 4vw, 42px)',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  margin: '7px 0 8px',
                }}
              >
                🃏 Biblioteca
              </h1>

              <p
                style={{
                  color: 'rgba(255,255,255,0.82)',
                  fontSize: 14,
                  fontWeight: 700,
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                Desbloqueie cartas e fortaleça seu repertório
                para a redação.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                flex: '1 1 350px',
                gap: 10,
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(105px, 1fr))',
                maxWidth: 500,
              }}
            >
              <HeaderStat
                value={`${unlockedCards}/${cards.length}`}
                label="Desbloqueadas"
              />

              <HeaderStat
                value={String(favoriteCards)}
                label="Favoritas"
              />

              <HeaderStat
                value={`${collectionProgress}%`}
                label="Coleção"
              />
            </div>
          </div>

          <div style={{ marginTop: 28 }}>
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 900,
                }}
              >
                Progresso da coleção
              </span>

              <span
                style={{
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: 12,
                  fontWeight: 900,
                }}
              >
                {unlockedCards} cartas conquistadas
              </span>
            </div>

            <div
              style={{
                background: 'rgba(255,255,255,0.22)',
                borderRadius: 999,
                height: 12,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  background:
                    'linear-gradient(90deg, #22c55e, #4ade80)',
                  borderRadius: 999,
                  boxShadow:
                    '0 0 12px rgba(74,222,128,0.6)',
                  height: '100%',
                  transition: 'width 300ms ease',
                  width: `${collectionProgress}%`,
                }}
              />
            </div>
          </div>
        </div>
      </header>

      <main
        style={{
          margin: '0 auto',
          maxWidth: 1320,
          padding: '26px clamp(18px, 4vw, 58px) 48px',
          width: '100%',
        }}
      >
        <section
          style={{
            alignItems: 'center',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: 22,
            boxShadow:
              '0 9px 26px rgba(15,23,42,0.06)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 11,
            justifyContent: 'space-between',
            marginBottom: 23,
            padding: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
            }}
          >
            {categories.map((category) => {
              const isSelected =
                selectedCategory === category

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                  style={{
                    background: isSelected
                      ? 'linear-gradient(90deg, #7c3aed, #3b82f6)'
                      : '#f1f5f9',
                    border: 0,
                    borderRadius: 999,
                    color: isSelected
                      ? '#ffffff'
                      : '#64748b',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: 12,
                    fontWeight: 900,
                    minHeight: 39,
                    padding: '9px 15px',
                  }}
                >
                  {getCategoryIcon(category)} {category}
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={() =>
              setShowOnlyFavorites(
                (currentValue) => !currentValue,
              )
            }
            style={{
              background: showOnlyFavorites
                ? '#fef3c7'
                : '#f8fafc',
              border: showOnlyFavorites
                ? '1px solid #fcd34d'
                : '1px solid #e2e8f0',
              borderRadius: 999,
              color: showOnlyFavorites
                ? '#a16207'
                : '#64748b',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 12,
              fontWeight: 900,
              minHeight: 39,
              padding: '9px 15px',
            }}
          >
            {showOnlyFavorites ? '★' : '☆'} Somente favoritas
          </button>
        </section>

        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            gap: 12,
            justifyContent: 'space-between',
            marginBottom: 17,
          }}
        >
          <div>
            <h2
              style={{
                color: '#172033',
                fontSize: 20,
                fontWeight: 900,
                margin: 0,
              }}
            >
              {selectedCategory === 'Todas'
                ? 'Todas as cartas'
                : selectedCategory}
            </h2>

            <p
              style={{
                color: '#94a3b8',
                fontSize: 12,
                fontWeight: 700,
                margin: '4px 0 0',
              }}
            >
              {filteredCards.length}{' '}
              {filteredCards.length === 1
                ? 'carta encontrada'
                : 'cartas encontradas'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('missions')}
            style={{
              background: '#ede9fe',
              border: 0,
              borderRadius: 13,
              color: '#6d28d9',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 12,
              fontWeight: 900,
              minHeight: 41,
              padding: '9px 14px',
            }}
          >
            Ganhar novas cartas
          </button>
        </div>

        {filteredCards.length > 0 ? (
          <section
            style={{
              display: 'grid',
              gap: 18,
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(100%, 270px), 1fr))',
            }}
          >
            {filteredCards.map((card) => (
              <LibraryCardItem
                key={card.id}
                card={card}
                onOpen={openCard}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </section>
        ) : (
          <section
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 24,
              padding: '48px 24px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 48 }}>🔎</div>

            <h2
              style={{
                color: '#172033',
                fontSize: 20,
                fontWeight: 900,
                margin: '12px 0 6px',
              }}
            >
              Nenhuma carta encontrada
            </h2>

            <p
              style={{
                color: '#64748b',
                fontSize: 13,
                fontWeight: 700,
                margin: 0,
              }}
            >
              Altere os filtros para visualizar outras
              cartas.
            </p>
          </section>
        )}
      </main>

      {selectedCard && (
        <div
          role="presentation"
          onClick={() => setSelectedCard(null)}
          style={{
            alignItems: 'center',
            background: 'rgba(15,23,42,0.68)',
            display: 'flex',
            inset: 0,
            justifyContent: 'center',
            padding: 18,
            position: 'fixed',
            zIndex: 100,
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-label={`Detalhes da carta ${selectedCard.title}`}
            onClick={(event) => event.stopPropagation()}
            style={{
              background: '#ffffff',
              borderRadius: 28,
              boxShadow:
                '0 30px 80px rgba(15,23,42,0.3)',
              maxHeight: '90vh',
              maxWidth: 600,
              overflowY: 'auto',
              padding: 'clamp(24px, 5vw, 38px)',
              position: 'relative',
              width: '100%',
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedCard(null)}
              aria-label="Fechar detalhes"
              style={{
                alignItems: 'center',
                background: '#f1f5f9',
                border: 0,
                borderRadius: 999,
                color: '#475569',
                cursor: 'pointer',
                display: 'flex',
                fontSize: 18,
                fontWeight: 900,
                height: 40,
                justifyContent: 'center',
                position: 'absolute',
                right: 18,
                top: 18,
                width: 40,
              }}
            >
              ×
            </button>

            <div
              style={{
                alignItems: 'center',
                background:
                  'linear-gradient(135deg, #ede9fe, #dbeafe)',
                borderRadius: 22,
                display: 'flex',
                fontSize: 48,
                height: 92,
                justifyContent: 'center',
                width: 92,
              }}
            >
              {selectedCard.icon}
            </div>

            <span
              style={{
                background: '#ede9fe',
                borderRadius: 999,
                color: '#6d28d9',
                display: 'inline-block',
                fontSize: 10,
                fontWeight: 900,
                letterSpacing: 0.7,
                marginTop: 20,
                padding: '6px 10px',
                textTransform: 'uppercase',
              }}
            >
              {selectedCard.rarity} ·{' '}
              {selectedCard.category}
            </span>

            <h2
              style={{
                color: '#172033',
                fontSize: 'clamp(26px, 5vw, 36px)',
                fontWeight: 900,
                lineHeight: 1.15,
                margin: '12px 0 5px',
              }}
            >
              {selectedCard.title}
            </h2>

            <p
              style={{
                color: '#7c3aed',
                fontSize: 14,
                fontWeight: 900,
                margin: 0,
              }}
            >
              {selectedCard.subtitle}
            </p>

            <p
              style={{
                color: '#64748b',
                fontSize: 14,
                fontWeight: 700,
                lineHeight: 1.65,
                margin: '20px 0',
              }}
            >
              {selectedCard.description}
            </p>

            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 18,
                padding: 18,
              }}
            >
              <strong
                style={{
                  color: '#334155',
                  display: 'block',
                  fontSize: 12,
                  fontWeight: 900,
                  marginBottom: 8,
                  textTransform: 'uppercase',
                }}
              >
                Exemplo de uso
              </strong>

              <p
                style={{
                  color: '#475569',
                  fontSize: 14,
                  fontStyle: 'italic',
                  fontWeight: 700,
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                “{selectedCard.example}”
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                toggleFavorite(selectedCard.id)
              }
              style={{
                background: selectedCard.favorite
                  ? '#fef3c7'
                  : 'linear-gradient(90deg, #7c3aed, #3b82f6)',
                border: 0,
                borderRadius: 15,
                color: selectedCard.favorite
                  ? '#a16207'
                  : '#ffffff',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 14,
                fontWeight: 900,
                marginTop: 18,
                minHeight: 49,
                width: '100%',
              }}
            >
              {selectedCard.favorite
                ? '★ Remover dos favoritos'
                : '☆ Adicionar aos favoritos'}
            </button>
          </section>
        </div>
      )}
    </div>
  )
}

interface HeaderStatProps {
  value: string
  label: string
}

function HeaderStat({
  value,
  label,
}: HeaderStatProps) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.14)',
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: 16,
        padding: '12px 14px',
      }}
    >
      <div
        style={{
          fontSize: 21,
          fontWeight: 900,
        }}
      >
        {value}
      </div>

      <div
        style={{
          color: 'rgba(255,255,255,0.72)',
          fontSize: 11,
          fontWeight: 800,
        }}
      >
        {label}
      </div>
    </div>
  )
}

function getCategoryIcon(
  category: CategoryFilter,
) {
  const icons: Record<CategoryFilter, string> = {
    Todas: '🃏',
    Conectivos: '🔗',
    Filósofos: '🧠',
    Repertórios: '📚',
  }

  return icons[category]
}