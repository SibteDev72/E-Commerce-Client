import React, { useState, useEffect } from 'react'
import './DAProductsPage.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { baseURL } from '../../baseUrl';

function DAProductsPage() {

    const[Product, setProduct] = useState([]);
    const[ProductDetails, setProductDetails] = useState([]);
    const[ProductSizes, setProductSizes] = useState([]);
    const[ProductImageSource, setProductImageSource] = useState([]);
    const[viewStatus, setViewStatus] = useState(false);
    const[imgSrc, setimgSrc] = useState();

    const navigate = useNavigate();
    const userToken = localStorage.getItem('Token');
    
    useEffect(() => {
        const api1 = `${baseURL}/ProductInfo/getProduct`;
        axios.get(api1, { headers: {"x-access-token" : userToken}}).then((result) => {
            setProduct(result.data)
        })
        .catch((error) => {
            console.log("Error Occurred !!!" + error);
        })
    }, [])

    function ViewProduct(id) {
      setViewStatus(true);
      const DataApi = `${baseURL}/ProductInfo/getProductbyID/`
        axios.get(DataApi + id, { headers: {"x-access-token" : userToken}}).then(result => {
           setProductDetails(result.data);
           setProductImageSource(result.data.ProductImageUrlArray);
           setProductSizes(result.data.ProductSizes);
           setimgSrc(result.data.ProductImageUrlArray[0]);
        })
        .catch(error => {
            console.log(error);
        })
    }

    var imgCount = 0;
    ProductImageSource.filter(data => data === '').map(() => {
        imgCount+=1
    })

    function imgHandler(Src){
      setimgSrc(Src)
  }

    function deleteProduct(id) {
        const api2 = `${baseURL}/ProductInfo/deleteProduct/`;
        axios.delete( api2 + id, { headers: {"x-access-token" : userToken}} ).then(() => {
            window.location.assign('/AdminDashboardRoute')   
        })
        .catch((error) => {
            console.log("Error Occurred !!!" + error);
        })
    }

    function editProduct(id) {
        navigate('/AdminDashboardRoute/DAEditProduct', {state : {ProductID : id}});   
    }

  return (
    <>
      <Row style = {{display: viewStatus === true && 'none'}} className='PrdDiv'>
          {
            Product.map(Info => (
              <Col onClick={() => Clicked(Info._id)} sm={3} md={3} lg={3} xl={3} xxl={3}>
                <div className='Wrap'>
                  <img className="ProductCover" src = {Info.ProductImageUrlArray[0]} alt="InserImage"  /> 
                  <div className='PrdIcons'>
                    <VisibilityIcon onClick={() => ViewProduct(Info._id)} className='Icns'/>
                    <BorderColorIcon onClick={() => editProduct(Info._id)} className='Icns' />
                    <DeleteIcon onClick={() => deleteProduct(Info._id)} className='Icns' />
                  </div>
                </div>
              </Col>
            ))
          }
      </Row>
      <div style = {{display: viewStatus === false && 'none'}} className='selectedProdDiv'>
        <h3>Product Details</h3>
        <Row className='ADDetails1'>
              <Col className='ADArtical_Images' sm = {6} md = {6} lg = {6} xl = {6} xxl = {6}>
                  <div className='ADimgWRAP'>
                      <img id='ADpic' src = {imgSrc} alt='pro'/>
                  </div>
                  <div className='ADimgsDiv' style = {{display: imgCount === 3 && 'none'}}>
                      {
                          ProductImageSource.map(imgSrc => (
                              <img onClick={() => imgHandler(imgSrc)} className='ADsliderImgs' src={imgSrc} />
                          ))
                      }
                  </div>
              </Col>
              <Col className='ADProductDetails' sm = {6} md = {6} lg = {6} xl = {6} xxl = {6}>
                  <div className='ADNP-R'>
                      <p id='ADName'>{ProductDetails.ProductName}</p>
                      <p id='ADPrice'>Rs, {ProductDetails.ProductPrice}</p>
                  </div>
                  <h4>Product Description</h4>
                  <p>{ProductDetails.ProductDescription}</p>
                  <div className='ADProdCat'>
                      <p className='ADheading'>Category: </p>
                      <p className='ADvalue'>{ProductDetails.ProductCategory}</p>
                  </div>
              </Col>
          </Row>
          <div className='PrdSizes'>
            <h4>Product Sizes</h4>
              <div className='Sizes'>
                {ProductSizes.filter(sizes => sizes === 'S').map(data => (
                  <p>Size: {data} Stock: {ProductDetails.ProductStockS}</p>
                ))}
                {ProductSizes.filter(sizes => sizes === 'M').map(data => (
                  <p>Size: {data} Stock: {ProductDetails.ProductStockM}</p>
                ))}
                {ProductSizes.filter(sizes => sizes === 'L').map(data => (
                  <p>Size: {data} Stock: {ProductDetails.ProductStockL}</p>
                ))}
                {ProductSizes.filter(sizes => sizes === 'XL').map(data => (
                  <p>Size: {data} Stock: {ProductDetails.ProductStockXL}</p>
                ))}
              </div>
          </div>
          <div className='WrapBtn'>
              <button onClick={() => setViewStatus(false)}><ArrowBackIosIcon /> Back</button>
          </div>
      </div>
    </>
  )
}

export default DAProductsPage