import mongoose, { Model, Schema, model } from "mongoose";
import crypto, { BinaryLike } from 'crypto'
interface IUser {
    username: String,
    email: String,
    password: String,
    isAdmin: Boolean,
    profilePicture: String,
    myList: mongoose.Types.ObjectId[],
    ref: 'Content',
    passwordChangeAt: Number,
    passwordResetToken: String | undefined,
    passwordResetTokenExpires: Date | undefined,
}

// Put all user instance methods in this interface:
interface IUserMethods {
    createResetPasswordToken(): crypto.BinaryLike
}
type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    profilePicture: { type: String },
    myList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Content',
    },
    passwordChangeAt: Number,
    passwordResetToken: String || undefined,
    passwordResetTokenExpires: Date || undefined,

}, { timestamps: true })

userSchema.method("createResetPasswordToken", function (): crypto.BinaryLike {
    const resetToken: crypto.BinaryLike = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetToken = hashedToken;
    this.passwordResetTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    return resetToken;
});


const User = model<IUser, UserModel>("User", userSchema);
export default User;