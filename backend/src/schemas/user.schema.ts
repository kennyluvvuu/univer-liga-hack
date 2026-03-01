import { t, type Static } from "elysia";

export const UserSchema = t.Object({
    name: t.String(),
    email: t.String(),
    password: t.String(),
    department: t.String(),
    role: t.Optional(t.Union([t.Literal("employee"), t.Literal("director")])),
});

export const UserSchemaResponce = t.Object({
    id: t.String(),
    department: t.String(),
    email: t.String(),
    role: t.Union([t.Literal("employee"), t.Literal("director")]),
    id_crm: t.Optional(t.Union([t.String(), t.Null()])),
    avatar: t.Optional(t.Union([t.String(), t.Null()])),
});

export const UserPreviewSchemaReposnce = t.Object({
    id: t.String(),
    name: t.String(),
    role: t.Union([t.Literal("employee"), t.Literal("director")]),
    department: t.String(),
    avatar: t.Optional(t.Union([t.String(), t.Null()])),
});

export type User = Static<typeof UserSchema>;
export type UserResponce = Static<typeof UserSchemaResponce>;
export type UserPreviewResponce = Static<typeof UserPreviewSchemaReposnce>;
