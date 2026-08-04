interface ContinueMissionCardProps {
  onClick: () => void
}

export default function ContinueMissionCard({ onClick }: ContinueMissionCardProps) {
  return (
    <button type="button" className="continue-mission-card cta-pulse" onClick={onClick}>
      <span className="continue-mission-card__copy">
        <small>Continuar missão</small>
        <strong>Conectivos: Fase 3 🎯</strong>
        <span>3 de 5 completos · +80 XP ao concluir</span>
      </span>
      <span className="continue-mission-card__play" aria-hidden="true">▶</span>
    </button>
  )
}
