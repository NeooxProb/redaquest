import { useState, useRef } from 'react'
import type { NavProps } from '../App'

const COMPETENCIES = [
  { label: 'C1', title: 'Domínio da Língua', color: '#3B82F6', value: 0.9 },
  { label: 'C2', title: 'Compreensão do Tema', color: '#7C3AED', value: 0.8 },
  { label: 'C3', title: 'Argumentação', color: '#22C55E', value: 0.7 },
  { label: 'C4', title: 'Coesão', color: '#F97316', value: 0.9 },
  { label: 'C5', title: 'Proposta', color: '#EF4444', value: 0.6 },
]

const TEMPLATE = `A violência doméstica representa um dos maiores desafios enfrentados pela sociedade brasileira na contemporaneidade. Esse fenômeno, que afeta milhões de mulheres em todo o país, transcende questões individuais e revela estruturas sociais profundamente enraizadas.

De acordo com o IBGE, uma mulher é agredida a cada 4 minutos no Brasil, evidenciando a urgência de medidas efetivas. Conforme Zygmunt Bauman, as relações líquidas da modernidade tornam os vínculos afetivos mais instáveis, potencializando conflitos domésticos. Entretanto, a violência de gênero possui raízes históricas muito anteriores à modernidade.

A Constituição Federal de 1988, em seu artigo 5°, garante igualdade entre homens e mulheres. Ademais, a Lei Maria da Penha (2006) representa avanço significativo na proteção das vítimas. Contudo, a aplicação dessas leis ainda enfrenta barreiras culturais e institucionais.

Portanto, para que o Estado brasileiro enfrente efetivamente a violência doméstica, é necessário que o Ministério da Educação implemente programas de educação para igualdade de gênero nas escolas públicas, por meio de currículos obrigatórios, com o objetivo de desconstruir estereótipos e promover relações mais saudáveis, respeitando a dignidade humana prevista na Constituição.`

export default function WriteScreen({ navigate, events }: NavProps) {
  const [text, setText] = useState(TEMPLATE)
  const [time, setTime] = useState(1847) // seconds elapsed
  const [isRunning] = useState(true)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const words = text.trim().split(/\s+/).filter(Boolean).length
  const lines = text.split('\n').filter(Boolean).length
  const chars = text.length
  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const competencyScores = COMPETENCIES.map((c) => ({
    ...c,
    derived: Math.min(200, Math.round(c.value * (words / 300) * 200)),
  }))

  return (
    <div style={{ fontFamily: 'Nunito, sans-serif', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)', padding: '8px 20px 20px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <button
            onClick={() => navigate('home')}
            style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 10, color: 'white', fontSize: 14, fontWeight: 800, padding: '5px 10px', cursor: 'pointer', fontFamily: 'Nunito' }}
          >
            ←
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: 'white' }}>✍️ Escrever Redação</div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, fontWeight: 600 }}>
              Tema: Violência doméstica no Brasil
            </div>
          </div>
          {/* Timer */}
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '6px 10px', textAlign: 'center' }}>
            <div style={{ color: 'white', fontSize: 16, fontWeight: 900, fontFamily: 'Inter' }}>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 9, fontWeight: 700 }}>TEMPO</div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 10 }}>
          {[
            { label: 'Palavras', value: words, target: 300, color: words >= 250 ? '#22C55E' : '#FCD34D' },
            { label: 'Linhas', value: lines, target: 30, color: lines >= 20 ? '#22C55E' : '#FCD34D' },
            { label: 'Caracteres', value: chars, target: 2000, color: chars >= 1800 ? '#22C55E' : '#FCD34D' },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.15)',
                borderRadius: 12,
                padding: '8px 10px',
                textAlign: 'center',
              }}
            >
              <div style={{ color: s.color, fontSize: 16, fontWeight: 900 }}>{s.value}</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 9, fontWeight: 700 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Competency preview bars */}
      <div
        style={{
          background: 'white',
          padding: '12px 20px',
          borderBottom: '1px solid #f1f5f9',
          flexShrink: 0,
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', marginBottom: 8, letterSpacing: '0.06em' }}>
          ESTIMATIVA DE COMPETÊNCIAS
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {COMPETENCIES.map((c) => (
            <div key={c.label} style={{ flex: 1 }}>
              <div
                style={{
                  height: 5,
                  borderRadius: 3,
                  background: '#f1f5f9',
                  overflow: 'hidden',
                  marginBottom: 3,
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${c.value * 100}%`,
                    background: c.color,
                    borderRadius: 3,
                  }}
                />
              </div>
              <div style={{ textAlign: 'center', fontSize: 9, fontWeight: 800, color: c.color }}>
                {c.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Textarea */}
      <div style={{ flex: 1, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Comece a escrever sua redação aqui..."
          style={{
            flex: 1,
            minHeight: 320,
            width: '100%',
            border: '2px solid #e2e8f0',
            borderRadius: 16,
            padding: '16px',
            fontSize: 14,
            lineHeight: 1.75,
            color: '#1e293b',
            background: 'white',
            resize: 'none',
            outline: 'none',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            fontFamily: 'Inter, sans-serif',
          }}
        />

        {/* Word count warning */}
        {words < 250 && (
          <div style={{ background: '#FEF3C7', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 16 }}>⚠️</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#92400e' }}>
              Mínimo recomendado: 250 palavras. Você tem {words}.
            </span>
          </div>
        )}

        {/* Submit button */}
        <button
          onClick={() => { events.triggerXP(200, 100, 600); navigate('correction') }}
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
            boxShadow: '0 6px 24px rgba(124,58,237,0.4)',
            fontFamily: 'Nunito',
          }}
        >
          🤖 Corrigir com IA · +200 XP
        </button>
      </div>
    </div>
  )
}
