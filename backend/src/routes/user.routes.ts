import Elysia from "elysia";
import UserService from "../services/user.serivce";
import CommentService from "../services/comment.service";
import { ReviewSchema } from "../schemas/review.schema";

export const userRoutes = (
    userService: UserService,
    commentService: CommentService,
) =>
    new Elysia()
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
                if (avaliableReview)
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
