import type { Achievement } from '../../types/profile'

interface AchievementCardProps {
  achievement: Achievement
}

export function AchievementCard({
  achievement,
}: AchievementCardProps) {
  const hasProgress =
    !achievement.unlocked &&
    achievement.progress !== undefined &&
    achievement.goal !== undefined

  const progressPercentage = hasProgress
    ? Math.min(
        Math.round(
          (achievement.progress! / achievement.goal!) * 100,
        ),
        100,
      )
    : 0

  return (
    <article
      style={{
        background: achievement.unlocked
          ? 'linear-gradient(145deg, #ffffff, #f5f3ff)'
          : '#f8fafc',
        border: achievement.unlocked
          ? '1px solid #c4b5fd'
          : '1px solid #e2e8f0',
        borderRadius: 20,
        boxShadow: achievement.unlocked
          ? '0 8px 24px rgba(124, 58, 237, 0.08)'
          : 'none',
        opacity: achievement.unlocked ? 1 : 0.7,
        padding: 18,
        position: 'relative',
      }}
    >
      <div
        style={{
          alignItems: 'flex-start',
          display: 'flex',
          gap: 13,
        }}
      >
        <div
          style={{
            alignItems: 'center',
            background: achievement.unlocked
              ? 'linear-gradient(135deg, #7c3aed, #3b82f6)'
              : '#e2e8f0',
            borderRadius: 17,
            boxShadow: achievement.unlocked
              ? '0 8px 18px rgba(124, 58, 237, 0.18)'
              : 'none',
            display: 'flex',
            flexShrink: 0,
            fontSize: 27,
            height: 58,
            justifyContent: 'center',
            width: 58,
          }}
        >
          {achievement.unlocked
            ? achievement.icon
            : '🔒'}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              alignItems: 'flex-start',
              display: 'flex',
              gap: 10,
              justifyContent: 'space-between',
            }}
          >
            <h3
              style={{
                color: achievement.unlocked
                  ? '#172033'
                  : '#64748b',
                fontSize: 15,
                fontWeight: 900,
                lineHeight: 1.3,
                margin: 0,
              }}
            >
              {achievement.title}
            </h3>

            <span
              style={{
                background: achievement.unlocked
                  ? '#dcfce7'
                  : '#e2e8f0',
                borderRadius: 999,
                color: achievement.unlocked
                  ? '#15803d'
                  : '#64748b',
                flexShrink: 0,
                fontSize: 9,
                fontWeight: 900,
                letterSpacing: 0.5,
                padding: '5px 8px',
                textTransform: 'uppercase',
              }}
            >
              {achievement.unlocked
                ? 'Conquistada'
                : 'Bloqueada'}
            </span>
          </div>

          <p
            style={{
              color: '#64748b',
              fontSize: 12,
              fontWeight: 700,
              lineHeight: 1.5,
              margin: '7px 0 0',
            }}
          >
            {achievement.description}
          </p>
        </div>
      </div>

      {hasProgress && (
        <div style={{ marginTop: 16 }}>
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 7,
            }}
          >
            <span
              style={{
                color: '#64748b',
                fontSize: 10,
                fontWeight: 800,
              }}
            >
              Progresso
            </span>

            <span
              style={{
                color: '#7c3aed',
                fontSize: 11,
                fontWeight: 900,
              }}
            >
              {achievement.progress}/{achievement.goal}
            </span>
          </div>

          <div
            style={{
              background: '#e2e8f0',
              borderRadius: 999,
              height: 8,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                background:
                  'linear-gradient(90deg, #7c3aed, #3b82f6)',
                borderRadius: 999,
                height: '100%',
                transition: 'width 300ms ease',
                width: `${progressPercentage}%`,
              }}
            />
          </div>
        </div>
      )}
    </article>
  )
}