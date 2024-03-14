import { IContent } from '@/Models/IContent'
import ReactPlayer from 'react-player'
import { useNavigate } from 'react-router-dom'

const DialogCard=(props: { content: IContent })=> {
    const navigate=useNavigate();
    const navToWatchPage = () => {
        navigate(`/watch/${props.content._id.toString()}`);
      };
      console.log(props.content)
  return (
   <>
              <div className='aspect-[16/9]'>
                <ReactPlayer
                  className="pointer-events-none"
                  muted
                  playing
                  loop
                  controls={false}
                  disablePictureInPicture
                  width={'100%'}
                  height={'100%'}
                  url={props.content.trailer.toString()}
                  onClick={navToWatchPage}>
                </ReactPlayer>
              </div>
              <div>
                <h1 className='text-white text-xl font-bold pl-6 pr-6'>{props.content.title}</h1>
              </div>
              <div>
                <p className='text-green-500 pl-6 pr-6'>{props.content.year}</p>
                <p className='text-cyan-200 pl-6 pr-6'>{props.content.duration}</p>
              </div>
              <div>
                <p className='text-white pl-6 pb-6 pr-6'>{props.content.description}</p>
              </div>

   </>
  )
}

export default DialogCard