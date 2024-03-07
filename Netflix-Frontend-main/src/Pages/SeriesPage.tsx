import Title from '../Components/shared/Title'
import CheckUser from '@/Components/shared/CheckUser';
import ContentPage from '@/Components/shared/ContentPage';
import BillBoard from '@/Components/shared/BillBoard';



const SeriesPage = () => {

  return (
    <div>

        <CheckUser/>
        <Title title='TV Shows - Netflix'/>
        <BillBoard isSeries="true"></BillBoard>
        
        <ContentPage name='series'></ContentPage>

    </div>
  )
}

export default SeriesPage