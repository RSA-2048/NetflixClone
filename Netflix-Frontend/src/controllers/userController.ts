import bcrypt from 'bcryptjs'
import { generateToken, sendMail } from '../utils';
import  { Request, Response } from "express";
import {User} from '../models/User';
import crypto from 'crypto'

export const signup = async (req: Request, res: Response) => {
    const { username, email, password, isAdmin } = req.body;
    const userIsExist = await User.findOne({ email: email });
    if(userIsExist){
        res.status(401).send({ message: "this email already exist" });
    }
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
        token: generateToken(user),
    });

};

export const signin = async (req: Request, res: Response) => {
    const { password: passwordFromWebsite, email } = req.body;
    const user = await User.findOne({ email: email }).populate('myList');
    if (user) {
        if (bcrypt.compareSync(passwordFromWebsite.toString(), user.password.toString())) {
            res.send({
                _id: user._id,
                username: user.username,
                email: user.email,
                profilePicture:user.profilePicture,
                token: generateToken(user),
                myList:user.myList
            });
            return;
        }
    }
    res.status(401).send({ message: "invalid password/user" });
}

export const getMyList = async (req: Request, res: Response) => {
    const { email } = req.params;
    const user = await User.findOne({ email: email });
    if (user) {
        const {myList}=await user.populate('myList');
        res.status(200).send(myList);
    }
    else {
        res.status(404).send({ message: "email dose not exist" });
    }
}

export const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
        const resetToken = user.createResetPasswordToken();
        await user.save({ validateBeforeSave: false });
        const resetUrl = `${req.get("referer")}reset/${resetToken}`;
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
            res.status(500).send("there was an error sending password reset email.please try again later");
        }

    }
    else {
        res.status(404).send({ message: "email dose not exist" });
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    const token = crypto.createHash("sha256").update(req.params.token).digest('hex');
    const user = await User.findOne({ passwordResetToken: token, passwordResetTokenExpires: { $gt: Date.now() } });
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
            token: generateToken(user),
        });
    } else {
        res.status(400).send({ message: "token is invalid or has expired" });
    }
}   
export const checkEmail = async (req: Request, res: Response) => {

    const { email } = req.body;
    const userIsExist = await User.findOne({ email: email });
    if (userIsExist) {
         res.status(401).send({ message: "this email already exists" });
    }
     res.status(200).send({ message: "email is available" });
}
export const addMovieToMyList=async (req: Request, res: Response) => {
    const { email,contentIdToCheck } = req.body;
    const user = await User.findOne({
        email: email,
        myList: {
          $in: [contentIdToCheck]
        }
      })
    if(user){
        res.status(401).send({ message: "this content already exists" });
    }else{      
        await User.updateOne(
            { email: email },
            { $addToSet: { myList: contentIdToCheck } }
        )
        res.status(200).send({ message: "the content add to your list" });
    }
}
export const removeMovieToMyList=async (req: Request, res: Response) => {
    const { email,contentIdToCheck } = req.body;
    const user = await User.findOne({
        email: email,
        myList: {
          $in: [contentIdToCheck]
        }
      })
    if(user){
        const result = await User.updateOne(
            { email: email },
            { $pull: { myList: contentIdToCheck } }
          );
        res.status(200).send({ message: "the content remove from your list" });
    }else{      
        res.status(401).send({ message: "this content does not exist" });
    }
}

