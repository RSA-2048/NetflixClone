import mongoose, { Model, Schema, model } from "mongoose";

interface IContent {
  title: String,
  description: String,
  img: String,
  imgTitle: String,
  imgThumb: String,
  imgVertical: String,
  trailer: String,
  movie: String,
  duration: String,
  year: String,
  limit: String,
  genre: String,
  isSeries: Boolean
}

type ContentModel = Model<IContent, {}>;

const contentSchema = new Schema<IContent, ContentModel>({
  title: { type: String, required: true },
  description: { type: String, required: true, default: "no description" },
  img: { type: String, required: true },
  imgTitle: { type: String, required: true },
  imgThumb: { type: String, required: true },
  imgVertical: { type: String, required: true },
  trailer: { type: String, required: true },
  movie: { type: String, required: true },
  duration: { type: String, required: true },
  year: { type: String, required: true },
  limit: { type: String, required: true },
  genre: { type: String, required: true },
  isSeries: { type: Boolean, required: true }

}, { timestamps: true })

const Content = model<IContent, ContentModel>("Content", contentSchema);
export default Content;