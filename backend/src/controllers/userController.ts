import bcrypt from 'bcryptjs'
import { generateToken, sendMail } from '../utils';
import express, { Request, Response } from "express";
import mongoose, { ObjectId } from 'mongoose';
import User from '../models/User';
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import { error } from 'console';
import { BinaryLike } from 'crypto';
import crypto from 'crypto'

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
        token: generateToken(user._id.toString(), user.username, user.email, user.isAdmin, user.profilePicture, user.myList),
    });

};
export const signin = async (req: Request, res: Response) => {
    const { password: passwordFromWebsite, email } = req.body;

    const user = await User.findOne({ email: email });
    if (user) {
        console.log(passwordFromWebsite.toString())
        console.log(user.password)
        if (bcrypt.compareSync(passwordFromWebsite.toString(), user.password.toString())) {
            res.send({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id.toString(), user.username, user.email, user.isAdmin, user.profilePicture, user.myList),
            });
            return;
        }
    }
    res.status(401).send({ message: "invalid password/user" });
}

export const forgotPassword = async (req: Request, res: Response, next: Function) => {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
        const resetToken = user.createResetPasswordToken();
        await user.save({ validateBeforeSave: false });
        const resetUrl = `${req.protocol}//${req.get('host')}/api/v1/users/reset/${resetToken}`;
        const message = `we received a password request.please use the below link for reset your password.\n\n\ ${resetUrl} \n\n this reset password link will be valid only for 10 minutes`
        try {
            await sendMail({
                email: user.email,
                subject: "password change request received",
                message: message
            })
            res.status(200).send({
                status: 'success',
                message: "password reset link send to the user email"
            });
        } catch (err) {
            user.passwordResetToken = undefined;
            user.passwordResetTokenExpires = undefined;
            user.save({ validateBeforeSave: false });
            return next(res.status(500).send("there was an error sending password reset email.please try again later"))
        }

    }
    else {
        res.status(404).send({ message: "email is not exist" });
    }
}

export const resetPassword = async (req: Request, res: Response, next: Function) => {
    const token = crypto.createHash("sha256").update(req.params.token).digest('hex');
    const user = await User.findOne({ passwordResetToken: token, passwordResetTokenExpires: { $gt: Date.now() } })
    if (user) {
        user.password = bcrypt.hashSync(req.body.password);
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpires = undefined;
        user.passwordChangeAt = Date.now();
        user.save();
        res.status(200).send({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id.toString(), user.username, user.email, user.isAdmin, user.profilePicture, user.myList),
        });
    } else {
        return next(res.status(400).send({ message: "token is unvalid or has expired" }))
    }
}   