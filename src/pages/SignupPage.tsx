import { Box, Theme, useMediaQuery } from '@mui/material'
import SignupForm from '../components/Form/SignupForm'

const SignupPage = () => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        height: smDown ? 'fit-content' : '100vh',
        justifyContent: 'center',
        padding: '16px',
        overflow: 'auto'
      }}
    >
      <SignupForm />
    </Box>
  )
}

export default SignupPage