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
            date: newComment.createdAt.toISOString(),
        };
    }

    async getByRecipientId(recipientId: string) {
        const commentsList = await CommentModel.find({ recipientId }).lean();
        return commentsList.map(({ _id, createdAt, updatedAt, ...c }) => ({
            ...c,
            id: _id.toString(),
            date: createdAt.toISOString(),
        }));
    }

    async getBySenderId(senderId: string) {
        const commentsList = await CommentModel.find({ senderId }).lean();
        return commentsList.map(({ _id, createdAt, updatedAt, ...c }) => ({
            ...c,
            id: _id.toString(),
            date: createdAt.toISOString(),
        }));
    }

    async getByTaskId(taskId: string) {
        const commentsList = await CommentModel.find({ taskId }).lean();
        return commentsList.map(({ _id, createdAt, updatedAt, ...c }) => ({
            ...c,
            id: _id.toString(),
            date: createdAt.toISOString(),
        }));
    }

    async getById(id: string) {
        return CommentModel.findById(id).lean();
    }

    async delete(id: string) {
        const result = await CommentModel.deleteOne({ _id: id });
        return result.deletedCount > 0 ? true : false;
    }
}
