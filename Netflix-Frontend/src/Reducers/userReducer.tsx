import { IUserState } from "@/Models/States/IUserState";
import { USER_SIGNIN, USER_SIGNOUT, ADD_TO_MY_LIST, REMOVE_FROM_MY_LIST} from "../Helpers/Actions";
import { MyAction } from "@/Models/Action/MyAction";


const userReducer = (state: IUserState, action: MyAction) => {
  const type = action.type;
  const payload = action.payload;

  switch (type) {
    case USER_SIGNIN: {
      return { ...state, userInfo: payload };
    }
    case USER_SIGNOUT: {
      return { ...state, userInfo:null};
    }
    case ADD_TO_MY_LIST: {

        const myList=[...(state.userInfo?.myList||[]),payload];
        const userInfo={
                ...state.userInfo,
                myList: myList,
        }
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      return {
        ...state,
        userInfo: userInfo,
      };
    }case REMOVE_FROM_MY_LIST: {
        const myList= state.userInfo?.myList?.filter(item => item._id !== payload._id) || [];
        const userInfo={
            ...state.userInfo,
            myList: myList,
    }
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
      return {
        ...state,
        userInfo: userInfo,
      };
      }
    default:
      return { ...state };
  }
};

export default userReducer;