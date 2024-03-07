
import Title from '../Components/shared/Title'

import CheckUser from '@/Components/shared/CheckUser';
import NavBar from '@/Components/shared/NavBar';
import ContentPage from '@/Components/shared/ContentPage';
import BillBoard from '@/Components/shared/BillBoard';


const HomePage = () => {

  return (
    <div >
      <CheckUser/>
        <Title title='Home - Netflix'/>
        <BillBoard isSeries='home'></BillBoard>
        <ContentPage name='genres'></ContentPage>
        <ContentPage name='series'></ContentPage>
        <ContentPage name='movies'></ContentPage>


    </div>
  )
}

export default HomePage