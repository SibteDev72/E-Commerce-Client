import React from 'react'
import './DAOrdersPage.scss'
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../../baseUrl';


function DAOrdersPage() {

  const userToken = localStorage.getItem('Token');
  const[OrdersList, setOrdersList] = useState([]);

  useEffect(() => {
    const api1 = `${baseURL}/CustomerInfo/getCustomer`;
    axios.get(api1, { headers: {"x-access-token" : userToken}}).then((results) => {
      setOrdersList(results.data.reverse());
    })
    .catch((error) => {
        console.log(error);
    })
  }, [])

  function deleteOrder(id) {
    const api = `${baseURL}/CustomerInfo/deleteCustomer/`;
    axios.delete( api + id, { headers: {"x-access-token" : userToken}} ).then(() => {
        window.location.assign('/AdminDashboardRoute')   
    })
    .catch((error) => {
        console.log("Error Occurred !!!" + error);
    })
  }

  return (
    <div className='OrdersAdminDiv'>
      <h3>Orders List</h3>   
      <div className='OrderData'>
        {
          OrdersList.map(OrderData => (
          <>
          <p className='OrdNo'>Order# {OrderData.OrderNo}</p>
          <div className='ADCartData'>
            {
              OrderData.CartInfo.map(CartData => (
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
              )) 
            }
          </div>
          <p className='OrdTotal'><b>Order Total:</b> Rs, {OrderData.CartSubtotal}</p>
          <p className='OrdTotal'><b>Order Day:</b> {OrderData.OrderDate}</p>
          <div className='ADCustomerData'>
            <p style={{display: OrderData.ShippingStatus === true && 'none'}} className='HeadCD'>Customer Details</p>
            <p style={{display: OrderData.ShippingStatus === false && 'none'}} className='HeadCD'>Billing Customer Details</p>
            <p className='CusName'>{OrderData.FirstName[0]} {OrderData.LastName[0]}</p>
            <p className='Address'>{OrderData.AddressArray[0]}, {OrderData.City[0]}, {OrderData.State[0]}
            <b>, {OrderData.PostalNumber[0]}</b></p>
            <p className='SM'>{OrderData.Email}</p>
            <p className='SM'>0{OrderData.ContactNumber[0]}</p>
            <p className='SM'>Payment Method: {OrderData.PaymentMethod}</p>
            <div style={{display: OrderData.ShippingStatus === false && 'none'}}>
              <p className='ShC'>Shipping Customer Details</p>
              <p className='CusName'>{OrderData.FirstName[1]} {OrderData.LastName[1]}</p>
              <p className='Address'>{OrderData.AddressArray[1]}, {OrderData.City[1]}, {OrderData.State[1]}
              <b>, {OrderData.PostalNumber[1]}</b></p>
              <p className='SM'>0{OrderData.ContactNumber[1]}</p>
            </div>
            <button  onClick={() => deleteOrder(OrderData._id)} className='OrdDelBtn'> <CloseIcon /> Remove Order </button>
          </div>
          </>
          ))
        }
      </div>
    </div>
  )
}

export default DAOrdersPage
