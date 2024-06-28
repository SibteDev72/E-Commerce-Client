import React, { useState, useEffect } from 'react'
import './DAProductsPage.scss'
import { useNavigate } from 'react-router-dom';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getProduct } from '../../APIs/ProductAPIs';
import { getProductbyID } from '../../APIs/ProductAPIs';
import { deleteProduct } from '../../APIs/ProductAPIs';

function DAProductsPage() {

    const[Product, setProduct] = useState([]);
    const[ProductDetails, setProductDetails] = useState([]);
    const[ProductSizes, setProductSizes] = useState([]);
    const[ProductImageSource, setProductImageSource] = useState([]);
    const[viewStatus, setViewStatus] = useState(false);
    const[imgSrc, setimgSrc] = useState();
    
    const navigate = useNavigate();
    
    useEffect(() => {
      const fetchData = async () => {
        const response = await getProduct()
        setProduct(response.data)
      }
      fetchData();
    }, [])

    async function ViewProduct(id) {
      setViewStatus(true);
      const response = await getProductbyID(id);
      setProductDetails(response.data);
      setProductImageSource(response.data.ProductImageUrlArray);
      setProductSizes(response.data.ProductSizes);
      setimgSrc(response.data.ProductImageUrlArray[0]);
    }

    var imgCount = 0;
    ProductImageSource.filter(data => data === '').map(() => {
        imgCount+=1
    })

    async function deleteHandler(id) {
      const response = await deleteProduct(id)
      console.log(response.data);
      window.location.assign('/AdminDashboardRoute')   
    }

  return (
    <>
      <Row style = {{display: viewStatus === true && 'none'}} className='PrdDiv'>
          {
            Product.map((Info, index) => (
              <Col key={index} sm={3} md={3} lg={3} xl={3} xxl={3}>
                <div className='Wrap'>
                  <img className="ProductCover" src = {Info.ProductImageUrlArray[0]} alt="InserImage"  /> 
                  <div className='PrdIcons'>
                    <VisibilityIcon onClick={() => ViewProduct(Info._id)} className='Icns'/>
                    <BorderColorIcon 
                    onClick={() => navigate('/AdminDashboardRoute/DAEditProduct', {state : {ProductID : Info._id}})} className='Icns' />
                    <DeleteIcon onClick={() => deleteHandler(Info._id)} className='Icns' />
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
                              <img onClick={() => setimgSrc(imgSrc)} className='ADsliderImgs' src={imgSrc} />
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