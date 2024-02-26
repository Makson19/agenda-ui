import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {

  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  )
}

export default Layout