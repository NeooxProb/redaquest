import type { HomeStat } from '../../types/home'

interface HomeStatCardProps {
  stat: HomeStat
}

export default function HomeStatCard({ stat }: HomeStatCardProps) {
  return (
    <article className="home-stat-card">
      <span className="home-stat-card__icon" aria-hidden="true">{stat.icon}</span>
      <strong>{stat.value}</strong>
      <span>{stat.label}</span>
    </article>
  )
}
