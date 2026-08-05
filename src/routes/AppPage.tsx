import type { ComponentType } from 'react'
import { useOutletContext } from 'react-router-dom'
import type { AppOutletContext } from '../components/layout/AppLayout'
import useAppNavigation from '../hooks/useAppNavigation'
import type {
  AppEvents,
  NavProps,
} from '../types/navigation'

interface AppPageProps {
  component: ComponentType<NavProps>
}

const publicEvents: AppEvents = {
  triggerAchievement: () => undefined,
  triggerXP: () => undefined,
}

export default function AppPage({
  component: PageComponent,
}: AppPageProps) {
  const navigate = useAppNavigation()

  const outletContext =
    useOutletContext<AppOutletContext | undefined>()

  const events = outletContext?.events ?? publicEvents

  return (
    <PageComponent
      navigate={navigate}
      events={events}
    />
  )
}