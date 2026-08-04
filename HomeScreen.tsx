import { useState, useEffect } from 'react'
import type { NavProps } from '../App'

function XPBar({ current, max }: { current: number; max: number }) {
  const pct = Math.round((current / max) * 100)
  return (
    <div style={{ height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.25)', overflow: 'hidden' }}>
      <div
        style={{
          height: '100%',
          width: `${pct}%`,
          background: 'linear-gradient(90deg, rgba(255,255,255,0.9), white)',
          borderRadius: 5,
        }}
      />
    </div>
  )
}

function Heart({ filled }: { filled: boolean }) {
  return (
    <span style={{ fontSize: 18, filter: filled ? 'none' : 'grayscale(1) opacity(0.4)' }}>❤️</span>
  )
}

const stats = [
  { icon: '📝', label: 'Redações', value: '47' },
  { icon: '⭐', label: 'Média', value: '820' },
  { icon: '🏆', label: 'Melhor', value: '960' },
]

const missions = [
  { title: 'Escolha o conectivo', time: '3 min', xp: 80, color: '#22C55E', screen: 'quiz' as const },
  { title: 'Complete a introdução', time: '5 min', xp: 120, color: '#3B82F6', screen: 'missions' as const },
]

export default function HomeScreen({ navigate, events }: NavProps) {
  const [xpDisplay, setXpDisplay] = useState(3100)

  // Animate XP counter on mount
  useEffect(() => {
    const target = 3240
    const step = Math.ceil((target - 3100) / 20)
    let current = 3100
    const interval = setInterval(() => {
      current = Math.min(current + step, target)
      setXpDisplay(current)
      if (current >= target) clearInterval(interval)
    }, 40)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ fontFamily: 'Nunito, sans-serif' }}>
      {/* Header gradient */}
      <div
        style={{
          background: 'linear-gradient(135deg, #3B82F6 0%, #7C3AED 100%)',
          padding: '8px 20px 28px',
        }}
      >
        {/* Avatar + name + streak */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                background: 'linear-gradient(135deg, #FCD34D, #F97316)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 26,
                border: '3px solid rgba(255,255,255,0.6)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                flexShrink: 0,
              }}
            >
              🦁
            </div>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, fontWeight: 700 }}>
                Bem-vindo de volta,
              </div>
              <div style={{ color: 'white', fontSize: 18, fontWeight: 900, lineHeight: 1.1 }}>
                Lucas Mendes
              </div>
              <div
                style={{
                  display: 'inline-block',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: 20,
                  padding: '1px 8px',
                  fontSize: 11,
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.9)',
                  marginTop: 3,
                }}
              >
                Nível 12 · Escritor Épico
              </div>
            </div>
          </div>
          {/* Streak badge */}
          <div
            style={{
              background: 'rgba(255,255,255,0.18)',
              border: '1.5px solid rgba(255,255,255,0.35)',
              borderRadius: 20,
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              backdropFilter: 'blur(8px)',
            }}
          >
            <span style={{ fontSize: 22 }}>🔥</span>
            <div>
              <div style={{ color: 'white', fontSize: 20, fontWeight: 900, lineHeight: 1 }}>18</div>
              <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 10, fontWeight: 700 }}>dias</div>
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 12, fontWeight: 800 }}>
              ⚡ {xpDisplay.toLocaleString('pt-BR')} XP
            </span>
            <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: 600 }}>
              Meta: 4.000 XP
            </span>
          </div>
          <XPBar current={3240} max={4000} />
        </div>

        {/* Energy */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, fontWeight: 700, marginRight: 4 }}>
              Energia:
            </span>
            {[1, 2, 3, 4, 5].map((i) => (
              <Heart key={i} filled={i <= 4} />
            ))}
          </div>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: 600 }}>
            +1 em 18min
          </span>
        </div>
      </div>

      <div style={{ padding: '20px 20px' }}>
        {/* Continue mission CTA */}
        <button
          className="cta-pulse"
          onClick={() => { navigate('missions'); events.triggerXP(5, 195, 360) }}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #22C55E 0%, #16a34a 100%)',
            color: 'white',
            border: 'none',
            borderRadius: 18,
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            boxShadow: '0 6px 24px rgba(34,197,94,0.4)',
            marginBottom: 18,
            textAlign: 'left',
          }}
        >
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.85, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Continuar missão
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, marginTop: 2 }}>
              Conectivos: Fase 3 🎯
            </div>
            <div style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>
              3 de 5 completos · +80 XP ao concluir
            </div>
          </div>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              background: 'rgba(255,255,255,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              flexShrink: 0,
            }}
          >
            ▶
          </div>
        </button>

        {/* Daily challenge */}
        <div
          style={{
            background: 'white',
            borderRadius: 18,
            padding: '16px 18px',
            marginBottom: 18,
            boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
            border: '1.5px solid #F0F4FF',
          }}
        >
          <div
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 22 }}>📅</span>
              <span style={{ fontWeight: 900, fontSize: 15, color: '#1e293b' }}>Desafio Diário</span>
            </div>
            <div
              style={{
                background: '#FEF3C7',
                color: '#B45309',
                borderRadius: 20,
                padding: '3px 10px',
                fontSize: 12,
                fontWeight: 800,
              }}
            >
              +150 XP
            </div>
          </div>
          <div style={{ fontSize: 14, color: '#475569', fontWeight: 600, marginBottom: 12 }}>
            Complete 3 missões hoje
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 9,
                  borderRadius: 5,
                  background: i <= 2 ? '#22C55E' : '#e2e8f0',
                  transition: 'background 0.4s',
                  boxShadow: i <= 2 ? '0 2px 8px rgba(34,197,94,0.4)' : 'none',
                }}
              />
            ))}
            <span style={{ color: '#475569', fontSize: 13, fontWeight: 800, whiteSpace: 'nowrap' }}>
              2/3 ✓
            </span>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 18 }}>
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                background: 'white',
                borderRadius: 16,
                padding: '14px 8px',
                textAlign: 'center',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#7C3AED' }}>{s.value}</div>
              <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, letterSpacing: '0.04em' }}>
                {s.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        {/* Write essay CTA */}
        <button
          onClick={() => navigate('write')}
          style={{
            width: '100%',
            background: 'white',
            border: '2px solid #7C3AED',
            borderRadius: 16,
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            cursor: 'pointer',
            marginBottom: 20,
            textAlign: 'left',
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #7C3AED22, #3B82F622)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
              flexShrink: 0,
            }}
          >
            ✍️
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 900, fontSize: 15, color: '#7C3AED' }}>
              Escrever Redação
            </div>
            <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, marginTop: 2 }}>
              Corrija com IA · Ganhe até +200 XP
            </div>
          </div>
          <div style={{ color: '#7C3AED', fontSize: 20, fontWeight: 900 }}>→</div>
        </button>

        {/* Recommended missions */}
        <div style={{ fontWeight: 900, fontSize: 16, color: '#1e293b', marginBottom: 12 }}>
          🎯 Recomendadas para você
        </div>
        {missions.map((m) => (
          <div
            key={m.title}
            onClick={() => navigate(m.screen)}
            style={{
              background: 'white',
              borderRadius: 14,
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 10,
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              cursor: 'pointer',
              border: `1.5px solid ${m.color}33`,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: m.color + '18',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
              }}
            >
              {m.color === '#22C55E' ? '🔗' : '📝'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: '#1e293b' }}>{m.title}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>⏱ {m.time}</div>
            </div>
            <div
              style={{
                background: m.color + '18',
                color: m.color,
                borderRadius: 20,
                padding: '5px 12px',
                fontSize: 13,
                fontWeight: 800,
              }}
            >
              +{m.xp} XP
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
