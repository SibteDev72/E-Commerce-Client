import React, { useState } from 'react'
import Form from "react-bootstrap/Form";
import axios from 'axios';
import './SignUp.scss'
import { baseURL } from '../../baseUrl';

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
    
    const submitHandler  = (e) => {
        e.preventDefault();
        axios.post(`${baseURL}/User/signIn`, userData).then((result) => {
            localStorage.setItem('Token', result.data.token);
            localStorage.setItem('UserName', result.data.userName);
            localStorage.setItem('UserEmail', result.data.UserEmail);
            window.location.assign('/AdminDashboardRoute');
        })
        .catch((error) => {
            console.log(error);
        })
    }

    function Registerclicked(){
        window.location.assign('/')
    }

  return (
    <div className='signUpDiv'>
        <button onClick={() => Registerclicked()} className='Top_Button' >Register</button>
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