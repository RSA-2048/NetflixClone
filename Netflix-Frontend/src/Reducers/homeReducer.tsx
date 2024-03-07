import {GET_REQUEST,GET_FAIL,GET_SUCCESS} from "../Helpers/Actions";
import { MyAction } from '@/Models/MyAction.js';
import { IHomeState } from '@/Models/IHomeState.js';


 const initialState: IHomeState ={
    loading:true,
    error:'',
    data:[]
 }
const homePageReducer=(state: IHomeState = initialState, action: MyAction)=>{
    switch(action.type){

        case GET_REQUEST:{
            return {...state,loading:true}
        }
        case GET_FAIL:{
            return{...state,loading:false,error:action.payload}
        }
        case GET_SUCCESS:{
            return{...state,loading:false,data:action.payload}
        }
        default :return{...state};
    }
}

export default homePageReducer