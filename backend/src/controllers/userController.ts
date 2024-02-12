import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { generateToken } from '../utils.js';
import express, { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
    const { username, email, password, isAdmin } = req.body;

    const newUser = new User({
        username: username,
        email: email,
        password: bcrypt.hashSync(password),
        isAdmin: isAdmin,
        profilePicture: 'https://i.pravatar.cc/300',
    });

    const user = await newUser.save();
    res.send({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: isAdmin,
        profilePicture: 'https://i.pravatar.cc/300',
        token: generateToken(user._id.toString(), user.username, user.email, user.isAdmin, user.profilePicture, user.contentList),
    });

};