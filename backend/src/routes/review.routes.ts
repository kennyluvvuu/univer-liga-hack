import Elysia from "elysia";
import CommentService from "../services/comment.service";

export const reviewRoutes = (commentService: CommentService) => new Elysia();
