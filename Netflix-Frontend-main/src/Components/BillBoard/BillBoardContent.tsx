import { useNavigate } from 'react-router-dom'

const BillBoardContent=(props:{imgTitle:String,description:String,_id:String})=> {
    const navigate=useNavigate();

    const navToWatchPage=()=>{
        navigate(`/watch/${props._id.toString()}`)
      }
  return (
    <div className="absolute inset-0 flex items-center justify-start text-white px-5">
    <div className="text-left mx-8  w-2/6">
      <img src={props.imgTitle.toString()}></img>
      <p className="sm:text-sm md:text-lg lg:text-xl mb-8 ">{props.description}</p>
      <div className='flex flex-row'>
      <button onClick={()=>{navToWatchPage()}} className='flex flex-row bg-white hover:bg-gray-300 rounded py-2 px-6 justify-center items-center text-black font-semibold mr-3'>
            <i className="fa-solid fa-play mr-2" />
            <p>Play</p>
      </button>
      <button className='flex flex-row bg-gray-500 hover:bg-gray-700 rounded py-2 px-6 justify-center items-center font-semibold bg-opacity-60'>
            <i className="fa-solid fa-circle-info mr-2"></i>
            <p>More Info</p>
      </button>
      </div>
    </div>
  </div>
  )
}

export default BillBoardContent