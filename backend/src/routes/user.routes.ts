import Elysia from "elysia";
import UserService from "../services/user.serivce";
import CommentService from "../services/comment.service";
import { ReviewSchema } from "../schemas/review.schema";
import { authPlugin } from "../plugins/auth.plugin";
import TaskService from "../services/task.service";

export const userRoutes = (
    userService: UserService,
    commentService: CommentService,
    tasksService: TaskService,
) =>
    new Elysia()
        .use(authPlugin)
        .get("/me", async ({ payload, status }) => {
            if (!payload || !payload.sub)
                return status(401, {
                    error: "Unauthorized",
                });
            const userData = await userService.getById(payload.sub);
            if (!userData) return status(404, "Not Found");
            return userData;
        })
        .get("/tasks", async ({ payload, status }) => {
            if (!payload || !payload.sub)
                return status(401, {
                    error: "Unauthorized",
                });
            const userTasks = await tasksService.getByUserId(payload.sub);
            if (userTasks.length < 0)
                return status(404, { message: "У вас нет задач" });
            return userTasks;
        })
        .get("/employees", async () => {
            return userService.list();
        })
        .get("/employees/:id", async ({ status, params: { id } }) => {
            const user = await userService.getById(id);
            if (!user) return status(404, { message: "Not found" });
            return user;
        })
        .post(
            "/employees/:id/review",
            async ({ status, params: { id }, body }) => {
                const user = await userService.getById(id);
                const avaliableReview = await commentService.getByTaskId(
                    body.taskId,
                );
                if (avaliableReview.length > 0)
                    return status(409, {
                        message: "Вы уже оставили отзыв по этой задаче",
                    });
                if (!user) return status(404, { message: "Not found" });
                const createdReview = await commentService.create(body);
                return createdReview;
            },
            {
                body: ReviewSchema,
            },
        );
