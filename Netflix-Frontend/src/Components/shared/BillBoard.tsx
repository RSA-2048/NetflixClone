import { useEffect, useReducer, useState } from 'react';
import { IState } from '@/Models/States/IState';
import { IContent } from '@/Models/IContent';
import billBoardReducer from '@/Reducers/billBoardReducer';
import reducerHook from '@/Hooks/reducerHook';
import BillBoardImage from '../BillBoard/BillBoardImage';
import BillBoardContent from '../BillBoard/BillBoardContent';
import BillBoardVideo from '../BillBoard/BillBoardVideo';
import Loading from './Loading';
import Error from './Error';

const initialState: IState<IContent[]> = {
  loading: true,
  error: '',
  data: null
}

const BillBoard = (props: { isSeries: string }) => {
  const [state, dispatch] = useReducer(billBoardReducer, initialState);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    reducerHook(`/api/v1/content/getContentBillBoard/${props.isSeries}`, dispatch)
  }, [])

  const handleLoading = () => {
    setTimeout(() => {
      setShowTrailer(true);
    }, 3000);
  };

  return (

    <div>
      {state.data ? <div style={{ width: '100%', height: '80vh', position: 'relative', overflow: 'hidden' }}
        onLoad={handleLoading}
      >
        {!showTrailer && (
          <BillBoardImage image={state.data.imgThumb.toString()} />
        )}
        {showTrailer && (
          <BillBoardVideo trailer={state.data.trailer.toString()} />
        )}
        <BillBoardContent content={state.data}/>
      </div> : state.loading ? <Loading></Loading> : <Error message={state.error} />}

    </div>
  );
}


export default BillBoard;