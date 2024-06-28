import React, { useState } from 'react'
import './ContactUS.scss'
import Form from "react-bootstrap/Form";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import { addMessage } from '../../APIs/MessageAPIs';

function ContactUs() {
    
    const[MessageData, setMessageData] = useState(
        {
            MessageDate: '',
            Name: '',
            Email: '',
            PHNum: '',
            Message: ''
        }
    )

    function ChangeHandler(e){
        const newMessageData = {...MessageData}
        newMessageData[e.target.name] = e.target.value;
        setMessageData(newMessageData);
    }

    async function submitForm(){
        const currentDate = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        MessageData.MessageDate = currentDate;
        const response = await addMessage(MessageData)
        console.log(response.data);
        alert('Message Sent')
        window.location.assign('/HomePage')
    }
    
  return (
    <div className='CUS-Div'>
        <div className='MessageDetails'>
            <p className='MDHead'>Contact us for any questions</p>
            <Form className='Forms'>
                <Form.Group className='formgroup'>
                <Form.Control
                    className='field'
                    type="text"
                    placeholder='Name'
                    name="Name"
                    value = {MessageData.Name}
                    onChange = {(event) => ChangeHandler(event)}
                    />
                </Form.Group>
                <Form.Group className='formgroup'>
                <Form.Control
                    className='field'
                    type="Email"
                    placeholder='Email'
                    name="Email"
                    value = {MessageData.Email}
                    onChange = {(event) => ChangeHandler(event)}
                    />
                </Form.Group>
                <Form.Group className='formgroup'>
                <Form.Control
                    className='field'
                    type="Number"
                    placeholder='Phone Number'
                    name="PHNum"
                    value = {MessageData.PHNum}
                    onChange = {(event) => ChangeHandler(event)}
                    />
                </Form.Group>
                <FloatingLabel
                controlId="floatingTextarea"
                label="How can we help?"
                className='formgroup'
                >
                <Form.Control
                className='Messagefield'
                as="textarea" 
                name='Message'
                value = {MessageData.Message} 
                onChange = {(event) => ChangeHandler(event)}
                />
                </FloatingLabel>
            </Form>
            <button onClick={() => submitForm()} className='SMSG'>Send Message</button>
        </div>
        <div className='OfficeDetails'>
            <p className='ODHead'>Get Info</p>
            <div className='Location'>
                <img className='Icon' src='assets\115718_location_map_icon.png' alt='Icons' />
                <p className='LHead'>Office1</p>
            </div>
            <p className='AddressText'>96-a Butt plaza near Wazir market Lahore block Azam <br /> cloth market Lahore</p>
            <div className='Ediv'>
                <img className='Icon' src='assets/2674096_object_email_web_essential_icon (1).png' alt='Icons' />
                <p className='EHead'>binyousafclothing@gmail.com</p>
            </div>
            <div className='PNdiv'>
                <img className='Icon' src='assets\8726191_phone_volume_icon.png' alt='Icons' />
                <p className='PHead'>0304 4695551</p>
            </div>
            <div className='Social_Ics'>
                <FacebookIcon className='icons' onClick={() => {window.open('https://www.facebook.com/binyousafclothing', '_blank')}}/>
                <InstagramIcon className='icons' onClick={() => {window.open('https://www.instagram.com/binyousafclothing/', '_blank')}}/>
            </div>
        </div>
    </div>
  )
}

export default ContactUs