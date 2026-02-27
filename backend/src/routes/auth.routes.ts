import Elysia from "elysia";
import { randomUUIDv5 } from "bun";
import { status } from "elysia";
import { User, UserSchema } from "../schemas/user.schema";
import { users } from "../services/user.service.mock";
import jwt from "@elysiajs/jwt";
import UserService from "../services/user.serivce";

export const authRoutes = (userService: UserService) =>
    new Elysia()
        .use(
            jwt({
                name: "jwt",
                secret: "super-secret",
                exp: "7d",
            }),
        )
        .post(
            "/register",
            async ({ body, jwt }) => {
                const registredUser = await userService.create(body);
                const token = await jwt.sign({ sub: registredUser.id });
                return status(201, {
                    token: token,
                    user: { id: registredUser.id, email: registredUser.email },
                });
            },
            {
                body: UserSchema,
            },
        )
        .post(
            "/login",
            async ({ body, jwt }) => {
                const validUser = await userService.getByEmail(body.email);

                if (!validUser) {
                    return status(401, "Unauthorized");
                }

                const token = await jwt.sign({ sub: validUser._id.toString() });
                return {
                    token: token,
                    user: {
                        id: validUser._id.toString(),
                        email: validUser.email,
                    },
                };
            },
            {
                body: UserSchema,
            },
        );
