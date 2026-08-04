import { useCallback, useMemo, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { APP_PATHS, getMainTabFromPath } from '../../routes/paths'
import type { Achievement, AppEvents, MainTab } from '../../types/navigation'
import AchievementToast from '../feedback/AchievementToast'
import FloatingXP from '../feedback/FloatingXP'
import BottomNavigation from '../navigation/BottomNavigation'
import DesktopNavigation from '../navigation/DesktopNavigation'
import StatusBar from './StatusBar'

interface XPFloat {
  id: number
  amount: number
  x: number
  y: number
}

export interface AppOutletContext {
  events: AppEvents
}

export default function AppLayout() {
  const location = useLocation()
  const routerNavigate = useNavigate()
  const [achievement, setAchievement] = useState<Achievement | null>(null)
  const [xpFloats, setXpFloats] = useState<XPFloat[]>([])
  const [nextXPFloatId, setNextXPFloatId] = useState(0)

  const triggerAchievement = useCallback((newAchievement: Achievement) => {
    setAchievement(newAchievement)
  }, [])

  const triggerXP = useCallback((amount: number, x = 160, y = 300) => {
    setNextXPFloatId((currentId) => {
      const id = currentId + 1
      setXpFloats((currentFloats) => [...currentFloats, { id, amount, x, y }])
      return id
    })
  }, [])

  const events = useMemo<AppEvents>(
    () => ({ triggerAchievement, triggerXP }),
    [triggerAchievement, triggerXP],
  )

  const activeTab = getMainTabFromPath(location.pathname)
  const showNavigation = activeTab !== null
  const isHome = location.pathname === APP_PATHS.home

  const handleTabChange = (tab: MainTab) => {
    routerNavigate(APP_PATHS[tab])
  }

  return (
    <main className="app-background">
      <div className="background-orb background-orb--purple" />
      <div className="background-orb background-orb--blue" />

      <section
        className={`app-shell${showNavigation ? ' app-shell--navigation' : ' app-shell--focus'}`}
        aria-label="Demonstração do aplicativo RedaQuest"
      >
        {showNavigation && activeTab && (
          <DesktopNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        )}

        <div className="app-viewport">
          <AchievementToast
            achievement={achievement}
            onClose={() => setAchievement(null)}
          />

          {xpFloats.map((float) => (
            <FloatingXP
              key={float.id}
              amount={float.amount}
              x={float.x}
              y={float.y}
              onDone={() =>
                setXpFloats((currentFloats) =>
                  currentFloats.filter((item) => item.id !== float.id),
                )
              }
            />
          ))}

          <StatusBar />

          <div
            key={location.pathname}
            className={`app-screen screen-slide${showNavigation ? ' app-screen--with-navigation' : ''}${isHome ? ' app-screen--home' : ' app-screen--standard'}`}
          >
            <Outlet context={{ events } satisfies AppOutletContext} />
          </div>

          {showNavigation && activeTab && (
            <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
          )}
        </div>
      </section>
    </main>
  )
}
