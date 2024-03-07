import { IContent } from "@/Models/IContent"
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import CardHoverInterface from "../ContentCard/CardHoverInterface";



const ContentCard = (props: { content: IContent }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();



  const handleMouseEnter = () => {
    setHovered(true)
    setTimer(
      setTimeout(() => {
        setShowTrailer(true);
      }, 1700)
    );
  };

  const handleMouseLeave = () => {
    setHovered(false)
    setShowTrailer(false);
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
  };
  const navToWatchPage = () => {
    navigate(`/watch/${props.content._id.toString()}`)
  }


  return (
    <Card className='bg-transparent border-none h-full'>
      <CardContent className="flex aspect-[4/3] p-0">
        <div
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          className={`transition-transform duration-500 hover:scale-150 flex flex-col`}>
          {!showTrailer &&
            <img className="aspect-video hover:rounded-t-sm rounded-sm" src={props.content.imgThumb.toString()} onClick={navToWatchPage} />
          }
          {showTrailer &&
            <ReactPlayer
              className="pointer-events-none"
              muted
              playing
              loop
              controls={false}
              disablePictureInPicture
              width={'100%'}
              height={'60%'}
              url={props.content.trailer.toString()}
              onClick={navToWatchPage}>

            </ReactPlayer>
          }
          {hovered ?
            <div className="p-1 bg-zinc-800 shadow-2xl rounded-b-sm">
              <CardHoverInterface content={props.content}></CardHoverInterface>
            </div>
            : <></>}
        </div>

      </CardContent>
    </Card >
  );

}

export default ContentCard;
