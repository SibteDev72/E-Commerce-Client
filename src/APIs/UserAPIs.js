import axios from "axios";
import { baseURL } from "../baseUrl";

const userSignUpApi = `${baseURL}/User/signUp`;
const userSignInApi = `${baseURL}/User/signIn`;

export async function userSignUp(userData){
    try{
        const result = await axios.post(userSignUpApi, userData)
        return result;
    }catch(error){
        console.log(error);
    }
}

export async function userSignIn(userData){
    try{
        const result = await axios.post(userSignInApi, userData)
        return result
    }catch(error){
        console.log(error);
    }
}

