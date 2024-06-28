import axios from "axios";
import { baseURL } from "../baseUrl";
const userToken = localStorage.getItem('Token');

const addOrderApi = `${baseURL}/CustomerInfo/addCustomer`
const getOrderApi = `${baseURL}/CustomerInfo/getCustomer`;
const deleteOrderApi = `${baseURL}/CustomerInfo/deleteCustomer/`;

export async function addOrder(orderData){
    try{
        const result = await axios.post(addOrderApi, orderData, { headers: {"x-access-token" : userToken}})
        return result;
    }catch(error){
        console.log(error);
    }
}

export async function getOrder(){
    try{
        const result = await axios.get(getOrderApi, { headers: {"x-access-token" : userToken}})
        return result;
    }catch(error){
        console.log(error);
    }
}

export async function deleteOrder(orderId){
    try{
        const result = await axios.delete(deleteOrderApi + orderId, { headers: {"x-access-token" : userToken}})
        return result;
    }catch(error){
        console.log(error);
    }
}