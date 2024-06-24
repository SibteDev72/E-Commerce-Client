import React from 'react'
import './Footer.scss'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

function Footer() {
    function clicked(){
        localStorage.setItem("ProductCategory", 'Boski');
        window.location.assign('/ProductPage');
    }
  return (
    <div className='footer-Container'>
        <Row className='footer-Details'>
            <Col sm={12} md={4} lg={4} xl={4} xxl={4} className='Detial-1'>
                <p>Subscribe to receive More News</p>
                <div className='D1-Div'>
                    <Form.Group>
                        <Form.Control
                        className='Emailform'
                        type="email"
                        name="email"
                        value='Email'
                        />
                    </Form.Group>
                    <button className='SignUp-BTN'>Sign Up</button>
                </div>
            </Col>
            <Col sm={12} md={4} lg={4} xl={4} xxl={4} className='Detial-2'>
                <p className='heading2'>Help</p>
                <div className='D2-Div'>
                    <p id='opt'>Shipping</p>
                    <p id='opt'onClick={() => {window.location.assign('/ContactUSPage')}}>Contact Us</p>
                </div>
                <p id='opt1'>Returns/Exchange</p>
            </Col>
            <Col sm={12} md={4} lg={4} xl={4} xxl={4} className='Detial-3'>
                <p className='heading3'>Explore</p>
                <div className='D3-Div'>
                    <p className='opt3'>About Us</p>
                    <p className='opt3' onClick={() => clicked()}>Get the look</p>
                </div>
            </Col>
        </Row>
        <Row className='footer-SocialMedia'>
            <Col sm={12} md={12} lg={12} xl={12} xxl={12} className='Media-Icons'>
                <FacebookIcon className='icons' onClick={() => {window.open('https://www.facebook.com/binyousafclothing', '_blank')}}/>
                <InstagramIcon className='icons' onClick={() => {window.open('https://www.instagram.com/binyousafclothing/', '_blank')}}/>
            </Col>
        </Row>
    </div>
  )
}

export default Footer