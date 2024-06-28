import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./ProductPage.scss";
import { getCategory } from '../../APIs/CategoryAPIs';
import { getProduct } from '../../APIs/ProductAPIs';

function ProductPage() {

  const navigate = useNavigate()
  
  const[Product, setProduct] = useState([]);
  const[imageSource, setImageSource] = useState();
  const[hoverStatus, setHoverStatus] = useState();
  const[NoPrdStatus, setNoPrdStatus] = useState(false);
  const[articals, setArticals] = useState([]);
  const[ProductCategory, setProductCategory] = useState(localStorage.getItem('ProductCategory'));
  
  useEffect(() => {
    localStorage.setItem('ProductCategory', ProductCategory);
  }, [ProductCategory])
  
  useEffect(() => {
    const fetchData = async () => {
      const responseCat = await getCategory()
      setArticals(responseCat.data)
      const responseProduct = await getProduct()
      setProduct(responseProduct.data);
      const filteredArray = responseProduct.data.filter(PrdCat => PrdCat.ProductCategory === ProductCategory).map(data => (
        <></>
      ))
      if(filteredArray.length === 0){
        setNoPrdStatus(true);
      }else{
        setNoPrdStatus(false)
      }
    }
    fetchData();
  }, [])

  function handleHoverOver(id){
    Product.map(data => {
      if(data._id === id){
        setHoverStatus(id)
        setImageSource(data.ProductImageUrlArray[1]);
      }
    })
  }

  function handleHoverOut(id){
    Product.map(data => {
      if(data._id === id){
        setHoverStatus(id)
        setImageSource(data.ProductImageUrlArray[0]);
      }
    })
  }

  function filterCat(Name){
    setProductCategory(Name);
    const filteredArray =  Product.filter(PrdCat => PrdCat.ProductCategory === Name).map(data => (
      <></>
    ))
    if(filteredArray.length === 0){
      setNoPrdStatus(true);
    }else{
      setNoPrdStatus(false)
    }
  }
  
  return ( 
    <div className="Filter">
        <div className ="category">
          <p className='Cat_heading'>Categories</p>
          <ul className="list">
            {
              articals.map(data => (
                <li className='elements' onClick={() => filterCat(data.CategoryName)}>{data.CategoryName}</li>
              ))
            }
          </ul>
        </div>
        <Container>
          <Row>
            {
            Product.filter(cat => cat.ProductCategory === ProductCategory).map(Info => (
              <Col onMouseOver={() => handleHoverOver(Info._id)} onMouseOut={() =>  handleHoverOut(Info._id)}
               onClick={() =>  navigate('/DescriptionPage', { state: { ProductID: Info._id } })} sm={6} md={4} lg={4} xl={4} xxl={4}>
                <div className='Wrap'>
                  <img className="Artical" src = {hoverStatus===Info._id && Info.ProductImageUrlArray[1] != ''? 
                  imageSource : Info.ProductImageUrlArray[0]} alt="InserImage"  /> 
                  <p className="Name">{Info.ProductName}</p>
                  <p className="Prc">Rs, {Info.ProductPrice}</p>
                </div>
              </Col>
            ))
            }  
          </Row>
          <p className='NoPRD' style={{display: NoPrdStatus === false && 'none'}}>No Products Available</p>
        </Container>
    </div>
  )
}

export default ProductPage