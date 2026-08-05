import { AchievementCard } from '../components/profile/AchievementCard'
import { CompetencyCard } from '../components/profile/CompetencyCard'
import {
  achievements,
  enemCompetencies,
  profileStats,
  userProfile,
} from '../data/profileData'
import type { NavProps } from '../types/navigation'
import type { ProfileStat } from '../types/profile'

export default function ProfileScreen({
  navigate,
}: NavProps) {
  const levelProgress = Math.min(
    Math.round(
      (userProfile.currentXp / userProfile.nextLevelXp) * 100,
    ),
    100,
  )

  const collectionProgress = Math.round(
    (userProfile.unlockedCards / userProfile.totalCards) * 100,
  )

  const totalCompetencyScore = enemCompetencies.reduce(
    (total, competency) => total + competency.score,
    0,
  )

  const maximumCompetencyScore = enemCompetencies.reduce(
    (total, competency) => total + competency.maximumScore,
    0,
  )

  const unlockedAchievements = achievements.filter(
    (achievement) => achievement.unlocked,
  )

  const lockedAchievements = achievements.filter(
    (achievement) => !achievement.unlocked,
  )

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
            'linear-gradient(135deg, #6d28d9 0%, #7c3aed 46%, #2563eb 100%)',
          color: '#ffffff',
          padding: '32px clamp(20px, 4vw, 58px) 40px',
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
              alignItems: 'center',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 24,
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                flex: '1 1 430px',
                gap: 19,
              }}
            >
              <div
                style={{
                  alignItems: 'center',
                  background: '#ffffff',
                  border: '4px solid rgba(255,255,255,0.3)',
                  borderRadius: 999,
                  boxShadow:
                    '0 16px 35px rgba(30, 41, 59, 0.22)',
                  display: 'flex',
                  flexShrink: 0,
                  fontSize: 'clamp(42px, 7vw, 61px)',
                  height: 'clamp(92px, 14vw, 122px)',
                  justifyContent: 'center',
                  width: 'clamp(92px, 14vw, 122px)',
                }}
              >
                {userProfile.avatar}
              </div>

              <div style={{ minWidth: 0 }}>
                <span
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 11,
                    fontWeight: 900,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                  }}
                >
                  Perfil do estudante
                </span>

                <h1
                  style={{
                    fontSize: 'clamp(25px, 4vw, 39px)',
                    fontWeight: 900,
                    lineHeight: 1.1,
                    margin: '7px 0 5px',
                  }}
                >
                  {userProfile.name}
                </h1>

                <p
                  style={{
                    color: 'rgba(255,255,255,0.78)',
                    fontSize: 13,
                    fontWeight: 800,
                    margin: 0,
                  }}
                >
                  {userProfile.username}
                </p>

                <div
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 8,
                    marginTop: 11,
                  }}
                >
                  <span
                    style={{
                      background: 'rgba(255,255,255,0.17)',
                      border:
                        '1px solid rgba(255,255,255,0.2)',
                      borderRadius: 999,
                      fontSize: 11,
                      fontWeight: 900,
                      padding: '7px 11px',
                    }}
                  >
                    ⭐ Nível {userProfile.level}
                  </span>

                  <span
                    style={{
                      background: 'rgba(255,255,255,0.17)',
                      border:
                        '1px solid rgba(255,255,255,0.2)',
                      borderRadius: 999,
                      fontSize: 11,
                      fontWeight: 900,
                      padding: '7px 11px',
                    }}
                  >
                    {userProfile.title}
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                flex: '1 1 350px',
                gap: 10,
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(105px, 1fr))',
                maxWidth: 490,
                width: '100%',
              }}
            >
              <HeaderStat
                icon="⚡"
                value={userProfile.totalXp.toLocaleString('pt-BR')}
                label="XP total"
              />

              <HeaderStat
                icon="🏆"
                value={`#${userProfile.rankingPosition}`}
                label="Ranking"
              />

              <HeaderStat
                icon="🔥"
                value={`${userProfile.streakDays} dias`}
                label="Sequência"
              />
            </div>
          </div>

          <div
            style={{
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.17)',
              borderRadius: 20,
              marginTop: 28,
              padding: 17,
            }}
          >
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 9,
              }}
            >
              <div>
                <strong
                  style={{
                    display: 'block',
                    fontSize: 13,
                    fontWeight: 900,
                  }}
                >
                  Progresso para o nível {userProfile.level + 1}
                </strong>

                <span
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  Continue realizando atividades para evoluir.
                </span>
              </div>

              <span
                style={{
                  color: 'rgba(255,255,255,0.82)',
                  fontSize: 12,
                  fontWeight: 900,
                }}
              >
                {userProfile.currentXp.toLocaleString('pt-BR')} /{' '}
                {userProfile.nextLevelXp.toLocaleString('pt-BR')} XP
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
                    'linear-gradient(90deg, #facc15, #f97316)',
                  borderRadius: 999,
                  boxShadow:
                    '0 0 15px rgba(250,204,21,0.55)',
                  height: '100%',
                  transition: 'width 300ms ease',
                  width: `${levelProgress}%`,
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
          padding: '27px clamp(18px, 4vw, 58px) 52px',
          width: '100%',
        }}
      >
        <section
          style={{
            display: 'grid',
            gap: 14,
            gridTemplateColumns:
              'repeat(auto-fit, minmax(min(100%, 175px), 1fr))',
          }}
        >
          {profileStats.map((stat) => (
            <ProfileStatCard key={stat.id} stat={stat} />
          ))}
        </section>

        <div
          style={{
            display: 'grid',
            gap: 23,
            gridTemplateColumns:
              'repeat(auto-fit, minmax(min(100%, 330px), 1fr))',
            marginTop: 24,
          }}
        >
          <section
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 25,
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
              }}
            >
              <div
                style={{
                  alignItems: 'center',
                  background: '#ede9fe',
                  borderRadius: 16,
                  display: 'flex',
                  fontSize: 27,
                  height: 52,
                  justifyContent: 'center',
                  width: 52,
                }}
              >
                📊
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
                  Desempenho geral
                </h2>

                <p
                  style={{
                    color: '#94a3b8',
                    fontSize: 11,
                    fontWeight: 700,
                    margin: '3px 0 0',
                  }}
                >
                  Média simulada das competências.
                </p>
              </div>
            </div>

            <div
              style={{
                alignItems: 'center',
                background:
                  'linear-gradient(135deg, #ede9fe, #dbeafe)',
                border: '1px solid #c4b5fd',
                borderRadius: 21,
                display: 'flex',
                gap: 16,
                marginTop: 18,
                padding: 18,
              }}
            >
              <div
                style={{
                  alignItems: 'center',
                  background: '#ffffff',
                  borderRadius: 999,
                  color: '#6d28d9',
                  display: 'flex',
                  flexShrink: 0,
                  fontSize: 25,
                  fontWeight: 900,
                  height: 76,
                  justifyContent: 'center',
                  width: 76,
                }}
              >
                {totalCompetencyScore}
              </div>

              <div>
                <strong
                  style={{
                    color: '#172033',
                    display: 'block',
                    fontSize: 16,
                    fontWeight: 900,
                  }}
                >
                  {totalCompetencyScore} de {maximumCompetencyScore} pontos
                </strong>

                <p
                  style={{
                    color: '#64748b',
                    fontSize: 12,
                    fontWeight: 700,
                    lineHeight: 1.5,
                    margin: '5px 0 0',
                  }}
                >
                  Seu melhor desempenho está nas competências C2 e C4.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('write')}
              style={{
                background:
                  'linear-gradient(90deg, #7c3aed, #3b82f6)',
                border: 0,
                borderRadius: 14,
                color: '#ffffff',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 13,
                fontWeight: 900,
                marginTop: 15,
                minHeight: 47,
                width: '100%',
              }}
            >
              Escrever uma redação
            </button>
          </section>

          <section
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 25,
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
              }}
            >
              <div
                style={{
                  alignItems: 'center',
                  background: '#dbeafe',
                  borderRadius: 16,
                  display: 'flex',
                  fontSize: 27,
                  height: 52,
                  justifyContent: 'center',
                  width: 52,
                }}
              >
                🃏
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
                  Coleção de cartas
                </h2>

                <p
                  style={{
                    color: '#94a3b8',
                    fontSize: 11,
                    fontWeight: 700,
                    margin: '3px 0 0',
                  }}
                >
                  Repertórios e conectivos conquistados.
                </p>
              </div>
            </div>

            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 22,
              }}
            >
              <div>
                <strong
                  style={{
                    color: '#172033',
                    display: 'block',
                    fontSize: 28,
                    fontWeight: 900,
                  }}
                >
                  {userProfile.unlockedCards}/
                  {userProfile.totalCards}
                </strong>

                <span
                  style={{
                    color: '#94a3b8',
                    fontSize: 11,
                    fontWeight: 800,
                  }}
                >
                  Cartas desbloqueadas
                </span>
              </div>

              <div
                style={{
                  alignItems: 'center',
                  background: '#ede9fe',
                  borderRadius: 999,
                  color: '#6d28d9',
                  display: 'flex',
                  fontSize: 18,
                  fontWeight: 900,
                  height: 66,
                  justifyContent: 'center',
                  width: 66,
                }}
              >
                {collectionProgress}%
              </div>
            </div>

            <div
              style={{
                background: '#e2e8f0',
                borderRadius: 999,
                height: 10,
                marginTop: 17,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  background:
                    'linear-gradient(90deg, #3b82f6, #7c3aed)',
                  borderRadius: 999,
                  height: '100%',
                  width: `${collectionProgress}%`,
                }}
              />
            </div>

            <button
              type="button"
              onClick={() => navigate('library')}
              style={{
                background: '#ede9fe',
                border: 0,
                borderRadius: 14,
                color: '#6d28d9',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 13,
                fontWeight: 900,
                marginTop: 18,
                minHeight: 47,
                width: '100%',
              }}
            >
              Abrir Biblioteca
            </button>
          </section>

          <section
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 25,
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
              }}
            >
              <div
                style={{
                  alignItems: 'center',
                  background: '#ffedd5',
                  borderRadius: 16,
                  display: 'flex',
                  fontSize: 27,
                  height: 52,
                  justifyContent: 'center',
                  width: 52,
                }}
              >
                🏆
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
                  Ranking semanal
                </h2>

                <p
                  style={{
                    color: '#94a3b8',
                    fontSize: 11,
                    fontWeight: 700,
                    margin: '3px 0 0',
                  }}
                >
                  Sua posição entre os estudantes.
                </p>
              </div>
            </div>

            <div
              style={{
                background:
                  'linear-gradient(135deg, #fff7ed, #ffedd5)',
                border: '1px solid #fed7aa',
                borderRadius: 20,
                marginTop: 18,
                padding: 18,
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  color: '#c2410c',
                  fontSize: 11,
                  fontWeight: 900,
                  textTransform: 'uppercase',
                }}
              >
                Posição atual
              </span>

              <strong
                style={{
                  color: '#ea580c',
                  display: 'block',
                  fontSize: 42,
                  fontWeight: 900,
                  marginTop: 3,
                }}
              >
                #{userProfile.rankingPosition}
              </strong>

              <p
                style={{
                  color: '#64748b',
                  fontSize: 12,
                  fontWeight: 700,
                  margin: '4px 0 0',
                }}
              >
                Continue ganhando XP para subir.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('ranking')}
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
                marginTop: 15,
                minHeight: 47,
                width: '100%',
              }}
            >
              Ver Ranking completo
            </button>
          </section>
        </div>

        <section style={{ marginTop: 28 }}>
          <div
            style={{
              alignItems: 'flex-end',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
              justifyContent: 'space-between',
              marginBottom: 16,
            }}
          >
            <div>
              <span
                style={{
                  color: '#7c3aed',
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: 0.8,
                  textTransform: 'uppercase',
                }}
              >
                Desempenho no ENEM
              </span>

              <h2
                style={{
                  color: '#172033',
                  fontSize: 23,
                  fontWeight: 900,
                  margin: '5px 0 0',
                }}
              >
                Competências
              </h2>
            </div>

            <span
              style={{
                background: '#ede9fe',
                borderRadius: 999,
                color: '#6d28d9',
                fontSize: 11,
                fontWeight: 900,
                padding: '8px 12px',
              }}
            >
              Média simulada
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gap: 14,
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            }}
          >
            {enemCompetencies.map((competency) => (
              <CompetencyCard
                key={competency.id}
                competency={competency}
              />
            ))}
          </div>
        </section>

        <section style={{ marginTop: 30 }}>
          <div
            style={{
              alignItems: 'flex-end',
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}
          >
            <div>
              <span
                style={{
                  color: '#7c3aed',
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: 0.8,
                  textTransform: 'uppercase',
                }}
              >
                Medalhas conquistadas
              </span>

              <h2
                style={{
                  color: '#172033',
                  fontSize: 23,
                  fontWeight: 900,
                  margin: '5px 0 0',
                }}
              >
                Conquistas desbloqueadas
              </h2>
            </div>

            <span
              style={{
                color: '#64748b',
                fontSize: 12,
                fontWeight: 800,
              }}
            >
              {unlockedAchievements.length}/{achievements.length}
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gap: 14,
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(100%, 290px), 1fr))',
            }}
          >
            {unlockedAchievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
              />
            ))}
          </div>
        </section>

        <section style={{ marginTop: 28 }}>
          <div style={{ marginBottom: 16 }}>
            <span
              style={{
                color: '#94a3b8',
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: 0.8,
                textTransform: 'uppercase',
              }}
            >
              Próximos objetivos
            </span>

            <h2
              style={{
                color: '#172033',
                fontSize: 23,
                fontWeight: 900,
                margin: '5px 0 0',
              }}
            >
              Conquistas em progresso
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gap: 14,
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(100%, 290px), 1fr))',
            }}
          >
            {lockedAchievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

interface HeaderStatProps {
  icon: string
  value: string
  label: string
}

function HeaderStat({
  icon,
  value,
  label,
}: HeaderStatProps) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.14)',
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: 17,
        padding: '13px 14px',
      }}
    >
      <span style={{ fontSize: 20 }}>{icon}</span>

      <strong
        style={{
          display: 'block',
          fontSize: 19,
          fontWeight: 900,
          marginTop: 4,
        }}
      >
        {value}
      </strong>

      <span
        style={{
          color: 'rgba(255,255,255,0.72)',
          fontSize: 10,
          fontWeight: 800,
        }}
      >
        {label}
      </span>
    </div>
  )
}

interface ProfileStatCardProps {
  stat: ProfileStat
}

function ProfileStatCard({
  stat,
}: ProfileStatCardProps) {
  return (
    <article
      style={{
        alignItems: 'center',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 20,
        boxShadow: '0 7px 22px rgba(15,23,42,0.05)',
        display: 'flex',
        gap: 13,
        padding: 17,
      }}
    >
      <div
        style={{
          alignItems: 'center',
          background:
            'linear-gradient(135deg, #ede9fe, #dbeafe)',
          borderRadius: 15,
          display: 'flex',
          flexShrink: 0,
          fontSize: 24,
          height: 48,
          justifyContent: 'center',
          width: 48,
        }}
      >
        {stat.icon}
      </div>

      <div>
        <strong
          style={{
            color: '#172033',
            display: 'block',
            fontSize: 18,
            fontWeight: 900,
          }}
        >
          {stat.value}
        </strong>

        <span
          style={{
            color: '#94a3b8',
            fontSize: 10,
            fontWeight: 800,
          }}
        >
          {stat.label}
        </span>
      </div>
    </article>
  )
}