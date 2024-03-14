import Error from '@/Components/shared/Error';
import Loading from '@/Components/shared/Loading';
import Title from '@/Components/shared/Title';
import reducerHook from '@/Hooks/reducerHook';
import { IContent } from '@/Models/IContent';
import { IState } from '@/Models/States/IState';
import billBoardReducer from '@/Reducers/billBoardReducer';
import { useEffect, useReducer, useState } from 'react'
import ReactPlayer from 'react-player';
import { Link, useParams } from 'react-router-dom';

const initialState: IState<IContent> = {
  loading: true,
  error: '',
  data: null
}

const WatchPage = () => {
  const { id } = useParams();
  const [state, dispatch] = useReducer(billBoardReducer, initialState);
  const [showLink, setShowLink] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLink(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [showLink]);

  useEffect(() => {
    reducerHook(`/api/v1/content/getById/${id}`, dispatch)
  }, []);

  const handleMouseMove = () => {
    setShowLink(true);
  };

  return (
    <div className="relative" onMouseMove={handleMouseMove}>
      <Title title="Netflix"></Title>
      {showLink && (
        <Link className='flex flex-row items-center text-white absolute top-4 left-4 z-10 text-lg' to={"/"}>
          <i className="fa-solid fa-angle-left"></i>
          <div className='hover:underline'>Home</div>
        </Link>
      )}
      {state.data ?
        <div style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
          <ReactPlayer
            className="pointer-events-none"
            muted
            playing
            loop
            controls={false}
            url={state.data.movie.toString()}
            disablePictureInPicture
            width={'100%'}
            height={'100%'}
          />
        </div> : state.loading?<Loading></Loading>:<Error message={state.error}></Error>}
    </div>
  );
};

export default WatchPage;
