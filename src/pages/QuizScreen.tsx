import { useState } from 'react'
import type { NavProps } from '../types/navigation'
import MissionComplete from '../components/feedback/MissionComplete'

type Phase = 'question' | 'correct' | 'wrong'

interface Question {
  id: number
  text: string
  blank: string
  options: string[]
  correct: number
  explanation: string
  rule: string
  xp: number
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'A situação econômica do país melhorou significativamente; _____, a desigualdade social ainda é alarmante.',
    blank: '_____',
    options: ['portanto', 'entretanto', 'além disso', 'visto que'],
    correct: 1,
    explanation: '"Entretanto" é um conectivo adversativo que indica contraste entre ideias. A segunda oração contrapõe a melhora econômica com a persistência da desigualdade.',
    rule: 'Conectivos adversativos: entretanto, contudo, porém, todavia, no entanto.',
    xp: 80,
  },
  {
    id: 2,
    text: 'O avanço tecnológico trouxe inúmeros benefícios; _____, gerou novos problemas de saúde mental.',
    blank: '_____',
    options: ['por isso', 'ademais', 'todavia', 'visto que'],
    correct: 2,
    explanation: '"Todavia" indica contraste, opondo benefícios e malefícios da tecnologia. Conectivo adversativo de registro formal.',
    rule: 'Conectivos adversativos formais: todavia, contudo, entretanto, no entanto.',
    xp: 80,
  },
  {
    id: 3,
    text: 'A educação é o alicerce de uma sociedade justa; _____, deve ser prioridade máxima do Estado.',
    blank: '_____',
    options: ['entretanto', 'no entanto', 'portanto', 'embora'],
    correct: 2,
    explanation: '"Portanto" é um conectivo conclusivo — introduz uma conclusão baseada no que foi dito antes: se a educação é alicerce, então deve ser prioridade.',
    rule: 'Conectivos conclusivos: portanto, logo, assim, por conseguinte, dessa forma.',
    xp: 80,
  },
  {
    id: 4,
    text: 'O jovem estudou muito; _____, não conseguiu a aprovação esperada.',
    blank: '_____',
    options: ['portanto', 'logo', 'contudo', 'assim'],
    correct: 2,
    explanation: '"Contudo" introduz uma ideia contrária à esperada: mesmo estudando muito, o resultado foi negativo. Conectivo adversativo de alta formalidade.',
    rule: 'Conectivos adversativos: contudo, entretanto, todavia, porém, mas.',
    xp: 80,
  },
  {
    id: 5,
    text: 'A violência cresce nas cidades; _____, o investimento em segurança pública é insuficiente.',
    blank: '_____',
    options: ['assim sendo', 'além disso', 'todavia', 'consequentemente'],
    correct: 1,
    explanation: '"Além disso" é um conectivo aditivo que adiciona uma nova informação ao argumento anterior, agravando a situação descrita.',
    rule: 'Conectivos aditivos: além disso, ademais, também, ainda, outrossim.',
    xp: 100,
  },
]

export default function QuizScreen({ navigate, events }: NavProps) {
  const [phase, setPhase] = useState<Phase>('question')
  const [selected, setSelected] = useState<number | null>(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [xpTotal, setXpTotal] = useState(0)
  const [lives, setLives] = useState(5)
  const [streak, setStreak] = useState(0)
  const [showComplete, setShowComplete] = useState(false)
  const [answered, setAnswered] = useState(false)

  const q = QUESTIONS[questionIndex]
  const isLast = questionIndex === QUESTIONS.length - 1

  const handleAnswer = (idx: number) => {
    if (phase !== 'question' || answered) return
    setSelected(idx)
    setAnswered(true)
    if (idx === q.correct) {
      setPhase('correct')
      const bonus = streak >= 2 ? Math.round(q.xp * 1.5) : q.xp
      setXpTotal((x) => x + bonus)
      setStreak((s) => s + 1)
      events.triggerXP(bonus, 155, 220)

      if (streak + 1 === 3) {
        setTimeout(() => events.triggerAchievement({ icon: '🔥', title: 'Combo x3!', xp: 50 }), 800)
      }
      if (questionIndex === QUESTIONS.length - 1) {
        setTimeout(() => setShowComplete(true), 1400)
      }
    } else {
      setPhase('wrong')
      setLives((l) => Math.max(0, l - 1))
      setStreak(0)
    }
  }

  const handleNext = () => {
    if (isLast) {
      setShowComplete(true)
      return
    }
    setPhase('question')
    setSelected(null)
    setAnswered(false)
    setQuestionIndex((i) => i + 1)
  }

  const parts = q.text.split(q.blank)
  const progress = ((questionIndex) / QUESTIONS.length) * 100

  return (
    <div style={{ fontFamily: 'Nunito, sans-serif', minHeight: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Mission complete overlay */}
      <MissionComplete
        visible={showComplete}
        xp={xpTotal}
        missionName="Escolha o Conectivo Correto"
        onClose={() => { setShowComplete(false); navigate('correction') }}
        onNext={() => { setShowComplete(false); navigate('missions') }}
      />

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #22C55E 0%, #16a34a 100%)', padding: '8px 20px 24px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <button
            onClick={() => navigate('missions')}
            style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 10, color: 'white', fontSize: 14, fontWeight: 800, padding: '5px 10px', cursor: 'pointer', fontFamily: 'Nunito' }}
          >
            ←
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 900, color: 'white' }}>🔗 Escolha o Conectivo</div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, fontWeight: 600 }}>
              {questionIndex + 1} de {QUESTIONS.length} · Nível Fácil
            </div>
          </div>
          {/* Lives */}
          <div style={{ display: 'flex', gap: 3 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                style={{
                  fontSize: 16,
                  filter: i <= lives ? 'none' : 'grayscale(1) opacity(0.3)',
                  transition: 'filter 0.3s',
                }}
              >
                ❤️
              </span>
            ))}
          </div>
        </div>

        {/* Progress bar + stats */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <div style={{ height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.25)', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'white',
                  borderRadius: 5,
                  transition: 'width 0.5s ease',
                  boxShadow: '0 0 8px rgba(255,255,255,0.6)',
                }}
              />
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '5px 10px', textAlign: 'center', minWidth: 52 }}>
            <div style={{ fontSize: 15, fontWeight: 900, color: 'white' }}>+{xpTotal}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>XP</div>
          </div>
          {streak >= 2 && (
            <div
              style={{
                background: 'linear-gradient(135deg, #F97316, #EF4444)',
                borderRadius: 12,
                padding: '5px 10px',
                textAlign: 'center',
                animation: 'streakBounce 0.5s ease-out',
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 900, color: 'white' }}>{streak}🔥</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.8)', fontWeight: 700 }}>COMBO</div>
            </div>
          )}
        </div>
      </div>

      <div style={{ flex: 1, padding: '20px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Question card */}
        <div
          style={{
            background: 'white',
            borderRadius: 22,
            padding: '22px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.09)',
            border: phase === 'correct'
              ? '2px solid #22C55E'
              : phase === 'wrong'
              ? '2px solid #EF4444'
              : '2px solid transparent',
            transition: 'border-color 0.3s',
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: '#94a3b8',
              letterSpacing: '0.1em',
              marginBottom: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: 3, background: '#22C55E' }} />
            COMPLETE A FRASE
          </div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: '#1e293b',
              lineHeight: 1.9,
              fontFamily: 'Inter',
            }}
          >
            {parts[0]}
            <span
              style={{
                display: 'inline-block',
                background: selected !== null
                  ? (selected === q.correct ? '#DCFCE7' : '#FEE2E2')
                  : '#EDE9FE',
                color: selected !== null
                  ? (selected === q.correct ? '#166534' : '#991b1b')
                  : '#7C3AED',
                borderRadius: 10,
                padding: '3px 14px',
                fontWeight: 900,
                fontSize: 14,
                marginInline: 5,
                border: `1.5px solid ${selected !== null ? (selected === q.correct ? '#22C55E' : '#EF4444') : '#7C3AED'}`,
                transition: 'all 0.3s',
              }}
            >
              {selected !== null ? q.options[selected] : '_ _ _ _ _'}
            </span>
            {parts[1]}
          </div>
        </div>

        {/* Options grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {q.options.map((opt, idx) => {
            let bg = 'white'
            let border = '2px solid #e2e8f0'
            let color = '#1e293b'
            let shadow = '0 2px 8px rgba(0,0,0,0.06)'
            let transform = 'scale(1)'
            let emoji = ''

            if (selected !== null) {
              if (idx === q.correct) {
                bg = '#DCFCE7'
                border = '2px solid #22C55E'
                color = '#166534'
                emoji = ' ✓'
                shadow = '0 4px 16px rgba(34,197,94,0.25)'
              } else if (idx === selected && selected !== q.correct) {
                bg = '#FEE2E2'
                border = '2px solid #EF4444'
                color = '#991b1b'
                emoji = ' ✗'
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                style={{
                  background: bg,
                  border,
                  borderRadius: 16,
                  padding: '17px 12px',
                  fontSize: 14,
                  fontWeight: 800,
                  color,
                  cursor: selected === null ? 'pointer' : 'default',
                  fontFamily: 'Nunito',
                  transition: 'all 0.25s',
                  textAlign: 'center',
                  boxShadow: shadow,
                  transform,
                }}
              >
                {opt}{emoji}
              </button>
            )
          })}
        </div>

        {/* Feedback panel */}
        {phase !== 'question' && (
          <div
            style={{
              background: phase === 'correct' ? '#DCFCE7' : '#FEE2E2',
              border: `2px solid ${phase === 'correct' ? '#22C55E' : '#EF4444'}`,
              borderRadius: 18,
              padding: '18px',
              animation: 'slideInUp 0.3s ease-out',
            }}
          >
            <div
              style={{
                fontSize: 17,
                fontWeight: 900,
                color: phase === 'correct' ? '#166534' : '#991b1b',
                marginBottom: 10,
              }}
            >
              {phase === 'correct'
                ? `🎉 ${streak >= 2 ? `Combo x${streak}! ` : ''}Correto! +${streak >= 2 ? Math.round(q.xp * 1.5) : q.xp} XP`
                : '❌ Não desta vez!'}
            </div>
            <div style={{ fontWeight: 800, fontSize: 12, color: phase === 'correct' ? '#166534' : '#991b1b', marginBottom: 6 }}>
              📚 Explicação:
            </div>
            <div style={{ fontSize: 13, color: phase === 'correct' ? '#166534' : '#991b1b', fontWeight: 600, lineHeight: 1.6, marginBottom: 10 }}>
              {q.explanation}
            </div>
            <div
              style={{
                background: 'rgba(255,255,255,0.6)',
                borderRadius: 10,
                padding: '9px 12px',
                fontSize: 12,
                fontWeight: 700,
                color: phase === 'correct' ? '#166534' : '#991b1b',
                borderLeft: `3px solid ${phase === 'correct' ? '#22C55E' : '#EF4444'}`,
              }}
            >
              📌 {q.rule}
            </div>
          </div>
        )}

        {/* Next button */}
        {phase !== 'question' && (
          <button
            onClick={handleNext}
            style={{
              width: '100%',
              background: phase === 'correct'
                ? 'linear-gradient(135deg, #22C55E, #16a34a)'
                : 'linear-gradient(135deg, #3B82F6, #7C3AED)',
              color: 'white',
              border: 'none',
              borderRadius: 16,
              padding: '18px',
              fontSize: 16,
              fontWeight: 900,
              cursor: 'pointer',
              boxShadow: phase === 'correct'
                ? '0 6px 24px rgba(34,197,94,0.45)'
                : '0 6px 24px rgba(59,130,246,0.4)',
              fontFamily: 'Nunito',
              animation: 'slideInUp 0.35s ease-out',
            }}
          >
            {isLast ? '🏁 Finalizar Missão 🎉' : `→ Pergunta ${questionIndex + 2} de ${QUESTIONS.length}`}
          </button>
        )}
      </div>
    </div>
  )
}
