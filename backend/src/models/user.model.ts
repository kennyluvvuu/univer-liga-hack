import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
    email: { type: String, unique: true },
    hash: String,
    createdAt: { type: Date, default: Date.now },
});

export const UserModel = model("User", UserSchema);
