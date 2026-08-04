import { useMemo } from 'react'

const COLORS = ['#3B82F6', '#7C3AED', '#22C55E', '#F97316', '#EF4444', '#FCD34D', '#EC4899', '#06B6D4']
const SHAPES = ['circle', 'square', 'rect'] as const

interface Piece {
  id: number
  x: number
  color: string
  size: number
  delay: number
  duration: number
  shape: typeof SHAPES[number]
  swayDuration: number
}

interface Props {
  active: boolean
  count?: number
}

export default function Confetti({ active, count = 80 }: Props) {
  const pieces = useMemo<Piece[]>(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 390,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 5 + Math.random() * 9,
      delay: Math.random() * 2.2,
      duration: 2.2 + Math.random() * 1.8,
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      swayDuration: 0.8 + Math.random() * 0.8,
    })),
  [count])

  if (!active) return null

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 300,
      }}
    >
      {pieces.map((p) => {
        const w = p.shape === 'rect' ? p.size * 0.45 : p.size
        const h = p.size
        const radius = p.shape === 'circle' ? '50%' : p.shape === 'square' ? '2px' : '2px'
        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: p.x,
              top: -12,
              width: w,
              height: h,
              borderRadius: radius,
              background: p.color,
              animation: `confettiFall ${p.duration}s ${p.delay}s ease-in forwards, confettiSway ${p.swayDuration}s ${p.delay}s ease-in-out infinite`,
            }}
          />
        )
      })}
    </div>
  )
}
