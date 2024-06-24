import React, { useState, useEffect} from 'react'
import './DescriptionPage.scss'
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useStore } from "../../store/cart-store";
import { useStoreW } from "../../store/wishlist-store";
import { useStoreP } from '../../store/pop-ups-store';
import { baseURL } from '../../baseUrl';

function DescriptionPage() {

    const Location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem('Token');
    const ProductID = Location.state.ProductID;

    const[ProductDetails, setProductDetails] = useState([]);
    const[Products, setProducts] = useState([]);
    const[ProductSizes, setProductSizes] = useState([]);
    const[ProductImageSource, setProductImageSource] = useState([]);
    const[imgSrc, setimgSrc] = useState();
    const[imageSource, setImageSource] = useState();
    const[hoverStatus, setHoverStatus] = useState();
    const[status, setStatus] = useState();
    const[InstockStatus, setInStockStatus] = useState();
    const[selectedValue, setSelectedValue] = useState(null);
    const[quantity, setQuantity] = useState(1);
    const[ProducStock, setProductStock] = useState();
    
    const openCart = useStoreP((state) => state.openCart)
    const { wishlist, addwishlistItem, deleteWishlistItem, wishlistStatusCheck } = useStoreW((state) => ({
        wishlist: state.wishlist,
        addwishlistItem: state.addwishlistItem,
        deleteWishlistItem: state.deleteWishlistItem,
        wishlistStatusCheck: state.wishlistStatusCheck
    }))
    const { cart, addCart, updateCartItem } = useStore((state) => ({
        cart: state.cart,
        addCart: state.addCart,
        updateCartItem: state.updateCartItem,
        openCart: state.openCart,
    }))

    useEffect(() => {
        const DataApi = `${baseURL}/ProductInfo/getProductbyID/`
        axios.get(DataApi + ProductID, { headers: {"x-access-token" : token}}).then(result => {
            setProductDetails(result.data);
            setProductSizes(result.data.ProductSizes)
            setProductImageSource(result.data.ProductImageUrlArray);
            setimgSrc(result.data.ProductImageUrlArray[0]);
        })
        .catch(error => {
            console.log(error);
        })
        
        const ProductApi = `${baseURL}/ProductInfo/getProduct`
        axios.get(ProductApi, { headers: {"x-access-token" : token}}).then(result => {
            setProducts(result.data);
        })
        .catch(error => {
            console.log(error)
        })
        
    }, [ProductID]);

    useEffect(() => {
        const exist = wishlistStatusCheck(ProductID);
        setStatus(exist)
    }, [ wishlist || ProductID ]);

    var imgCount = 0;
    ProductImageSource.filter(data => data === '').map(() => {
        imgCount+=1
    })

    const handleDropdownChange = (event) => {
        setInStockStatus(true)
        setSelectedValue(event.target.value);

        if(event.target.value === 'S'){
            setProductStock(ProductDetails.ProductStockS)
            setQuantity(1);
        }else if(event.target.value === 'M'){
            setProductStock(ProductDetails.ProductStockM)
            setQuantity(1);
        }else if(event.target.value === 'L'){
            setProductStock(ProductDetails.ProductStockL)
            setQuantity(1);
        }else if(event.target.value === 'XL'){
            setProductStock(ProductDetails.ProductStockXL)
            setQuantity(1);
        }else{
            setInStockStatus(false)
            setQuantity(1);
        }
    }

    function RelatedProduct(id){
        navigate('/DescriptionPage', {
            state: {
              ProductID: id
            }
          })
        window.location.assign('/DescriptionPage')
    }

    function imgHandler(Src){
        setimgSrc(Src)
    }

    function handleHoverOver(id){
        Products.map(data => {
          if(data._id === id){
            setHoverStatus(id)
            setImageSource(data.ProductImageUrlArray[1]);
          }
        })
      }
      
    function handleHoverOut(id){
        Products.map(data => {
          if(data._id === id){
            setHoverStatus(id)
            setImageSource(data.ProductImageUrlArray[0]);
          }
        })
      }
    const jsonObject = {
        ProductImageURL: ProductImageSource[0],
        ProductCode: ProductDetails.ProductName + selectedValue,
        Artical: ProductDetails.ProductName,
        ProductPrice: ProductDetails.ProductPrice * quantity,
        ProductStock: ProducStock,
        ProductQuantity: quantity,
        ProductCategory: ProductDetails.ProductCategory,
        ProductSize: selectedValue
    }
    function cartButton(){
        if(selectedValue === 'Select Size' || selectedValue === null){
            alert('Please Select Size');
        } 
        else{
            addCart(jsonObject)
            cart.map((data, index) => {
                if(ProductDetails.ProductName + selectedValue === data.ProductCode && selectedValue === data.ProductSize){
                    const updatedQuantity = data.ProductQuantity + quantity;
                    updateCartItem(index, {ProductQuantity: updatedQuantity, ProductPrice: ProductDetails.ProductPrice * updatedQuantity})
                }
            })
            setSelectedValue('Select Size');
            setQuantity(1);
            openCart()
        }
    }

  return (
    <>
    <Container className='Main'>
        <Row className='Details1'>
            <Col className='Artical_Images' sm = {12} md = {6} lg = {6} xl = {6} xxl = {6}>
                <div className='imgWRAP'>
                    <img id='pic' src = {imgSrc} alt='pro'/>
                </div>
                <div className='NP-M'>
                    <p className='NAME-M'>{ProductDetails.ProductName}</p>
                    <p className='PRC-M'>Rs, {ProductDetails.ProductPrice}</p>
                </div>
                <div className='imgsDiv' style = {{display: imgCount === 3 && 'none'}}>
                    {
                        ProductImageSource.map((imgSrc, index) => (
                            <img key={index} onClick={() => imgHandler(imgSrc)} className='sliderImgs' src={imgSrc} />
                        ))
                    }
                </div>
            </Col>
            <Col className='ProductDetails' sm = {12} md = {6} lg = {6} xl = {6} xxl = {6}>
                <div className='NP-R'>
                    <p id='Name'>{ProductDetails.ProductName}</p>
                    <p id='Price'>Rs, {ProductDetails.ProductPrice}</p>
                </div>
                <h4>Product Description</h4>
                <p>{ProductDetails.ProductDescription}</p>
                <Form className='sizes'>
                    <Form.Select
                        name="ProductCategory"
                        value = {selectedValue}
                        onChange={(e) => handleDropdownChange(e)}
                    >
                        <option>Select Size</option>
                        {
                            ProductSizes.map((data, index) => <option key={index}>{data}</option>)
                        }
                    </Form.Select>
                </Form>
                <div style = {{display: ProducStock === 0 && 'none'}}>
                    <p style = {{display: !InstockStatus && 'none'}} id='stock'><b>In Stock({ProducStock})</b></p>
                    <h4>QUANTITY</h4>
                    <div className='quantity'>
                        <div className='quan_btns'>
                            <p className='Dec' onClick={() => quantity !== 1 && setQuantity(quantity - 1)}>-</p>
                            <p className='Count'>{quantity}</p>
                            <p className='Inc' onClick={() => ProducStock > quantity && InstockStatus && setQuantity(quantity + 1) }>+</p>
                        </div>
                        <button className='Cartbtn' onClick={() =>cartButton()}>ADD TO CART</button>
                    </div>
                </div>
                <p style = {{display: (ProducStock !== 0) && 'none'}} id='stock'>Selected Size is Out of Stock</p>
                <div>
                    <button style = {{display: status === true && 'none'}}
                    className='detialbtns' onClick={() => addwishlistItem(ProductDetails)}>ADD TO WISHLIST</button>
                    <button style = {{display: status === false && 'none'}}
                    className='detialbtns' onClick={() =>deleteWishlistItem(ProductDetails._id)}>Remove From WISHLIST</button>
                </div>
                <div className='ProdCat'>
                    <p className='heading'>Category: </p>
                    <p className='value'>{ProductDetails.ProductCategory}</p>
                </div>
            </Col>
        </Row>
        </Container>
        <h3>Related Products</h3>
        <div className='Details2'>
           {
            Products.filter(category => category.ProductCategory === ProductDetails.ProductCategory && 
                category.ProductName !== ProductDetails.ProductName).slice(0, 3).map((Info, index) => (
                <div key={index}>
                    <img className="Artical" onMouseOver={() => handleHoverOver(Info._id)} onMouseOut={() =>  handleHoverOut(Info._id)}
                    onClick={() => RelatedProduct(Info._id)} src = {hoverStatus===Info._id && Info.ProductImageUrlArray[1] != ''? 
                    imageSource : Info.ProductImageUrlArray[0]} alt="InserImage"  /> 
                    <p className="Name">
                    {Info.ProductName}
                    </p>
                </div>
            ))
           }
        </div>
    </>
  )
}

export default DescriptionPage