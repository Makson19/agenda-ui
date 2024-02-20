import React from 'react'
import { Box, Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useDrawerContext } from '../../contenxts/DrawerContext'

interface ILayoutProps {
  children: React.ReactNode
  title: string
}

const Layout: React.FC<ILayoutProps> = ({ children, title }) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const theme = useTheme()
  const { toggleDrawerOpen } = useDrawerContext()

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Box sx={{ padding: 1, height: theme.spacing(smDown ? 6 : mdDown ? 8 : 12), display: 'flex', alignItems: 'center', gap: 1 }}>
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography
          variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
          sx={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
          }}
        >
          {title}
        </Typography>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {children}
      </Box>
    </Box>
  )
}

export default Layout