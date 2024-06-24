import styled from 'styled-components';
import React, { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './Navbar.scss'
import axios from 'axios';
import { useStore } from '../store/cart-store';
import { useStoreW } from '../store/wishlist-store';
import { useStoreP } from '../store/pop-ups-store';
import { baseURL } from '../baseUrl';

function Navbar() {

  const token = localStorage.getItem('Token');

  const[articals, setArticals] = useState([]);
  const[scrolled, setscroller] = useState(false);
  
  const { isOpenCart, openCart, closeCart, isOpenMenu, openMenu, closeMenu } = useStoreP((state) => ({
    isOpenCart: state.isOpenCart,
    openCart: state.openCart,
    closeCart: state.closeCart,
    isOpenMenu: state.isOpenMenu,
    openMenu: state.openMenu,
    closeMenu: state.closeMenu,
  }))

  const { cart, deleteCartItem, cartNumber, cartItemsTotal } = useStore((state) => ({
    cart: state.cart,
    deleteCartItem: state.deleteCartItem,
    cartNumber: state.cartNumber,
    cartItemsTotal: state.cartItemsTotal,
  }))
  const wishlistNumber = useStoreW((state) => state.wishlistNumber)

  useEffect(() => {
    const CatAPI = `${baseURL}/CategoryInfo/getCategory`;
    axios.get( CatAPI, { headers: {"x-access-token" : token}}).then((result) => {
        setArticals(result.data)
    })
    .catch((error) => {
        console.log("Error Occurred !!!" + error);
    })
      
}, [])

  window.onscroll = function(){
    if(window.pageYOffset === 0){
      setscroller(false);
    }
      else{
        setscroller(true);
      }
  }

  function ProductCategory(category){
    localStorage.setItem("ProductCategory", category);
    window.location.assign('/ProductPage');
  }

  return (
    <>
      <div className = {scrolled ? 'Container scrolled': "Container"}>
          <img src='assets\black.png'
          className='sideMenu'onClick={openMenu}/>
          <img className='logo' src='assets\apple-touch-icon-180x180-1.png' onClick={() => {window.location.assign('/HomePage')}} />
          <div className='right_icons'>
            <img className='ics' src='assets\black (3).png' onClick={openCart} />
            <p>{cartNumber}</p>
            <img className='ics' src='assets\fav-Black.png' onClick={() => {window.location.assign('/WishListPage')}} />
            <p className='fav'>{wishlistNumber}</p>
            <img className='ics' src='assets\black (5).png' 
            onClick={() => {window.open('https://www.instagram.com/binyousafclothing/', '_blank')}}/>
            <img className='ics' src='assets\black (4).png' 
            onClick={() => {window.open('https://www.facebook.com/binyousafclothing', '_blank')}} />
          </div>
      </div>
      <SideMenu id ='SideMenu' show = {isOpenMenu}>
        <CloseIcon className='MenuCloseIcon' onClick = {closeMenu} />
        {
            articals.map((data, index) => (
              <span key={index} onClick={() => ProductCategory(data.CategoryName)}>{data.CategoryName}</span>
            ))
        }
        <span onClick={() => {window.location.assign('/ContactUSPage')}}>Contact Us</span>
      </SideMenu>
      <Cart id='CartSlider' show = {isOpenCart}>
        <CloseIcon className='CartCloseIcon' onClick = {closeCart} />
        <p className='Heading'>Shopping Cart</p>
          <div className='CartDiv' style={{display: cart.length === 0 && 'none'}}>
          {
              cart.map((Info, index) => (
                  <div key={index} className='Cart_Details'>
                      <img className='cartImage' src = {Info.ProductImageURL} alt=''/>
                      <div className='Div'>
                        <p className='CName'>{Info.Artical}</p>
                        <p className='CSize'>Size: {Info.ProductSize}</p>
                        <p className='CPrice'>{Info.ProductQuantity} x Rs, {Info.ProductPrice / Info.ProductQuantity}</p>
                      </div>
                      <CloseIcon className='del-btn' onClick = {() => deleteCartItem(index)} />
                  </div>
              ))
          }
            <div className='Sub-Btn-Div'>
              <div className='SubTotal'>
                <p className='Head'>SubTotal:</p>
                <p className='Total'>Rs, {cartItemsTotal}</p> 
              </div>
              <button className='cart-Btns' onClick={() => {window.location.assign('/CartPage')}}>VIEW CART</button>
              <button className='cart-Btns' onClick={() => {window.location.assign('/CustomerPage')}}>CHECK OUT</button>
            </div>
          </div>
          <p className='NoItem' style={{display: cart.length !== 0 && 'none'}}>No Item In Cart</p>
      </Cart>
    </>
  );
}

export default Navbar

const SideMenu = styled.div`
  transition: transform 0.2s;
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 2000;
  top: 0%;
  left: 0%;
  background-color: rgb(25, 25, 25);
  height: 100vh;
  color: white;
  padding-top: 6%;
@media screen and (min-width: 768px) {
  transform: ${props => props.show ? 'translateX(0)': 'translateX(-25vw)'};
  width: 25vw;
  font-size: 20px;
}
@media screen and (max-width: 767px) {
  transform: ${props => props.show ? 'translateX(0)': 'translateX(-40vw)'};
  width: 40vw;
  font-size: 18px;
}
`
const Cart = styled.div`
  transition: transform 0.2s;
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  top: 0%;
  right: 0px;
  background-color: white;
  height: 100vh;
  overflow-y: auto;
  color: black;
  box-shadow: -5px 0px 5px 0px rgba(0,0,0,0.75);
  -webkit-box-shadow: -5px 0px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: -5px 0px 5px 0px rgba(0,0,0,0.75);
@media screen and (min-width: 768px) {
  transform: ${props => props.show ? 'translateX(0)': 'translateX(32.5vw)'};
  width: 32vw;
}
@media screen and (max-width: 767px) {
  transform: ${props => props.show ? 'translateX(0)': 'translateX(55.5vw)'};
  width: 50vw;
}
`