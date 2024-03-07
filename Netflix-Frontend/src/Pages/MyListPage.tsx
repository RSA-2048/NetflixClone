import MyListGrid from "@/Components/MyLIstGrid";
import CheckUser from "@/Components/shared/CheckUser";
import Title from "@/Components/shared/Title";


const MyListPage= () => {

    return (
      <div>
      <CheckUser/>
      <Title title='My List - Netflix'/>
      <div className="px-14 py-20 ">
        <h1 className="text-white text-3xl font-bold ">My List</h1>
        <MyListGrid/>
      </div>


  </div>
    );
};

export default MyListPage;