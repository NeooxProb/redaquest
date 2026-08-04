import { useState } from 'react'
import type { NavProps } from '../types/navigation'

interface Word {
  id: number
  text: string
  isError: boolean
  errorType: string
  errorExplanation: string
}

const PARAGRAPH_WORDS: Word[] = [
  { id: 1, text: 'O', isError: false, errorType: '', errorExplanation: '' },
  { id: 2, text: 'Brasil', isError: false, errorType: '', errorExplanation: '' },
  { id: 3, text: 'enfrenta', isError: false, errorType: '', errorExplanation: '' },
  { id: 4, text: 'sérios', isError: false, errorType: '', errorExplanation: '' },
  { id: 5, text: 'problemas', isError: false, errorType: '', errorExplanation: '' },
  { id: 6, text: 'de', isError: false, errorType: '', errorExplanation: '' },
  { id: 7, text: 'educação,', isError: false, errorType: '', errorExplanation: '' },
  { id: 8, text: 'sendo', isError: false, errorType: '', errorExplanation: '' },
  { id: 9, text: 'que', isError: false, errorType: '', errorExplanation: '' },
  { id: 10, text: 'muitos', isError: false, errorType: '', errorExplanation: '' },
  { id: 11, text: 'alunos', isError: false, errorType: '', errorExplanation: '' },
  { id: 12, text: 'abandonam', isError: false, errorType: '', errorExplanation: '' },
  { id: 13, text: 'a', isError: false, errorType: '', errorExplanation: '' },
  { id: 14, text: 'escola', isError: false, errorType: '', errorExplanation: '' },
  { id: 15, text: 'precocemente.', isError: false, errorType: '', errorExplanation: '' },
  { id: 16, text: 'Isso', isError: false, errorType: '', errorExplanation: '' },
  { id: 17, text: 'se', isError: false, errorType: '', errorExplanation: '' },
  { id: 18, text: 'deve', isError: false, errorType: '', errorExplanation: '' },
  { id: 19, text: 'a', isError: false, errorType: '', errorExplanation: '' },
  { id: 20, text: 'fatores', isError: false, errorType: '', errorExplanation: '' },
  { id: 21, text: 'diverso', isError: true, errorType: 'Concordância', errorExplanation: 'O adjetivo "diverso" deve concordar com o substantivo "fatores" (masculino plural): "diversos".' },
  { id: 22, text: 'como', isError: false, errorType: '', errorExplanation: '' },
  { id: 23, text: 'a', isError: false, errorType: '', errorExplanation: '' },
  { id: 24, text: 'pobreza', isError: false, errorType: '', errorExplanation: '' },
  { id: 25, text: 'e', isError: false, errorType: '', errorExplanation: '' },
  { id: 26, text: 'a', isError: false, errorType: '', errorExplanation: '' },
  { id: 27, text: 'necessidade', isError: false, errorType: '', errorExplanation: '' },
  { id: 28, text: 'de', isError: false, errorType: '', errorExplanation: '' },
  { id: 29, text: 'trabalhar', isError: false, errorType: '', errorExplanation: '' },
  { id: 30, text: 'cedo.', isError: false, errorType: '', errorExplanation: '' },
  { id: 31, text: 'Portanto,', isError: false, errorType: '', errorExplanation: '' },
  { id: 32, text: 'é', isError: false, errorType: '', errorExplanation: '' },
  { id: 33, text: 'essencial', isError: false, errorType: '', errorExplanation: '' },
  { id: 34, text: 'que', isError: false, errorType: '', errorExplanation: '' },
  { id: 35, text: 'o', isError: false, errorType: '', errorExplanation: '' },
  { id: 36, text: 'governo', isError: false, errorType: '', errorExplanation: '' },
  { id: 37, text: 'invista', isError: false, errorType: '', errorExplanation: '' },
  { id: 38, text: 'em', isError: false, errorType: '', errorExplanation: '' },
  { id: 39, text: 'politicas', isError: true, errorType: 'Acentuação', errorExplanation: 'A palavra "políticas" é paroxítona terminada em ditongo crescente, portanto deve ser acentuada: "políticas".' },
  { id: 40, text: 'publicas', isError: true, errorType: 'Acentuação', errorExplanation: 'A palavra "públicas" é proparoxítona, sempre acentuada: "públicas".' },
  { id: 41, text: 'que', isError: false, errorType: '', errorExplanation: '' },
  { id: 42, text: 'garantam', isError: false, errorType: '', errorExplanation: '' },
  { id: 43, text: 'a', isError: false, errorType: '', errorExplanation: '' },
  { id: 44, text: 'permanencia', isError: true, errorType: 'Acentuação', errorExplanation: 'A palavra "permanência" possui ditongo decrescente "ei" na penúltima sílaba, portanto é acentuada: "permanência".' },
  { id: 45, text: 'dos', isError: false, errorType: '', errorExplanation: '' },
  { id: 46, text: 'estudantes', isError: false, errorType: '', errorExplanation: '' },
  { id: 47, text: 'nas', isError: false, errorType: '', errorExplanation: '' },
  { id: 48, text: 'escolas.', isError: false, errorType: '', errorExplanation: '' },
]

const ERRORS = PARAGRAPH_WORDS.filter((w) => w.isError)

type Phase = 'hunting' | 'results'

export default function ErrorHuntScreen({ navigate, events }: NavProps) {
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [phase, setPhase] = useState<Phase>('hunting')
  const [expandedError, setExpandedError] = useState<number | null>(null)

  const toggle = (id: number) => {
    if (phase !== 'hunting') return
    setSelected((prev) => {
      const n = new Set(prev)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })
  }

  const correctHits = [...selected].filter((id) => PARAGRAPH_WORDS.find((w) => w.id === id)?.isError).length
  const falsePositives = [...selected].filter((id) => !PARAGRAPH_WORDS.find((w) => w.id === id)?.isError).length
  const totalErrors = ERRORS.length
  const xpEarned = Math.max(0, correctHits * 40 - falsePositives * 10)

  return (
    <div style={{ fontFamily: 'Nunito, sans-serif', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #F97316 0%, #EF4444 100%)', padding: '8px 20px 24px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <button
            onClick={() => navigate('missions')}
            style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 10, color: 'white', fontSize: 14, fontWeight: 800, padding: '5px 10px', cursor: 'pointer', fontFamily: 'Nunito' }}
          >
            ←
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 900, color: 'white' }}>🔍 Caça aos Erros</div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, fontWeight: 600 }}>Toque nas palavras com erro</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '6px 12px', textAlign: 'center' }}>
            <div style={{ color: 'white', fontSize: 16, fontWeight: 900 }}>{selected.size}</div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 9, fontWeight: 700 }}>MARCADAS</div>
          </div>
        </div>

        {/* Instructions */}
        {phase === 'hunting' && (
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '10px 14px', fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
            💡 Encontre os {totalErrors} erros gramaticais e de acentuação escondidos no texto
          </div>
        )}
      </div>

      <div style={{ flex: 1, padding: '20px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Text */}
        <div
          style={{
            background: 'white',
            borderRadius: 18,
            padding: '20px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 800, color: '#94a3b8', marginBottom: 12, letterSpacing: '0.06em' }}>
            ENCONTRE OS ERROS:
          </div>
          <div style={{ lineHeight: 2.2, fontSize: 15, color: '#1e293b', fontFamily: 'Inter', fontWeight: 400 }}>
            {PARAGRAPH_WORDS.map((word) => {
              const isSelected = selected.has(word.id)
              const showResult = phase === 'results'

              let bg = 'transparent'
              let color = '#1e293b'
              let border = 'none'
              let decoration = 'none'

              if (showResult) {
                if (word.isError && isSelected) {
                  bg = '#DCFCE7'
                  color = '#166534'
                  border = '1.5px solid #22C55E'
                } else if (word.isError && !isSelected) {
                  bg = '#FEF3C7'
                  color = '#92400e'
                  border = '1.5px solid #F59E0B'
                  decoration = 'underline'
                } else if (!word.isError && isSelected) {
                  bg = '#FEE2E2'
                  color = '#991b1b'
                  border = '1.5px solid #EF4444'
                }
              } else if (isSelected) {
                bg = '#EDE9FE'
                color = '#5b21b6'
                border = '1.5px solid #7C3AED'
              }

              return (
                <span key={word.id} style={{ display: 'inline' }}>
                  <span
                    onClick={() => toggle(word.id)}
                    style={{
                      display: 'inline-block',
                      background: bg,
                      color,
                      border,
                      borderRadius: 6,
                      padding: '1px 4px',
                      margin: '0 2px',
                      cursor: phase === 'hunting' ? 'pointer' : 'default',
                      textDecoration: decoration,
                      transition: 'all 0.15s',
                      fontWeight: isSelected || (showResult && word.isError) ? 700 : 400,
                    }}
                  >
                    {word.text}
                  </span>
                </span>
              )
            })}
          </div>
        </div>

        {/* Results panel */}
        {phase === 'results' && (
          <div style={{ background: 'white', borderRadius: 18, padding: '18px', boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
              {[
                { label: 'Acertos', value: correctHits, color: '#22C55E', bg: '#DCFCE7', total: totalErrors },
                { label: 'Erros', value: falsePositives, color: '#EF4444', bg: '#FEE2E2', total: selected.size - correctHits },
                { label: 'XP Ganho', value: xpEarned, color: '#7C3AED', bg: '#EDE9FE', total: null },
              ].map((s) => (
                <div key={s.label} style={{ flex: 1, background: s.bg, borderRadius: 14, padding: '12px 8px', textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: s.color }}>
                    {s.value}{s.total !== null ? `/${s.total}` : ''}
                  </div>
                  <div style={{ fontSize: 10, color: s.color, fontWeight: 800 }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ fontWeight: 900, fontSize: 14, color: '#1e293b', marginBottom: 10 }}>
              📚 Explicações dos erros:
            </div>
            {ERRORS.map((e) => (
              <div
                key={e.id}
                style={{
                  background: '#f8fafc',
                  borderRadius: 12,
                  marginBottom: 8,
                  overflow: 'hidden',
                  border: '1.5px solid #e2e8f0',
                }}
              >
                <div
                  onClick={() => setExpandedError(expandedError === e.id ? null : e.id)}
                  style={{
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      background: selected.has(e.id) ? '#DCFCE7' : '#FEE2E2',
                      color: selected.has(e.id) ? '#166534' : '#991b1b',
                      borderRadius: 8,
                      padding: '3px 10px',
                      fontSize: 13,
                      fontWeight: 800,
                    }}
                  >
                    "{e.text}"
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: '#F97316' }}>{e.errorType}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>
                      {selected.has(e.id) ? '✓ Você encontrou!' : '✗ Você não marcou'}
                    </div>
                  </div>
                  <span style={{ color: '#94a3b8', fontSize: 12 }}>{expandedError === e.id ? '▲' : '▼'}</span>
                </div>
                {expandedError === e.id && (
                  <div style={{ padding: '0 14px 12px', fontSize: 13, color: '#475569', fontWeight: 600, lineHeight: 1.6, borderTop: '1px solid #e2e8f0' }}>
                    <div style={{ paddingTop: 10 }}>{e.errorExplanation}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Action button */}
        {phase === 'hunting' ? (
          <button
            onClick={() => { setPhase('results'); events.triggerXP(xpEarned, 150, 700) }}
            disabled={selected.size === 0}
            style={{
              width: '100%',
              background: selected.size > 0 ? 'linear-gradient(135deg, #F97316, #EF4444)' : '#e2e8f0',
              color: selected.size > 0 ? 'white' : '#94a3b8',
              border: 'none',
              borderRadius: 16,
              padding: '18px',
              fontSize: 16,
              fontWeight: 900,
              cursor: selected.size > 0 ? 'pointer' : 'not-allowed',
              boxShadow: selected.size > 0 ? '0 6px 20px rgba(249,115,22,0.4)' : 'none',
              fontFamily: 'Nunito',
            }}
          >
            🔍 Verificar Erros ({selected.size} marcados)
          </button>
        ) : (
          <button
            onClick={() => { if (correctHits === totalErrors) events.triggerAchievement({ icon: '🔍', title: 'Olho de Águia!', xp: 100 }); navigate('missions') }}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
              color: 'white',
              border: 'none',
              borderRadius: 16,
              padding: '18px',
              fontSize: 16,
              fontWeight: 900,
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(124,58,237,0.4)',
              fontFamily: 'Nunito',
            }}
          >
            🏆 Próxima Missão → +{xpEarned} XP
          </button>
        )}
      </div>
    </div>
  )
}
