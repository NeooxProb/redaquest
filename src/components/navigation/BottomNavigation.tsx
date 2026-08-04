import { NAVIGATION_ITEMS } from '../../data/navigation'
import type { MainTab } from '../../types/navigation'

interface Props {
  activeTab: MainTab
  onTabChange: (tab: MainTab) => void
}

export default function BottomNavigation({ activeTab, onTabChange }: Props) {
  return (
    <nav className="bottom-navigation" aria-label="Navegação principal">
      {NAVIGATION_ITEMS.map((tab) => {
        const active = activeTab === tab.id

        return (
          <button
            key={tab.id}
            type="button"
            className={`bottom-navigation__item${active ? ' bottom-navigation__item--active' : ''}`}
            onClick={() => onTabChange(tab.id)}
            aria-current={active ? 'page' : undefined}
          >
            <span className="bottom-navigation__indicator" aria-hidden="true" />
            <span className="bottom-navigation__icon" aria-hidden="true">
              {tab.icon}
            </span>
            <span className="bottom-navigation__label">{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
