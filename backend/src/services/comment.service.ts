import { CommentModel } from "../models/comment.model";
import { Review } from "../schemas/review.schema";

export default class CommentService {
    async create(comment: Review) {
        const newComment = await CommentModel.create({
            recipientId: comment.recipientId,
            senderId: comment.senderId,
            taskId: comment.taskId,
            score: comment.score,
            comment: comment.comment,
            tags: comment.tags,
        });

        return {
            id: newComment._id.toString(),
            recipientId: newComment.recipientId.toString(),
            senderId: newComment.senderId.toString(),
            taskId: newComment.taskId.toString(),
            score: newComment.score,
            comment: newComment.comment,
            tags: newComment.tags,
            createdAt: newComment.createdAt.toISOString(),
            updatedAt: newComment.updatedAt.toISOString(),
        };
    }

    async getByRecipientId(recipientId: string) {
        const commentsList = await CommentModel.find({ recipientId }).lean();
        return commentsList.map(({ _id, createdAt, updatedAt, ...c }) => ({
            ...c,
            id: _id.toString(),
            createdAt: createdAt.toISOString(),
            updatedAt: updatedAt.toISOString(),
        }));
    }

    async getBySenderId(senderId: string) {
        const commentsList = await CommentModel.find({ senderId }).lean();
        return commentsList.map(({ _id, createdAt, updatedAt, ...c }) => ({
            ...c,
            id: _id.toString(),
            createdAt: createdAt.toISOString(),
            updatedAt: updatedAt.toISOString(),
        }));
    }

    async getByTaskId(taskId: string) {
        const commentsList = await CommentModel.find({ taskId }).lean();
        return commentsList.map(({ _id, createdAt, updatedAt, ...c }) => ({
            ...c,
            id: _id.toString(),
            createdAt: createdAt.toISOString(),
            updatedAt: updatedAt.toISOString(),
        }));
    }

    async getById(id: string) {
        return CommentModel.findById(id).lean();
    }

    async delete(id: string) {
        return CommentModel.deleteOne({ _id: id });
    }
}
