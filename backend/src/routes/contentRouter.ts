import express from "express";
import expressAsyncHandler from 'express-async-handler'
import { getContents, getMovies, getSeries } from "../controllers/contentController";

const contentRouter = express.Router();

contentRouter.get('/', expressAsyncHandler(getContents));
contentRouter.get('/movies', expressAsyncHandler(getMovies));
contentRouter.get('/series', expressAsyncHandler(getSeries));


export default contentRouter;