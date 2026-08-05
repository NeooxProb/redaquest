import { useMemo } from 'react'
import { generateSimulatedCorrection } from '../services/correctionService'
import type {
  CompetencyCorrection,
  FeedbackType,
  SubmittedEssay,
  TextHighlight,
} from '../types/correction'
import type { NavProps } from '../types/navigation'

function loadSubmittedEssay(): SubmittedEssay | null {
  const storedEssay = window.localStorage.getItem(
    'redaquest:submitted-essay',
  )

  if (!storedEssay) {
    return null
  }

  try {
    return JSON.parse(storedEssay) as SubmittedEssay
  } catch {
    window.localStorage.removeItem(
      'redaquest:submitted-essay',
    )

    return null
  }
}

export default function CorrectionScreen({
  navigate,
}: NavProps) {
  const submittedEssay = useMemo(
    () => loadSubmittedEssay(),
    [],
  )

  const correction = useMemo(() => {
    if (!submittedEssay) {
      return null
    }

    return generateSimulatedCorrection(submittedEssay)
  }, [submittedEssay])

  if (!submittedEssay || !correction) {
    return (
      <div
        style={{
          alignItems: 'center',
          background:
            'linear-gradient(145deg, #eef2ff, #f8fafc)',
          display: 'flex',
          fontFamily: 'Nunito, sans-serif',
          justifyContent: 'center',
          minHeight: '100%',
          padding: 24,
          width: '100%',
        }}
      >
        <main
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: 28,
            boxShadow:
              '0 22px 60px rgba(15, 23, 42, 0.1)',
            maxWidth: 570,
            padding: '42px clamp(24px, 5vw, 48px)',
            textAlign: 'center',
            width: '100%',
          }}
        >
          <div
            style={{
              alignItems: 'center',
              background:
                'linear-gradient(135deg, #ede9fe, #dbeafe)',
              borderRadius: 999,
              display: 'flex',
              fontSize: 48,
              height: 100,
              justifyContent: 'center',
              margin: '0 auto 22px',
              width: 100,
            }}
          >
            📝
          </div>

          <h1
            style={{
              color: '#172033',
              fontSize: 'clamp(26px, 5vw, 37px)',
              fontWeight: 900,
              margin: 0,
            }}
          >
            Nenhuma redação enviada
          </h1>

          <p
            style={{
              color: '#64748b',
              fontSize: 14,
              fontWeight: 700,
              lineHeight: 1.65,
              margin: '12px 0 26px',
            }}
          >
            Escolha um tema, escreva pelo menos 30 palavras e
            envie o texto para receber uma correção
            demonstrativa.
          </p>

          <button
            type="button"
            onClick={() => navigate('write')}
            style={{
              background:
                'linear-gradient(90deg, #7c3aed, #3b82f6)',
              border: 0,
              borderRadius: 15,
              color: '#ffffff',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 14,
              fontWeight: 900,
              minHeight: 50,
              width: '100%',
            }}
          >
            Escrever uma redação
          </button>
        </main>
      </div>
    )
  }

  const scorePercentage = Math.round(
    (correction.totalScore / correction.maximumScore) *
      100,
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
            'linear-gradient(135deg, #166534 0%, #16a34a 48%, #059669 100%)',
          color: '#ffffff',
          padding:
            '28px clamp(20px, 4vw, 58px) 38px',
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
            <div style={{ flex: '1 1 500px' }}>
              <span
                style={{
                  color: 'rgba(255,255,255,0.72)',
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}
              >
                Correção demonstrativa
              </span>

              <h1
                style={{
                  fontSize: 'clamp(27px, 4vw, 42px)',
                  fontWeight: 900,
                  lineHeight: 1.15,
                  margin: '7px 0 9px',
                }}
              >
                ✅ Sua redação foi analisada
              </h1>

              <p
                style={{
                  color: 'rgba(255,255,255,0.82)',
                  fontSize: 14,
                  fontWeight: 700,
                  lineHeight: 1.55,
                  margin: 0,
                  maxWidth: 760,
                }}
              >
                {submittedEssay.topic.icon}{' '}
                {submittedEssay.topic.title}
              </p>
            </div>

            <div
              style={{
                alignItems: 'center',
                background: 'rgba(255,255,255,0.15)',
                border:
                  '1px solid rgba(255,255,255,0.22)',
                borderRadius: 24,
                display: 'flex',
                gap: 17,
                padding: 17,
              }}
            >
              <div
                style={{
                  alignItems: 'center',
                  background: '#ffffff',
                  borderRadius: 999,
                  color:
                    correction.totalScore >= 800
                      ? '#15803d'
                      : correction.totalScore >= 600
                        ? '#7c3aed'
                        : '#c2410c',
                  display: 'flex',
                  flexDirection: 'column',
                  height: 94,
                  justifyContent: 'center',
                  width: 94,
                }}
              >
                <strong
                  style={{
                    fontSize: 28,
                    fontWeight: 900,
                    lineHeight: 1,
                  }}
                >
                  {correction.totalScore}
                </strong>

                <span
                  style={{
                    color: '#94a3b8',
                    fontSize: 10,
                    fontWeight: 900,
                    marginTop: 4,
                  }}
                >
                  /1000
                </span>
              </div>

              <div>
                <strong
                  style={{
                    display: 'block',
                    fontSize: 17,
                    fontWeight: 900,
                  }}
                >
                  Nota estimada
                </strong>

                <span
                  style={{
                    color: 'rgba(255,255,255,0.72)',
                    fontSize: 11,
                    fontWeight: 800,
                  }}
                >
                  {scorePercentage}% do total
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main
        style={{
          margin: '0 auto',
          maxWidth: 1320,
          padding:
            '26px clamp(18px, 4vw, 58px) 52px',
          width: '100%',
        }}
      >
        <section
          style={{
            background: '#ffffff',
            border: '1px solid #bbf7d0',
            borderRadius: 24,
            boxShadow:
              '0 10px 30px rgba(22, 163, 74, 0.07)',
            padding: 'clamp(20px, 4vw, 29px)',
          }}
        >
          <div
            style={{
              alignItems: 'flex-start',
              display: 'flex',
              gap: 15,
            }}
          >
            <div
              style={{
                alignItems: 'center',
                background: '#dcfce7',
                borderRadius: 16,
                display: 'flex',
                flexShrink: 0,
                fontSize: 27,
                height: 54,
                justifyContent: 'center',
                width: 54,
              }}
            >
              🤖
            </div>

            <div>
              <h2
                style={{
                  color: '#172033',
                  fontSize: 20,
                  fontWeight: 900,
                  margin: 0,
                }}
              >
                Resumo da análise
              </h2>

              <p
                style={{
                  color: '#64748b',
                  fontSize: 14,
                  fontWeight: 700,
                  lineHeight: 1.65,
                  margin: '8px 0 0',
                }}
              >
                {correction.summary}
              </p>
            </div>
          </div>

          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 9,
              marginTop: 19,
            }}
          >
            <InfoPill
              icon="📝"
              text={`${submittedEssay.wordCount} palavras`}
            />

            <InfoPill
              icon="⚡"
              text={`+${submittedEssay.topic.rewardXp} XP`}
            />

            <InfoPill
              icon="📅"
              text={new Date(
                submittedEssay.submittedAt,
              ).toLocaleDateString('pt-BR')}
            />
          </div>
        </section>

        <section style={{ marginTop: 27 }}>
          <SectionHeading
            eyebrow="Nota por critério"
            title="As cinco competências do ENEM"
            description="A pontuação foi calculada por regras demonstrativas baseadas na estrutura e em palavras identificadas no texto."
          />

          <div
            style={{
              display: 'grid',
              gap: 15,
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
              marginTop: 16,
            }}
          >
            {correction.competencies.map(
              (competency) => (
                <CorrectionCompetencyCard
                  key={competency.id}
                  competency={competency}
                />
              ),
            )}
          </div>
        </section>

        <div
          style={{
            display: 'grid',
            gap: 22,
            gridTemplateColumns:
              'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            marginTop: 27,
          }}
        >
          <FeedbackList
            icon="✅"
            title="Pontos positivos"
            items={correction.strengths}
            background="#f0fdf4"
            border="#bbf7d0"
            textColor="#166534"
          />

          <FeedbackList
            icon="🎯"
            title="O que melhorar"
            items={correction.improvements}
            background="#fff7ed"
            border="#fed7aa"
            textColor="#9a3412"
          />
        </div>

        <section style={{ marginTop: 29 }}>
          <SectionHeading
            eyebrow="Comentários no texto"
            title="Trechos analisados"
            description="Veja observações produzidas a partir do início, da coesão e da conclusão do texto."
          />

          <div
            style={{
              display: 'grid',
              gap: 14,
              marginTop: 16,
            }}
          >
            {correction.highlights.map((highlight) => (
              <HighlightCard
                key={highlight.id}
                highlight={highlight}
              />
            ))}
          </div>
        </section>

        <section
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: 25,
            boxShadow:
              '0 10px 30px rgba(15,23,42,0.06)',
            marginTop: 28,
            padding: 'clamp(20px, 4vw, 29px)',
          }}
        >
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 14,
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span
                style={{
                  color: '#7c3aed',
                  fontSize: 10,
                  fontWeight: 900,
                  letterSpacing: 0.8,
                  textTransform: 'uppercase',
                }}
              >
                Texto enviado
              </span>

              <h2
                style={{
                  color: '#172033',
                  fontSize: 21,
                  fontWeight: 900,
                  margin: '5px 0 0',
                }}
              >
                Sua redação
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
              {submittedEssay.wordCount} palavras
            </span>
          </div>

          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 18,
              color: '#334155',
              fontFamily: 'Georgia, serif',
              fontSize: 15,
              fontWeight: 500,
              lineHeight: 1.85,
              marginTop: 17,
              maxHeight: 430,
              overflowY: 'auto',
              padding: '21px clamp(17px, 4vw, 27px)',
              whiteSpace: 'pre-wrap',
            }}
          >
            {submittedEssay.content}
          </div>
        </section>

        <section
          style={{
            alignItems: 'center',
            background:
              'linear-gradient(135deg, #ede9fe, #dbeafe)',
            border: '1px solid #c4b5fd',
            borderRadius: 25,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 20,
            justifyContent: 'space-between',
            marginTop: 25,
            padding: '22px clamp(20px, 4vw, 30px)',
          }}
        >
          <div style={{ flex: '1 1 420px' }}>
            <h2
              style={{
                color: '#172033',
                fontSize: 21,
                fontWeight: 900,
                margin: 0,
              }}
            >
              Quer melhorar sua nota?
            </h2>

            <p
              style={{
                color: '#64748b',
                fontSize: 13,
                fontWeight: 700,
                lineHeight: 1.55,
                margin: '6px 0 0',
              }}
            >
              Volte ao editor, revise os pontos indicados e
              envie uma nova versão. O rascunho continua salvo.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 9,
            }}
          >
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
                minHeight: 48,
                padding: '11px 19px',
              }}
            >
              ✍️ Reescrever redação
            </button>

            <button
              type="button"
              onClick={() => navigate('missions')}
              style={{
                background: '#ffffff',
                border: '1px solid #c4b5fd',
                borderRadius: 14,
                color: '#6d28d9',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 13,
                fontWeight: 900,
                minHeight: 48,
                padding: '11px 19px',
              }}
            >
              Ver Missões
            </button>
          </div>
        </section>

        <p
          style={{
            color: '#94a3b8',
            fontSize: 11,
            fontWeight: 700,
            lineHeight: 1.55,
            margin: '18px auto 0',
            maxWidth: 850,
            textAlign: 'center',
          }}
        >
          Esta correção é uma simulação para demonstrar o
          funcionamento do RedaQuest. Ela não equivale a uma
          avaliação oficial do ENEM nem utiliza inteligência
          artificial nesta versão.
        </p>
      </main>
    </div>
  )
}

interface InfoPillProps {
  icon: string
  text: string
}

function InfoPill({ icon, text }: InfoPillProps) {
  return (
    <span
      style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: 999,
        color: '#475569',
        fontSize: 11,
        fontWeight: 900,
        padding: '8px 11px',
      }}
    >
      {icon} {text}
    </span>
  )
}

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description: string
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div>
      <span
        style={{
          color: '#7c3aed',
          fontSize: 10,
          fontWeight: 900,
          letterSpacing: 0.8,
          textTransform: 'uppercase',
        }}
      >
        {eyebrow}
      </span>

      <h2
        style={{
          color: '#172033',
          fontSize: 23,
          fontWeight: 900,
          margin: '5px 0 0',
        }}
      >
        {title}
      </h2>

      <p
        style={{
          color: '#64748b',
          fontSize: 12,
          fontWeight: 700,
          lineHeight: 1.55,
          margin: '5px 0 0',
        }}
      >
        {description}
      </p>
    </div>
  )
}

interface CorrectionCompetencyCardProps {
  competency: CompetencyCorrection
}

function CorrectionCompetencyCard({
  competency,
}: CorrectionCompetencyCardProps) {
  const percentage = Math.round(
    (competency.score / competency.maximumScore) * 100,
  )

  const progressColor =
    percentage >= 90
      ? 'linear-gradient(90deg, #22c55e, #16a34a)'
      : percentage >= 70
        ? 'linear-gradient(90deg, #3b82f6, #7c3aed)'
        : 'linear-gradient(90deg, #f97316, #ef4444)'

  return (
    <article
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 22,
        boxShadow:
          '0 8px 24px rgba(15,23,42,0.05)',
        padding: 19,
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
            height: 49,
            justifyContent: 'center',
            width: 49,
          }}
        >
          {competency.code}
        </div>

        <div style={{ flex: 1 }}>
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
              {competency.score}/200
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
            {competency.feedback}
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
                width: `${percentage}%`,
              }}
            />
          </div>
        </div>
      </div>
    </article>
  )
}

interface FeedbackListProps {
  icon: string
  title: string
  items: string[]
  background: string
  border: string
  textColor: string
}

function FeedbackList({
  icon,
  title,
  items,
  background,
  border,
  textColor,
}: FeedbackListProps) {
  return (
    <section
      style={{
        background,
        border: `1px solid ${border}`,
        borderRadius: 24,
        padding: 21,
      }}
    >
      <h2
        style={{
          color: textColor,
          fontSize: 18,
          fontWeight: 900,
          margin: 0,
        }}
      >
        {icon} {title}
      </h2>

      <div
        style={{
          display: 'grid',
          gap: 10,
          marginTop: 15,
        }}
      >
        {items.map((item, index) => (
          <div
            key={`${title}-${index}`}
            style={{
              alignItems: 'flex-start',
              background: 'rgba(255,255,255,0.72)',
              borderRadius: 14,
              color: '#475569',
              display: 'flex',
              fontSize: 12,
              fontWeight: 700,
              gap: 9,
              lineHeight: 1.5,
              padding: 12,
            }}
          >
            <span
              style={{
                color: textColor,
                fontWeight: 900,
              }}
            >
              •
            </span>

            {item}
          </div>
        ))}
      </div>
    </section>
  )
}

const highlightStyles: Record<
  FeedbackType,
  {
    background: string
    border: string
    color: string
    icon: string
    label: string
  }
> = {
  positive: {
    background: '#f0fdf4',
    border: '#86efac',
    color: '#166534',
    icon: '✅',
    label: 'Ponto positivo',
  },
  warning: {
    background: '#fffbeb',
    border: '#fcd34d',
    color: '#a16207',
    icon: '💡',
    label: 'Atenção',
  },
  critical: {
    background: '#fff7ed',
    border: '#fdba74',
    color: '#9a3412',
    icon: '🎯',
    label: 'Precisa melhorar',
  },
}

interface HighlightCardProps {
  highlight: TextHighlight
}

function HighlightCard({
  highlight,
}: HighlightCardProps) {
  const style = highlightStyles[highlight.type]

  return (
    <article
      style={{
        background: style.background,
        border: `1px solid ${style.border}`,
        borderRadius: 20,
        padding: 18,
      }}
    >
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          gap: 8,
        }}
      >
        <span>{style.icon}</span>

        <strong
          style={{
            color: style.color,
            fontSize: 12,
            fontWeight: 900,
            textTransform: 'uppercase',
          }}
        >
          {style.label}
        </strong>
      </div>

      <blockquote
        style={{
          background: 'rgba(255,255,255,0.72)',
          borderLeft: `4px solid ${style.border}`,
          borderRadius: '0 13px 13px 0',
          color: '#475569',
          fontFamily: 'Georgia, serif',
          fontSize: 13,
          fontStyle: 'italic',
          lineHeight: 1.65,
          margin: '13px 0 10px',
          padding: 13,
        }}
      >
        “{highlight.excerpt}”
      </blockquote>

      <p
        style={{
          color: style.color,
          fontSize: 12,
          fontWeight: 700,
          lineHeight: 1.55,
          margin: 0,
        }}
      >
        {highlight.message}
      </p>
    </article>
  )
}