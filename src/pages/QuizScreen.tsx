import { useState } from 'react'
import type { CSSProperties } from 'react'
import { quizQuestions } from '../data/quizQuestions'
import type { QuizPhase } from '../types/quiz'
import type { NavProps } from '../types/navigation'

export default function QuizScreen({ navigate }: NavProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(
    null,
  )
  const [phase, setPhase] = useState<QuizPhase>('question')
  const [hearts, setHearts] = useState(5)
  const [earnedXp, setEarnedXp] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [finished, setFinished] = useState(false)

  const currentQuestion = quizQuestions[currentIndex]
  const sentenceParts = currentQuestion.text.split('{{blank}}')

  const progress = Math.round(
    ((currentIndex + 1) / quizQuestions.length) * 100,
  )

  function selectAnswer(optionIndex: number) {
    if (phase !== 'question') {
      return
    }

    setSelectedOption(optionIndex)

    if (optionIndex === currentQuestion.correct) {
      setPhase('correct')
      setEarnedXp((currentXp) => currentXp + currentQuestion.xp)
      setCorrectAnswers((currentTotal) => currentTotal + 1)
      return
    }

    setPhase('wrong')
    setHearts((currentHearts) =>
      Math.max(currentHearts - 1, 0),
    )
  }

  function continueMission() {
    const isLastQuestion =
      currentIndex === quizQuestions.length - 1

    if (isLastQuestion || hearts === 0) {
      setFinished(true)
      return
    }

    setCurrentIndex((currentQuestionIndex) => currentQuestionIndex + 1)
    setSelectedOption(null)
    setPhase('question')
  }

  function restartMission() {
    setCurrentIndex(0)
    setSelectedOption(null)
    setPhase('question')
    setHearts(5)
    setEarnedXp(0)
    setCorrectAnswers(0)
    setFinished(false)
  }

  function getOptionStyle(optionIndex: number): CSSProperties {
    const isSelected = selectedOption === optionIndex
    const isCorrectOption = optionIndex === currentQuestion.correct

    if (phase === 'correct' && isSelected) {
      return {
        background: '#dcfce7',
        border: '2px solid #22c55e',
        color: '#166534',
        boxShadow: '0 8px 20px rgba(34, 197, 94, 0.15)',
      }
    }

    if (phase === 'wrong' && isSelected) {
      return {
        background: '#fee2e2',
        border: '2px solid #ef4444',
        color: '#991b1b',
        boxShadow: '0 8px 20px rgba(239, 68, 68, 0.14)',
      }
    }

    if (phase === 'wrong' && isCorrectOption) {
      return {
        background: '#dcfce7',
        border: '2px solid #22c55e',
        color: '#166534',
      }
    }

    return {
      background: '#ffffff',
      border: isSelected
        ? '2px solid #7c3aed'
        : '2px solid #e2e8f0',
      color: '#1e293b',
      boxShadow: '0 7px 18px rgba(15, 23, 42, 0.06)',
    }
  }

  if (finished) {
    const completedAllQuestions =
      currentIndex === quizQuestions.length - 1 && hearts > 0

    return (
      <div
        style={{
          alignItems: 'center',
          background:
            'linear-gradient(145deg, #eef2ff 0%, #f8fafc 55%, #ecfdf5 100%)',
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
            maxWidth: 560,
            padding: '38px clamp(24px, 5vw, 48px)',
            textAlign: 'center',
            width: '100%',
          }}
        >
          <div
            style={{
              alignItems: 'center',
              background: completedAllQuestions
                ? 'linear-gradient(135deg, #facc15, #f97316)'
                : 'linear-gradient(135deg, #7c3aed, #3b82f6)',
              borderRadius: 999,
              boxShadow: '0 14px 30px rgba(124, 58, 237, 0.2)',
              display: 'flex',
              fontSize: 48,
              height: 100,
              justifyContent: 'center',
              margin: '0 auto 22px',
              width: 100,
            }}
          >
            {completedAllQuestions ? '🏆' : '💪'}
          </div>

          <h1
            style={{
              color: '#172033',
              fontSize: 'clamp(27px, 5vw, 38px)',
              fontWeight: 900,
              margin: 0,
            }}
          >
            {completedAllQuestions
              ? 'Missão concluída!'
              : 'Continue treinando!'}
          </h1>

          <p
            style={{
              color: '#64748b',
              fontSize: 15,
              fontWeight: 700,
              lineHeight: 1.6,
              margin: '12px auto 26px',
              maxWidth: 410,
            }}
          >
            {completedAllQuestions
              ? 'Você terminou o desafio de conectivos e conquistou novas recompensas.'
              : 'Suas vidas acabaram, mas você pode tentar novamente e melhorar seu resultado.'}
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
              value={`${correctAnswers}/${quizQuestions.length}`}
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
            onClick={restartMission}
            style={{
              background:
                'linear-gradient(90deg, #7c3aed, #3b82f6)',
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
        background: '#eef2ff',
        fontFamily: 'Nunito, sans-serif',
        minHeight: '100%',
        width: '100%',
      }}
    >
      <header
        style={{
          background:
            'linear-gradient(135deg, #16a34a 0%, #22c55e 55%, #10b981 100%)',
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
                background: 'rgba(255, 255, 255, 0.18)',
                border: '1px solid rgba(255, 255, 255, 0.22)',
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
                🔗 Escolha o Conectivo
              </h1>

              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: 12,
                  fontWeight: 800,
                  margin: '5px 0 0',
                }}
              >
                {currentIndex + 1} de {quizQuestions.length} · Nível
                fácil
              </p>
            </div>

            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                flexShrink: 0,
                gap: 4,
              }}
              aria-label={`${hearts} vidas restantes`}
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  style={{
                    filter:
                      index < hearts
                        ? 'none'
                        : 'grayscale(1)',
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
                background: 'rgba(255, 255, 255, 0.24)',
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
                background: 'rgba(255, 255, 255, 0.18)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 14,
                fontSize: 13,
                fontWeight: 900,
                minWidth: 73,
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
            border: '1px solid #e2e8f0',
            borderRadius: 26,
            boxShadow: '0 16px 36px rgba(15, 23, 42, 0.08)',
            padding: 'clamp(23px, 5vw, 42px)',
          }}
        >
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              gap: 8,
              marginBottom: 22,
            }}
          >
            <span
              style={{
                background: '#dcfce7',
                borderRadius: 999,
                height: 8,
                width: 8,
              }}
            />

            <span
              style={{
                color: '#94a3b8',
                fontSize: 12,
                fontWeight: 900,
                letterSpacing: 1,
              }}
            >
              COMPLETE A FRASE
            </span>
          </div>

          <p
            style={{
              color: '#263248',
              fontSize: 'clamp(18px, 3vw, 25px)',
              fontWeight: 800,
              lineHeight: 1.85,
              margin: 0,
            }}
          >
            {sentenceParts[0]}

            <span
              style={{
                background:
                  phase === 'correct'
                    ? '#dcfce7'
                    : phase === 'wrong'
                      ? '#fee2e2'
                      : '#ede9fe',
                border:
                  phase === 'correct'
                    ? '2px solid #22c55e'
                    : phase === 'wrong'
                      ? '2px solid #ef4444'
                      : '2px solid #8b5cf6',
                borderRadius: 10,
                color:
                  phase === 'correct'
                    ? '#166534'
                    : phase === 'wrong'
                      ? '#991b1b'
                      : '#6d28d9',
                display: 'inline-block',
                margin: '0 7px',
                minWidth: 120,
                padding: '1px 12px',
                textAlign: 'center',
              }}
            >
              {selectedOption === null
                ? currentQuestion.blank
                : currentQuestion.options[selectedOption]}
            </span>

            {sentenceParts[1]}
          </p>
        </section>

        <section
          style={{
            display: 'grid',
            gap: 13,
            gridTemplateColumns:
              'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
            marginTop: 18,
          }}
        >
          {currentQuestion.options.map((option, optionIndex) => (
            <button
              key={option}
              type="button"
              disabled={phase !== 'question'}
              onClick={() => selectAnswer(optionIndex)}
              style={{
                ...getOptionStyle(optionIndex),
                borderRadius: 17,
                cursor:
                  phase === 'question'
                    ? 'pointer'
                    : 'default',
                fontFamily: 'inherit',
                fontSize: 15,
                fontWeight: 900,
                minHeight: 62,
                padding: '14px 18px',
                transition:
                  'transform 160ms ease, border-color 160ms ease',
              }}
            >
              {option}
            </button>
          ))}
        </section>

        {phase !== 'question' && (
          <section
            style={{
              background:
                phase === 'correct' ? '#dcfce7' : '#fee2e2',
              border:
                phase === 'correct'
                  ? '1px solid #86efac'
                  : '1px solid #fca5a5',
              borderRadius: 22,
              marginTop: 20,
              padding: 20,
            }}
          >
            <div
              style={{
                alignItems: 'flex-start',
                display: 'flex',
                gap: 13,
              }}
            >
              <span style={{ fontSize: 29 }}>
                {phase === 'correct' ? '✅' : '❌'}
              </span>

              <div style={{ flex: 1 }}>
                <h2
                  style={{
                    color:
                      phase === 'correct'
                        ? '#166534'
                        : '#991b1b',
                    fontSize: 18,
                    fontWeight: 900,
                    margin: 0,
                  }}
                >
                  {phase === 'correct'
                    ? `Correto! +${currentQuestion.xp} XP`
                    : 'Essa não é a melhor opção'}
                </h2>

                <p
                  style={{
                    color:
                      phase === 'correct'
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

                <p
                  style={{
                    color: '#475569',
                    fontSize: 12,
                    fontWeight: 800,
                    lineHeight: 1.5,
                    margin: '10px 0 0',
                  }}
                >
                  💡 {currentQuestion.rule}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={continueMission}
              style={{
                background:
                  phase === 'correct' ? '#16a34a' : '#dc2626',
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
              {currentIndex === quizQuestions.length - 1 ||
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
          color: '#7c3aed',
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