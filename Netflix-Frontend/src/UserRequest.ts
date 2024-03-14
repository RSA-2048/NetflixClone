import { Request } from "express";
import {IUser} from './models/User';
interface UserRequest extends Request{
    user:IUser
}
export default UserRequest