import { useState } from 'react'
import type { CSSProperties } from 'react'
import { errorHuntQuestions } from '../data/errorHuntQuestions'
import type { NavProps } from '../types/navigation'

type AnswerState = 'waiting' | 'correct' | 'wrong'

export default function ErrorHuntScreen({ navigate }: NavProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(
    null,
  )
  const [answerState, setAnswerState] =
    useState<AnswerState>('waiting')
  const [hearts, setHearts] = useState(5)
  const [earnedXp, setEarnedXp] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [finished, setFinished] = useState(false)

  const currentQuestion = errorHuntQuestions[currentIndex]

  const progress = Math.round(
    ((currentIndex + 1) / errorHuntQuestions.length) * 100,
  )

  function selectOption(optionId: number, isCorrect: boolean) {
    if (answerState !== 'waiting') {
      return
    }

    setSelectedOptionId(optionId)

    if (isCorrect) {
      setAnswerState('correct')
      setEarnedXp((currentXp) => currentXp + currentQuestion.xp)
      setCorrectAnswers((currentTotal) => currentTotal + 1)
      return
    }

    setAnswerState('wrong')
    setHearts((currentHearts) => Math.max(currentHearts - 1, 0))
  }

  function continueActivity() {
    const isLastQuestion =
      currentIndex === errorHuntQuestions.length - 1

    if (isLastQuestion || hearts === 0) {
      setFinished(true)
      return
    }

    setCurrentIndex((index) => index + 1)
    setSelectedOptionId(null)
    setAnswerState('waiting')
  }

  function restartActivity() {
    setCurrentIndex(0)
    setSelectedOptionId(null)
    setAnswerState('waiting')
    setHearts(5)
    setEarnedXp(0)
    setCorrectAnswers(0)
    setFinished(false)
  }

  function getOptionStyle(
    optionId: number,
    isCorrect: boolean,
  ): CSSProperties {
    const isSelected = selectedOptionId === optionId

    if (answerState === 'correct' && isSelected) {
      return {
        background: '#dcfce7',
        border: '2px solid #22c55e',
        color: '#166534',
      }
    }

    if (answerState === 'wrong' && isSelected) {
      return {
        background: '#fee2e2',
        border: '2px solid #ef4444',
        color: '#991b1b',
      }
    }

    if (answerState === 'wrong' && isCorrect) {
      return {
        background: '#dcfce7',
        border: '2px solid #22c55e',
        color: '#166534',
      }
    }

    return {
      background: '#ffffff',
      border: '2px solid #e2e8f0',
      color: '#334155',
    }
  }

  if (finished) {
    const completedActivity =
      currentIndex === errorHuntQuestions.length - 1 &&
      hearts > 0

    return (
      <div
        style={{
          alignItems: 'center',
          background:
            'linear-gradient(145deg, #fff7ed 0%, #f8fafc 50%, #eef2ff 100%)',
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
            borderRadius: 30,
            boxShadow: '0 22px 60px rgba(15, 23, 42, 0.12)',
            maxWidth: 580,
            padding: '38px clamp(24px, 5vw, 48px)',
            textAlign: 'center',
            width: '100%',
          }}
        >
          <div
            style={{
              alignItems: 'center',
              background: completedActivity
                ? 'linear-gradient(135deg, #f97316, #ef4444)'
                : 'linear-gradient(135deg, #7c3aed, #3b82f6)',
              borderRadius: 999,
              display: 'flex',
              fontSize: 48,
              height: 100,
              justifyContent: 'center',
              margin: '0 auto 22px',
              width: 100,
            }}
          >
            {completedActivity ? '🔎' : '💪'}
          </div>

          <h1
            style={{
              color: '#172033',
              fontSize: 'clamp(27px, 5vw, 38px)',
              fontWeight: 900,
              margin: 0,
            }}
          >
            {completedActivity
              ? 'Caça concluída!'
              : 'Suas vidas acabaram'}
          </h1>

          <p
            style={{
              color: '#64748b',
              fontSize: 15,
              fontWeight: 700,
              lineHeight: 1.6,
              margin: '12px auto 26px',
              maxWidth: 430,
            }}
          >
            {completedActivity
              ? 'Você encontrou os erros e aprendeu como melhorar esses trechos.'
              : 'Tente novamente para encontrar todos os erros da atividade.'}
          </p>

          <div
            style={{
              display: 'grid',
              gap: 12,
              gridTemplateColumns:
                'repeat(auto-fit, minmax(120px, 1fr))',
              marginBottom: 28,
            }}
          >
            <ResultCard
              icon="✅"
              value={`${correctAnswers}/${errorHuntQuestions.length}`}
              label="Acertos"
            />

            <ResultCard
              icon="⚡"
              value={`${earnedXp} XP`}
              label="Conquistados"
            />

            <ResultCard
              icon="❤️"
              value={String(hearts)}
              label="Vidas restantes"
            />
          </div>

          <button
            type="button"
            onClick={restartActivity}
            style={{
              background:
                'linear-gradient(90deg, #f97316, #ef4444)',
              border: 0,
              borderRadius: 15,
              color: '#ffffff',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 15,
              fontWeight: 900,
              minHeight: 50,
              width: '100%',
            }}
          >
            Tentar novamente
          </button>

          <button
            type="button"
            onClick={() => navigate('missions')}
            style={{
              background: '#f1f5f9',
              border: 0,
              borderRadius: 15,
              color: '#475569',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 14,
              fontWeight: 900,
              marginTop: 10,
              minHeight: 48,
              width: '100%',
            }}
          >
            Voltar para Missões
          </button>
        </main>
      </div>
    )
  }

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
            'linear-gradient(135deg, #ea580c 0%, #f97316 55%, #ef4444 100%)',
          color: '#ffffff',
          padding: '20px clamp(18px, 4vw, 48px) 28px',
        }}
      >
        <div
          style={{
            margin: '0 auto',
            maxWidth: 1100,
            width: '100%',
          }}
        >
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              gap: 14,
              justifyContent: 'space-between',
            }}
          >
            <button
              type="button"
              onClick={() => navigate('missions')}
              aria-label="Voltar para Missões"
              style={{
                alignItems: 'center',
                background: 'rgba(255,255,255,0.18)',
                border: '1px solid rgba(255,255,255,0.22)',
                borderRadius: 13,
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                fontFamily: 'inherit',
                fontSize: 22,
                fontWeight: 900,
                height: 44,
                justifyContent: 'center',
                width: 44,
              }}
            >
              ←
            </button>

            <div style={{ flex: 1 }}>
              <h1
                style={{
                  fontSize: 'clamp(20px, 4vw, 29px)',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                🔍 Caça aos Erros
              </h1>

              <p
                style={{
                  color: 'rgba(255,255,255,0.82)',
                  fontSize: 12,
                  fontWeight: 800,
                  margin: '5px 0 0',
                }}
              >
                Questão {currentIndex + 1} de{' '}
                {errorHuntQuestions.length}
              </p>
            </div>

            <div
              aria-label={`${hearts} vidas restantes`}
              style={{
                alignItems: 'center',
                display: 'flex',
                flexShrink: 0,
                gap: 4,
              }}
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  style={{
                    filter:
                      index < hearts ? 'none' : 'grayscale(1)',
                    fontSize: 'clamp(18px, 3vw, 24px)',
                    opacity: index < hearts ? 1 : 0.28,
                  }}
                >
                  ❤️
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              gap: 14,
              marginTop: 23,
            }}
          >
            <div
              style={{
                background: 'rgba(255,255,255,0.24)',
                borderRadius: 999,
                flex: 1,
                height: 11,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: 999,
                  height: '100%',
                  transition: 'width 300ms ease',
                  width: `${progress}%`,
                }}
              />
            </div>

            <div
              style={{
                background: 'rgba(255,255,255,0.18)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 14,
                fontSize: 13,
                fontWeight: 900,
                minWidth: 75,
                padding: '9px 12px',
                textAlign: 'center',
              }}
            >
              +{earnedXp} XP
            </div>
          </div>
        </div>
      </header>

      <main
        style={{
          margin: '0 auto',
          maxWidth: 1100,
          padding: '30px clamp(17px, 4vw, 48px) 48px',
          width: '100%',
        }}
      >
        <section
          style={{
            background: '#ffffff',
            border: '1px solid #fed7aa',
            borderRadius: 26,
            boxShadow: '0 16px 36px rgba(154, 52, 18, 0.08)',
            padding: 'clamp(23px, 5vw, 42px)',
          }}
        >
          <span
            style={{
              color: '#ea580c',
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: 1,
            }}
          >
            ENCONTRE O PROBLEMA
          </span>

          <h2
            style={{
              color: '#172033',
              fontSize: 'clamp(21px, 4vw, 30px)',
              fontWeight: 900,
              margin: '8px 0 24px',
            }}
          >
            {currentQuestion.instruction}
          </h2>

          <div
            style={{
              background: '#fff7ed',
              border: '1px solid #fed7aa',
              borderRadius: 20,
              color: '#334155',
              fontSize: 'clamp(17px, 3vw, 23px)',
              fontWeight: 800,
              lineHeight: 2,
              padding: '24px clamp(18px, 4vw, 30px)',
            }}
          >
            {currentQuestion.textBefore}

            {currentQuestion.options.map((option, index) => (
              <span key={option.id}>
                <button
                  type="button"
                  disabled={answerState !== 'waiting'}
                  onClick={() =>
                    selectOption(option.id, option.isCorrect)
                  }
                  style={{
                    ...getOptionStyle(
                      option.id,
                      option.isCorrect,
                    ),
                    borderRadius: 10,
                    cursor:
                      answerState === 'waiting'
                        ? 'pointer'
                        : 'default',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    fontWeight: 900,
                    margin: '4px',
                    padding: '3px 10px',
                    transition:
                      'background 160ms ease, border-color 160ms ease',
                  }}
                >
                  {option.text}
                </button>

                {index < currentQuestion.options.length - 1
                  ? ' '
                  : ''}
              </span>
            ))}

            {currentQuestion.textAfter}
          </div>

          <p
            style={{
              color: '#64748b',
              fontSize: 13,
              fontWeight: 700,
              lineHeight: 1.6,
              margin: '18px 0 0',
            }}
          >
            Clique na palavra ou expressão que contém o erro.
          </p>
        </section>

        {answerState !== 'waiting' && (
          <section
            style={{
              background:
                answerState === 'correct'
                  ? '#dcfce7'
                  : '#fee2e2',
              border:
                answerState === 'correct'
                  ? '1px solid #86efac'
                  : '1px solid #fca5a5',
              borderRadius: 22,
              marginTop: 20,
              padding: 21,
            }}
          >
            <div
              style={{
                alignItems: 'flex-start',
                display: 'flex',
                gap: 13,
              }}
            >
              <span style={{ fontSize: 30 }}>
                {answerState === 'correct' ? '✅' : '❌'}
              </span>

              <div style={{ flex: 1 }}>
                <h2
                  style={{
                    color:
                      answerState === 'correct'
                        ? '#166534'
                        : '#991b1b',
                    fontSize: 18,
                    fontWeight: 900,
                    margin: 0,
                  }}
                >
                  {answerState === 'correct'
                    ? `Erro encontrado! +${currentQuestion.xp} XP`
                    : 'Esse trecho não contém o erro'}
                </h2>

                <p
                  style={{
                    color:
                      answerState === 'correct'
                        ? '#166534'
                        : '#991b1b',
                    fontSize: 13,
                    fontWeight: 700,
                    lineHeight: 1.55,
                    margin: '7px 0 0',
                  }}
                >
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>

            <div
              style={{
                background: 'rgba(255,255,255,0.7)',
                borderRadius: 15,
                color: '#334155',
                fontSize: 13,
                fontWeight: 800,
                lineHeight: 1.55,
                marginTop: 16,
                padding: 15,
              }}
            >
              <strong
                style={{
                  color: '#166534',
                  display: 'block',
                  marginBottom: 5,
                }}
              >
                Forma corrigida:
              </strong>

              {currentQuestion.correctedText}
            </div>

            <button
              type="button"
              onClick={continueActivity}
              style={{
                background:
                  answerState === 'correct'
                    ? '#16a34a'
                    : '#dc2626',
                border: 0,
                borderRadius: 14,
                color: '#ffffff',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 14,
                fontWeight: 900,
                marginTop: 17,
                minHeight: 48,
                width: '100%',
              }}
            >
              {currentIndex === errorHuntQuestions.length - 1 ||
              hearts === 0
                ? 'Ver resultado'
                : 'Continuar'}
            </button>
          </section>
        )}
      </main>
    </div>
  )
}

interface ResultCardProps {
  icon: string
  value: string
  label: string
}

function ResultCard({ icon, value, label }: ResultCardProps) {
  return (
    <div
      style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: 18,
        padding: 16,
      }}
    >
      <div style={{ fontSize: 25 }}>{icon}</div>

      <strong
        style={{
          color: '#ea580c',
          display: 'block',
          fontSize: 21,
          fontWeight: 900,
          marginTop: 5,
        }}
      >
        {value}
      </strong>

      <span
        style={{
          color: '#94a3b8',
          fontSize: 11,
          fontWeight: 800,
        }}
      >
        {label}
      </span>
    </div>
  )
}