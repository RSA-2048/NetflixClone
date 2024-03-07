import { IContent } from '@/Models/IContent';
import SearchPageReducer from '@/Reducers/SearchPageReducer';
import { useEffect, useReducer } from 'react'
import { IState } from '@/Models/States/IState';
import reducerHook from '@/Hooks/reducerHook';
import GridView from '@/Components/shared/GridView';
import { useParams } from 'react-router-dom';
import CheckUser from '@/Components/shared/CheckUser';
import Title from '@/Components/shared/Title';



const initialState: IState<IContent[]> ={
    loading:true,
    error:'',
    data:null
  }

const SearchPage=() =>{
    const {title}=useParams();
    const [state,dispatch]=useReducer(SearchPageReducer,initialState);
    useEffect(() => {
      reducerHook( `/api/v1/content/search/${title}`,dispatch)
    },[title])
  return (
        <div>
        <CheckUser/>
        <Title title='Search - Netflix'/>
            <div className="px-14 py-20 ">
            {state.data? <GridView myList={state.data}></GridView> : <p>error()</p>}
            </div>
        </div>
  )
}

export default SearchPage