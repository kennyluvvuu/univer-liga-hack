import { Elysia, status } from "elysia";
import logixlysia from "logixlysia";
import { authPlugin } from "./plugins/auth.plugin";
import { authRoutes } from "./routes/auth.routes";
import { users } from "./services/user.service.mock";
import cors from "@elysiajs/cors";
import UserService from "./services/user.serivce";
import connectDb from "./services/db";

console.log(process.env.MONGO_URL);
await connectDb(process.env.MONGO_URL || "");
const userService = new UserService();
const app = new Elysia()
    .use(
        logixlysia({
            config: {
                useColors: true,
            },
        }),
    )
    .use(
        cors({
            origin: "http://localhost:5173",
        }),
    )
    .use(authPlugin)
    .get("/users", async () => {
        return { users: users };
    })
    .get("/me", async ({ payload }) => {
        if (!payload || !payload.sub)
            return status(401, {
                error: "Unauthorized",
            });
        const userData = await userService.getById(payload.sub);
        if (!userData) return status(404, "Not Found");
        return { id: userData._id.toString(), email: userData.email };
    })
    .mount("/auth", authRoutes(userService))
    .listen("8080");

export type Server = typeof app;
