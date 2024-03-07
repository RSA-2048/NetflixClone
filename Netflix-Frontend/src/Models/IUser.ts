import { Schema } from 'mongoose';
import { IContent } from './IContent';

interface IUser {
  _id: Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  profilePicture: string;
  myList: IContent[]|undefined;
  ref: 'Content'; // Indicates that myList contains references to 'Content' model
  passwordChangeAt: number;
  passwordResetToken?: string;
  passwordResetTokenExpires?: Date;
}

export default IUser;