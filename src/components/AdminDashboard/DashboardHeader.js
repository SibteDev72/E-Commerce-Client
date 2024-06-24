import React from 'react'
import './DashboardHeader.scss'
import MessageIcon from '@mui/icons-material/Message';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../../baseUrl';

function DashboardHeader() {

  const userToken = localStorage.getItem('Token');
  const[messageNumber, setMessageNumber] = useState(0);
  const[ArrowDownStatus, setArrowDownStatus] = useState(false);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    const MessageAPI = `${baseURL}/MessageInfo/getMessage`;
    axios.get(MessageAPI, { headers: {"x-access-token" : userToken}}).then((results) => {
      setMessageNumber(results.data.length);
    })
    .catch((error) => {
        console.log(error);
    })

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