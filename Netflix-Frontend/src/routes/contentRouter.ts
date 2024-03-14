import express from "express";
import expressAsyncHandler from 'express-async-handler'
import { getContentById, getContentsByTitle, getContentToBillboard, getContents, getContentsByGenre, getContentsByMoviesName, getContentsBySeriesName, getMovies, getSeries, addContent } from "../controllers/contentController";
import { isAdmin, isAuth} from "../utils";


const contentRouter = express.Router();

contentRouter.post('/addcontent',isAuth,isAdmin,expressAsyncHandler(addContent))
contentRouter.get('/',isAuth,expressAsyncHandler(getContents));
contentRouter.get('/movies',isAuth, expressAsyncHandler(getMovies));
contentRouter.get('/series',isAuth, expressAsyncHandler(getSeries));
contentRouter.get('/getContentBillBoard/:isSeries',isAuth,expressAsyncHandler(getContentToBillboard))
contentRouter.get('/:genre',isAuth,getContentsByGenre);
contentRouter.get('/getById/:id',isAuth, expressAsyncHandler(getContentById));
contentRouter.get('/movies/:name',isAuth,getContentsByMoviesName)
contentRouter.get('/series/:name',isAuth,getContentsBySeriesName)
contentRouter.get('/search/:title',isAuth,expressAsyncHandler(getContentsByTitle))



export default contentRouter;