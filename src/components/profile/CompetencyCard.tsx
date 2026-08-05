import type { EnemCompetency } from '../../types/profile'

interface CompetencyCardProps {
  competency: EnemCompetency
}

export function CompetencyCard({
  competency,
}: CompetencyCardProps) {
  const percentage = Math.round(
    (competency.score / competency.maximumScore) * 100,
  )

  const progressColor =
    percentage >= 90
      ? 'linear-gradient(90deg, #22c55e, #16a34a)'
      : percentage >= 75
        ? 'linear-gradient(90deg, #3b82f6, #7c3aed)'
        : 'linear-gradient(90deg, #f97316, #ef4444)'

  return (
    <article
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 20,
        boxShadow: '0 7px 22px rgba(15, 23, 42, 0.05)',
        padding: 18,
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
            background:
              'linear-gradient(135deg, #ede9fe, #dbeafe)',
            borderRadius: 15,
            color: '#6d28d9',
            display: 'flex',
            flexShrink: 0,
            fontSize: 15,
            fontWeight: 900,
            height: 48,
            justifyContent: 'center',
            width: 48,
          }}
        >
          {competency.code}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              alignItems: 'flex-start',
              display: 'flex',
              gap: 12,
              justifyContent: 'space-between',
            }}
          >
            <h3
              style={{
                color: '#172033',
                fontSize: 15,
                fontWeight: 900,
                lineHeight: 1.3,
                margin: 0,
              }}
            >
              {competency.title}
            </h3>

            <strong
              style={{
                color: '#7c3aed',
                flexShrink: 0,
                fontSize: 15,
                fontWeight: 900,
              }}
            >
              {competency.score}/{competency.maximumScore}
            </strong>
          </div>

          <p
            style={{
              color: '#64748b',
              fontSize: 12,
              fontWeight: 700,
              lineHeight: 1.5,
              margin: '7px 0 13px',
            }}
          >
            {competency.description}
          </p>

          <div
            style={{
              background: '#e2e8f0',
              borderRadius: 999,
              height: 9,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                background: progressColor,
                borderRadius: 999,
                height: '100%',
                transition: 'width 300ms ease',
                width: `${percentage}%`,
              }}
            />
          </div>

          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 7,
            }}
          >
            <span
              style={{
                color: '#94a3b8',
                fontSize: 10,
                fontWeight: 800,
              }}
            >
              Desempenho
            </span>

            <span
              style={{
                color:
                  percentage >= 90
                    ? '#15803d'
                    : percentage >= 75
                      ? '#6d28d9'
                      : '#c2410c',
                fontSize: 11,
                fontWeight: 900,
              }}
            >
              {percentage}%
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}