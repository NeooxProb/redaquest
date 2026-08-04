import type { NavProps } from '../types/navigation'

interface Achievement {
  id: number
  icon: string
  title: string
  description: string
  earned: boolean
  date?: string
}

const achievements: Achievement[] = [
  { id: 1, icon: '✍️', title: 'Primeira Redação', description: 'Enviou a primeira redação para correção', earned: true, date: 'Jan 2024' },
  { id: 2, icon: '🔗', title: '100 Conectivos', description: 'Aprendeu 100 conectivos diferentes', earned: true, date: 'Feb 2024' },
  { id: 3, icon: '⭐', title: 'Nota 900', description: 'Alcançou 900 pontos em uma redação', earned: true, date: 'Mar 2024' },
  { id: 4, icon: '🔥', title: '30 Dias Seguidos', description: 'Estudou 30 dias consecutivos', earned: true, date: 'Mar 2024' },
  { id: 5, icon: '🏆', title: 'Nota 1000', description: 'Alcançou a nota máxima do ENEM', earned: false },
  { id: 6, icon: '💯', title: '100 Missões', description: 'Concluiu 100 missões no total', earned: false },
  { id: 7, icon: '👑', title: 'Mestre dos Repertórios', description: 'Desbloqueou todas as cartas lendárias', earned: false },
  { id: 8, icon: '🎯', title: 'Expert C5', description: 'Dominou a Competência 5 (Proposta)', earned: false },
]

const competencies = [
  { name: 'C1 · Domínio da Língua', score: 180, max: 200, color: '#3B82F6' },
  { name: 'C2 · Compreensão do Tema', score: 160, max: 200, color: '#7C3AED' },
  { name: 'C3 · Argumentação', score: 140, max: 200, color: '#22C55E' },
  { name: 'C4 · Coesão Textual', score: 180, max: 200, color: '#F97316' },
  { name: 'C5 · Proposta de Intervenção', score: 120, max: 200, color: '#EF4444' },
]

const cards = [
  { name: 'Aristóteles', emoji: '🏛️', rarity: 'Épica', color: '#7C3AED' },
  { name: 'Constituição', emoji: '📜', rarity: 'Lendária', color: '#D97706' },
  { name: 'Bauman', emoji: '💧', rarity: 'Épica', color: '#7C3AED' },
  { name: 'IBGE 2023', emoji: '📊', rarity: 'Épica', color: '#7C3AED' },
  { name: 'Black Mirror', emoji: '📺', rarity: 'Rara', color: '#3B82F6' },
  { name: 'Entretanto', emoji: '🔗', rarity: 'Comum', color: '#64748b' },
]

export default function ProfileScreen({ navigate: _navigate, events }: NavProps) {
  return (
    <div style={{ fontFamily: 'Nunito, sans-serif', minHeight: '100%' }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 50%, #22C55E 100%)',
          padding: '8px 20px 32px',
        }}
      >
        {/* Avatar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              background: 'linear-gradient(135deg, #FCD34D, #F97316)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 40,
              border: '4px solid rgba(255,255,255,0.7)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}
          >
            🦁
          </div>
          <div>
            <div style={{ textAlign: 'center', fontSize: 22, fontWeight: 900, color: 'white' }}>
              Lucas Mendes
            </div>
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 700 }}>
              Escritor Épico · Nível 12
            </div>
          </div>
          {/* Stats row */}
          <div style={{ display: 'flex', gap: 0, background: 'rgba(255,255,255,0.15)', borderRadius: 16, overflow: 'hidden', marginTop: 4 }}>
            {[
              { label: 'XP Total', value: '14.2k' },
              { label: 'Ranking', value: '#3' },
              { label: 'Sequência', value: '18🔥' },
            ].map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: '10px 18px',
                  borderRight: i < 2 ? '1px solid rgba(255,255,255,0.2)' : 'none',
                  textAlign: 'center',
                }}
              >
                <div style={{ color: 'white', fontSize: 16, fontWeight: 900 }}>{s.value}</div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, fontWeight: 700 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 20px' }}>
        {/* Key stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          {[
            { icon: '📝', label: 'Redações', value: '47', sub: 'enviadas' },
            { icon: '⭐', label: 'Melhor nota', value: '960', sub: 'pontos' },
            { icon: '📈', label: 'Nota média', value: '820', sub: 'pontos' },
            { icon: '⚔️', label: 'Missões', value: '83', sub: 'completas' },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: 'white',
                borderRadius: 16,
                padding: '16px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ fontSize: 26, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#7C3AED' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700 }}>
                {s.label} <span style={{ color: '#cbd5e1' }}>·</span> {s.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Competency breakdown */}
        <div
          style={{
            background: 'white',
            borderRadius: 18,
            padding: '18px',
            marginBottom: 20,
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ fontWeight: 900, fontSize: 16, color: '#1e293b', marginBottom: 14 }}>
            📊 Competências
          </div>
          {competencies.map((c) => {
            const pct = (c.score / c.max) * 100
            return (
              <div key={c.name} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#475569' }}>{c.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 900, color: c.color }}>{c.score}</span>
                </div>
                <div style={{ height: 8, borderRadius: 4, background: '#f1f5f9', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${pct}%`,
                      background: `linear-gradient(90deg, ${c.color}cc, ${c.color})`,
                      borderRadius: 4,
                    }}
                  />
                </div>
                {c.score < 160 && (
                  <div style={{ fontSize: 10, color: '#EF4444', fontWeight: 700, marginTop: 3 }}>
                    ⚠️ Precisa melhorar
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Card collection */}
        <div style={{ fontWeight: 900, fontSize: 16, color: '#1e293b', marginBottom: 12 }}>
          🃏 Coleção de Cartas
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
          {cards.map((c) => (
            <div
              key={c.name}
              style={{
                background: 'white',
                borderRadius: 14,
                padding: '12px 8px',
                textAlign: 'center',
                border: `2px solid ${c.color}44`,
                boxShadow: `0 2px 8px ${c.color}22`,
              }}
            >
              <div style={{ fontSize: 26, marginBottom: 4 }}>{c.emoji}</div>
              <div style={{ fontSize: 10, fontWeight: 900, color: '#1e293b', marginBottom: 2 }}>{c.name}</div>
              <div style={{ fontSize: 9, color: c.color, fontWeight: 800 }}>{c.rarity}</div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div style={{ fontWeight: 900, fontSize: 16, color: '#1e293b', marginBottom: 12 }}>
          🏅 Conquistas
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {achievements.map((a) => (
            <div
              key={a.id}
              onClick={() => a.earned && events.triggerAchievement({ icon: a.icon, title: a.title, xp: 50 })}
              style={{ cursor: a.earned ? 'pointer' : 'default',
                background: a.earned ? 'white' : '#f8fafc',
                borderRadius: 16,
                padding: '14px 12px',
                opacity: a.earned ? 1 : 0.55,
                border: a.earned ? '2px solid #FEF3C7' : '2px solid transparent',
                boxShadow: a.earned ? '0 4px 16px rgba(245,158,11,0.15)' : '0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 6 }}>{a.icon}</div>
              <div style={{ fontWeight: 900, fontSize: 12, color: '#1e293b', marginBottom: 2 }}>
                {a.title}
              </div>
              <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600, lineHeight: 1.3 }}>
                {a.description}
              </div>
              {a.earned && a.date && (
                <div style={{ fontSize: 10, color: '#D97706', fontWeight: 800, marginTop: 6 }}>
                  ✓ {a.date}
                </div>
              )}
              {!a.earned && (
                <div style={{ fontSize: 10, color: '#cbd5e1', fontWeight: 800, marginTop: 6 }}>
                  🔒 Bloqueada
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
