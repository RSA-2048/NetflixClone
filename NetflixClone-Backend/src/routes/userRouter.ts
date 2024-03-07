import express from "express";
import expressAsyncHandler from 'express-async-handler';
import { addMovieToMyList, checkEmail, forgotPassword, getMyList, removeMovieToMyList, resetPassword, signin, signup } from "../controllers/userController";


const userRouter = express.Router();


userRouter.post('/signup', expressAsyncHandler(signup));
userRouter.post('/signin', expressAsyncHandler(signin));
userRouter.post('/forgot', expressAsyncHandler(forgotPassword));
userRouter.get('/getmylist/:email', expressAsyncHandler(getMyList));
userRouter.post("/checkemail", expressAsyncHandler(checkEmail));
userRouter.post("/addmovietomylist", expressAsyncHandler(addMovieToMyList));
userRouter.post("/removemovietomylist", expressAsyncHandler(removeMovieToMyList));
userRouter.patch('/reset/:token', expressAsyncHandler(resetPassword));


export default userRouter;