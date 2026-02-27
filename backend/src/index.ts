import { Elysia, status } from "elysia";
import logixlysia from "logixlysia";
import { authPlugin } from "./plugins/auth.plugin";
import { authRoutes } from "./routes/auth.routes";
import { users } from "./services/user.service.mock";
import cors from "@elysiajs/cors";

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
    .get("/me", async ({ payload }) => {
        if (!payload)
            return status(401, {
                error: "Unauthorized",
            });
        const userData = users.find((user) => user.id === payload.sub);
        if (!userData) return status(404, "Not Found");
        return { id: userData.id, email: userData.email };
    })
    .mount("/auth", authRoutes)
    .listen("8080");

export type Server = typeof app;
