
import {  useEffect, useReducer} from 'react';
import pagesReducer from '@/Reducers/pagesReducer';
import ContentSection from '@/Components/shared/ContentSection';
import { IState } from '@/Models/States/IState';
import reducerHook from '@/Hooks/reducerHook';
import Loading from './Loading';
import Error from './Error';



const initialState: IState<String[]> ={
  loading:true,
  error:'',
  data:null
}
const ContentPage=(props:{name:String})=> {
    const [state,dispatch]=useReducer(pagesReducer,initialState);
    useEffect(() => {
      reducerHook( `/api/v1/seed/${props.name}/`,dispatch)
    },[])
   
  return (
    <div>
        <div className='products'>
          {state.data ?(
            <div>
              {state.data.map((listName:string,index:number) => (
                props.name==='movies'?
                <ContentSection key={index}  genre={undefined} movieName={listName} seriesName={undefined} url='movies/' />
                :props.name==='series'?
                <ContentSection key={index}  genre={undefined} movieName={undefined} seriesName={listName} url='series/' />
                :<ContentSection key={index}  genre={listName} movieName={undefined} seriesName={undefined} url='' />
              ))}
            </div>
          ):state.loading?<Loading></Loading>:<Error message={state.error}></Error> }
          
         </div>



    </div>
  )
}


export default ContentPage