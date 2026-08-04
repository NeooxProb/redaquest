interface DailyChallengeCardProps {
  completed: number
  total: number
}

export default function DailyChallengeCard({ completed, total }: DailyChallengeCardProps) {
  return (
    <section className="daily-challenge-card" aria-labelledby="daily-challenge-title">
      <div className="daily-challenge-card__heading">
        <div className="daily-challenge-card__title">
          <span aria-hidden="true">📅</span>
          <h2 id="daily-challenge-title">Desafio Diário</h2>
        </div>
        <span className="daily-challenge-card__reward">+150 XP</span>
      </div>

      <p>Complete 3 missões hoje</p>

      <div className="daily-challenge-card__progress" aria-label={`${completed} de ${total} missões concluídas`}>
        <div className="daily-challenge-card__steps">
          {Array.from({ length: total }, (_, index) => (
            <span
              key={index}
              className={`daily-challenge-card__step${index < completed ? ' daily-challenge-card__step--done' : ''}`}
            />
          ))}
        </div>
        <strong>{completed}/{total} ✓</strong>
      </div>
    </section>
  )
}
