import express, { Express, Request, Response, Router } from "express";
import dotenv from "dotenv";
import cors from "cors";
import seedRouter from "./routes/seedRouter";
import mongoose from "mongoose";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(cors());//dose nothing at the moment
app.use(express.json());//parses JSONs
app.use(express.urlencoded({ extended: false }));//this is common practice for urlencoded

const PORT = process.env.PORT || 3000;
//routes
app.use("/api/v1/seed", seedRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("my server");
});

const mongoConnection = process.env.MONGO_CONNECTION;
if (!mongoConnection) {
    throw new Error('MONGO_CONNECTION is not defined');
}

mongoose.connect(mongoConnection)
    .then(() => {
        app.listen(PORT, function () {
            console.log("listening to port" + PORT)
        })
    }).catch(err => console.log(err.message));