import type { CSSProperties } from 'react'
import type { RecommendedMission } from '../../types/home'

interface RecommendedMissionCardProps {
  mission: RecommendedMission
  onClick: () => void
}

type MissionCardStyle = CSSProperties & {
  '--mission-color': string
}

export default function RecommendedMissionCard({ mission, onClick }: RecommendedMissionCardProps) {
  const style: MissionCardStyle = { '--mission-color': mission.color }

  return (
    <button
      type="button"
      className="recommended-mission-card"
      style={style}
      onClick={onClick}
    >
      <span className="recommended-mission-card__icon" aria-hidden="true">{mission.icon}</span>
      <span className="recommended-mission-card__copy">
        <strong>{mission.title}</strong>
        <small>⏱ {mission.time}</small>
      </span>
      <span className="recommended-mission-card__xp">+{mission.xp} XP</span>
    </button>
  )
}
