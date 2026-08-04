import type { RankingUser } from '../../types/ranking'

interface RankingPodiumProps {
  users: RankingUser[]
}

const podiumStyles = {
  1: {
    medal: '🥇',
    crown: '👑',
    height: 170,
    background: 'linear-gradient(180deg, #fef3c7, #fde68a)',
    border: '#f59e0b',
    color: '#a16207',
  },
  2: {
    medal: '🥈',
    crown: '',
    height: 135,
    background: 'linear-gradient(180deg, #f1f5f9, #cbd5e1)',
    border: '#94a3b8',
    color: '#475569',
  },
  3: {
    medal: '🥉',
    crown: '',
    height: 115,
    background: 'linear-gradient(180deg, #ffedd5, #fdba74)',
    border: '#f97316',
    color: '#9a3412',
  },
}

export function RankingPodium({
  users,
}: RankingPodiumProps) {
  const podiumUsers = [
    users.find((user) => user.position === 2),
    users.find((user) => user.position === 1),
    users.find((user) => user.position === 3),
  ].filter((user): user is RankingUser => Boolean(user))

  return (
    <section
      style={{
        alignItems: 'flex-end',
        display: 'grid',
        gap: 'clamp(8px, 2vw, 18px)',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        margin: '0 auto',
        maxWidth: 760,
        paddingTop: 55,
        width: '100%',
      }}
    >
      {podiumUsers.map((user) => {
        const position =
          user.position as keyof typeof podiumStyles

        const style = podiumStyles[position]

        return (
          <article
            key={user.id}
            style={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
              position: 'relative',
            }}
          >
            {position === 1 && (
              <span
                aria-hidden="true"
                style={{
                  fontSize: 34,
                  left: '50%',
                  position: 'absolute',
                  top: -45,
                  transform: 'translateX(-50%)',
                }}
              >
                {style.crown}
              </span>
            )}

            <div
              style={{
                alignItems: 'center',
                background: '#ffffff',
                border: `3px solid ${style.border}`,
                borderRadius: 999,
                boxShadow:
                  position === 1
                    ? '0 14px 30px rgba(245, 158, 11, 0.25)'
                    : '0 10px 24px rgba(15, 23, 42, 0.12)',
                display: 'flex',
                fontSize: 'clamp(27px, 5vw, 42px)',
                height: 'clamp(66px, 11vw, 94px)',
                justifyContent: 'center',
                position: 'relative',
                width: 'clamp(66px, 11vw, 94px)',
                zIndex: 2,
              }}
            >
              {user.avatar}

              <span
                style={{
                  alignItems: 'center',
                  background: '#ffffff',
                  border: `2px solid ${style.border}`,
                  borderRadius: 999,
                  bottom: -9,
                  display: 'flex',
                  fontSize: 17,
                  height: 30,
                  justifyContent: 'center',
                  position: 'absolute',
                  right: -5,
                  width: 30,
                }}
              >
                {style.medal}
              </span>
            </div>

            <div
              style={{
                margin: '14px 0 10px',
                maxWidth: '100%',
                textAlign: 'center',
              }}
            >
              <h3
                style={{
                  color: '#172033',
                  fontSize: 'clamp(12px, 2vw, 16px)',
                  fontWeight: 900,
                  margin: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {user.name}
              </h3>

              <p
                style={{
                  color: style.color,
                  fontSize: 'clamp(10px, 1.7vw, 13px)',
                  fontWeight: 900,
                  margin: '4px 0 0',
                }}
              >
                {user.xp.toLocaleString('pt-BR')} XP
              </p>
            </div>

            <div
              style={{
                alignItems: 'center',
                background: style.background,
                border: `2px solid ${style.border}`,
                borderRadius: '18px 18px 5px 5px',
                color: style.color,
                display: 'flex',
                flexDirection: 'column',
                height: style.height,
                justifyContent: 'flex-start',
                paddingTop: 18,
                width: '100%',
              }}
            >
              <strong
                style={{
                  fontSize: 'clamp(24px, 5vw, 40px)',
                  fontWeight: 900,
                  lineHeight: 1,
                }}
              >
                {position}º
              </strong>

              <span
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  marginTop: 7,
                }}
              >
                Nível {user.level}
              </span>
            </div>
          </article>
        )
      })}
    </section>
  )
}