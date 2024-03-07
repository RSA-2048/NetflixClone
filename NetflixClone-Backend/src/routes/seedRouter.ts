import express from "express";
import { getGenresToClient, getMovieNamesToClient, getSeriesNamesToClient, seedData } from "../controllers/seedData";




const seedRouter = express.Router();

seedRouter.get('/', seedData);
seedRouter.get('/genres', getGenresToClient);
seedRouter.get('/movies', getMovieNamesToClient);
seedRouter.get('/series', getSeriesNamesToClient);

export default seedRouter;