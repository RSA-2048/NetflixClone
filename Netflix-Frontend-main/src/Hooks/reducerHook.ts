import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from '@/Helpers/Actions';
import { getData } from '@/Helpers/httpRequest';
import { MyAction } from '@/Models/Action/MyAction';

import React from 'react'

const reducerHook=(url:string,dispatch:React.Dispatch<MyAction>)=> {


        const getInfo=async()=>{
          
          dispatch({
            type: GET_REQUEST,
            payload: undefined
          });

        try{

          const data= await getData(url);
          dispatch({type:GET_SUCCESS,payload:data});
          
        }catch(error:any){
            dispatch({type:GET_FAIL,payload:error.message});
        }
        };
        getInfo();
      }



export default reducerHook