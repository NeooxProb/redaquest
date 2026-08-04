import Confetti from './Confetti'

interface Props {
  visible: boolean
  xp: number
  missionName: string
  onClose: () => void
  onNext: () => void
}

const STARS = [
  { delay: '0s',   size: 28, angle: -40, dist: 90 },
  { delay: '0.1s', size: 22, angle: 10,  dist: 100 },
  { delay: '0.2s', size: 18, angle: 60,  dist: 80 },
]

export default function MissionComplete({ visible, xp, missionName, onClose, onNext }: Props) {
  if (!visible) return null

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 250,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(15,10,40,0.85)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <Confetti active={visible} count={100} />

      {/* Card */}
      <div
        style={{
          background: 'linear-gradient(160deg, #1e1b4b, #312e81)',
          border: '2px solid rgba(252,211,77,0.4)',
          borderRadius: 28,
          padding: '36px 28px 28px',
          width: 320,
          textAlign: 'center',
          position: 'relative',
          animation: 'bounceIn 0.55s cubic-bezier(0.22,1,0.36,1) both',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 80px rgba(124,58,237,0.3)',
        }}
      >
        {/* Shimmer overlay */}
        <div
          className="shimmer"
          style={{ position: 'absolute', inset: 0, borderRadius: 28, pointerEvents: 'none' }}
        />

        {/* Trophy icon with glow */}
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}>
          <div
            style={{
              position: 'absolute',
              inset: -16,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(252,211,77,0.4) 0%, transparent 70%)',
            }}
          />
          <div style={{ fontSize: 64, lineHeight: 1, animation: 'streakBounce 0.6s 0.4s ease-out both' }}>
            🏆
          </div>
        </div>

        {/* Stars */}
        {STARS.map((s, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '28%',
              left: '50%',
              fontSize: s.size,
              transform: `translate(-50%, -50%) rotate(${s.angle}deg) translateX(${s.dist}px)`,
              animation: `twinkle 1.2s ${s.delay} ease-in-out infinite`,
            }}
          >
            ⭐
          </div>
        ))}

        <div
          style={{
            fontSize: 11,
            fontWeight: 800,
            color: '#FCD34D',
            letterSpacing: '0.14em',
            marginBottom: 8,
          }}
        >
          MISSÃO COMPLETA!
        </div>

        <div style={{ fontSize: 20, fontWeight: 900, color: 'white', marginBottom: 6, lineHeight: 1.3 }}>
          {missionName}
        </div>

        {/* XP pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'linear-gradient(135deg, #22C55E, #16a34a)',
            borderRadius: 20,
            padding: '8px 20px',
            marginBottom: 24,
            boxShadow: '0 4px 20px rgba(34,197,94,0.5)',
          }}
        >
          <span style={{ fontSize: 20 }}>⚡</span>
          <span style={{ fontSize: 22, fontWeight: 900, color: 'white' }}>+{xp} XP</span>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            gap: 0,
            background: 'rgba(255,255,255,0.08)',
            borderRadius: 16,
            overflow: 'hidden',
            marginBottom: 24,
          }}
        >
          {[
            { label: 'Acertos', value: '5/5' },
            { label: 'Tempo', value: '2m 14s' },
            { label: 'Combo', value: '5🔥' },
          ].map((s, i) => (
            <div
              key={s.label}
              style={{
                flex: 1,
                padding: '10px 4px',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 900, color: 'white' }}>{s.value}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <button
          onClick={onNext}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
            color: 'white',
            border: 'none',
            borderRadius: 16,
            padding: '16px',
            fontSize: 16,
            fontWeight: 900,
            cursor: 'pointer',
            boxShadow: '0 6px 24px rgba(124,58,237,0.5)',
            fontFamily: 'Nunito',
            marginBottom: 10,
          }}
        >
          → Próxima Missão
        </button>
        <button
          onClick={onClose}
          style={{
            width: '100%',
            background: 'none',
            color: 'rgba(255,255,255,0.5)',
            border: '1.5px solid rgba(255,255,255,0.15)',
            borderRadius: 16,
            padding: '13px',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'Nunito',
          }}
        >
          Ver Resultado
        </button>
      </div>
    </div>
  )
}
