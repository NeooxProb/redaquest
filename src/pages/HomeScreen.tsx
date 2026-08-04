import { useEffect, useState } from 'react'
import ContinueMissionCard from '../components/cards/ContinueMissionCard'
import DailyChallengeCard from '../components/cards/DailyChallengeCard'
import EssayActionCard from '../components/cards/EssayActionCard'
import HomeStatCard from '../components/cards/HomeStatCard'
import RecommendedMissionCard from '../components/cards/RecommendedMissionCard'
import HomeHeader from '../components/home/HomeHeader'
import { HOME_STATS, RECOMMENDED_MISSIONS } from '../data/home'
import type { NavProps } from '../types/navigation'

export default function HomeScreen({ navigate, events }: NavProps) {
  const [xpDisplay, setXpDisplay] = useState(3100)

  useEffect(() => {
    const target = 3240
    const step = Math.ceil((target - 3100) / 20)
    let current = 3100

    const interval = window.setInterval(() => {
      current = Math.min(current + step, target)
      setXpDisplay(current)

      if (current >= target) {
        window.clearInterval(interval)
      }
    }, 40)

    return () => window.clearInterval(interval)
  }, [])

  const continueMission = () => {
    events.triggerXP(5, 195, 360)
    navigate('missions')
  }

  return (
    <div className="home-page">
      <HomeHeader xpDisplay={xpDisplay} />

      <div className="home-dashboard">
        <div className="home-dashboard__primary">
          <ContinueMissionCard onClick={continueMission} />
          <DailyChallengeCard completed={2} total={3} />
        </div>

        <div className="home-dashboard__secondary">
          <div className="home-stats" aria-label="Resumo do desempenho">
            {HOME_STATS.map((stat) => (
              <HomeStatCard key={stat.label} stat={stat} />
            ))}
          </div>

          <EssayActionCard onClick={() => navigate('write')} />
        </div>

        <section className="home-recommendations" aria-labelledby="recommended-title">
          <h2 id="recommended-title">🎯 Recomendadas para você</h2>
          <div className="home-recommendations__grid">
            {RECOMMENDED_MISSIONS.map((mission) => (
              <RecommendedMissionCard
                key={mission.title}
                mission={mission}
                onClick={() => navigate(mission.screen)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
