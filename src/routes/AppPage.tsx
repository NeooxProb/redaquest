import type { ComponentType } from 'react'
import { useOutletContext } from 'react-router-dom'
import type { AppOutletContext } from '../components/layout/AppLayout'
import useAppNavigation from '../hooks/useAppNavigation'
import type { NavProps } from '../types/navigation'

interface AppPageProps {
  component: ComponentType<NavProps>
}

export default function AppPage({ component: PageComponent }: AppPageProps) {
  const navigate = useAppNavigation()
  const { events } = useOutletContext<AppOutletContext>()

  return <PageComponent navigate={navigate} events={events} />
}
