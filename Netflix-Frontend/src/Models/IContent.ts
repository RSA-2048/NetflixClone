import  { Schema } from "mongoose"

export interface IContent {
    _id:Schema.Types.ObjectId,
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