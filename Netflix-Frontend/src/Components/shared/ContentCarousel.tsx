import { IContent } from "@/Models/IContent"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
import ContentCard from "./ContentCard"
const ContentsCarousel = (props: { contents: [IContent], title: string | undefined }) => {

  return (
    <div className="px-16 py-2">
      <h2 className="cursor-pointer text-sm font-semibold text-white md:text-2xl whitespace-nowrap mb-2">
        {props.title}
      </h2>

      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full">
        <CarouselContent>
          {Array.from({ length: props.contents.length }).map((_, index) => (
            <CarouselItem key={index} className="sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
              <ContentCard content={props.contents[index]}></ContentCard>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default ContentsCarousel