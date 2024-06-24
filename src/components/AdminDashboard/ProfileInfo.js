import React from 'react'
import './ProfileInfo.scss'

function ProfileInfo() {

  return (
    <>
    <h3>Profile Info</h3> 
    <div className='ProfileInfoDiv'>
        <p><b>UserName:</b> {localStorage.getItem('UserName')}</p>
        <p><b>UserEmail:</b> {localStorage.getItem('UserEmail')}</p>
        <button onClick={() => window.location.assign('/SignIn')}>Log Out</button>
    </div>
    </>
  )
}

export default ProfileInfo