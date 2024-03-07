import mongoose, { Model, Schema, model } from "mongoose";

interface IContentListByMovieName{
    listName: String,
    contentList: mongoose.Types.ObjectId[],
}

type ContentListByMovieNameModel = Model<IContentListByMovieName, {}>;

const contentListByMovieNameSchema = new Schema<IContentListByMovieName, ContentListByMovieNameModel>({
    listName: { type: String, required: true },
    contentList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Content',
      }
}, { timestamps: true })

const ContentListByMovieName = model<IContentListByMovieName, ContentListByMovieNameModel>("ContentListByMovieName", contentListByMovieNameSchema);
export default ContentListByMovieName;