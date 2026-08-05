import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import CorrectionScreen from '../pages/CorrectionScreen'
import ErrorHuntScreen from '../pages/ErrorHuntScreen'
import HomeScreen from '../pages/HomeScreen'
import LandingScreen from '../pages/LandingScreen'
import LibraryScreen from '../pages/LibraryScreen'
import MissionsScreen from '../pages/MissionsScreen'
import ProfileScreen from '../pages/ProfileScreen'
import QuizScreen from '../pages/QuizScreen'
import RankingScreen from '../pages/RankingScreen'
import WriteScreen from '../pages/WriteScreen'
import AppPage from './AppPage'
import { APP_PATHS } from './paths'

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path={APP_PATHS.landing}
        element={<AppPage component={LandingScreen} />}
      />

      <Route element={<AppLayout />}>
        <Route
          path={APP_PATHS.home}
          element={<AppPage component={HomeScreen} />}
        />

        <Route
          path={APP_PATHS.missions}
          element={<AppPage component={MissionsScreen} />}
        />

        <Route
          path={APP_PATHS.library}
          element={<AppPage component={LibraryScreen} />}
        />

        <Route
          path={APP_PATHS.ranking}
          element={<AppPage component={RankingScreen} />}
        />

        <Route
          path={APP_PATHS.profile}
          element={<AppPage component={ProfileScreen} />}
        />

        <Route
          path={APP_PATHS.write}
          element={<AppPage component={WriteScreen} />}
        />

        <Route
          path={APP_PATHS.correction}
          element={<AppPage component={CorrectionScreen} />}
        />

        <Route
          path={APP_PATHS.quiz}
          element={<AppPage component={QuizScreen} />}
        />

        <Route
          path={APP_PATHS['error-hunt']}
          element={<AppPage component={ErrorHuntScreen} />}
        />
      </Route>

      <Route
        path="*"
        element={
          <Navigate to={APP_PATHS.landing} replace />
        }
      />
    </Routes>
  )
}