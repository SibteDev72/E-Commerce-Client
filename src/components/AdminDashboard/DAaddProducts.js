import React from 'react'
import Form from "react-bootstrap/Form";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import './DAaddProducts.scss'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../../baseUrl';

function DAaddProducts() {
  const userToken = localStorage.getItem('Token');
  const[CategoryInfo, setCategoryInfo] = useState([]);
  const[checkedValues, setCheckedValues] = useState([]);
  const[ImageUrls, setImageUrls] = useState({});
  const[imgChange1, setimgChange1] = useState(false);
  const[imgChange2, setimgChange2] = useState(false);
  const[imgChange3, setimgChange3] = useState(false);
  const[imgChange4, setimgChange4] = useState(false);
  const[Product, setProduct] = useState([]);
  const[addNew, setAddNew] = useState(false);
  const[deleteExistingCat, setdeleteExistingCat] = useState(false);
  
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
      const CategoryAPI = `${baseURL}/CategoryInfo/getCategory`;
      axios.get( CategoryAPI, { headers: {"x-access-token" : userToken}} ).then((result) => {
          setCategoryInfo(result.data)
      })
      .catch((error) => {
          console.log("Error Occurred !!!" + error);
      })
      const api1 = `${baseURL}/ProductInfo/getProduct`;
      axios.get(api1, { headers: {"x-access-token" : userToken}}).then((result) => {
          setProduct(result.data)
      })
      .catch((error) => {
          console.log("Error Occurred !!!" + error);
      })
  }, [])

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

  function changeHandler(e){
      const newProductData = {...ProductData}
      newProductData[e.target.name] = e.target.value;
      setProductData(newProductData);
  }

  function CategoryChangeHandler(e){
      const newCategoryData = {...CategoryData}
      newCategoryData[e.target.name] = e.target.value;
      setCategoryData(newCategoryData);
  }

  function CatSubmitHandler(e){
      e.preventDefault()
          const AddNewAPI = `${baseURL}/CategoryInfo/addCategory`
          axios.post( AddNewAPI, CategoryData ).then(() => {
              setAddNew(false);
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
              window.location.assign('/AdminDashboardRoute');   
          })
          .catch((error) => {
              console.log("Error Occurred !!!" + error);
          })
      }else{
          alert('You Cannot Delete this Category Because it has '+counter+' Products');
      }
      counter = 0;
  }

  // const[image, setImage] = useState();
  // function imageChange(e){
  //     console.log(e.target.files[0]);
  //     setImage(e.target.files[0]);
  // }

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setCheckedValues([...checkedValues, value]);
    } else {
      setCheckedValues(checkedValues.filter((item) => item !== value));
    }
  };

  function submitHandler(e){
      e.preventDefault()
      ProductData.ProductSizes = checkedValues;
      const newArrImgs = Object.values(ImageUrls);
      ProductData.ProductImageUrlArray = [...newArrImgs];
          const api1 = `${baseURL}/ProductInfo/addProduct`
          axios.post(api1, ProductData, { headers: {"x-access-token" : userToken}}).then((results) => {
              console.log(results);
              window.location.assign('/AdminDashboardRoute');
          })
          .catch((error) => {
              console.log(error);
          })

      //     const formData = new FormData();
      //     formData.append('file', image);
      //     axios.post(`${baseURL}/UploadMedia/postuploadInfo', formData).then(result => {
      //     console.log(result);
      // })
      // .catch((error) => {
      //     console.log(error);
      // }) 
  }

  // //MultiFiles Uploading Section
  // const[selectedFiles, setSelectedFiles] = useState(null);
  // const[uploadedImages, setUploadedImages] = useState([]);
  
  // // File Change Handler Function
  // function fileChangeHandler(event){
  //     setSelectedFiles(event.target.files);
  // }

  // // Upload Images in Server
  // function uploadButton(event){
  //     event.preventDefault();

  //     const formData = new FormData();
  //     for( const file of selectedFiles){
  //         formData.append('images', file);
  //     }

  //     axios.post(`${baseURL}/UploadMultiMedia/uploadMultiImages', formData).then((res) => {
  //         setUploadedImages(res.data.paths)
  //         const imageUrl = URL.createObjectURL(uploadedImages);
  //     })
  //     .catch((error) => {
  //         console.log(error);
  //     })
  // }
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
        <Form onSubmit={(e) => submitHandler(e)} style = {{display: (addNew || deleteExistingCat) && 'none'}}>
            <Row>
            {/* <Form.Group className='formgroup'>
                <Form.Label>Product Image</Form.Label>
                <Form.Control
                type='file' 
                name='file' 
                onChange = {(e) => imageChange(e)}
                />
            </Form.Group> */}
                <Col>
                    <Form.Group className='formgroup'>
                        <Form.Label>Product Cover Image URL</Form.Label>
                        <Form.Control
                        type="text"
                        name="Image1"
                        value = {imgChange1? ImageUrls.Image1 : ImageUrls.Image1 = ''}
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
                        value = {imgChange2? ImageUrls.Image2 : ImageUrls.Image2 = ''}
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
                        value = {imgChange3? ImageUrls.Image3 : ImageUrls.Image3 = ''}
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
                        value = {imgChange4? ImageUrls.Image4 : ImageUrls.Image4 = ''}
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
                        value={ProductData.ProductStockXL}
                        onChange = {(e) => changeHandler(e)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Label className='labels'>Product Sizes</Form.Label>
                <Form.Group className='checkboxes'>
                    <div style = {{display: (ProductData.ProductStockS === '') && 'none'}}>
                        <Form.Label className='box'> S </Form.Label>
                            <Form.Check 
                                type="checkbox"
                                name="options"
                                value="S"
                                onChange={handleCheckboxChange}
                            />
                    
                    </div>
                    <div style = {{display: (ProductData.ProductStockM === '') && 'none'}}>
                        <Form.Label className='box'> M </Form.Label>
                            <Form.Check
                                type="checkbox"
                                name="options"
                                value="M"
                                onChange={handleCheckboxChange}
                            />
                    </div>
                    <div style = {{display: (ProductData.ProductStockL === '') && 'none'}}>
                        <Form.Label className='box'> L </Form.Label>
                            <Form.Check
                                type="checkbox"
                                name="options"
                                value="L"
                                onChange={handleCheckboxChange}
                            />
                    </div>
                    <div style = {{display: (ProductData.ProductStockXL === '') && 'none'}}>        
                        <Form.Label className='box'> XL </Form.Label>
                            <Form.Check
                                type="checkbox"
                                name="options"
                                value="XL"
                                onChange={handleCheckboxChange}
                            />
                    </div> 
                </Form.Group>
            <button>ADD Product</button>
        </Form>
        <Form onSubmit={(e) => CatSubmitHandler(e)} style = {{display: !addNew && 'none'}}>
                <Form.Group className='formgroup'>
                    <Form.Label>Category Image URL</Form.Label>
                    <Form.Control
                    type="text"
                    name="CategoryImageURL"
                    value = {CategoryData.CategoryImageURL}
                    onChange={(e) => CategoryChangeHandler(e)}
                    />
                </Form.Group>
                <Form.Group className='formgroup'>
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control
                    type="text"
                    name="CategoryName"
                    value = {CategoryData.CategoryName}
                    onChange={(e) => CategoryChangeHandler(e)}
                    />
                </Form.Group>
                <button>
                    ADD NEW Category
                </button>
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

export default DAaddProducts