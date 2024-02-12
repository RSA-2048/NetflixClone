import { Request, Response } from 'express';
import { data } from "../data"
import Content from "../models/Content";
import User from "../models/User";

const seedData = async (req: Request, res: Response) => {
    await User.deleteMany();
    await Content.deleteMany();

    const contents = await Content.insertMany(data.content);
    const users = await User.insertMany(data.users);
    res.send({ contents, users });
};

export default seedData;