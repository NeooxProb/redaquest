import EnergyHearts from '../feedback/EnergyHearts'
import ProgressBar from '../ui/ProgressBar'

interface HomeHeaderProps {
  xpDisplay: number
}

export default function HomeHeader({ xpDisplay }: HomeHeaderProps) {
  return (
    <header className="home-header">
      <div className="home-header__topline">
        <div className="home-user">
          <div className="home-user__avatar" aria-hidden="true">🦁</div>
          <div className="home-user__copy">
            <span className="home-user__welcome">Bem-vindo de volta,</span>
            <h1>Lucas Mendes</h1>
            <span className="home-user__level">Nível 12 · Escritor Épico</span>
          </div>
        </div>

        <div className="streak-badge" aria-label="Sequência de 18 dias">
          <span className="streak-badge__icon" aria-hidden="true">🔥</span>
          <span className="streak-badge__copy">
            <strong>18</strong>
            <small>dias</small>
          </span>
        </div>
      </div>

      <div className="home-xp">
        <div className="home-xp__labels">
          <span>⚡ {xpDisplay.toLocaleString('pt-BR')} XP</span>
          <span>Meta: 4.000 XP</span>
        </div>
        <ProgressBar
          current={3240}
          max={4000}
          color="#ffffff"
          label="Progresso mensal de experiência"
        />
      </div>

      <div className="home-energy">
        <div className="home-energy__group">
          <span>Energia:</span>
          <EnergyHearts current={4} max={5} />
        </div>
        <span className="home-energy__timer">+1 em 18min</span>
      </div>
    </header>
  )
}
