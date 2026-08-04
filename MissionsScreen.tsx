import { useState } from 'react'
import type { NavProps } from '../App'

type Status = 'completed' | 'current' | 'locked'

interface Mission {
  id: number
  emoji: string
  title: string
  difficulty: string
  xp: number
  time: string
  reward: string
  status: Status
  color: string
  screen?: 'quiz' | 'error-hunt' | 'write'
}

const missions: Mission[] = [
  { id: 1, emoji: '🔗', title: 'Escolha o conectivo correto', difficulty: 'Fácil', xp: 80, time: '3 min', reward: '🥉', status: 'completed', color: '#22C55E', screen: 'quiz' },
  { id: 2, emoji: '📋', title: 'Organize os parágrafos', difficulty: 'Fácil', xp: 90, time: '4 min', reward: '🥈', status: 'completed', color: '#22C55E' },
  { id: 3, emoji: '📝', title: 'Complete a introdução', difficulty: 'Médio', xp: 120, time: '5 min', reward: '⭐', status: 'current', color: '#3B82F6' },
  { id: 4, emoji: '🔍', title: 'Caça aos erros gramaticais', difficulty: 'Médio', xp: 150, time: '6 min', reward: '🔥', status: 'locked', color: '#F97316', screen: 'error-hunt' },
  { id: 5, emoji: '✍️', title: 'Escreva um desenvolvimento', difficulty: 'Difícil', xp: 200, time: '10 min', reward: '💎', status: 'locked', color: '#EF4444', screen: 'write' },
  { id: 6, emoji: '📊', title: 'Argumento com dados do IBGE', difficulty: 'Difícil', xp: 160, time: '7 min', reward: '📊', status: 'locked', color: '#F97316' },
  { id: 7, emoji: '🎯', title: 'Proposta de intervenção perfeita', difficulty: 'Expert', xp: 220, time: '12 min', reward: '👑', status: 'locked', color: '#7C3AED' },
  { id: 8, emoji: '🏆', title: 'Redação nota 1000', difficulty: 'Lendário', xp: 500, time: '30 min', reward: '🏆', status: 'locked', color: '#EF4444', screen: 'write' },
]

const diffColors: Record<string, { bg: string; text: string }> = {
  'Fácil':    { bg: '#DCFCE7', text: '#166534' },
  'Médio':    { bg: '#DBEAFE', text: '#1e40af' },
  'Difícil':  { bg: '#FFEDD5', text: '#9a3412' },
  'Expert':   { bg: '#FEE2E2', text: '#991b1b' },
  'Lendário': { bg: '#EDE9FE', text: '#5b21b6' },
}

export default function MissionsScreen({ navigate, events }: NavProps) {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div style={{ fontFamily: 'Nunito, sans-serif', minHeight: '100%' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)', padding: '8px 20px 28px' }}>
        <div style={{ fontSize: 24, fontWeight: 900, color: 'white', marginBottom: 4 }}>
          ⚔️ Missões
        </div>
        <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
          Semana 3 · Módulo: Estrutura da Redação
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 12, fontWeight: 800 }}>
              2 de 8 completas
            </span>
            <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: 700 }}>25%</span>
          </div>
          <div style={{ height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.25)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '25%', background: '#22C55E', borderRadius: 5, boxShadow: '0 0 8px rgba(34,197,94,0.6)' }} />
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 20px' }}>
        {missions.map((m, i) => {
          const diff = diffColors[m.difficulty]
          const isSelected = selected === m.id

          return (
            <div key={m.id} style={{ position: 'relative' }}>
              {/* Vertical connector */}
              {i < missions.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    left: 35,
                    top: 64,
                    width: 2,
                    height: 20,
                    background: m.status === 'completed' ? '#22C55E' : '#e2e8f0',
                    zIndex: 0,
                  }}
                />
              )}

              <div
                onClick={() => {
                  if (m.status === 'locked') return
                  setSelected(isSelected ? null : m.id)
                  if (m.screen) { events.triggerXP(5, 180, 300); navigate(m.screen) }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  background: 'white',
                  borderRadius: 18,
                  padding: '14px 16px',
                  marginBottom: 20,
                  boxShadow:
                    m.status === 'current'
                      ? `0 6px 24px ${m.color}30`
                      : '0 2px 12px rgba(0,0,0,0.06)',
                  border:
                    m.status === 'current'
                      ? `2px solid ${m.color}`
                      : '2px solid transparent',
                  cursor: m.status !== 'locked' ? 'pointer' : 'default',
                  opacity: m.status === 'locked' ? 0.55 : 1,
                  position: 'relative',
                  zIndex: 1,
                  transition: 'transform 0.15s, box-shadow 0.15s',
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 26,
                    background:
                      m.status === 'completed'
                        ? 'linear-gradient(135deg, #22C55E, #16a34a)'
                        : m.status === 'current'
                        ? `linear-gradient(135deg, ${m.color}, ${m.color}cc)`
                        : '#f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: m.status === 'completed' ? 22 : 24,
                    flexShrink: 0,
                    boxShadow: m.status !== 'locked' ? `0 4px 12px ${m.color}44` : 'none',
                    color: m.status === 'locked' ? '#94a3b8' : 'white',
                  }}
                >
                  {m.status === 'completed' ? '✓' : m.status === 'locked' ? '🔒' : m.emoji}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 14,
                      color: m.status === 'locked' ? '#94a3b8' : '#1e293b',
                      marginBottom: 5,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {m.title}
                  </div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        background: diff.bg,
                        color: diff.text,
                        borderRadius: 20,
                        padding: '2px 9px',
                        fontSize: 11,
                        fontWeight: 800,
                      }}
                    >
                      {m.difficulty}
                    </span>
                    <span style={{ color: '#94a3b8', fontSize: 12, fontWeight: 600 }}>⏱ {m.time}</span>
                    {m.status === 'current' && (
                      <span style={{ background: '#EDE9FE', color: '#7C3AED', borderRadius: 20, padding: '2px 9px', fontSize: 11, fontWeight: 800 }}>
                        ATUAL
                      </span>
                    )}
                  </div>
                </div>

                {/* Reward */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 22, marginBottom: 2 }}>{m.reward}</div>
                  <div style={{ fontWeight: 900, fontSize: 13, color: '#7C3AED' }}>
                    +{m.xp} XP
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
