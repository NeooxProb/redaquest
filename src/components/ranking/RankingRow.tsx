import type { RankingUser } from '../../types/ranking'

interface RankingRowProps {
  user: RankingUser
}

export function RankingRow({ user }: RankingRowProps) {
  const positionDisplay =
    user.position === 1
      ? '🥇'
      : user.position === 2
        ? '🥈'
        : user.position === 3
          ? '🥉'
          : user.position

  return (
    <article
      style={{
        alignItems: 'center',
        background: user.isCurrentUser
          ? 'linear-gradient(90deg, #ede9fe, #dbeafe)'
          : '#ffffff',
        border: user.isCurrentUser
          ? '2px solid #8b5cf6'
          : '1px solid #e2e8f0',
        borderRadius: 18,
        boxShadow: user.isCurrentUser
          ? '0 10px 26px rgba(124, 58, 237, 0.14)'
          : '0 5px 16px rgba(15, 23, 42, 0.05)',
        display: 'flex',
        gap: 14,
        minHeight: 82,
        padding: '13px 16px',
      }}
    >
      <div
        style={{
          alignItems: 'center',
          color:
            user.position <= 3
              ? '#f59e0b'
              : '#64748b',
          display: 'flex',
          flexShrink: 0,
          fontSize:
            user.position <= 3 ? 25 : 16,
          fontWeight: 900,
          justifyContent: 'center',
          width: 36,
        }}
      >
        {positionDisplay}
      </div>

      <div
        style={{
          alignItems: 'center',
          background: user.isCurrentUser
            ? '#ffffff'
            : '#f1f5f9',
          border: user.isCurrentUser
            ? '2px solid #a78bfa'
            : '1px solid #e2e8f0',
          borderRadius: 999,
          display: 'flex',
          flexShrink: 0,
          fontSize: 27,
          height: 52,
          justifyContent: 'center',
          width: 52,
        }}
      >
        {user.avatar}
      </div>

      <div
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 7,
          }}
        >
          <h3
            style={{
              color: '#172033',
              fontSize: 15,
              fontWeight: 900,
              margin: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {user.name}
          </h3>

          {user.isCurrentUser && (
            <span
              style={{
                background: '#7c3aed',
                borderRadius: 999,
                color: '#ffffff',
                fontSize: 9,
                fontWeight: 900,
                letterSpacing: 0.5,
                padding: '4px 7px',
                textTransform: 'uppercase',
              }}
            >
              Você
            </span>
          )}

          {user.isFriend && (
            <span
              title="Amigo"
              style={{
                fontSize: 14,
              }}
            >
              👥
            </span>
          )}
        </div>

        <p
          style={{
            color: '#94a3b8',
            fontSize: 11,
            fontWeight: 800,
            margin: '4px 0 0',
          }}
        >
          Nível {user.level}
        </p>
      </div>

      <div
        style={{
          flexShrink: 0,
          textAlign: 'right',
        }}
      >
        <strong
          style={{
            color: user.isCurrentUser
              ? '#6d28d9'
              : '#f97316',
            display: 'block',
            fontSize: 15,
            fontWeight: 900,
          }}
        >
          {user.xp.toLocaleString('pt-BR')} XP
        </strong>

        <span
          style={{
            color: '#94a3b8',
            fontSize: 10,
            fontWeight: 800,
          }}
        >
          #{user.position}
        </span>
      </div>
    </article>
  )
}