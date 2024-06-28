import React from 'react'
import { useState, useEffect } from 'react';
import './DashboardHeader.scss'
import MessageIcon from '@mui/icons-material/Message';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { getMessage } from '../../APIs/MessageAPIs';

function DashboardHeader() {

  const[messageNumber, setMessageNumber] = useState(0);
  const[ArrowDownStatus, setArrowDownStatus] = useState(false);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMessage()
      setMessageNumber(response.data.length);
    }
    fetchData();
  }, [])

  return (
    <div className='DH-Div'>
        <div className='ProfileSettings'>
          <p> {currentDate} </p>
        </div>
        <div className='ProfileDetails'>
          <div className='Msg-Div'>
            <MessageIcon className='MsgIcn' />
            <p className='counter'>{messageNumber}</p>
          </div>
          <p className='PRName'>{localStorage.getItem('UserName')}</p>
          <div className='ArdDIV'>
            <ArrowDropDownIcon onMouseOver={() => setArrowDownStatus(true)}
            onMouseOut={() => setArrowDownStatus(false)} className='ARDDIcn' />
            <div onMouseOver={() => setArrowDownStatus(true)}
            onMouseOut={() => setArrowDownStatus(false)}
            style={{display: ArrowDownStatus === false && 'none'}} className='PFPointyHead'></div>
            <div onMouseOver={() => setArrowDownStatus(true)}
            onMouseOut={() => setArrowDownStatus(false)}  
            style={{display: ArrowDownStatus === false && 'none'}} className='PFDiv'>
              <p onClick={() => window.location.assign('/SignIn')}>Logout</p>
              <p onClick={() => window.location.assign('/')}>SignUp</p>
            </div>
          </div>
        </div>
    </div>
  )
}
export default DashboardHeader