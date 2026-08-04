import type { CSSProperties } from 'react'
import { MissionCard } from '../components/cards/MissionCard'
import { missions } from '../data/missions'
import type { Mission } from '../types/mission'
import type { NavProps } from '../types/navigation'

const smallStatStyle: CSSProperties = {
  background: 'rgba(255, 255, 255, 0.14)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  borderRadius: 16,
  flex: '1 1 110px',
  padding: '12px 14px',
}

export default function MissionsScreen({ navigate }: NavProps) {
  const completedMissions = missions.filter(
    (mission) => mission.status === 'completed',
  ).length

  const earnedXp = missions
    .filter((mission) => mission.status === 'completed')
    .reduce((total, mission) => total + mission.xp, 0)

  const progress = Math.round(
    (completedMissions / missions.length) * 100,
  )

  function openMission(mission: Mission) {
    if (
      mission.status === 'locked' ||
      !mission.destination
    ) {
      return
    }

    navigate(mission.destination)
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
            'linear-gradient(135deg, #6d28d9 0%, #7c3aed 45%, #2563eb 100%)',
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
              gap: 24,
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
                Jornada de aprendizado
              </span>

              <h1
                style={{
                  fontSize: 'clamp(28px, 4vw, 42px)',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  margin: '7px 0 8px',
                }}
              >
                ⚔️ Missões
              </h1>

              <p
                style={{
                  color: 'rgba(255,255,255,0.82)',
                  fontSize: 14,
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                Semana 3 · Módulo: Estrutura da Redação
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                flex: '1 1 330px',
                flexWrap: 'wrap',
                gap: 10,
                maxWidth: 520,
              }}
            >
              <div style={smallStatStyle}>
                <div
                  style={{
                    fontSize: 21,
                    fontWeight: 900,
                  }}
                >
                  {completedMissions}
                </div>

                <div
                  style={{
                    color: 'rgba(255,255,255,0.72)',
                    fontSize: 11,
                    fontWeight: 800,
                  }}
                >
                  Concluídas
                </div>
              </div>

              <div style={smallStatStyle}>
                <div
                  style={{
                    fontSize: 21,
                    fontWeight: 900,
                  }}
                >
                  {missions.length}
                </div>

                <div
                  style={{
                    color: 'rgba(255,255,255,0.72)',
                    fontSize: 11,
                    fontWeight: 800,
                  }}
                >
                  Missões
                </div>
              </div>

              <div style={smallStatStyle}>
                <div
                  style={{
                    fontSize: 21,
                    fontWeight: 900,
                  }}
                >
                  {earnedXp} XP
                </div>

                <div
                  style={{
                    color: 'rgba(255,255,255,0.72)',
                    fontSize: 11,
                    fontWeight: 800,
                  }}
                >
                  Conquistados
                </div>
              </div>
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
                Progresso do módulo
              </span>

              <span
                style={{
                  color: 'rgba(255,255,255,0.76)',
                  fontSize: 12,
                  fontWeight: 900,
                }}
              >
                {completedMissions} de {missions.length} ·{' '}
                {progress}%
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
                    '0 0 12px rgba(74,222,128,0.65)',
                  height: '100%',
                  transition: 'width 300ms ease',
                  width: `${progress}%`,
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
          padding: '28px clamp(18px, 4vw, 58px) 44px',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'grid',
            gap: 24,
            gridTemplateColumns:
              'repeat(auto-fit, minmax(min(100%, 310px), 1fr))',
          }}
        >
          <aside
            style={{
              alignSelf: 'start',
              background: '#ffffff',
              border: '1px solid #e6eaf2',
              borderRadius: 24,
              boxShadow:
                '0 10px 30px rgba(15,23,42,0.06)',
              padding: 22,
            }}
          >
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                gap: 13,
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  alignItems: 'center',
                  background: '#ede9fe',
                  borderRadius: 15,
                  display: 'flex',
                  fontSize: 24,
                  height: 48,
                  justifyContent: 'center',
                  width: 48,
                }}
              >
                🗺️
              </div>

              <div>
                <h2
                  style={{
                    color: '#172033',
                    fontSize: 18,
                    fontWeight: 900,
                    margin: 0,
                  }}
                >
                  Sua jornada
                </h2>

                <p
                  style={{
                    color: '#64748b',
                    fontSize: 12,
                    fontWeight: 700,
                    margin: '3px 0 0',
                  }}
                >
                  Complete uma missão por vez.
                </p>
              </div>
            </div>

            <div
              style={{
                background: '#f8fafc',
                borderRadius: 18,
                padding: 16,
              }}
            >
              <div
                style={{
                  color: '#475569',
                  fontSize: 12,
                  fontWeight: 900,
                  marginBottom: 8,
                }}
              >
                Próxima recompensa
              </div>

              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 34 }}>⭐</span>

                <div>
                  <strong
                    style={{
                      color: '#1e293b',
                      display: 'block',
                      fontSize: 14,
                      fontWeight: 900,
                    }}
                  >
                    Carta especial
                  </strong>

                  <span
                    style={{
                      color: '#64748b',
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    Conclua a missão atual.
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                background:
                  'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(59,130,246,0.1))',
                border:
                  '1px solid rgba(124,58,237,0.13)',
                borderRadius: 18,
                marginTop: 13,
                padding: 16,
              }}
            >
              <strong
                style={{
                  color: '#5b21b6',
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 900,
                  marginBottom: 5,
                }}
              >
                💡 Dica do dia
              </strong>

              <p
                style={{
                  color: '#64748b',
                  fontSize: 12,
                  fontWeight: 700,
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                Fazer pequenas atividades todos os dias é
                melhor do que estudar tudo de uma vez.
              </p>
            </div>
          </aside>

          <section
            style={{
              display: 'grid',
              gap: 17,
              gridColumn: 'span 2',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            }}
          >
            {missions.map((mission) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                onOpen={openMission}
              />
            ))}
          </section>
        </div>
      </main>
    </div>
  )
}