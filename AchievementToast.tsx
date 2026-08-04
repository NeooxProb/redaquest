import { useEffect, useState } from 'react'

interface Props {
  achievement: { icon: string; title: string; xp: number } | null
  onClose: () => void
}

export default function AchievementToast({ achievement, onClose }: Props) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (!achievement) return
    setExiting(false)
    const t = setTimeout(() => {
      setExiting(true)
      setTimeout(onClose, 400)
    }, 3400)
    return () => clearTimeout(t)
  }, [achievement])

  if (!achievement) return null

  return (
    <div
      style={{
        position: 'absolute',
        top: 52,
        left: 16,
        right: 16,
        zIndex: 400,
        animation: exiting ? 'toastSlideUp 0.4s ease-in forwards' : 'toastSlideDown 0.4s cubic-bezier(0.22,1,0.36,1) both',
      }}
    >
      {/* Glow backdrop */}
      <div
        style={{
          position: 'absolute',
          inset: -6,
          borderRadius: 22,
          background: 'linear-gradient(135deg, #FCD34D55, #F9711655)',
          filter: 'blur(12px)',
        }}
      />
      <div
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg, #1e1b4b, #2d2a6e)',
          border: '1.5px solid rgba(252,211,77,0.5)',
          borderRadius: 18,
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          boxShadow: '0 8px 40px rgba(252,211,77,0.3)',
        }}
      >
        {/* Shimmer overlay */}
        <div
          className="shimmer"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 18,
            pointerEvents: 'none',
          }}
        />

        {/* Icon with pulse ring */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div
            style={{
              position: 'absolute',
              inset: -6,
              borderRadius: '50%',
              border: '2px solid #FCD34D',
              opacity: 0.5,
              animation: 'ctaPulse 1.2s ease-in-out infinite',
            }}
          />
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 23,
              background: 'linear-gradient(135deg, #FCD34D, #F97316)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
            }}
          >
            {achievement.icon}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 800,
              color: '#FCD34D',
              letterSpacing: '0.12em',
              marginBottom: 2,
            }}
          >
            🏆 CONQUISTA DESBLOQUEADA!
          </div>
          <div style={{ fontSize: 15, fontWeight: 900, color: 'white', lineHeight: 1.2 }}>
            {achievement.title}
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#22C55E', marginTop: 2 }}>
            +{achievement.xp} XP
          </div>
        </div>

        <button
          onClick={() => { setExiting(true); setTimeout(onClose, 400) }}
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            borderRadius: 8,
            color: 'rgba(255,255,255,0.6)',
            width: 24,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          ✕
        </button>
      </div>
    </div>
  )
}
