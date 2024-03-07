import ContentCard from '../HomePage/ContentCard'
import { IContent } from '@/Models/IContent'

const GridView=(props:{myList:IContent[]})=> {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4%">
    {props.myList.map((content: IContent, index: number) => (
      <div key={index} className="flex mt-4"> {/* Adjust the margin top (mt) according to your preference */}
        <ContentCard content={content}></ContentCard>
      </div>
    ))}
  </div>
  )
}

export default GridView