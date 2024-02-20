import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { AppThemeProvider } from './contenxts/ThemeContext'
import Sidebar from './components/Sidebar/Sidebar'
import { DrawerProvider } from './contenxts/DrawerContext'

function App() {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <Sidebar>
            <AppRoutes />
          </Sidebar>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  )
}

export default App
