import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { APP_PATHS } from '../routes/paths'
import type { AppScreen } from '../types/navigation'

export default function useAppNavigation() {
  const routerNavigate = useNavigate()

  return useCallback(
    (screen: AppScreen) => {
      routerNavigate(APP_PATHS[screen])
    },
    [routerNavigate],
  )
}
