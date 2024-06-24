import React from 'react'
import { Link } from 'react-router-dom'
import './LeftSideMenu.scss'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function LeftSideMenu() {
  return (
    <div className='LM-Div'>
        <div className='headingD'>
            <DashboardOutlinedIcon className='IconD' />
            <p className='HAD'>Admin Dashboard</p>
        </div>
        <Link to='/AdminDashboardRoute' className='headingOpt'>
            <TimelineOutlinedIcon className='IconOpt' />
            <p className='HOpt'>Overview</p>
        </Link>
        <Link to='/AdminDashboardRoute/DAaddProduct' className='headingOpt'>
            <AddShoppingCartOutlinedIcon className='IconOpt' />
            <p className='HOpt'>Add Products</p>
        </Link>
        <Link to='/AdminDashboardRoute/DAProduct' className='headingOpt'>
            <Inventory2OutlinedIcon className='IconOpt' />
            <p className='HOpt'>Products</p>
        </Link>
        <Link  to='/AdminDashboardRoute/DAOrders' className='headingOpt'>
            <FactCheckOutlinedIcon className='IconOpt' />
            <p className='HOpt'>Orders List</p>
        </Link>
        <div onClick={() => window.open('/HomePage', '_blank')} className='headingOpt'>
            <StoreOutlinedIcon className='IconOpt' />
            <p className='HOpt'>Visit Online Store</p>
        </div>
        <Link  to='/AdminDashboardRoute/DAProfileInfoPage' className='headingSt'>
            <InfoOutlinedIcon className='IconSt' />
            <p className='HSt'>Profile Info</p>
        </Link>
    </div>
  )
}

export default LeftSideMenu