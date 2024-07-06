import { useState, useEffect } from 'react';
import React from 'react'
import Loader from '../Loader';
import './DAOrdersPage.scss'
import CloseIcon from '@mui/icons-material/Close';
import { getOrder } from '../../APIs/OrderAPIs';
import { deleteOrder } from '../../APIs/OrderAPIs';

function DAOrdersPage() {

  const[OrdersList, setOrdersList] = useState([]);
  const[loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getOrder()
      setOrdersList(response.data.reverse());
      setLoading(false)
    }
    fetchData();
  }, [])

  async function deleteHandler(id) {
    const response = await deleteOrder(id)
    console.log(response.data);
    window.location.assign('/AdminDashboardRoute')   
  }

  return (
    <>
    { loading === true && <Loader loaderText='Orders are Loading'/> }
    <div style={{ display: loading === true && 'none' }} className='OrdersAdminDiv'>
      <h3>Orders List</h3>   
      <div className='OrderData'>
        {
          OrdersList.map((OrderData, index) => (
          <>
          <p className='OrdNo'>Order# {OrderData.OrderNo}</p>
          <div key={index} className='ADCartData'>
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
            <button  onClick={() => deleteHandler(OrderData._id)} className='OrdDelBtn'> <CloseIcon /> Remove Order </button>
          </div>
          </>
          ))
        }
      </div>
    </div>
    </>
  )
}

export default DAOrdersPage
