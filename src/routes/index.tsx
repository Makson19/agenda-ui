import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import DashboardPage from '../pages/DashboardPage'
import LoginPage from '../pages/LoginPage'
import Layout from '../components/Layout/Layout'
import NewContactPage from '../pages/NewContactPage'
import { RootState } from '../store'
import SignupPage from '../pages/SignupPage'

const PrivateRoute = ({ children, redirectTo }: any) => {
  const { isLogged } = useSelector((state: RootState) => state.auth)
  const isAuthenticated = isLogged
  return isAuthenticated ? children : <Navigate to={redirectTo} />
}

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/cadastrar' element={<SignupPage />} />
      <Route path='/'
        element={
          <PrivateRoute redirectTo='/login'>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path='/novo-contato' element={<NewContactPage />} />
      </Route>
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}
