import Content from "../models/Content";
import { Request, Response } from "express";
import ContentListByGenre from "../models/ContentListByGenre";
import ContentListByMovieName from "../models/ContentListByMovieName";
import ContentListBySeriesName from "../models/ContentListBySeriesName";

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
// export const getContentsByGenre = async (req: Request, res: Response) => {
//     const genre=req.params.genre;
//     const contentListId = await ContentListByGenre.find({genre});
//     const contentList=contentListId.map((content)=> await Content.find({content.id}))

//     res.send(contentList);
// };
export const getContentById = async (req: Request, res: Response) => {
    const id=req.params.id;
    const content= await Content.findById(id)
    res.send(content);

};
export const getContentsByTitle = async (req: Request, res: Response) => {
    const titleFromParams=req.params.title;
    const contents = await Content.find({ title: { $regex: new RegExp(titleFromParams, 'i') } })
    .limit(12)  // Limit the results to the first 12
    res.send(contents);

};
// export const getContentToBillboardByType = async (req: Request, res: Response) => {
//     const isSeries: boolean = req.params.isSeries.toLowerCase() === "true" ? true : false
//     const contentToBillboard = await Content.aggregate([
//             { $match: { isSeries:isSeries } },
//             { $sample: { size: 1 } }
//         ]);
//         res.send(contentToBillboard);
    
// };
export const getContentToBillboard = async (req: Request, res: Response) => {
    const isSeries: boolean|null = req.params.isSeries.toLowerCase() === "true" ? true : req.params.isSeries.toLowerCase() === "false"?false:null;
    let contentToBillboard;
    if(isSeries==null){
        contentToBillboard = await Content.aggregate([
            { $sample: { size: 1 } }
        ]);
    }else{
        contentToBillboard = await Content.aggregate([
            { $match: { isSeries:isSeries } },
            { $sample: { size: 1 } }
        ]);
    }
    res.send(contentToBillboard[0]);   
};

export const getContentsByGenre = async (req: Request, res: Response) => {
    try {
        const genre = req.params.genre;

        // Use findOne to directly get the document, no need to await
        const contentListId = await ContentListByGenre.findOne({ genre }).populate('contentList');

        if (!contentListId) {
            return res.status(404).send("Genre not found");
        }

        // Now contentListId is already populated, no need for execPopulate

        // Extract the populated contentList array containing complete content documents
        const contentList = contentListId.contentList;

        res.send(contentList);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};
export const getContentsByMoviesName = async (req: Request, res: Response) => {
    try {
        const name = req.params.name;


        // Use findOne to directly get the document, no need to await
        const contentListId = await ContentListByMovieName.findOne({listName:name}).populate('contentList');
        if (!contentListId) {
            return res.status(404).send("name not found");
        }

        // Extract the populated contentList array containing complete content documents
        const contentList = contentListId.contentList;

        res.send(contentList);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};
export const getContentsBySeriesName = async (req: Request, res: Response) => {
    try {
        const name = req.params.name;
        

        // Use findOne to directly get the document, no need to await
        const contentListId = await ContentListBySeriesName.findOne({ listName:name }).populate('contentList');

        if (!contentListId) {
            return res.status(404).send("name not found");
        }

        // Now contentListId is already populated, no need for execPopulate

        // Extract the populated contentList array containing complete content documents
        const contentList = contentListId.contentList;

        res.send(contentList);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};