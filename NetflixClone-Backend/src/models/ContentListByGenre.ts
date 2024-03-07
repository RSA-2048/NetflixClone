import mongoose, { Model, Schema, model } from "mongoose";

interface IContentListByGenre{
    genre: String,
    contentList: mongoose.Types.ObjectId[],
}

type ContentListByGenreModel = Model<IContentListByGenre, {}>;

const contentListByGenreSchema = new Schema<IContentListByGenre, ContentListByGenreModel>({
    genre: { type: String, required: true },
    contentList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Content',
      }
}, { timestamps: true })

const ContentListByGenre = model<IContentListByGenre, ContentListByGenreModel>("ContentListByGenre", contentListByGenreSchema);
export default ContentListByGenre;