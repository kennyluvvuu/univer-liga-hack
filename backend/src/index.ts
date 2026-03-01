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
import TaskService from "./services/task.service";
import { analyticsRoutes } from "./routes/analytics.routes";

console.log(process.env.MONGO_URL);
await connectDb(process.env.MONGO_URL || "");
await seedDatabase();
const userService = new UserService();
const commentService = new CommentService();
const tasksService = new TaskService();
const app = new Elysia()
    .use(
        logixlysia({
            config: {
                useColors: true,
            },
        }),
    )
    .use(cors())
    .use(userRoutes(userService, commentService, tasksService))
    .mount("/auth", authRoutes(userService))
    .use(analyticsRoutes(userService))
    .listen({
        port: 8080,
        hostname: "0.0.0.0",
    });

export type Server = typeof app;
