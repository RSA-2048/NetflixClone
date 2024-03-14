import { User } from '@/Context/user';
import { ADD_TO_MY_LIST, REMOVE_FROM_MY_LIST } from '@/Helpers/Actions';
import { postData } from '@/Helpers/httpRequest';
import { getError } from '@/Helpers/utils';
import { IContent } from '@/Models/IContent';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import DialogCard from '../shared/DialogCard';


const CardHoverInterface = (props: { content: IContent }) => {
  const { state: { userInfo }, dispatch } = useContext(User);
  const navigate = useNavigate();

  const navToWatchPage = () => {
    navigate(`/watch/${props.content._id.toString()}`);
  };
  const addToMyList = async () => {
    try {
      const data = await postData("/api/v1/users/addmovietomylist", { email: userInfo.email, contentIdToCheck: props.content._id.toString() });
      dispatch({ type: ADD_TO_MY_LIST, payload: props.content });
      toast.success(data.message);
    } catch (error) {
      toast.error(getError(error));
    }
  };
  const removeToMyList = async () => {
    try {
      const data = await postData("/api/v1/users/removeMovieToMyList", { email: userInfo.email, contentIdToCheck: props.content._id.toString() });
      dispatch({ type: REMOVE_FROM_MY_LIST, payload: props.content });
      toast.success(data.message);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row justify-between'>
        <div>
          <button onClick={navToWatchPage} className="rounded-full bg-white border border-zinc-900 p-1 w-8 h-8">
            <i className="fa-solid fa-play"></i>
          </button>
          {userInfo ? userInfo.myList.some((item: IContent) => item._id === props.content._id) ? (
            <button onClick={() => removeToMyList()} className="rounded-full border border-gray-100 text-gray-100 p-1 w-8 h-8 mx-1">
              <i className="fa-solid fa-minus"></i>
            </button>
          ) : (
            <button onClick={() => addToMyList()} className="rounded-full border border-gray-100 text-gray-100 p-1 w-8 h-8 mx-1">
              <i className="fa-solid fa-plus"></i>
            </button>
          ) : null}

          <button className="rounded-full border border-gray-100 text-gray-100 p-1 w-8 h-8 mx-1">
            <i className="fa-solid fa-thumbs-up"></i>
          </button>
        </div>
        <div>
          <Dialog>
            <DialogTrigger>
              <button className='rounded-full border border-gray-100 text-gray-100 p-1 w-8 h-8'>
                <i className="fa-solid fa-angle-down"></i>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogCard content={props.content}/>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h1 className='text-white text-sm'>{props.content.title}</h1>
      </div>
    </div>
  );
};

export default CardHoverInterface;