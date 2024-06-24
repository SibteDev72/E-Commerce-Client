import React from 'react'
import DashboardHeader from './DashboardHeader'
import './DashboardRoutes.scss'
import LeftSideMenu from './LeftSideMenu'
import { Outlet } from 'react-router-dom'

function DashboardRoutes() {
  return (
    <div className='Dasboard-Div'>
        <LeftSideMenu />
        <div className='header-Content-Div'>
            <DashboardHeader/>
            <div className='ContentDiv'>
              <Outlet />
            </div>
        </div>
    </div>
  )
}

export default DashboardRoutes