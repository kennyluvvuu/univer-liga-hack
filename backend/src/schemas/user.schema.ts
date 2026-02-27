import { t, type Static } from "elysia";

export const UserSchema = t.Object({
    email: t.String(),
    password: t.String(),
});

export type User = Static<typeof UserSchema>;
