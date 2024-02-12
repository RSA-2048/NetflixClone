import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    profilePicture: { type: String },
    contentList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Content',
        default: []
    }

}, { timestamps: true })

const User = mongoose.model("User", userSchema);
export default User;