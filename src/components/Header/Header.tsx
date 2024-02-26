import { Box, Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useDrawerContext } from '../../contenxts/DrawerContext'

interface IHeaderProps {
  title: string
}

const Header: React.FC<IHeaderProps> = ({ title }) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const theme = useTheme()
  const { toggleDrawerOpen } = useDrawerContext()

  return (
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
  )
}

export default Header