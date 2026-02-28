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
            anon: comment.anon,
            tags: comment.tags,
        });

        return {
            id: newComment._id.toString(),
            recipientId: newComment.recipientId.toString(),
            senderId: newComment.senderId.toString(),
            taskId: newComment.taskId.toString(),
            score: newComment.score,
            comment: newComment.comment,
            anon: newComment.anon,
            tags: newComment.tags,
            createdAt: newComment.createdAt,
            updatedAt: newComment.updatedAt,
        };
    }

    async getByRecipientId(recipientId: string) {
        const commentsList = await CommentModel.find({ recipientId }).lean();
        return commentsList.map(({ _id, createdAt, updatedAt, ...c }) => ({
            ...c,
            id: _id.toString(),
            createdAt,
            updatedAt,
        }));
    }

    async getBySenderId(senderId: string) {
        const commentsList = await CommentModel.find({ senderId }).lean();
        return commentsList.map(({ _id, createdAt, updatedAt, ...c }) => ({
            ...c,
            id: _id.toString(),
            createdAt,
            updatedAt,
        }));
    }

    async getByTaskId(taskId: string) {
        const commentsList = await CommentModel.find({ taskId }).lean();
        return commentsList.map(({ _id, createdAt, updatedAt, ...c }) => ({
            ...c,
            id: _id.toString(),
            createdAt,
            updatedAt,
        }));
    }

    async getById(id: string) {
        return CommentModel.findById(id).lean();
    }

    async delete(id: string) {
        return CommentModel.deleteOne({ _id: id });
    }
}
