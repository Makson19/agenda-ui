import { Box, useMediaQuery, useTheme } from '@mui/material'
import { useDrawerContext } from '../contenxts/DrawerContext'
import Header from '../components/Header/Header'

const DashboardPage = () => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const { isDrawerOpen } = useDrawerContext()

  return (
    <Box height='100vh' marginLeft={smDown ? 0 : isDrawerOpen ? theme.spacing(28) : `calc(${theme.spacing(8)} + 1px)`}>
      <Header title='Dashboard' />
      Dashboard
    </Box>
  )
}

export default DashboardPage