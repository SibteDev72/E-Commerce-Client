import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ShowNavbar = ({children}) => {

    const Location = useLocation();
    const[showNav, setshowNav] = useState(false); 

    useEffect(() => {
        if(Location.pathname === '/' || Location.pathname === '/SignIn' 
        || Location.pathname === '/ConfirmationPage' || Location.pathname === '/AdminDashboardRoute'
        || Location.pathname === '/AdminDashboardRoute/DAaddProduct' || Location.pathname === '/AdminDashboardRoute/DAProduct'
        || Location.pathname === '/AdminDashboardRoute/DAOrders' || Location.pathname === '/AdminDashboardRoute/DAEditProduct'
        || Location.pathname === '/AdminDashboardRoute/DAProfileInfoPage'){
            setshowNav(false);
        }else{
            setshowNav(true);
        }
    }, [Location])

  return (
    <div>{showNav && children}</div>
  ) 
}

export default ShowNavbar