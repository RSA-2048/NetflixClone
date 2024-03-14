import mongoose, { Model, Schema, model } from "mongoose";

interface IContentListBySeriesName{
    listName: String,
    contentList: mongoose.Types.ObjectId[],
}

type ContentListBySeriesNameModel = Model<IContentListBySeriesName, {}>;

const contentListBySeriesNameSchema = new Schema<IContentListBySeriesName, ContentListBySeriesNameModel>({
    listName: { type: String, required: true },
    contentList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Content',
      }
}, { timestamps: true })

const ContentListBySeriesName = model<IContentListBySeriesName, ContentListBySeriesNameModel>("ContentListBySeriesName", contentListBySeriesNameSchema);
export default ContentListBySeriesName;