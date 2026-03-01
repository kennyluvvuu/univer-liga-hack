import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    role: { type: String, enum: ["employee", "director"], default: "employee" },
    department: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    id_crm: String,
    hash: { type: String, required: true },
    avatar: String,
});

export const UserModel = model("User", UserSchema);
