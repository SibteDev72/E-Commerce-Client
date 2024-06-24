import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ShowFooter = ({children}) => {

    const Location = useLocation();
    const[showFooter, setshowFooter] = useState(false); 

    useEffect(() => {
        if(Location.pathname === '/' || Location.pathname === '/SignIn' 
        || Location.pathname === '/ConfirmationPage' || Location.pathname === '/AdminDashboardRoute'
        || Location.pathname === '/AdminDashboardRoute/DAaddProduct' || Location.pathname === '/AdminDashboardRoute/DAProduct'
        || Location.pathname === '/AdminDashboardRoute/DAOrders' || Location.pathname === '/AdminDashboardRoute/DAEditProduct'
        || Location.pathname === '/AdminDashboardRoute/DAProfileInfoPage'){
            setshowFooter(false);
        }else{
            setshowFooter(true);
        }
    }, [Location])

  return (
    <div>{showFooter && children}</div>
  ) 
}

export default ShowFooter