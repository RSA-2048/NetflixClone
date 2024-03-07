import express from "express";
import { seedData } from "../controllers/seedController";


const seedRouter = express.Router();

seedRouter.get('/', seedData);

export default seedRouter;