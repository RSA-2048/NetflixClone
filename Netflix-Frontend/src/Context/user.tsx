import { createContext, useReducer } from "react";
import userReducer from "../Reducers/userReducer";
import { IUserState } from "../Models/States/IUserState";

export const User = createContext<any>(null);
const userInfoString: string | null = localStorage.getItem('userInfo');

const initialState:IUserState = {
    userInfo: userInfoString ? JSON.parse(userInfoString) : null

}

export const UserProvider = ({ children }:any) => {
    const [state, dispatch] = useReducer(userReducer, initialState);
    const body = { state, dispatch }
    return <User.Provider value={body}>{children}</User.Provider>
}
