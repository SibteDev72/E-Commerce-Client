import axios from "axios";
import { baseURL } from "../baseUrl";
const userToken = localStorage.getItem('Token');

const addCategoryApi = `${baseURL}/CategoryInfo/addCategory`
const getCategoryApi = `${baseURL}/CategoryInfo/getCategory`;
const deleteCategoryApi = `${baseURL}/CategoryInfo/deleteCategory/`

export async function addCategory(categorytData){
    try{
        const result = await axios.post(addCategoryApi, categorytData, { headers: {"x-access-token" : userToken}} )
        return result;
    }catch(error){
        console.log(error);
    }
}

export async function getCategory(){
    try{
        const result = await axios.get(getCategoryApi, { headers: {"x-access-token" : userToken}} )
        return result;
    }catch(error){
        console.log(error);
    }
}

export async function deleteCategory(categorytID){
    try{
        const result = await axios.delete(deleteCategoryApi + categorytID, { headers: {"x-access-token" : userToken}} )
        return result;
    }catch(error){
        console.log(error);
    }
}

