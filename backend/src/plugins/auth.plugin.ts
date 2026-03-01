import Elysia, { status } from "elysia";
import jwt from "@elysiajs/jwt";

export const authPlugin = new Elysia()
    .use(
        jwt({
            name: "jwt",
            secret: process.env.JWT_SECRET || "do-not-use-that-secret",
            exp: "7d",
        }),
    )
    .derive({ as: "global" }, async ({ jwt, headers: { authorization } }) => {
        if (!authorization) return { payload: false };
        const [, token] = authorization.split(" ");
        const payload = await jwt.verify(token);
        return { payload };
    })
    .macro({
        auth: (enabled: boolean) => ({
            beforeHandle({ payload }) {
                if (enabled && !payload) return { error: "Unauthorized" };
            },
        }),
    });
