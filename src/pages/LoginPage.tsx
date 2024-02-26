import { useEffect } from 'react'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/Form/LoginForm'
import { RootState } from '../store'

const LoginPage = () => {
  const navigate = useNavigate()
  const { isLogged } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    isLogged && navigate('/')
  }, [isLogged])

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        paddingInline: '16px',
        width: '100%'
      }}
    >
      <LoginForm />
    </Box>
  )
}

export default LoginPage