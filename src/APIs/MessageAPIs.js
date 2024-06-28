import axios from "axios";
import { baseURL } from "../baseUrl";
const userToken = localStorage.getItem('Token');

const addMessageApi = `${baseURL}/MessageInfo/addMessage`
const getMessageApi = `${baseURL}/MessageInfo/getMessage`;
const getMessagebyIDApi = `${baseURL}/MessageInfo/getMessagebyID/`
const deleteMessageApi = `${baseURL}/MessageInfo/deleteMessage/`;

export async function addMessage(messageData){
    try{
        const result = await axios.post(addMessageApi, messageData, { headers: {"x-access-token" : userToken}})
        return result;
    }catch(error){
        console.log(error);
    }
}

export async function getMessage(){
    try{
        const result = await axios.get(getMessageApi, { headers: {"x-access-token" : userToken}})
        return result;
    }catch(error){
        console.log(error);
    }
}

export async function getMessagebyID(messageID){
    try{
        const result = await axios.get(getMessagebyIDApi + messageID, { headers: {"x-access-token" : userToken}})
        return result;
    }catch(error){
        console.log(error);
    }
}

export async function deleteMessage(messageID){
    try{
        const result = await axios.delete(deleteMessageApi + messageID, { headers: {"x-access-token" : userToken}})
        return result;
    }catch(error){
        console.log(error);
    }
}