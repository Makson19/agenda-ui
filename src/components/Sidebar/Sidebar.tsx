import React from 'react'
import { Box } from '@mui/system'
import { Divider, Drawer, Icon, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Theme, useMediaQuery, useTheme, Typography } from '@mui/material'
import { CSSObject, styled } from '@mui/material/styles'
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom'
import { useDrawerContext } from '../../contenxts/DrawerContext'
import { useAppThemeContext } from '../../contenxts/ThemeContext'

interface ISidebarProps {
  children: React.ReactNode
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: theme.spacing(28),
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(8)} + 1px)`,
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  flexDirection: 'column',
  gap: '12px',
  justifyContent: 'center',
  padding: '8px 8px 40px',
  ...theme.mixins.toolbar,
}))

const DrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    // width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

interface IMenuItemLinkProps {
  label: string
  icon: string
  to: string
  onClick: (() => void) | undefined
}

const MenuItemLink: React.FC<IMenuItemLinkProps> = ({ to, label, icon, onClick }) => {
  const navigate = useNavigate()
  const resolvedPath = useResolvedPath(to)
  const match = useMatch({ path: resolvedPath.pathname, end: false })

  const handleClick = () => {
    navigate(to)
    onClick?.()
  }

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  )
}

const Sidebar: React.FC<ISidebarProps> = ({ children }) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext()
  const { themeName, toggleTheme } = useAppThemeContext()

  return (
    <>
      {!smDown && (
        <DrawerStyled open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'}>
          <Box
            width='100%'
            height='100%'
            display='flex'
            flexDirection='column'
          >

            <DrawerHeader>
              <IconButton onClick={toggleDrawerOpen}>
                <Icon>{isDrawerOpen ? 'chevron_left' : 'chevron_right'}</Icon>
              </IconButton>

              <Box
                width='100%'
                display='flex'
                alignItems='center'
                justifyContent='center'
                gap='4px'
              >
                <Icon sx={{ fontSize: 40 }}>contacts</Icon>
                <Typography variant='h6' sx={{ display: isDrawerOpen ? 'initial' : 'none' }}>Agenda.App</Typography>
              </Box>
            </DrawerHeader>

            <Divider />

            <Box flex={1}>
              <List component='nav'>
                <MenuItemLink
                  label='Dashboard'
                  icon='bar_chart'
                  to='/'
                  onClick={undefined}
                />
              </List>
            </Box>

            <Box mb={2}>
              <List component='nav'>
                <ListItemButton onClick={toggleTheme}>
                  <ListItemIcon>
                    <Icon>{themeName === 'light' ? 'dark_mode' : 'light_mode'}</Icon>
                  </ListItemIcon>
                  <ListItemText primary='Alternar tema' />
                </ListItemButton>
              </List>
            </Box>
          </Box>
        </DrawerStyled>
      )}

      {smDown && (
        <Drawer open={isDrawerOpen} variant='temporary' onClose={toggleDrawerOpen}>
          <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column'>
            <Box
              width='100%'
              // textAlign='center'
              display='flex'
              alignItems='center'
              justifyContent='center'
              gap='4px'
              padding='56px 8px 40px'
            >
              <Icon sx={{ fontSize: 40 }}>contacts</Icon>
              <Typography variant='h6' sx={{ display: isDrawerOpen ? 'initial' : 'none' }}>Agenda.App</Typography>
            </Box>

            <Divider />

            <Box flex={1}>
              <List component='nav'>
                <MenuItemLink
                  label='Dashboard'
                  icon='bar_chart'
                  to='/'
                  onClick={smDown && toggleDrawerOpen}
                />
              </List>
            </Box>

            <Box mb={2}>
              <List component='nav'>
                <ListItemButton onClick={toggleTheme}>
                  <ListItemIcon>
                    <Icon>{themeName === 'light' ? 'dark_mode' : 'light_mode'}</Icon>
                  </ListItemIcon>
                  <ListItemText primary='Alternar tema' />
                </ListItemButton>
              </List>
            </Box>
          </Box>

        </Drawer >
      )}

      <Box height='100vh' marginLeft={smDown ? 0 : isDrawerOpen ? theme.spacing(28) : `calc(${theme.spacing(8)} + 1px)`}>
        {children}
      </Box>
    </>
  )
}

export default Sidebar