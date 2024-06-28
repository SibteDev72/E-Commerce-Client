import React, { useState } from 'react'
import Form from "react-bootstrap/Form";
import './SignUp.scss'
import { userSignIn } from '../../APIs/UserAPIs';

function SignIn() {

    const[userData, setuserData] = useState (
        {
            Email: '',
            Password: ''
        }
    )

    const changeHandler = (e) => {
        const newUserData = {...userData}
        newUserData[e.target.id] = e.target.value;
        setuserData(newUserData);
    }
    
    async function submitHandler(e){
        e.preventDefault();
        const response = await userSignIn(userData);
        localStorage.setItem('Token', response.data.token);
        localStorage.setItem('UserName', response.data.userName);
        localStorage.setItem('UserEmail', response.data.UserEmail);
        window.location.assign('/AdminDashboardRoute');
    }
    
  return (
    <div className='signUpDiv'>
        <button onClick={() => window.location.assign('/')} className='Top_Button' >Register</button>
        <Form className='SignUpForm' onSubmit={(e) => submitHandler(e)}>
            <Form.Group className='formgroup'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                className='SignUpFields'
                placeholder='Enter Email'
                type="text"
                id='Email'
                value={userData.Email}
                onChange = {(e) => changeHandler(e)}
                />
            </Form.Group>
            <Form.Group className='formgroup'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                className='SignUpFields'
                placeholder='Enter Password'
                type="password"
                id='Password'
                value = {userData.Password}
                onChange = {(e) => changeHandler(e)}
                />
            </Form.Group>
            <button>Sign In</button>
        </Form>
    </div>
  );
}

export default SignIn