import { t, type Static } from "elysia";

export const ReviewSchema = t.Object({
    recipientId: t.String(),
    senderId: t.String(),
    taskId: t.String(),
    score: t.Number(),
    comment: t.String(),
    anon: t.Boolean(),
    tags: t.Array(t.Object({ title: t.String(), type: t.String() })),
});

export const ReviewSchemaResponce = t.Object({
    id: t.String(),
    recipientId: t.String(),
    senderId: t.String(),
    taskId: t.String(),
    score: t.Number(),
    comment: t.String(),
    anon: t.Boolean(),
    tags: t.Array(t.Object({ title: t.String(), type: t.String() })),
});

export const ReviewPreviewSchemaResponce = t.Object({
    id: t.String(),
    recipientId: t.String(),
    senderId: t.String(),
    taskId: t.String(),
    score: t.Number(),
    comment: t.String(),
    anon: t.Boolean(),
});

export type Review = Static<typeof ReviewSchema>;
export type ReviewResponce = Static<typeof ReviewSchemaResponce>;
export type ReviewPreviewResponce = Static<typeof ReviewPreviewSchemaResponce>;
