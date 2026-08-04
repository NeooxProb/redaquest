interface Props {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: 'home', icon: '🏠', label: 'Início' },
  { id: 'missions', icon: '⚔️', label: 'Missões' },
  { id: 'library', icon: '📚', label: 'Biblioteca' },
  { id: 'ranking', icon: '🏆', label: 'Ranking' },
  { id: 'profile', icon: '👤', label: 'Perfil' },
]

export default function BottomNav({ activeTab, onTabChange }: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 72,
        background: 'white',
        borderTop: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
        zIndex: 50,
      }}
    >
      {tabs.map((tab) => {
        const active = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              padding: '8px 0',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            {active && (
              <div
                style={{
                  position: 'absolute',
                  top: -1,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 32,
                  height: 3,
                  borderRadius: '0 0 4px 4px',
                  background: 'linear-gradient(90deg, #7C3AED, #3B82F6)',
                }}
              />
            )}
            <span style={{ fontSize: active ? 22 : 20, transition: 'font-size 0.2s' }}>
              {tab.icon}
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                fontFamily: 'Nunito',
                color: active ? '#7C3AED' : '#94a3b8',
                transition: 'color 0.2s',
              }}
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
