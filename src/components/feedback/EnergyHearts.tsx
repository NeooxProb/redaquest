interface EnergyHeartsProps {
  current: number
  max: number
}

export default function EnergyHearts({ current, max }: EnergyHeartsProps) {
  return (
    <div className="energy-hearts" aria-label={`${current} de ${max} pontos de energia`}>
      {Array.from({ length: max }, (_, index) => {
        const filled = index < current
        return (
          <span
            key={index}
            className={`energy-hearts__heart${filled ? '' : ' energy-hearts__heart--empty'}`}
            aria-hidden="true"
          >
            ❤️
          </span>
        )
      })}
    </div>
  )
}
