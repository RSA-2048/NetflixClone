import { User } from '@/Context/user';
import { ADD_TO_MY_LIST, REMOVE_FROM_MY_LIST } from '@/Helpers/Actions';
import { postData } from '@/Helpers/httpRequest';
import { getError } from '@/Helpers/utils';
import { IContent } from '@/Models/IContent';
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const CardHoverInterface = (props: { content: IContent }) => {
    const { state: { userInfo }, dispatch } = useContext(User);
    const navigate = useNavigate();

    const navToWatchPage = () => {
        navigate(`/watch/${props.content._id.toString()}`)
    }
    const addToMyList = async () => {
        try {
            const data = await postData("/api/v1/users/addmovietomylist", { email: userInfo.email, contentIdToCheck: props.content._id.toString() });
            dispatch({ type: ADD_TO_MY_LIST, payload: props.content })
            toast.success(data.message);
        } catch (error) {
            toast.error(getError(error))
        }
    }
    const removeToMyList = async () => {
        try {
            const data = await postData("/api/v1/users/removeMovieToMyList", { email: userInfo.email, contentIdToCheck: props.content._id.toString() });
            dispatch({ type: REMOVE_FROM_MY_LIST, payload: props.content })
            toast.success(data.message);
        } catch (error) {
            toast.error(getError(error))
        }
    }

    return (
        <div className='flex flex-col'>
            <div className='flex flex-row justify-between'>
                <div>
                    <button onClick={navToWatchPage} className="rounded-full bg-white border border-zinc-900 px-2 mr-0.5">
                        <i className="fa-solid fa-play"></i>
                    </button>
                    {userInfo ? userInfo.myList.some((item: IContent) => item._id === props.content._id) ? (
                        <button onClick={() => removeToMyList()} className="rounded-full border border-gray-100 text-gray-100 px-2 mr-0.5"><i className="fa-solid fa-minus" /></button>
                    ) : (
                        <button onClick={() => addToMyList()} className="rounded-full border border-gray-100 text-gray-100 px-2 mr-0.5"><i className="fa-solid fa-plus" /></button>
                    ) : <></>}
                    <button className='rounded-full border border-gray-100 text-gray-100 px-2 mr-0.5'>
                        <i className='fa-solid fa-thumbs-up' />
                    </button>
                </div>
                <div>
                    <button className='rounded-full border border-gray-100 text-gray-100 px-2'>
                        <i className="fa-solid fa-angle-down" />
                    </button>
                </div>
            </div>
            <div>
                <h1 className='text-white text-sm'>{props.content.title}</h1>
            </div>
        </div>
    )
}

export default CardHoverInterface