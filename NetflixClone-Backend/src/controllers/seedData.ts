import { data, genres,listMovieNames,listSeriesNames } from "../data";
import ContentListByMovieName from "../models/ContentListByMovieName";
import Content from "../models/Content";
import ContentListByGenre from "../models/ContentListByGenre";
import {User} from "../models/User";
import express, { Request, Response } from "express";
import ContentListBySeriesName from "../models/ContentListBySeriesName";



export const seedData = async (req: Request, res: Response) => {
    try {
        await User.deleteMany();
        await Content.deleteMany();
        await ContentListByGenre.deleteMany();
        await ContentListByMovieName.deleteMany();
        await ContentListBySeriesName.deleteMany();

        const contents = await Content.insertMany(data.content);
        const users = await User.insertMany(data.users);
        const genres = await getGenres();
        const listMovieNames = await getListMovieNames()
        const listSeriesNames = await getListSeriesNames()

        // Use Promise.all to wait for all promises to resolve before moving forward
        await Promise.all(genres.map(async (genre) => {
            const listByGenre = await Content.find({ genre });
            await ContentListByGenre.insertMany({ genre, contentList: listByGenre });
        }));
        await Promise.all(listMovieNames.map(async (listName) => {
            const listMovie = await Content.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 10 } }
            ]);
            await ContentListByMovieName.insertMany({ listName, contentList: listMovie });
        }));
        await Promise.all(listSeriesNames.map(async (listName) => {
            const listSeries = await Content.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 10 } }
            ]);
            await ContentListBySeriesName.insertMany({ listName, contentList: listSeries });
        }));

        res.send({ contents, users });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};
const getGenres= async() => {
    return genres;
}
const getListMovieNames= async () => {
    return listMovieNames;
}
const getListSeriesNames= async () => {
    return listSeriesNames;
}
export const getGenresToClient= async(req:Request,res:Response) => {
    res.send(genres);
}
export const getMovieNamesToClient= async(req:Request,res:Response) => {
    res.send(listMovieNames);
}
export const getSeriesNamesToClient= async(req:Request,res:Response) => {
    res.send(listSeriesNames);
}