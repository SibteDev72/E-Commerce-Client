import React, { useState } from 'react'
import Form from "react-bootstrap/Form";
import axios from 'axios';
import './SignUp.scss'
import { baseURL } from '../../baseUrl';

function SignUp() {

    const[userData, setuserData] = useState (
        {
            Name: '',
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
        axios.post(`${baseURL}/User/signUp`, userData).then((result) => {
            console.log(result);
            window.location.assign('/SignIn');
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    function signInclicked(){
        window.location.assign('/SignIn')
    }

  return (
    <div className='signUpDiv'>
        <button onClick={() => signInclicked()} className='Top_Button' >Sign In</button>
        <Form className='SignUpForm' onSubmit={(e) => submitHandler(e)}>
            <Form.Group className='formgroup'>
                <Form.Label>User Name</Form.Label>
                <Form.Control
                placeholder='Enter Name'
                className='SignUpFields'
                type="text"
                id='Name'
                value = {userData.Name}
                onChange = {(e) => changeHandler(e)}
                />
            </Form.Group>
            <Form.Group className='formgroup'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                className='SignUpFields'
                placeholder='Enter Email'
                type="email"
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
            <button>Sign Up</button>
        </Form>
    </div>
  );
}

export default SignUp

