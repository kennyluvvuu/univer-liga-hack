import { CommentModel } from "../models/comment.model";
import { Review } from "../schemas/review.schema";
import {
    type CommentDto,
    type CommentWithRelationsDto,
} from "../schemas/comment.schema";

const mapCommentDocToDto = (comment: any): CommentDto => ({
    id: comment._id.toString(),
    recipientId: comment.recipientId.toString(),
    senderId: comment.senderId.toString(),
    taskId: comment.taskId.toString(),
    score: comment.score,
    comment: comment.comment,
    tags: comment.tags,
    date: comment.createdAt.toISOString(),
});

export default class CommentService {
    async create(comment: Review): Promise<CommentDto> {
        const newComment = await CommentModel.create({
            recipientId: comment.recipientId,
            senderId: comment.senderId,
            taskId: comment.taskId,
            score: comment.score,
            comment: comment.comment,
            tags: comment.tags,
        });

        return mapCommentDocToDto(newComment);
    }

    async getByRecipientId(recipientId: string): Promise<CommentDto[]> {
        const commentsList = await CommentModel.find({ recipientId }).lean();
        return commentsList.map((comment) => mapCommentDocToDto(comment));
    }

    async getBySenderId(senderId: string): Promise<CommentDto[]> {
        const commentsList = await CommentModel.find({ senderId }).lean();
        return commentsList.map((comment) => mapCommentDocToDto(comment));
    }

    async getByTaskId(taskId: string): Promise<CommentDto[]> {
        const commentsList = await CommentModel.find({ taskId }).lean();
        return commentsList.map((comment) => mapCommentDocToDto(comment));
    }

    async getById(id: string): Promise<CommentDto | null> {
        const comment = await CommentModel.findById(id).lean();
        if (!comment) return null;
        return mapCommentDocToDto(comment);
    }

    async getDetailedByRecipientId(
        recipientId: string,
    ): Promise<CommentWithRelationsDto[]> {
        const commentsList = await CommentModel.find({ recipientId })
            .populate("senderId", "name")
            .populate("recipientId", "name")
            .populate("taskId", "title")
            .lean();

        return commentsList.map((comment: any) => {
            const normalized = {
                ...comment,
                senderId: comment.senderId?._id ?? comment.senderId,
                recipientId: comment.recipientId?._id ?? comment.recipientId,
                taskId: comment.taskId?._id ?? comment.taskId,
            };

            const base = mapCommentDocToDto(normalized);

            const sender = comment.senderId as any;
            const recipient = comment.recipientId as any;
            const task = comment.taskId as any;

            return {
                ...base,
                senderName: sender?.name ?? "Неизвестно",
                recipientName: recipient?.name ?? "Неизвестно",
                taskTitle: task?.title ?? "Неизвестно",
            };
        });
    }

    async getDetailedBySenderId(
        senderId: string,
    ): Promise<CommentWithRelationsDto[]> {
        const commentsList = await CommentModel.find({ senderId })
            .populate("senderId", "name")
            .populate("recipientId", "name")
            .populate("taskId", "title")
            .lean();

        return commentsList.map((comment: any) => {
            const normalized = {
                ...comment,
                senderId: comment.senderId?._id ?? comment.senderId,
                recipientId: comment.recipientId?._id ?? comment.recipientId,
                taskId: comment.taskId?._id ?? comment.taskId,
            };

            const base = mapCommentDocToDto(normalized);

            const sender = comment.senderId as any;
            const recipient = comment.recipientId as any;
            const task = comment.taskId as any;

            return {
                ...base,
                senderName: sender?.name ?? "Неизвестно",
                recipientName: recipient?.name ?? "Неизвестно",
                taskTitle: task?.title ?? "Неизвестно",
            };
        });
    }

    async existsBySenderAndTask(
        senderId: string,
        taskId: string,
    ): Promise<boolean> {
        const review = await CommentModel.findOne({ senderId, taskId }).lean();
        return review !== null;
    }

    async delete(id: string): Promise<boolean> {
        const result = await CommentModel.deleteOne({ _id: id });
        return result.deletedCount > 0 ? true : false;
    }
}
