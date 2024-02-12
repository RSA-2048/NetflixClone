import express from "express";
import { seedData } from "../controllers/seedData";




const seedRouter = express.Router();

seedRouter.get('/', seedData);

export default seedRouter;