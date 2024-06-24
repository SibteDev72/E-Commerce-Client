import React from 'react'
import Form from "react-bootstrap/Form";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import './DAaddProducts.scss'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../../baseUrl';


function DAEdtiProduct() {

    const location = useLocation();
    const ProductID = location.state.ProductID;
    const userToken = localStorage.getItem('Token');

    const[CategoryInfo, setCategoryInfo] = useState([]);
    const[checkedValues, setCheckedValues] = useState([]);
    const[Product, setProduct] = useState([]);
    const[addNew, setAddNew] = useState(false);
    const[deleteExistingCat, setdeleteExistingCat] = useState(false);
    const[ImageUrls, setImageUrls] = useState({});
    const[imgChange1, setimgChange1] = useState(false);
    const[imgChange2, setimgChange2] = useState(false);
    const[imgChange3, setimgChange3] = useState(false);
    const[imgChange4, setimgChange4] = useState(false);
    const[ProductData, setProductData] = useState(
        {
            ProductImageUrlArray: [],
            ProductName: '',
            ProductPrice: '',
            ProductDescription: '',
            ProductStockS: '',
            ProductStockM: '',
            ProductStockL: '',
            ProductStockXL: '',
            ProductCategory: '',
            ProductSizes: []
        }
    )

    const[CategoryData, setCategoryData] = useState({
        CategoryImageURL: '',
        CategoryName: ''
        }
    )

    useEffect(() => {
            const api1 = `${baseURL}/ProductInfo/getProductbyID/`; 
            axios.get(api1 + ProductID, { headers: {"x-access-token" : userToken}} ).then((result) => {
                setProductData(result.data);
            })
            .catch((error) => {
                console.log("Error Occurred !!!" + error);
            })
            const CategoryAPI = `${baseURL}/CategoryInfo/getCategory`;
            axios.get( CategoryAPI, { headers: {"x-access-token" : userToken}} ).then((result) => {
            setCategoryInfo(result.data)
        })
        .catch((error) => {
            console.log("Error Occurred !!!" + error);
        })
        const ProductAPI = `${baseURL}/ProductInfo/getProduct`;
        axios.get(ProductAPI, { headers: {"x-access-token" : userToken}}).then((result) => {
            setProduct(result.data)
        })
        .catch((error) => {
            console.log("Error Occurred !!!" + error);
        })
    }, [])

    function changeHandler(e){
        const newProductData = {...ProductData}
        newProductData[e.target.id] = e.target.value;
        setProductData(newProductData);
    }

    function ImagechangeHandler(event, num){

        if(num === '1'){
            setimgChange1(true);
        }else if(num === '2'){
            setimgChange2(true);
        }else if(num === '3'){
            setimgChange3(true);
        }else if(num === '4'){
            setimgChange4(true);
        }
        
        const { name, value } = event.target;
        setImageUrls({...ImageUrls, [name]: value});
    }

    function CategoryChangeHandler(e){
        const newCategoryData = {...CategoryData}
        newCategoryData[e.target.id] = e.target.value;
        setCategoryData(newCategoryData);
    }

    function CatSubmitHandler(e){
        e.preventDefault()
            const AddNewAPI = `${baseURL}/CategoryInfo/addCategory`
            axios.post( AddNewAPI, CategoryData ).then(() => {
                setAddNew(false);
                window.location.assign('/edit');
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;
  
        if (isChecked) {
          setCheckedValues([...checkedValues, value]);
        } else {
          setCheckedValues(checkedValues.filter((item) => item !== value));
        }
      };

    function updateHandler(e){
            e.preventDefault()
            ProductData.ProductSizes = checkedValues;
            const newArrImgs = Object.values(ImageUrls);
            ProductData.ProductImageUrlArray = [...newArrImgs];
            const api2 = `${baseURL}/ProductInfo/updateProduct/`; 
            axios.put(api2 + ProductID, ProductData, { headers: {"x-access-token" : userToken}}).then(() => {
                window.location.assign('/AdminDashboardRoute');
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function deleteCat(id, Name){
        let counter = 0;
        Product.filter(ProductData => ProductData.ProductCategory === Name).map(() =>
            counter++
        )
        if(counter === 0){
            const deleteCatAPI = `${baseURL}/CategoryInfo/deleteCategory/`
            axios.delete(deleteCatAPI + id).then(() => {
                window.location.assign('/edit');   
            })
            .catch((error) => {
                console.log("Error Occurred !!!" + error);
            })
        }else{
            alert('You Cannot Delete this Category Because it has '+counter+' Products');
        }
        counter = 0;
    }
  return (
    <div className='MAIN_DIV'>
        <div className='CatButtons'>
        <button className='AddNew' onClick={() => (setAddNew(true))} 
            style = {{display: (addNew || deleteExistingCat) && 'none'}}>
            <AddIcon />
            Add New Category
        </button>
        <button onClick={() => setdeleteExistingCat(true)} 
            style = {{display: (deleteExistingCat || addNew) && 'none'}} className='deleteExistingCat'>
            <DeleteIcon />
            Delete Existing Categories
        </button>
        </div>
        <Form onSubmit={(e) => updateHandler(e)} style = {{display: (addNew || deleteExistingCat) && 'none'}}>
            <Row>
                <Col>
                    <Form.Group className='formgroup'>
                        <Form.Label>Product Cover Image URL</Form.Label>
                            <Form.Control
                            type="text"
                            name="Image1"
                            value = { imgChange1? ImageUrls.Image1 : ImageUrls.Image1 = ProductData.ProductImageUrlArray[0] }
                            onChange = {(event) => ImagechangeHandler(event, '1')}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className='formgroup'>
                        <Form.Label>Product Image#1 URL</Form.Label>
                            <Form.Control
                            type="text"
                            name="Image2"
                            value = {imgChange2? ImageUrls.Image2 : ImageUrls.Image2 = ProductData.ProductImageUrlArray[1]}
                            onChange = {(event) => ImagechangeHandler(event, '2')}
                            />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className='formgroup'>
                        <Form.Label>Product Image#2 URL</Form.Label>
                        <Form.Control
                        type="text"
                        name="Image3"
                        value = {imgChange3? ImageUrls.Image3 : ImageUrls.Image3 = ProductData.ProductImageUrlArray[2]}
                        onChange = {(event) => ImagechangeHandler(event, '3')}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className='formgroup'>
                        <Form.Label>Product Image#3 URL</Form.Label>
                        <Form.Control
                        type="text"
                        name="Image4"
                        value = {imgChange4? ImageUrls.Image4 : ImageUrls.Image4 = ProductData.ProductImageUrlArray[3]}
                        onChange = {(event) => ImagechangeHandler(event, '4')}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className='formgroup'>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                        type="text"
                        name="ProductName"
                        id='ProductName'
                        value = {ProductData.ProductName}
                        onChange = {(e) => changeHandler(e)}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className='formgroup'>
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control
                        type="number"
                        name="ProductPrice"
                        id='ProductPrice'
                        value={ProductData.ProductPrice}
                        onChange = {(e) => changeHandler(e)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className='formgroup'>
                    <Form.Label>Product Category</Form.Label>
                    <Form.Select
                        name="ProductCategory"
                        id='ProductCategory'
                        value={ProductData.ProductCategory}
                        onChange={(e) => changeHandler(e)}
                    >
                        <option>Select Category</option>
                        {
                            CategoryInfo.map(data => (
                                <option>{data.CategoryName}</option>
                            ))
                        }
                    </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <FloatingLabel className='labels'>
                Product Description
                <Form.Control
                className='PDesc' 
                as="textarea"
                name="ProductDescription"
                id='ProductDescription'
                value = {ProductData.ProductDescription}
                onChange = {(e) => changeHandler(e)}
                />
            </FloatingLabel>
            <h4>Product Stocks</h4>
            <Row>
                <Col>
                    <Form.Group className='formgroup'>
                        <Form.Label>Product Stock for S</Form.Label>
                        <Form.Control
                        type="number"
                        name="ProductStockS"
                        id='ProductStockS'
                        value={ProductData.ProductStockS}
                        onChange = {(e) => changeHandler(e)}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className='formgroup'>
                        <Form.Label>Product Stock for M</Form.Label>
                        <Form.Control
                        type="number"
                        name="ProductStockM"
                        id='ProductStockM'
                        value={ProductData.ProductStockM}
                        onChange = {(e) => changeHandler(e)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className='formgroup'>
                        <Form.Label>Product Stock for L</Form.Label>
                        <Form.Control
                        type="number"
                        name="ProductStockL"
                        id='ProductStockL'
                        value={ProductData.ProductStockL}
                        onChange = {(e) => changeHandler(e)}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className='formgroup'>
                        <Form.Label>Product Stock for XL</Form.Label>
                        <Form.Control
                        type="number"
                        name="ProductStockXL"
                        id='ProductStockXL'
                        value={ProductData.ProductStockXL}
                        onChange = {(e) => changeHandler(e)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Label className='labels'>Product Sizes</Form.Label>
            <Form.Group className='checkboxes'>
                    <div style = {{display: (ProductData.ProductStockS === null || ProductData.ProductStockS === '') && 'none'}}>
                        <Form.Label className='box'> S </Form.Label>
                            <Form.Check 
                                type="checkbox"
                                name="options"
                                value="S"
                                onChange={handleCheckboxChange}
                            />
                    
                    </div>
                    <div style = {{display: (ProductData.ProductStockM === null || ProductData.ProductStockM === '') && 'none'}}>
                        <Form.Label className='box'> M </Form.Label>
                            <Form.Check
                                type="checkbox"
                                name="options"
                                value="M"
                                onChange={handleCheckboxChange}
                            />
                    </div>
                    <div style = {{display: (ProductData.ProductStockL === null || ProductData.ProductStockL === '') && 'none'}}>
                        <Form.Label className='box'> L </Form.Label>
                            <Form.Check
                                type="checkbox"
                                name="options"
                                value="L"
                                onChange={handleCheckboxChange}
                            />
                    </div>
                    <div style = {{display: (ProductData.ProductStockXL === null || ProductData.ProductStockXL === '') && 'none'}}>        
                        <Form.Label className='box'> XL </Form.Label>
                            <Form.Check
                                type="checkbox"
                                name="options"
                                value="XL"
                                onChange={handleCheckboxChange}
                            />
                    </div> 
                </Form.Group>
            <button>UPDATE Product</button>
        </Form>
        <Form onSubmit={(e) => CatSubmitHandler(e)} style = {{display: !addNew && 'none'}}>
                <Form.Group className='formgroup'>
                    <Form.Label>Category Image URL</Form.Label>
                    <Form.Control
                    type="text"
                    name="CategoryImageURL"
                    id='CategoryImageURL'
                    value = {CategoryData.CategoryImageURL}
                    onChange={(e) => CategoryChangeHandler(e)}
                    />
                </Form.Group>
                <Form.Group className='formgroup'>
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control
                    type="text"
                    name="CategoryName"
                    id='CategoryName'
                    value = {CategoryData.CategoryName}
                    onChange={(e) => CategoryChangeHandler(e)}
                    />
                </Form.Group>
                <button>ADD NEW Category</button>
        </Form>
        <div className='catDiv' style = {{display: !deleteExistingCat && 'none'}}>
            <ul>
                {
                    CategoryInfo.map((CatData) => (
                        <li className='catList'>
                            {CatData.CategoryName}
                            <DeleteIcon className='deleteButtons' onClick={() => deleteCat(CatData._id, CatData.CategoryName)} />
                        </li>
                    ))
                }
            </ul>
        </div>
    </div>
  )
}

export default DAEdtiProduct