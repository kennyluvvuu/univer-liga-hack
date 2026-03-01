import { Schema, Types, model } from "mongoose";

export const CommentSchema = new Schema(
    {
        recipientId: { type: Types.ObjectId, ref: "User", required: true },
        senderId: { type: Types.ObjectId, ref: "User", required: true },
        taskId: { type: Types.ObjectId, ref: "Task", required: true },
        score: { type: Number, required: true },
        comment: { type: String, required: true },
        tags: [
            {
                title: { type: String, required: true },
                type: { type: String, required: true },
            },
        ],
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    },
);

export const CommentModel = model("Comment", CommentSchema);
