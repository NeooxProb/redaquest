import { useMemo, useState } from 'react'
import { RankingPodium } from '../components/ranking/RankingPodium'
import { RankingRow } from '../components/ranking/RankingRow'
import { rankingUsers } from '../data/rankingUsers'
import type { NavProps } from '../types/navigation'
import type { RankingPeriod } from '../types/ranking'

const periods: RankingPeriod[] = [
  'Semanal',
  'Mensal',
  'Amigos',
  'Global',
]

export default function RankingScreen({
  navigate,
}: NavProps) {
  const [selectedPeriod, setSelectedPeriod] =
    useState<RankingPeriod>('Semanal')

  const users = rankingUsers[selectedPeriod]

  const podiumUsers = useMemo(
    () => users.filter((user) => user.position <= 3),
    [users],
  )

  const remainingUsers = useMemo(
    () => users.filter((user) => user.position > 3),
    [users],
  )

  const currentUser = users.find(
    (user) => user.isCurrentUser,
  )

  const firstPlace = users.find(
    (user) => user.position === 1,
  )

  const xpToFirstPlace =
    currentUser && firstPlace
      ? Math.max(firstPlace.xp - currentUser.xp, 0)
      : 0

  return (
    <div
      style={{
        background: '#fff7ed',
        fontFamily: 'Nunito, sans-serif',
        minHeight: '100%',
        width: '100%',
      }}
    >
      <header
        style={{
          background:
            'linear-gradient(135deg, #ea580c 0%, #f97316 52%, #ef4444 100%)',
          color: '#ffffff',
          padding:
            '30px clamp(20px, 4vw, 58px) 38px',
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
              gap: 24,
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span
                style={{
                  color:
                    'rgba(255, 255, 255, 0.74)',
                  fontSize: 12,
                  fontWeight: 900,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}
              >
                Liga dos estudantes
              </span>

              <h1
                style={{
                  fontSize:
                    'clamp(29px, 4vw, 43px)',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  margin: '7px 0 8px',
                }}
              >
                🏆 Ranking
              </h1>

              <p
                style={{
                  color:
                    'rgba(255, 255, 255, 0.83)',
                  fontSize: 14,
                  fontWeight: 700,
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                Ganhe XP, complete missões e avance
                entre os melhores estudantes.
              </p>
            </div>

            {currentUser && (
              <div
                style={{
                  background:
                    'rgba(255, 255, 255, 0.14)',
                  border:
                    '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 20,
                  display: 'flex',
                  flex: '1 1 320px',
                  gap: 14,
                  maxWidth: 440,
                  padding: 17,
                }}
              >
                <div
                  style={{
                    alignItems: 'center',
                    background: '#ffffff',
                    borderRadius: 999,
                    display: 'flex',
                    flexShrink: 0,
                    fontSize: 31,
                    height: 62,
                    justifyContent: 'center',
                    width: 62,
                  }}
                >
                  {currentUser.avatar}
                </div>

                <div style={{ flex: 1 }}>
                  <span
                    style={{
                      color:
                        'rgba(255, 255, 255, 0.72)',
                      fontSize: 10,
                      fontWeight: 900,
                      letterSpacing: 0.7,
                      textTransform: 'uppercase',
                    }}
                  >
                    Sua posição
                  </span>

                  <div
                    style={{
                      alignItems: 'baseline',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 8,
                      marginTop: 3,
                    }}
                  >
                    <strong
                      style={{
                        fontSize: 27,
                        fontWeight: 900,
                      }}
                    >
                      #{currentUser.position}
                    </strong>

                    <span
                      style={{
                        color:
                          'rgba(255,255,255,0.82)',
                        fontSize: 13,
                        fontWeight: 800,
                      }}
                    >
                      {currentUser.xp.toLocaleString(
                        'pt-BR',
                      )}{' '}
                      XP
                    </span>
                  </div>

                  <p
                    style={{
                      color:
                        'rgba(255,255,255,0.75)',
                      fontSize: 11,
                      fontWeight: 700,
                      margin: '4px 0 0',
                    }}
                  >
                    {xpToFirstPlace.toLocaleString(
                      'pt-BR',
                    )}{' '}
                    XP até o primeiro lugar
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main
        style={{
          margin: '0 auto',
          maxWidth: 1320,
          padding:
            '25px clamp(18px, 4vw, 58px) 50px',
          width: '100%',
        }}
      >
        <section
          style={{
            alignItems: 'center',
            background: '#ffffff',
            border: '1px solid #fed7aa',
            borderRadius: 22,
            boxShadow:
              '0 10px 28px rgba(154, 52, 18, 0.07)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 9,
            justifyContent: 'space-between',
            padding: 15,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
            }}
          >
            {periods.map((period) => {
              const isSelected =
                selectedPeriod === period

              return (
                <button
                  key={period}
                  type="button"
                  onClick={() =>
                    setSelectedPeriod(period)
                  }
                  style={{
                    background: isSelected
                      ? 'linear-gradient(90deg, #f97316, #ef4444)'
                      : '#fff7ed',
                    border: isSelected
                      ? '1px solid transparent'
                      : '1px solid #fed7aa',
                    borderRadius: 999,
                    color: isSelected
                      ? '#ffffff'
                      : '#9a3412',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: 12,
                    fontWeight: 900,
                    minHeight: 40,
                    padding: '9px 16px',
                  }}
                >
                  {getPeriodIcon(period)} {period}
                </button>
              )
            })}
          </div>

          <span
            style={{
              color: '#94a3b8',
              fontSize: 11,
              fontWeight: 800,
            }}
          >
            Atualização simulada
          </span>
        </section>

        <section
          style={{
            background:
              'linear-gradient(180deg, #ffffff, #fffaf5)',
            border: '1px solid #fed7aa',
            borderRadius: 28,
            boxShadow:
              '0 16px 40px rgba(154, 52, 18, 0.08)',
            marginTop: 22,
            overflow: 'hidden',
            padding:
              '25px clamp(15px, 4vw, 38px) 0',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <span
              style={{
                color: '#f97316',
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              Os três melhores
            </span>

            <h2
              style={{
                color: '#172033',
                fontSize:
                  'clamp(22px, 4vw, 30px)',
                fontWeight: 900,
                margin: '6px 0 0',
              }}
            >
              Pódio {selectedPeriod.toLowerCase()}
            </h2>
          </div>

          <RankingPodium users={podiumUsers} />
        </section>

        <div
          style={{
            display: 'grid',
            gap: 22,
            gridTemplateColumns:
              'repeat(auto-fit, minmax(min(100%, 330px), 1fr))',
            marginTop: 22,
          }}
        >
          <section
            style={{
              display: 'grid',
              gap: 11,
              gridColumn: 'span 2',
            }}
          >
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
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
                  Classificação
                </h2>

                <p
                  style={{
                    color: '#94a3b8',
                    fontSize: 12,
                    fontWeight: 700,
                    margin: '3px 0 0',
                  }}
                >
                  Ranking {selectedPeriod.toLowerCase()}
                </p>
              </div>

              <span
                style={{
                  background: '#ffedd5',
                  borderRadius: 999,
                  color: '#c2410c',
                  fontSize: 11,
                  fontWeight: 900,
                  padding: '7px 11px',
                }}
              >
                {users.length} jogadores
              </span>
            </div>

            {remainingUsers.map((user) => (
              <RankingRow
                key={`${selectedPeriod}-${user.id}`}
                user={user}
              />
            ))}
          </section>

          <aside
            style={{
              alignSelf: 'start',
              background: '#ffffff',
              border: '1px solid #fed7aa',
              borderRadius: 24,
              boxShadow:
                '0 10px 30px rgba(154, 52, 18, 0.07)',
              padding: 21,
            }}
          >
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                gap: 12,
              }}
            >
              <div
                style={{
                  alignItems: 'center',
                  background: '#ffedd5',
                  borderRadius: 16,
                  display: 'flex',
                  fontSize: 25,
                  height: 50,
                  justifyContent: 'center',
                  width: 50,
                }}
              >
                🔥
              </div>

              <div>
                <h2
                  style={{
                    color: '#172033',
                    fontSize: 17,
                    fontWeight: 900,
                    margin: 0,
                  }}
                >
                  Continue avançando
                </h2>

                <p
                  style={{
                    color: '#94a3b8',
                    fontSize: 11,
                    fontWeight: 700,
                    margin: '3px 0 0',
                  }}
                >
                  Cada atividade aumenta seu XP.
                </p>
              </div>
            </div>

            <div
              style={{
                background: '#fff7ed',
                border: '1px solid #fed7aa',
                borderRadius: 18,
                marginTop: 17,
                padding: 16,
              }}
            >
              <strong
                style={{
                  color: '#9a3412',
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 900,
                }}
              >
                ⚡ Próxima meta
              </strong>

              <p
                style={{
                  color: '#64748b',
                  fontSize: 12,
                  fontWeight: 700,
                  lineHeight: 1.55,
                  margin: '7px 0 0',
                }}
              >
                Complete duas missões para conquistar
                mais XP e subir no ranking.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('missions')}
              style={{
                background:
                  'linear-gradient(90deg, #f97316, #ef4444)',
                border: 0,
                borderRadius: 14,
                color: '#ffffff',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 13,
                fontWeight: 900,
                marginTop: 14,
                minHeight: 47,
                width: '100%',
              }}
            >
              Ir para as Missões
            </button>

            <button
              type="button"
              onClick={() => navigate('profile')}
              style={{
                background: '#f1f5f9',
                border: 0,
                borderRadius: 14,
                color: '#475569',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 13,
                fontWeight: 900,
                marginTop: 9,
                minHeight: 45,
                width: '100%',
              }}
            >
              Ver meu Perfil
            </button>
          </aside>
        </div>
      </main>
    </div>
  )
}

function getPeriodIcon(period: RankingPeriod) {
  const icons: Record<RankingPeriod, string> = {
    Semanal: '📅',
    Mensal: '🗓️',
    Amigos: '👥',
    Global: '🌍',
  }

  return icons[period]
}