interface EssayActionCardProps {
  onClick: () => void
}

export default function EssayActionCard({ onClick }: EssayActionCardProps) {
  return (
    <button type="button" className="essay-action-card" onClick={onClick}>
      <span className="essay-action-card__icon" aria-hidden="true">✍️</span>
      <span className="essay-action-card__copy">
        <strong>Escrever Redação</strong>
        <small>Corrija com IA · Ganhe até +200 XP</small>
      </span>
      <span className="essay-action-card__arrow" aria-hidden="true">→</span>
    </button>
  )
}
