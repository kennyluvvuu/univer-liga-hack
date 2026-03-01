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
                    message: "Unauthorized",
                });
            const userData = await userService.getById(payload.sub);
            if (!userData) return status(404, "Not Found");
            return userData;
        })
        .get("/me/reviews", async ({ payload, status }) => {
            if (!payload || !payload.sub)
                return status(401, {
                    message: "Unauthorized",
                });
            const myReviews = await commentService.getBySenderId(payload.sub);
            const myReviewsDto = await Promise.all(
                myReviews.map(async (r) => {
                    const recipient = await userService.getById(r.recipientId);
                    const task = await tasksService.getById(r.taskId);
                    return {
                        ...r,
                        recipientName: recipient?.name ?? "Неизвестно",
                        taskTitle: task?.title ?? "Неизвестно",
                    };
                }),
            );
            return myReviewsDto;
        })
        .delete(
            "/me/reviews/:id",
            async ({ payload, status, params: { id } }) => {
                if (!payload || !payload.sub)
                    return status(401, {
                        message: "Unauthorized",
                    });

                const review = await commentService.getById(id);
                if (!review) return status(404, { message: "Отзыв не найден" });

                if (review.senderId !== payload.sub)
                    return status(403, {
                        message: "Нельзя удалить чужой отзыв",
                    });

                await commentService.delete(id);
                return status(200);
            },
        )
        .get("/tasks", async ({ payload, status }) => {
            if (!payload || !payload.sub)
                return status(401, {
                    message: "Unauthorized",
                });
            const userTasks = await tasksService.getByUserId(payload.sub);
            if (userTasks.length === 0)
                return status(404, { message: "У вас нет задач" });
            return userTasks;
        })
        .get("/departments", async ({ payload, status }) => {
            if (!payload || !payload.sub)
                return status(401, {
                    message: "Unauthorized",
                });
            const users = await userService.list();
            const departments = [...new Set(users.map((u) => u.department))];
            return departments;
        })
        .get("/employees", async ({ payload, status }) => {
            if (!payload || !payload.sub)
                return status(401, {
                    message: "Unauthorized",
                });
            return (await userService.list()).filter(
                (u) => u.id !== payload.sub && u.role !== "director",
            );
        })
        .get("/employees/:id", async ({ payload, status, params: { id } }) => {
            if (!payload || !payload.sub)
                return status(401, {
                    message: "Unauthorized",
                });
            const user = await userService.getById(id);
            if (!user) return status(404, { message: "Not found" });
            return user.role !== "director"
                ? user
                : status(403, {
                      message: "У вас нет на это прав",
                  });
        })
        .post(
            "/employees/:id/review",
            async ({ payload, status, params: { id }, body }) => {
                if (!payload || !payload.sub)
                    return status(401, {
                        message: "Unauthorized",
                    });

                if (payload.sub !== body.senderId) {
                    return status(403, {
                        message: "Нельзя отправить отзыв от чужого имени",
                    });
                }

                const user = await userService.getById(id);
                if (!user)
                    return status(404, {
                        message:
                            "Пользователя на которого идет обзор не существует",
                    });

                const userTask = await tasksService.getById(body.taskId);
                if (!userTask)
                    return status(404, {
                        message: "Задача по отзыву не найдена",
                    });

                if (userTask.userId.toString() !== payload.sub.toString()) {
                    return status(403, {
                        message: "Задача не принадлежит этому сотруднику",
                    });
                }

                const alreadyReviewed =
                    await commentService.existsBySenderAndTask(
                        payload.sub,
                        body.taskId,
                    );
                if (alreadyReviewed)
                    return status(409, {
                        message: "Вы уже оставили отзыв по этой задаче",
                    });

                const createdReview = await commentService.create(body);
                return createdReview;
            },
            {
                body: ReviewSchema,
            },
        )
        .get(
            "/employees/:id/reviews",
            async ({ payload, status, params: { id } }) => {
                if (!payload || !payload.sub)
                    return status(401, {
                        message: "Unauthorized",
                    });
                const currentUser = await userService.getById(payload.sub);
                if (currentUser?.role !== "director")
                    return status(403, {
                        message: "Вам не разрешено это делать",
                    });
                const userReviews = await commentService.getByRecipientId(id);
                if (userReviews.length === 0)
                    return status(404, {
                        message: "Нет отзывов",
                    });
                const userReviewsDto = await Promise.all(
                    userReviews.map(async (r) => {
                        const sender = await userService.getById(r.senderId);
                        const recipient = await userService.getById(
                            r.recipientId,
                        );
                        const task = await tasksService.getById(r.taskId);
                        return {
                            ...r,
                            senderName: sender?.name ?? "Неизвестно",
                            recipientName: recipient?.name ?? "Неизвестно",
                            taskTitle: task?.title ?? "Неизвестно",
                        };
                    }),
                );
                return userReviewsDto;
            },
        );
