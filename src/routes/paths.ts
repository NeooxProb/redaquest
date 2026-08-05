import type { AppScreen, MainTab } from '../types/navigation'

export const APP_PATHS: Record<AppScreen, string> = {
  landing: '/',
  auth: '/entrar',
  home: '/app',
  missions: '/app/missoes',
  library: '/app/biblioteca',
  ranking: '/app/ranking',
  profile: '/app/perfil',
  write: '/app/redacao',
  correction: '/app/correcao',
  quiz: '/app/missoes/conectivos',
  'error-hunt': '/app/missoes/caca-aos-erros',
}

export const MAIN_TABS: MainTab[] = [
  'home',
  'missions',
  'library',
  'ranking',
  'profile',
]

export function getMainTabFromPath(
  pathname: string,
): MainTab | null {
  const entry = MAIN_TABS.find(
    (tab) => APP_PATHS[tab] === pathname,
  )

  return entry ?? null
}