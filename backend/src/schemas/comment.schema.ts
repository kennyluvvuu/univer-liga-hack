import { t, type Static } from "elysia";

export const CommentSchemaResponse = t.Object({
    id: t.String(),
    recipientId: t.String(),
    senderId: t.String(),
    taskId: t.String(),
    score: t.Number(),
    comment: t.String(),
    tags: t.Array(t.Object({ title: t.String(), type: t.String() })),
    date: t.String(),
});

export type CommentDto = Static<typeof CommentSchemaResponse>;

export const CommentWithRelationsSchemaResponse = t.Intersect([
    CommentSchemaResponse,
    t.Object({
        senderName: t.String(),
        recipientName: t.String(),
        taskTitle: t.String(),
    }),
]);

export type CommentWithRelationsDto = Static<
    typeof CommentWithRelationsSchemaResponse
>;

