import ContentCard from "@/Components/HomePage/ContentCard";
import { User } from "@/Context/user";

import { useContext, useEffect, useReducer } from "react";
import GridView from "./shared/GridView";



const MyListGrid = () => {
  const { state: { userInfo } } = useContext(User);

  return (
      <>
          <GridView myList={userInfo.myList}/>
      </>
  );
};

export default MyListGrid;
