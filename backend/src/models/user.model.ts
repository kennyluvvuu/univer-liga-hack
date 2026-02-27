import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    email: String,
    hash: String,
    createdAt: { type: Date, default: Date.now },
});

export const User = model("User", UserSchema);
