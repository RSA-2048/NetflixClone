
import {  useEffect, useReducer} from 'react';
import pagesReducer from '@/Reducers/pagesReducer';
import ContentSection from '@/Components/shared/ContentSection';

import { IState } from '@/Models/States/IState';
import reducerHook from '@/Hooks/reducerHook';



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
          {state.loading ?<p>loading</p>: state.error ?<p>{state.error}</p>:(
            <div>
              {state.data.map((listName:string,index:number) => (
                props.name==='movies'?
                <ContentSection key={index}  genre={undefined} movieName={listName} seriesName={undefined} url='movies/' />
                :props.name==='series'?
                <ContentSection key={index}  genre={undefined} movieName={undefined} seriesName={listName} url='series/' />
                :<ContentSection key={index}  genre={listName} movieName={undefined} seriesName={undefined} url='' />
              ))}
            </div>
          )}
          
         </div>



    </div>
  )
}


export default ContentPage