
import Title from '../Components/shared/Title'
import CheckUser from '@/Components/shared/CheckUser';
import ContentPage from '@/Components/shared/ContentPage';
import BillBoard from '@/Components/shared/BillBoard';


const MoviesPage = () => {
   
  return (
    <div>
        <CheckUser/>
        <Title title='Movies - Netflix'/>
        <BillBoard isSeries="false"></BillBoard>
        <ContentPage name='movies'></ContentPage>

    </div>
  )
}

export default MoviesPage