import React, { useEffect, useState } from 'react'
import './HomePage.scss'
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "./Categories.scss";
import { getCategory } from '../../APIs/CategoryAPIs';
import { useStore } from '../../store/cart-store';
import { useStoreW } from '../../store/wishlist-store';
import { useStoreP } from '../../store/pop-ups-store';

function HomePage() {

  const[articals, setArticals] = useState([]);

  const { openCart, openMenu } = useStoreP((state) => ({
    openCart: state.openCart,
    openMenu: state.openMenu,
  }))
  const cartNumber = useStore((state) => state.cartNumber )
  const wishlistNumber = useStoreW((state) => state.wishlistNumber)
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await getCategory()
      setArticals(response.data)
    }
    fetchData();
  }, [])

  function Clicked(category){
    localStorage.setItem("ProductCategory", category);
    window.location.assign('/ProductPage');
  }

  return (
    <>
        <Carousel className='slider_imgs'>
          <Carousel.Item>
            <img
              className="d-block w-100"
              height="auto"
              src="assets\1-4.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              height="auto"
              src="assets\2-4.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              height="auto"
              src="assets\3-5.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
        <div className='main_Icons'>
          <img src='assets\3844437_hamburger_list_menu_more_navigation_icon.png'
          className='burgerNav' onClick = {openMenu}/>
          <img className='logo' src='assets\apple-touch-icon-180x180-1.png' onClick={() => {window.location.assign('/HomePage')}}/>
          <div className='right_icons'>
            <img className='ics' src='assets\9025885_shopping_cart_icon.png' onClick={openCart} />
            <p>{cartNumber}</p>
            <img className='ics' src='assets\fav-White.png' onClick={() => {window.location.assign('/WishListPage')}} />
            <p className='fav'>{wishlistNumber}</p>
            <img className='ics' src='assets\1161953_instagram_icon.png' 
            onClick={() => {window.open('https://www.instagram.com/binyousafclothing/', '_blank')}}/>
            <img className='ics' src='assets\104498_facebook_icon.png'
            onClick={() => {window.open('https://www.facebook.com/binyousafclothing', '_blank')}} />
          </div>
        </div>
        <Container className='MainDiv'>
          <h1>NEW</h1>
          <br />
          <h6>COLLECTIONS 24</h6>
          <Row>
            {
              articals.map(data => (
                <Col sm={6} md={4} lg={4} xl={4} xxl={4} onClick = {() => Clicked(data.CategoryName)}>
                  <div className='Wrap'>
                    <img className ="home_art" src = {data.CategoryImageURL} /> 
                    <p className="caption">{data.CategoryName}</p>
                  </div>
                </Col>
              ))
            }
            <div className='NewsLetter'>
              <h1>NEWSLETTERS</h1>
              <p className='NLText'>Subscribe our newsletter to get notify about discount and latest update. Don’t worry, we not<br/> 
              spam!</p>
              <div className='NL-FORM'>
                    <Form.Group>
                        <Form.Control
                        className='Emailform'
                        placeholder='Enter your email here'
                        type="email"
                        name="email"
                        />
                    </Form.Group>
                    <div className='SignUp-BTN'>
                      <img className='RA' src='assets\3671661_arrow_right_icon (1).png' alt='icon' />
                    </div>
              </div>
            </div>
          </Row>
        </Container>
      </>
  )
}

export default HomePage