import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import mongoose from 'mongoose';

dotenv.config();

export const generateToken = (_id: String, username: String, email: String, isAdmin: Boolean, profilePicture: String | null | undefined, myList: [mongoose.Schema.Types.ObjectId]) => {
    const secretKey = process.env.JWT_PW;
    if (!secretKey) {
        throw new Error('JWT_PW is not defined');
    }

    return jwt.sign({ _id: _id, username: username, email: email, isAdmin, profilePicture, myList }, secretKey, { expiresIn: '7d' });
}