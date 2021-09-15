import { model, Schema } from "mongoose";
import { IUserModel } from "./IUserModel";

const userSchema = new Schema<IUserModel>({
    username: {
        type: String,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    }
},
{
    versionKey: false,
    timestamps: true,
})


export const userModel = model<IUserModel>('user', userSchema);