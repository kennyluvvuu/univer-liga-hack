import { Types, Schema, model } from "mongoose";

export const TaskSchema = new Schema({
    userId: { type: Types.ObjectId, required: true, ref: "UserModel" },
    title: { type: String, required: true },
    desc: { type: String, required: true },
});

export const TaskModel = model("Task", TaskSchema);
