import { Elysia, status } from "elysia";
import logixlysia from "logixlysia";
import { authPlugin } from "./plugins/auth.plugin";
import { authRoutes } from "./routes/auth.routes";
import { users } from "./services/user.service.mock";
import cors from "@elysiajs/cors";
import UserService from "./services/user.serivce";
import connectDb from "./services/db";
import { seedDatabase } from "./services/seed";
import { userRoutes } from "./routes/user.routes";
import CommentService from "./services/comment.service";

console.log(process.env.MONGO_URL);
await connectDb(process.env.MONGO_URL || "");
await seedDatabase();
const userService = new UserService();
const commentService = new CommentService();
const app = new Elysia()
    .use(
        logixlysia({
            config: {
                useColors: true,
            },
        }),
    )
    .use(cors())
    .use(authPlugin)
    .use(userRoutes(userService, commentService))
    .get("/me", async ({ payload }) => {
        if (!payload || !payload.sub)
            return status(401, {
                error: "Unauthorized",
            });
        const userData = await userService.getById(payload.sub);
        if (!userData) return status(404, "Not Found");
        return { id: userData.id, email: userData.email };
    })
    .mount("/auth", authRoutes(userService))
    .listen({
        port: 8080,
        hostname: "0.0.0.0",
    });

export type Server = typeof app;
