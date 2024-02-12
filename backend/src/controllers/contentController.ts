import Content from "../models/Content";
import express, { Request, Response } from "express";

export const getContents = async (req: Request, res: Response) => {
    const contents = await Content.find();
    res.send(contents);
};
export const getMovies = async (req: Request, res: Response) => {
    const movies = await Content.find({ isSeries: false });
    res.send(movies);
};
export const getSeries = async (req: Request, res: Response) => {
    const series = await Content.find({ isSeries: true });
    res.send(series);
};