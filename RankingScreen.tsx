import { useState } from 'react'
import type { NavProps } from '../App'

type Tab = 'Semanal' | 'Mensal' | 'Amigos' | 'Top Global'

interface Player {
  rank: number
  name: string
  avatar: string
  xp: number
  avgScore: number
  isMe?: boolean
  badge?: string
}

const weeklyPlayers: Player[] = [
  { rank: 1, name: 'Ana Beatriz', avatar: '🦊', xp: 4820, avgScore: 920, badge: '👑' },
  { rank: 2, name: 'Pedro Alves', avatar: '🐺', xp: 4340, avgScore: 880, badge: '🥈' },
  { rank: 3, name: 'Lucas Mendes', avatar: '🦁', xp: 3240, avgScore: 820, isMe: true, badge: '🥉' },
  { rank: 4, name: 'Carla Souza', avatar: '🦋', xp: 2980, avgScore: 800 },
  { rank: 5, name: 'Rafael Costa', avatar: '🐉', xp: 2750, avgScore: 790 },
  { rank: 6, name: 'Larissa Rocha', avatar: '🦅', xp: 2410, avgScore: 760 },
  { rank: 7, name: 'Gabriel Lima', avatar: '🐻', xp: 2200, avgScore: 740 },
  { rank: 8, name: 'Isabela Torres', avatar: '🦄', xp: 1980, avgScore: 720 },
]

const monthlyPlayers: Player[] = [
  { rank: 1, name: 'Fernanda Dias', avatar: '🦊', xp: 18400, avgScore: 940, badge: '👑' },
  { rank: 2, name: 'Lucas Mendes', avatar: '🦁', xp: 14200, avgScore: 820, isMe: true, badge: '🥈' },
  { rank: 3, name: 'Ana Beatriz', avatar: '🦋', xp: 12800, avgScore: 900, badge: '🥉' },
  { rank: 4, name: 'Pedro Alves', avatar: '🐺', xp: 11200, avgScore: 870 },
  { rank: 5, name: 'Carla Souza', avatar: '🐉', xp: 9800, avgScore: 800 },
]

const friendsPlayers: Player[] = [
  { rank: 1, name: 'Pedro Alves', avatar: '🐺', xp: 4340, avgScore: 880, badge: '🥇' },
  { rank: 2, name: 'Lucas Mendes', avatar: '🦁', xp: 3240, avgScore: 820, isMe: true, badge: '🥈' },
  { rank: 3, name: 'Carla Souza', avatar: '🦋', xp: 2980, avgScore: 800 },
  { rank: 4, name: 'Rafael Costa', avatar: '🦅', xp: 1800, avgScore: 720 },
]

const topPlayers: Player[] = [
  { rank: 1, name: 'Mariana Santos', avatar: '🌟', xp: 98400, avgScore: 980, badge: '👑' },
  { rank: 2, name: 'Thiago Neves', avatar: '💎', xp: 87200, avgScore: 960, badge: '🥈' },
  { rank: 3, name: 'Juliana Melo', avatar: '🔥', xp: 76400, avgScore: 950, badge: '🥉' },
  { rank: 4, name: 'Carlos Braga', avatar: '⚡', xp: 68100, avgScore: 940 },
  { rank: 5, name: 'Beatriz Lima', avatar: '🦋', xp: 61300, avgScore: 930 },
  { rank: 6, name: 'Lucas Mendes', avatar: '🦁', xp: 14200, avgScore: 820, isMe: true },
]

const DATA: Record<Tab, Player[]> = {
  'Semanal': weeklyPlayers,
  'Mensal': monthlyPlayers,
  'Amigos': friendsPlayers,
  'Top Global': topPlayers,
}

function TopThree({ players }: { players: Player[] }) {
  const top = players.slice(0, 3)
  const order = top.length >= 3 ? [top[1], top[0], top[2]] : top

  const heights = [80, 110, 60]
  const sizes = [52, 62, 48]
  const scoreColors = ['#3B82F6', '#F59E0B', '#EF4444']

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 12, padding: '20px 0 0' }}>
      {order.map((p, i) => {
        const podiumH = heights[i]
        const avatarSize = sizes[i]
        const isFirst = p.rank === 1
        return (
          <div key={p.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            {isFirst && <span style={{ fontSize: 22 }}>👑</span>}
            <div
              style={{
                width: avatarSize,
                height: avatarSize,
                borderRadius: avatarSize / 2,
                background: isFirst
                  ? 'linear-gradient(135deg, #FCD34D, #F97316)'
                  : 'linear-gradient(135deg, #e2e8f0, #cbd5e1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: avatarSize * 0.45,
                border: isFirst ? '3px solid #F59E0B' : '2px solid #e2e8f0',
                boxShadow: isFirst ? '0 4px 16px rgba(245,158,11,0.5)' : '0 2px 8px rgba(0,0,0,0.1)',
                ...(p.isMe ? { border: '3px solid #7C3AED', boxShadow: '0 4px 16px rgba(124,58,237,0.4)' } : {}),
              }}
            >
              {p.avatar}
            </div>
            <div style={{ fontSize: 12, fontWeight: 900, color: isFirst ? '#1e293b' : '#475569', textAlign: 'center', maxWidth: 70, lineHeight: 1.2 }}>
              {p.name.split(' ')[0]}
            </div>
            <div
              style={{
                width: 72,
                height: podiumH,
                background: isFirst
                  ? 'linear-gradient(180deg, #FCD34D, #F97316)'
                  : i === 0
                  ? 'linear-gradient(180deg, #CBD5E1, #94a3b8)'
                  : 'linear-gradient(180deg, #FBBF24, #D97706)',
                borderRadius: '8px 8px 0 0',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: 10,
              }}
            >
              <span style={{ fontSize: 18, fontWeight: 900, color: 'white' }}>#{p.rank}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function RankingScreen({ navigate: _navigate, events: _events }: NavProps) {
  const [tab, setTab] = useState<Tab>('Semanal')
  const players = DATA[tab]

  return (
    <div style={{ fontFamily: 'Nunito, sans-serif', minHeight: '100%' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)', padding: '8px 20px 0' }}>
        <div style={{ fontSize: 24, fontWeight: 900, color: 'white', marginBottom: 4 }}>
          🏆 Ranking
        </div>
        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 600, marginBottom: 12 }}>
          Sua posição: #{players.find((p) => p.isMe)?.rank ?? '—'} de {players.length}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0 }}>
          {(Object.keys(DATA) as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                color: tab === t ? 'white' : 'rgba(255,255,255,0.55)',
                fontSize: 11,
                fontWeight: 800,
                padding: '8px 0',
                cursor: 'pointer',
                borderBottom: tab === t ? '3px solid white' : '3px solid transparent',
                fontFamily: 'Nunito',
                transition: 'all 0.2s',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Podium */}
      <div style={{ background: 'linear-gradient(180deg, #FEF3C7 0%, #F0F4FF 100%)', paddingBottom: 8 }}>
        <TopThree players={players} />
      </div>

      {/* Full list */}
      <div style={{ padding: '12px 20px' }}>
        {players.map((p) => (
          <div
            key={p.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: p.isMe ? '#EDE9FE' : 'white',
              border: p.isMe ? '2px solid #7C3AED' : '2px solid transparent',
              borderRadius: 16,
              padding: '12px 16px',
              marginBottom: 10,
              boxShadow: p.isMe ? '0 4px 16px rgba(124,58,237,0.2)' : '0 2px 10px rgba(0,0,0,0.05)',
            }}
          >
            {/* Rank */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                background: p.rank === 1 ? '#F59E0B' : p.rank === 2 ? '#94a3b8' : p.rank === 3 ? '#D97706' : '#f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: p.rank <= 3 ? 16 : 13,
                fontWeight: 900,
                color: p.rank <= 3 ? 'white' : '#64748b',
                flexShrink: 0,
              }}
            >
              {p.badge ?? `#${p.rank}`}
            </div>

            {/* Avatar */}
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                background: p.isMe
                  ? 'linear-gradient(135deg, #FCD34D, #F97316)'
                  : 'linear-gradient(135deg, #e2e8f0, #cbd5e1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                flexShrink: 0,
              }}
            >
              {p.avatar}
            </div>

            {/* Name + score */}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 900, fontSize: 14, color: p.isMe ? '#7C3AED' : '#1e293b' }}>
                {p.name} {p.isMe && '(Você)'}
              </div>
              <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>
                Média: {p.avgScore} pts
              </div>
            </div>

            {/* XP */}
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 900, fontSize: 14, color: '#7C3AED' }}>
                {p.xp.toLocaleString('pt-BR')}
              </div>
              <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>XP</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
