import Elysia, { status } from "elysia";
import jwt from "@elysiajs/jwt";

export const authPlugin = new Elysia()
    .use(
        jwt({
            name: "jwt",
            secret: "super-secret",
            exp: "7d",
        }),
    )
    .derive({ as: "global" }, async ({ jwt, headers: { authorization } }) => {
        if (!authorization) return { payload: null };
        const [, token] = authorization.split(" ");
        const payload = await jwt.verify(token);
        return { payload };
    });
