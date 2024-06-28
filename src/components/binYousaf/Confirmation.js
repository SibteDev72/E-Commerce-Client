import React from 'react'
import { useState, useEffect } from 'react';
import './Confirmation.scss'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getOrder } from '../../APIs/OrderAPIs';

function Confirmation() {

    const[CustomerInfo, setCustomerInfo] = useState([]);
    const[loader, setLoader] = useState(true)

    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        const fetchData = async () => {
          const response = await getOrder()
          setCustomerInfo([response.data[response.data.length - 1]]);
          setLoader(false)
        }
        fetchData();
    }, [])
    
  return (
    <>
    <div className='container-wrap'>
      <div className='order_div'>
        <div className='loader_div' style={{ display: !loader && 'none' }}>
            <p className='loader_text'>Order is being Processed</p>
            <div className="loader"></div>
        </div>
        <button className='home_btn' style={{ display: loader && 'none' }}
        onClick={() => {window.location.assign('/HomePage')}}>Continue Shopping</button>
        <div className='Detial-Div' style={{ display: loader && 'none' }}>
          <div className='Heading' >
            <img className='confirm_tick' src='assets\confirm.png' alt='tick' />
            <p className='orderNo'>Order #{CustomerInfo.map(CustomerData => CustomerData.OrderNo) }</p>
            <p className='Ty'>Thank You For Choosing Us!!!</p>
          </div>
          <div className='OD'>
            <p className='HeadOD'>Order Details</p>
            <Row>
              {
                CustomerInfo.map(CustomerData => (
                  CustomerData.CartInfo.map((CartData, index) => (
                    <Col key={index} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <div className='CartDataDiv'>
                        <img className='ProdImgs' src={CartData.ProductImageURL} alt='Imgs' />
                        <div className='ProdDetails'>
                          <p className='Name'>{CartData.Artical}</p>
                          <p className='Price'>Rs, {CartData.ProductPrice/CartData.ProductQuantity}</p>
                          <p className='Quan'>Quantity: {CartData.ProductQuantity}</p>
                          <p className='Size'>Size: {CartData.ProductSize}</p>
                          <p className='Subtotal'>Subtotal: Rs, {CartData.ProductPrice}</p>
                        </div>
                      </div>
                    </Col>
                  ))
                ))
              }
            </Row>
          </div>
          <div className='CD'>
            {
              CustomerInfo.map(CustomerData => (
                <>
                  <p style={{display: CustomerData.ShippingStatus === true && 'none'}} className='HeadCD'>Customer Details</p>
                  <p style={{display: CustomerData.ShippingStatus === false && 'none'}} className='HeadCD'>Billing Customer Details</p>
                  <p className='CusName'>{CustomerData.FirstName[0]} {CustomerData.LastName[0]}</p>
                  <p className='Address'>{CustomerData.AddressArray[0]}, {CustomerData.City[0]}, {CustomerData.State[0]}
                  <b>, {CustomerData.PostalNumber[0]}</b></p>
                  <p className='SM'>{CustomerData.Email}</p>
                  <p className='SM'>0{CustomerData.ContactNumber[0]}</p>
                  <div style={{display: CustomerData.ShippingStatus === false && 'none'}}>
                    <p className='ShC'>Shipping Customer Details</p>
                    <p className='CusName'>{CustomerData.FirstName[1]} {CustomerData.LastName[1]}</p>
                    <p className='Address'>{CustomerData.AddressArray[1]}, {CustomerData.City[1]}, {CustomerData.State[1]}
                    <b>, {CustomerData.PostalNumber[1]}</b></p>
                    <p className='SM'>0{CustomerData.ContactNumber[1]}</p>
                  </div>
                </>
              ))
            }
          </div>
        </div>
        <div className='Invoice' style={{ display: loader && 'none' }}>
          <p className='InvioceHeading'>Billing Payment Details</p>
              <div className='Sub-Total'>
                  <p className='headingInv'>Subtotal</p>
                  {
                    CustomerInfo.map(CustomerData => <p className='value'>Rs, {CustomerData.CartSubtotal}</p>)
                  }
              </div>
              <div className='Shipping'>
                  <p className='heading'>Shipping</p>
                  <div className='values'>
                      <p>Flat Rate</p>
                      {
                        CustomerInfo.map(CustomerData => (
                          <>
                            <p style={{display: CustomerData.ShippingStatus === true && 'none'}} className='city'>
                            Shipping to {CustomerData.City[0]}</p>
                            <p style={{display: CustomerData.ShippingStatus === false && 'none'}} className='city'>
                            Shipping to {CustomerData.City[1]}</p>
                          </>
                        ))
                      }
                  </div>
              </div>
              <div className='PM'>
                  <p className='heading'>Payment Method</p>
                    {
                      CustomerInfo.map(CustomerData => <p className='value'>{CustomerData.PaymentMethod}</p>)
                    }
              </div>
              <div className='Total'>
                  <p className='heading'>Total</p>
                  {
                    CustomerInfo.map(CustomerData => <p className='value'>Rs, {CustomerData.CartSubtotal}</p>)
                  }
              </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Confirmation
