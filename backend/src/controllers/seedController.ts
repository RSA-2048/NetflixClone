import { data } from "../data";
import Content from "../models/Content";
import User from "../models/User";
import express, { Request, Response } from "express";



export const seedData = async (req: Request, res: Response) => {
    await User.deleteMany();
    await Content.deleteMany();

    const contents = await Content.insertMany(data.content);
    const users = await User.insertMany(data.users);////lllll
    res.send({ contents, users });
}