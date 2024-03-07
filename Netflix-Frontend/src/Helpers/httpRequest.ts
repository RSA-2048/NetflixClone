import axios from "axios";
import Cookies from "js-cookie";



const baseURL=import.meta.env.VITE_BASE_URL;
axios.defaults.baseURL = baseURL;


const createHeaders=()=>{
    const token: string | undefined = Cookies.get('token');
    if(token){
        return {headers:{authorization: `Bearer ${token}`}}
    }

}

export const getData=async(url:string)=>{
        const headers=createHeaders();
        const {data}=await axios.get(`${baseURL}${url}`,headers);
        return data;
}
export const postData=async(url:string,body:any)=>{
        const {data}=await axios.post(`${baseURL}${url}`,body);
        return data;

}