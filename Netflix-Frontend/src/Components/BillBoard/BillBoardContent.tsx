import { useNavigate } from 'react-router-dom'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import DialogCard from '../shared/DialogCard';
import { IContent } from '@/Models/IContent';

const BillBoardContent = (props: {content:IContent}) => {
  const navigate = useNavigate();

  const navToWatchPage = () => {
    navigate(`/watch/${props.content._id.toString()}`)
  }
  return (
    <div className="absolute inset-0 flex items-center justify-start text-white px-5">
      <div className="text-left mx-8  w-2/6">
        <img src={props.content.imgTitle.toString()}></img>
        <p className="sm:text-xs md:text-sm lg:text-lg mb-8 overflow-hidden line-clamp-3 md:line-clamp-none">{props.content.description}</p>
        <div className='flex flex-row'>
          <button onClick={() => { navToWatchPage() }} className='flex flex-row bg-white hover:bg-gray-300 rounded py-2 px-6 justify-center items-center text-black font-semibold mr-3'>
            <i className="fa-solid fa-play mr-2" />
            <p>Play</p>
          </button>
          <Dialog>
            <DialogTrigger>
          <button className='flex flex-row bg-gray-500 hover:bg-gray-700 rounded py-2 px-6 justify-center items-center font-semibold bg-opacity-60'>
            <i className="fa-solid fa-circle-info mr-2"></i>
            <p>More Info</p>
            </button>
            </DialogTrigger>
            <DialogContent>
              <DialogCard content={props.content}/>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default BillBoardContent