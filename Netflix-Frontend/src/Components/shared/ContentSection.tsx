import contentSectionReducer from '@/Reducers/contentSectionReducer';
import ContentsCarousel from './ContentCarousel';
import { IContent } from '@/Models/IContent';
import { IState } from '@/Models/States/IState';
import reducerHook from '@/Hooks/reducerHook';
import { useEffect, useReducer } from 'react';
import Loading from './Loading';
import Error from './Error';



const initialState: IState<IContent[]> = {
  loading: true,
  error: '',
  data: null
}

const ContentSection = (props: { genre: string | undefined, movieName: string | undefined, seriesName: string | undefined, url: string }) => {
  const [state, dispatch] = useReducer(contentSectionReducer, initialState);
  useEffect(() => {
    reducerHook(`/api/v1/content/${props.url}${props.genre || props.movieName || props.seriesName}`, dispatch)
  }, [])
  return (
    // <div className="h-40 space-y-0.5 md:space-y-2">
    <div>
      {state.data ? <div>
        {/* <h1 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">{props.genre  props.movieName  props.seriesName}</h1> */}
        <ContentsCarousel contents={state.data} title={props.genre || props.movieName || props.seriesName} />
      </div> : state.loading ? <Loading></Loading> : <Error message={state.error}></Error>}

    </div>
  )
}

export default ContentSection