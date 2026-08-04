import type { CSSProperties } from 'react'
import type {
  Mission,
  MissionDifficulty,
  MissionStatus,
} from '../../types/mission'

interface MissionCardProps {
  mission: Mission
  onOpen: (mission: Mission) => void
}

const difficultyStyles: Record<
  MissionDifficulty,
  CSSProperties
> = {
  Fácil: {
    background: '#dcfce7',
    color: '#166534',
  },
  Médio: {
    background: '#dbeafe',
    color: '#1e40af',
  },
  Difícil: {
    background: '#ffedd5',
    color: '#9a3412',
  },
  Expert: {
    background: '#fee2e2',
    color: '#991b1b',
  },
  Lendário: {
    background: '#ede9fe',
    color: '#5b21b6',
  },
}

const cardStatusStyles: Record<
  MissionStatus,
  {
    border: string
    shadow: string
    iconBackground: string
  }
> = {
  completed: {
    border: '1px solid #bbf7d0',
    shadow: '0 8px 24px rgba(34, 197, 94, 0.09)',
    iconBackground: 'linear-gradient(135deg, #22c55e, #16a34a)',
  },
  current: {
    border: '2px solid #7c3aed',
    shadow: '0 14px 32px rgba(124, 58, 237, 0.18)',
    iconBackground: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
  },
  locked: {
    border: '1px solid #e2e8f0',
    shadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
    iconBackground: '#e2e8f0',
  },
}

export function MissionCard({
  mission,
  onOpen,
}: MissionCardProps) {
  const isLocked = mission.status === 'locked'
  const statusStyle = cardStatusStyles[mission.status]
  const difficultyStyle =
    difficultyStyles[mission.difficulty]

  const actionLabel =
    mission.status === 'completed'
      ? mission.destination
        ? 'Revisar missão'
        : 'Concluída'
      : mission.status === 'current'
        ? 'Continuar missão'
        : 'Bloqueada'

  const canOpen =
    !isLocked && Boolean(mission.destination)

  return (
    <article
      style={{
        background: '#ffffff',
        border: statusStyle.border,
        borderRadius: 22,
        boxShadow: statusStyle.shadow,
        opacity: isLocked ? 0.68 : 1,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {mission.status === 'current' && (
        <div
          style={{
            background:
              'linear-gradient(90deg, #7c3aed, #3b82f6)',
            color: '#ffffff',
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: 0.8,
            padding: '7px 16px',
            textAlign: 'center',
          }}
        >
          MISSÃO ATUAL
        </div>
      )}

      <div
        style={{
          alignItems: 'flex-start',
          display: 'flex',
          gap: 15,
          padding: 18,
        }}
      >
        <div
          style={{
            alignItems: 'center',
            background: statusStyle.iconBackground,
            borderRadius: 18,
            boxShadow: isLocked
              ? 'none'
              : '0 8px 18px rgba(59, 130, 246, 0.18)',
            color: '#ffffff',
            display: 'flex',
            flexShrink: 0,
            fontSize: 25,
            height: 58,
            justifyContent: 'center',
            width: 58,
          }}
        >
          {mission.status === 'completed'
            ? '✓'
            : mission.status === 'locked'
              ? '🔒'
              : mission.icon}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              color: isLocked ? '#64748b' : '#172033',
              fontSize: 16,
              fontWeight: 900,
              lineHeight: 1.25,
              margin: 0,
            }}
          >
            {mission.title}
          </h3>

          <p
            style={{
              color: '#64748b',
              fontSize: 13,
              fontWeight: 600,
              lineHeight: 1.5,
              margin: '7px 0 12px',
            }}
          >
            {mission.description}
          </p>

          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 7,
            }}
          >
            <span
              style={{
                ...difficultyStyle,
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 900,
                padding: '4px 10px',
              }}
            >
              {mission.difficulty}
            </span>

            <span
              style={{
                color: '#64748b',
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              ⏱️ {mission.duration}
            </span>
          </div>
        </div>

        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            gap: 3,
            minWidth: 52,
          }}
        >
          <span style={{ fontSize: 25 }}>
            {mission.reward}
          </span>

          <span
            style={{
              color: isLocked
                ? '#94a3b8'
                : '#7c3aed',
              fontSize: 12,
              fontWeight: 900,
            }}
          >
            +{mission.xp} XP
          </span>
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid #f1f5f9',
          padding: '12px 18px 16px',
        }}
      >
        <button
          type="button"
          disabled={!canOpen}
          onClick={() => onOpen(mission)}
          style={{
            background:
              mission.status === 'current'
                ? 'linear-gradient(90deg, #7c3aed, #3b82f6)'
                : mission.status === 'completed' &&
                    mission.destination
                  ? '#ecfdf5'
                  : '#f1f5f9',
            border: 0,
            borderRadius: 13,
            color:
              mission.status === 'current'
                ? '#ffffff'
                : mission.status === 'completed' &&
                    mission.destination
                  ? '#15803d'
                  : '#94a3b8',
            cursor: canOpen
              ? 'pointer'
              : 'not-allowed',
            fontFamily: 'inherit',
            fontSize: 13,
            fontWeight: 900,
            minHeight: 43,
            padding: '10px 16px',
            width: '100%',
          }}
        >
          {actionLabel}
        </button>
      </div>
    </article>
  )
}