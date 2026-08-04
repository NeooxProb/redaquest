interface Props {
  amount: number
  x: number
  y: number
  onDone: () => void
}

export default function FloatingXP({ amount, x, y, onDone }: Props) {
  return (
    <div
      onAnimationEnd={onDone}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        zIndex: 500,
        pointerEvents: 'none',
        animation: 'floatXP 1.1s ease-out forwards',
        fontFamily: 'Nunito',
        fontWeight: 900,
        fontSize: 20,
        color: '#22C55E',
        textShadow: '0 2px 8px rgba(0,0,0,0.3)',
        whiteSpace: 'nowrap',
      }}
    >
      +{amount} XP ⚡
    </div>
  )
}
