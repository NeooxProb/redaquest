import { useState } from 'react'
import type { NavProps } from '../types/navigation'

interface Competency {
  code: string
  title: string
  score: number
  max: number
  color: string
  emoji: string
  comment: string
  suggestions: string[]
  highlight: string
}

const COMPETENCIES: Competency[] = [
  {
    code: 'C1',
    title: 'Domínio da Língua Culta',
    score: 180,
    max: 200,
    color: '#3B82F6',
    emoji: '📖',
    comment: 'Excelente domínio gramatical. Poucos desvios da norma culta identificados no texto.',
    suggestions: [
      'Atentar para a regência verbal do verbo "implicar".',
      'Revisar uso de vírgula antes de conjunção "e" em orações distintas.',
    ],
    highlight: 'A violência de gênero possui raízes históricas',
  },
  {
    code: 'C2',
    title: 'Compreensão do Tema',
    score: 160,
    max: 200,
    color: '#7C3AED',
    emoji: '🎯',
    comment: 'Tema bem compreendido. O texto aborda a problemática com pertinência, mas pode aprofundar o recorte temático.',
    suggestions: [
      'Delimitar melhor o enfoque: violência física, psicológica ou digital?',
      'Explicitar mais o impacto social do problema.',
    ],
    highlight: 'violência doméstica representa um dos maiores desafios',
  },
  {
    code: 'C3',
    title: 'Seleção e Organização das Informações',
    score: 140,
    max: 200,
    color: '#22C55E',
    emoji: '🧩',
    comment: 'Argumentação razoável com uso de dados e referências. Faltam argumentos mais sofisticados e aprofundados.',
    suggestions: [
      'Acrescente mais um argumento com exemplificação concreta.',
      'Use repertório mais variado — apenas 2 referências foram identificadas.',
      'Aprofunde a análise das causas do problema.',
    ],
    highlight: 'De acordo com o IBGE, uma mulher é agredida a cada 4 minutos',
  },
  {
    code: 'C4',
    title: 'Coesão Textual',
    score: 180,
    max: 200,
    color: '#F97316',
    emoji: '🔗',
    comment: 'Excelente uso de conectivos e articulação entre parágrafos. Texto flui naturalmente.',
    suggestions: [
      'Variar mais os conectivos — "entretanto" aparece 3 vezes.',
      'Usar mais recursos de referenciação (anáforas, catáforas).',
    ],
    highlight: 'Entretanto, a violência de gênero possui raízes históricas',
  },
  {
    code: 'C5',
    title: 'Proposta de Intervenção',
    score: 120,
    max: 200,
    color: '#EF4444',
    emoji: '💡',
    comment: 'Proposta presente mas incompleta. Faltam elementos obrigatórios: meio, detalhamento e finalidade.',
    suggestions: [
      'Especifique o AGENTE responsável pela ação.',
      'Detalhe o MEIO pelo qual a ação será executada.',
      'Inclua a FINALIDADE da intervenção com mais precisão.',
      'Mencione pelo menos 2 ações complementares.',
    ],
    highlight: 'Portanto, para que o Estado brasileiro enfrente efetivamente',
  },
]

const totalScore = COMPETENCIES.reduce((sum, c) => sum + c.score, 0)
const maxScore = 1000

function ScoreCircle({ score, max }: { score: number; max: number }) {
  const pct = score / max
  const r = 52
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - pct)

  return (
    <svg width={130} height={130} viewBox="0 0 130 130">
      <circle cx={65} cy={65} r={r} fill="none" stroke="#e2e8f0" strokeWidth={10} />
      <circle
        cx={65}
        cy={65}
        r={r}
        fill="none"
        stroke="url(#scoreGradient)"
        strokeWidth={10}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 65 65)"
        style={{ transition: 'stroke-dashoffset 1s ease' }}
      />
      <defs>
        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <text x={65} y={60} textAnchor="middle" fontSize={30} fontWeight={900} fill="#1e293b" fontFamily="Nunito">
        {score}
      </text>
      <text x={65} y={78} textAnchor="middle" fontSize={11} fill="#94a3b8" fontWeight={700} fontFamily="Nunito">
        de {max}
      </text>
    </svg>
  )
}

const STUDY_PLAN = [
  { emoji: '🔴', day: 'Hoje', task: 'Refaça a Proposta de Intervenção com 5 elementos obrigatórios', priority: 'Alta' },
  { emoji: '🟠', day: 'Amanhã', task: 'Missão: Repertórios — desbloqueie 3 cartas lendárias', priority: 'Média' },
  { emoji: '🟡', day: 'Em 2 dias', task: 'Praticar argumentação com dados do IBGE', priority: 'Média' },
  { emoji: '🟢', day: 'Em 3 dias', task: 'Escrever redação completa sobre o mesmo tema', priority: 'Normal' },
]

export default function CorrectionScreen({ navigate, events }: NavProps) {
  const [expandedC, setExpandedC] = useState<string | null>(null)
  const [celebrated, setCelebrated] = useState(false)

  const handleCelebrate = () => {
    if (!celebrated) {
      setCelebrated(true)
      events.triggerXP(200, 140, 260)
      if (totalScore >= 900) {
        setTimeout(() => events.triggerAchievement({ icon: '⭐', title: 'Nota 900+!', xp: 300 }), 600)
      }
    }
  }

  const getGrade = (score: number) => {
    if (score >= 900) return { label: 'Excelente', color: '#22C55E' }
    if (score >= 700) return { label: 'Bom', color: '#3B82F6' }
    if (score >= 500) return { label: 'Regular', color: '#F97316' }
    return { label: 'Insuficiente', color: '#EF4444' }
  }

  const grade = getGrade(totalScore)

  return (
    <div style={{ fontFamily: 'Nunito, sans-serif', minHeight: '100%' }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)',
          padding: '8px 20px 32px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <button
            onClick={() => navigate('write')}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: 10,
              color: 'white',
              fontSize: 14,
              fontWeight: 800,
              padding: '5px 10px',
              cursor: 'pointer',
              fontFamily: 'Nunito',
            }}
          >
            ←
          </button>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: 'white' }}>🤖 Correção com IA</div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, fontWeight: 600 }}>
              Violência doméstica no Brasil
            </div>
          </div>
        </div>

        {/* Score display */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }} onClick={handleCelebrate}>
          <ScoreCircle score={totalScore} max={maxScore} />
          <div>
            <div
              style={{
                display: 'inline-block',
                background: grade.color,
                color: 'white',
                borderRadius: 20,
                padding: '4px 14px',
                fontSize: 13,
                fontWeight: 900,
                marginBottom: 8,
              }}
            >
              {grade.label}
            </div>
            <div style={{ color: 'white', fontSize: 14, fontWeight: 700, lineHeight: 1.5 }}>
              Sua redação obteve
              <br />
              <span style={{ fontSize: 28, fontWeight: 900 }}>{totalScore}</span>
              <span style={{ fontSize: 16 }}> / 1000</span>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, fontWeight: 600, marginTop: 4 }}>
              +200 XP conquistados! 🎉
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 20px' }}>
        {/* Competency cards */}
        <div style={{ fontWeight: 900, fontSize: 16, color: '#1e293b', marginBottom: 12 }}>
          📊 Competências
        </div>
        {COMPETENCIES.map((c) => {
          const pct = (c.score / c.max) * 100
          const expanded = expandedC === c.code
          return (
            <div
              key={c.code}
              style={{
                background: 'white',
                borderRadius: 18,
                marginBottom: 12,
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                border: `2px solid ${expanded ? c.color : 'transparent'}`,
              }}
            >
              <div
                onClick={() => setExpandedC(expanded ? null : c.code)}
                style={{
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: c.color + '18',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                    flexShrink: 0,
                  }}
                >
                  {c.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 900, fontSize: 13, color: '#1e293b', marginBottom: 3 }}>
                    {c.code} · {c.title}
                  </div>
                  <div style={{ height: 7, borderRadius: 4, background: '#f1f5f9', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, ${c.color}99, ${c.color})`,
                        borderRadius: 4,
                      }}
                    />
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontWeight: 900, fontSize: 18, color: c.color }}>{c.score}</div>
                  <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700 }}>/{c.max}</div>
                </div>
                <div style={{ color: '#94a3b8', fontSize: 14, flexShrink: 0 }}>
                  {expanded ? '▲' : '▼'}
                </div>
              </div>

              {expanded && (
                <div style={{ padding: '0 16px 16px', borderTop: `1px solid ${c.color}22` }}>
                  <div style={{ fontSize: 13, color: '#475569', fontWeight: 600, lineHeight: 1.6, marginBottom: 12, paddingTop: 12 }}>
                    💬 {c.comment}
                  </div>

                  {/* Highlighted excerpt */}
                  <div
                    style={{
                      background: c.color + '12',
                      border: `1px solid ${c.color}33`,
                      borderRadius: 10,
                      padding: '10px 12px',
                      marginBottom: 12,
                      fontSize: 12,
                      color: '#1e293b',
                      fontStyle: 'italic',
                      lineHeight: 1.5,
                      fontFamily: 'Inter',
                    }}
                  >
                    📌 "{c.highlight}"
                  </div>

                  {/* Suggestions */}
                  <div style={{ fontSize: 13, fontWeight: 900, color: '#1e293b', marginBottom: 8 }}>
                    ✅ Sugestões práticas:
                  </div>
                  {c.suggestions.map((s, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'flex-start' }}>
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          background: c.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 10,
                          color: 'white',
                          fontWeight: 900,
                          flexShrink: 0,
                          marginTop: 1,
                        }}
                      >
                        {i + 1}
                      </div>
                      <span style={{ fontSize: 13, color: '#475569', fontWeight: 600, lineHeight: 1.5 }}>{s}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}

        {/* Study plan */}
        <div style={{ fontWeight: 900, fontSize: 16, color: '#1e293b', marginBottom: 12, marginTop: 8 }}>
          📅 Plano de Estudos Personalizado
        </div>
        <div
          style={{
            background: 'white',
            borderRadius: 18,
            padding: '16px',
            marginBottom: 20,
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}
        >
          {STUDY_PLAN.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 12,
                alignItems: 'flex-start',
                paddingBottom: i < STUDY_PLAN.length - 1 ? 14 : 0,
                marginBottom: i < STUDY_PLAN.length - 1 ? 14 : 0,
                borderBottom: i < STUDY_PLAN.length - 1 ? '1px solid #f1f5f9' : 'none',
              }}
            >
              <span style={{ fontSize: 18, flexShrink: 0 }}>{item.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 12, color: '#94a3b8', marginBottom: 2 }}>
                  {item.day.toUpperCase()}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', lineHeight: 1.4 }}>
                  {item.task}
                </div>
              </div>
              <div
                style={{
                  background:
                    item.priority === 'Alta' ? '#FEE2E2' : item.priority === 'Média' ? '#FEF3C7' : '#DCFCE7',
                  color:
                    item.priority === 'Alta' ? '#991b1b' : item.priority === 'Média' ? '#92400e' : '#166534',
                  borderRadius: 20,
                  padding: '2px 8px',
                  fontSize: 10,
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                {item.priority}
              </div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <button
          onClick={() => navigate('write')}
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
            marginBottom: 12,
          }}
        >
          ✍️ Reescrever Redação
        </button>
        <button
          onClick={() => navigate('missions')}
          style={{
            width: '100%',
            background: 'white',
            color: '#7C3AED',
            border: '2px solid #7C3AED',
            borderRadius: 16,
            padding: '16px',
            fontSize: 16,
            fontWeight: 900,
            cursor: 'pointer',
            fontFamily: 'Nunito',
          }}
        >
          ⚔️ Ir para Missões
        </button>
      </div>
    </div>
  )
}
