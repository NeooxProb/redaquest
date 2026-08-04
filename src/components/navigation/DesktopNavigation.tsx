import { NAVIGATION_ITEMS } from '../../data/navigation'
import type { MainTab } from '../../types/navigation'

interface Props {
  activeTab: MainTab
  onTabChange: (tab: MainTab) => void
}

export default function DesktopNavigation({ activeTab, onTabChange }: Props) {
  return (
    <aside className="desktop-navigation">
      <div className="desktop-navigation__brand">
        <div className="desktop-navigation__logo" aria-hidden="true">✍️</div>
        <div>
          <div className="desktop-navigation__name">RedaQuest</div>
          <div className="desktop-navigation__tagline">Sua jornada até a nota 1000</div>
        </div>
      </div>

      <nav className="desktop-navigation__menu" aria-label="Navegação principal">
        {NAVIGATION_ITEMS.map((item) => {
          const active = activeTab === item.id

          return (
            <button
              key={item.id}
              type="button"
              className={`desktop-navigation__item${active ? ' desktop-navigation__item--active' : ''}`}
              onClick={() => onTabChange(item.id)}
              aria-current={active ? 'page' : undefined}
            >
              <span className="desktop-navigation__icon" aria-hidden="true">{item.icon}</span>
              <span className="desktop-navigation__copy">
                <strong>{item.label}</strong>
                <small>{item.description}</small>
              </span>
              <span className="desktop-navigation__arrow" aria-hidden="true">›</span>
            </button>
          )
        })}
      </nav>

      <div className="desktop-navigation__demo">
        <span className="desktop-navigation__demo-dot" aria-hidden="true" />
        <div>
          <strong>Modo demonstração</strong>
          <span>Dados simulados para apresentar o produto</span>
        </div>
      </div>
    </aside>
  )
}
