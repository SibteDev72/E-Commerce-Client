import axios from "axios";
import { baseURL } from "../baseUrl";
const userToken = localStorage.getItem('Token');

const addProductApi = `${baseURL}/ProductInfo/addProduct`;
const getProductApi = `${baseURL}/ProductInfo/getProduct`;
const getProductbyIDApi = `${baseURL}/ProductInfo/getProductbyID/`
const updateProductApi = `${baseURL}/ProductInfo/updateProduct/`;
const deleteProductApi = `${baseURL}/ProductInfo/deleteProduct/`;

export async function addProduct(productData){
    try{
        const result = await axios.post(addProductApi, productData, { headers: {'x-access-token': userToken} })
        return result;
    }catch(error){
        console.log(error);
    }
}

export async function getProduct(){
    try{
        const result = await axios.get(getProductApi, { headers: {'x-access-token': userToken} })
        return result;
    }catch(error){
        console.log(error);
    }
}

export async function getProductbyID(ProductID){
    try{
        const result = await axios.get(getProductbyIDApi + ProductID, { headers: {"x-access-token" : userToken}})
        return result;
    }catch(error){
        console.log(error);
    }
}

export async function updateProduct(ProductID, ProductData){
    try{
        const result = await axios.put(updateProductApi + ProductID, ProductData, { headers: {"x-access-token" : userToken}})
        return result;
    }catch(error){
        console.log(error);
    }
}

export async function deleteProduct(ProductID){
    try{
        const result = await axios.delete( deleteProductApi + ProductID, { headers: {"x-access-token" : userToken}} )
        return result;
    }catch(error){
        console.log(error);
    }
}
