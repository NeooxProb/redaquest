import { useState, useCallback } from 'react'
import HomeScreen from './screens/HomeScreen'
import MissionsScreen from './screens/MissionsScreen'
import LibraryScreen from './screens/LibraryScreen'
import RankingScreen from './screens/RankingScreen'
import ProfileScreen from './screens/ProfileScreen'
import WriteScreen from './screens/WriteScreen'
import CorrectionScreen from './screens/CorrectionScreen'
import QuizScreen from './screens/QuizScreen'
import ErrorHuntScreen from './screens/ErrorHuntScreen'
import BottomNav from './components/BottomNav'
import AchievementToast from './components/AchievementToast'
import FloatingXP from './components/FloatingXP'

export type Screen =
  | 'home'
  | 'missions'
  | 'library'
  | 'ranking'
  | 'profile'
  | 'write'
  | 'correction'
  | 'quiz'
  | 'error-hunt'

export interface Achievement {
  icon: string
  title: string
  xp: number
}

export interface AppEvents {
  triggerAchievement: (a: Achievement) => void
  triggerXP: (amount: number, x?: number, y?: number) => void
}

export interface NavProps {
  navigate: (s: Screen) => void
  events: AppEvents
}

const MAIN_TABS = ['home', 'missions', 'library', 'ranking', 'profile']

interface XPFloat {
  id: number
  amount: number
  x: number
  y: number
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [activeTab, setActiveTab] = useState('home')
  const [screenKey, setScreenKey] = useState(0)
  const [achievement, setAchievement] = useState<Achievement | null>(null)
  const [xpFloats, setXpFloats] = useState<XPFloat[]>([])
  const [xpFloatId, setXpFloatId] = useState(0)

  const navigate = useCallback((s: Screen) => {
    setScreen(s)
    setScreenKey((k) => k + 1)
    if (MAIN_TABS.includes(s)) setActiveTab(s)
  }, [])

  const triggerAchievement = useCallback((a: Achievement) => {
    setAchievement(a)
  }, [])

  const triggerXP = useCallback((amount: number, x = 160, y = 300) => {
    setXpFloatId((id) => {
      const newId = id + 1
      setXpFloats((prev) => [...prev, { id: newId, amount, x, y }])
      return newId
    })
  }, [])

  const events: AppEvents = { triggerAchievement, triggerXP }
  const showNav = MAIN_TABS.includes(screen)

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0d0b2b 0%, #1e1b4b 40%, #312e81 80%, #1e1b4b 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      {/* Decorative background orbs */}
      <div
        style={{
          position: 'fixed',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)',
          top: '10%',
          left: '10%',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'fixed',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
          bottom: '15%',
          right: '10%',
          pointerEvents: 'none',
        }}
      />

      {/* Phone frame */}
      <div
        style={{
          width: 390,
          height: 844,
          borderRadius: 44,
          background: '#F0F4FF',
          boxShadow:
            '0 0 0 12px #0d0b2b, 0 0 0 14px rgba(124,58,237,0.4), 0 60px 140px rgba(0,0,0,0.9)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        {/* Achievement toast (renders inside phone frame) */}
        <AchievementToast
          achievement={achievement}
          onClose={() => setAchievement(null)}
        />

        {/* Floating XP bubbles */}
        {xpFloats.map((f) => (
          <FloatingXP
            key={f.id}
            amount={f.amount}
            x={f.x}
            y={f.y}
            onDone={() => setXpFloats((prev) => prev.filter((x) => x.id !== f.id))}
          />
        ))}

        {/* Status Bar */}
        <div
          style={{
            flexShrink: 0,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 28px',
            background: 'transparent',
            position: 'relative',
            zIndex: 20,
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 800, color: '#1e293b', fontFamily: 'Nunito' }}>
            9:41
          </span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <svg width="17" height="12" viewBox="0 0 17 12">
              <rect x="0" y="4" width="3" height="8" rx="1" fill="#1e293b" />
              <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" fill="#1e293b" />
              <rect x="9" y="1" width="3" height="11" rx="1" fill="#1e293b" />
              <rect x="13.5" y="0" width="3" height="12" rx="1" fill="#1e293b" opacity="0.3" />
            </svg>
            <svg width="16" height="12" viewBox="0 0 16 12">
              <path d="M8 1.5C5 1.5 2.3 2.8 0.5 5L2.2 6.7C3.5 5 5.6 4 8 4c2.4 0 4.5 1 5.8 2.7L15.5 5C13.7 2.8 11 1.5 8 1.5z" fill="#1e293b" />
              <path d="M8 5.5c-1.8 0-3.2.7-4.2 1.8L5.5 9C6.1 8.4 7 8 8 8s1.9.4 2.5 1l1.7-1.7C11.2 6.2 9.8 5.5 8 5.5z" fill="#1e293b" />
              <circle cx="8" cy="11" r="1.5" fill="#1e293b" />
            </svg>
            <svg width="26" height="12" viewBox="0 0 26 12">
              <rect x="0.75" y="0.75" width="21.5" height="10.5" rx="2.25" stroke="#1e293b" strokeWidth="1.5" fill="none" />
              <rect x="2.5" y="2.5" width="15" height="7" rx="1" fill="#1e293b" />
              <path d="M23.5 4.5v3c.8-.4 1.3-1 1.3-1.5s-.5-1.1-1.3-1.5z" fill="#1e293b" />
            </svg>
          </div>
        </div>

        {/* Screen content */}
        <div
          key={screenKey}
          className="screen-slide"
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingBottom: showNav ? 72 : 0,
          }}
        >
          {screen === 'home'       && <HomeScreen navigate={navigate} events={events} />}
          {screen === 'missions'   && <MissionsScreen navigate={navigate} events={events} />}
          {screen === 'library'    && <LibraryScreen navigate={navigate} events={events} />}
          {screen === 'ranking'    && <RankingScreen navigate={navigate} events={events} />}
          {screen === 'profile'    && <ProfileScreen navigate={navigate} events={events} />}
          {screen === 'write'      && <WriteScreen navigate={navigate} events={events} />}
          {screen === 'correction' && <CorrectionScreen navigate={navigate} events={events} />}
          {screen === 'quiz'       && <QuizScreen navigate={navigate} events={events} />}
          {screen === 'error-hunt' && <ErrorHuntScreen navigate={navigate} events={events} />}
        </div>

        {/* Bottom Nav */}
        {showNav && (
          <BottomNav activeTab={activeTab} onTabChange={(t) => navigate(t as Screen)} />
        )}
      </div>
    </div>
  )
}
