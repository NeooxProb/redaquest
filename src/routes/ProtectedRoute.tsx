import {
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { APP_PATHS } from './paths'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div
        style={{
          alignItems: 'center',
          background:
            'linear-gradient(145deg, #ede9fe, #eff6ff)',
          display: 'flex',
          fontFamily: 'Nunito, sans-serif',
          height: '100vh',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #ddd6fe',
            borderRadius: 22,
            boxShadow:
              '0 18px 45px rgba(76, 29, 149, 0.12)',
            color: '#6d28d9',
            fontSize: 14,
            fontWeight: 900,
            padding: '22px 28px',
          }}
        >
          ⚔️ Carregando sua jornada...
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <Navigate
        to={APP_PATHS.auth}
        replace
        state={{
          from: location.pathname,
        }}
      />
    )
  }

  return <Outlet />
}