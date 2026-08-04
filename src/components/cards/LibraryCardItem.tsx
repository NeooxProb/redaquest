import type { CSSProperties } from 'react'
import type {
  CardRarity,
  LibraryCard as LibraryCardData,
} from '../../types/library'

interface LibraryCardItemProps {
  card: LibraryCardData
  onOpen: (card: LibraryCardData) => void
  onToggleFavorite: (cardId: number) => void
}

const rarityStyles: Record<
  CardRarity,
  {
    background: string
    color: string
    border: string
  }
> = {
  Comum: {
    background: '#f1f5f9',
    color: '#475569',
    border: '#cbd5e1',
  },
  Rara: {
    background: '#dbeafe',
    color: '#1d4ed8',
    border: '#93c5fd',
  },
  Épica: {
    background: '#ede9fe',
    color: '#6d28d9',
    border: '#c4b5fd',
  },
  Lendária: {
    background: '#fef3c7',
    color: '#a16207',
    border: '#fcd34d',
  },
}

const buttonStyle: CSSProperties = {
  border: 0,
  cursor: 'pointer',
  fontFamily: 'inherit',
}

export function LibraryCardItem({
  card,
  onOpen,
  onToggleFavorite,
}: LibraryCardItemProps) {
  const rarityStyle = rarityStyles[card.rarity]

  return (
    <article
      style={{
        background: '#ffffff',
        border: card.unlocked
          ? `1px solid ${rarityStyle.border}`
          : '1px solid #e2e8f0',
        borderRadius: 24,
        boxShadow: card.unlocked
          ? '0 10px 28px rgba(15, 23, 42, 0.08)'
          : '0 5px 16px rgba(15, 23, 42, 0.04)',
        minHeight: 305,
        opacity: card.unlocked ? 1 : 0.65,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          background: card.unlocked
            ? `linear-gradient(135deg, ${rarityStyle.background}, #ffffff)`
            : '#f1f5f9',
          padding: 20,
        }}
      >
        <div
          style={{
            alignItems: 'flex-start',
            display: 'flex',
            gap: 14,
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              alignItems: 'center',
              background: card.unlocked
                ? '#ffffff'
                : '#e2e8f0',
              border: `1px solid ${
                card.unlocked
                  ? rarityStyle.border
                  : '#cbd5e1'
              }`,
              borderRadius: 18,
              display: 'flex',
              fontSize: 31,
              height: 64,
              justifyContent: 'center',
              width: 64,
            }}
          >
            {card.unlocked ? card.icon : '🔒'}
          </div>

          <button
            type="button"
            disabled={!card.unlocked}
            onClick={() => onToggleFavorite(card.id)}
            aria-label={
              card.favorite
                ? 'Remover dos favoritos'
                : 'Adicionar aos favoritos'
            }
            style={{
              ...buttonStyle,
              background: card.favorite
                ? '#fef3c7'
                : '#f8fafc',
              borderRadius: 999,
              color: card.favorite
                ? '#f59e0b'
                : '#94a3b8',
              fontSize: 21,
              height: 42,
              opacity: card.unlocked ? 1 : 0.4,
              width: 42,
            }}
          >
            {card.favorite ? '★' : '☆'}
          </button>
        </div>

        <div style={{ marginTop: 17 }}>
          <span
            style={{
              background: rarityStyle.background,
              border: `1px solid ${rarityStyle.border}`,
              borderRadius: 999,
              color: rarityStyle.color,
              display: 'inline-block',
              fontSize: 10,
              fontWeight: 900,
              letterSpacing: 0.6,
              padding: '5px 9px',
              textTransform: 'uppercase',
            }}
          >
            {card.rarity}
          </span>

          <h3
            style={{
              color: card.unlocked
                ? '#172033'
                : '#64748b',
              fontSize: 19,
              fontWeight: 900,
              lineHeight: 1.2,
              margin: '11px 0 4px',
            }}
          >
            {card.title}
          </h3>

          <p
            style={{
              color: rarityStyle.color,
              fontSize: 12,
              fontWeight: 900,
              margin: 0,
            }}
          >
            {card.subtitle}
          </p>
        </div>
      </div>

      <div style={{ padding: '17px 20px 20px' }}>
        <p
          style={{
            color: '#64748b',
            fontSize: 13,
            fontWeight: 700,
            lineHeight: 1.55,
            margin: '0 0 17px',
          }}
        >
          {card.unlocked
            ? card.description
            : 'Continue completando missões para desbloquear esta carta.'}
        </p>

        <button
          type="button"
          disabled={!card.unlocked}
          onClick={() => onOpen(card)}
          style={{
            ...buttonStyle,
            background: card.unlocked
              ? 'linear-gradient(90deg, #7c3aed, #3b82f6)'
              : '#e2e8f0',
            borderRadius: 14,
            color: card.unlocked
              ? '#ffffff'
              : '#94a3b8',
            cursor: card.unlocked
              ? 'pointer'
              : 'not-allowed',
            fontSize: 13,
            fontWeight: 900,
            minHeight: 44,
            width: '100%',
          }}
        >
          {card.unlocked
            ? 'Ver detalhes'
            : 'Carta bloqueada'}
        </button>
      </div>
    </article>
  )
}