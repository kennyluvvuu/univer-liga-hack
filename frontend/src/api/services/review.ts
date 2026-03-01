import type { ReviewI, CreateReviewDto, MyReviewI } from "../../types/types.ts";
import {api} from "../axios.ts";

export const reviewApi = {
    sendReview: async (data: CreateReviewDto) => await api.post<ReviewI>(`/employees/${data.recipientId}/review`, data),
    getMyReviews: async () => await api.get<MyReviewI[]>("/me/reviews"),
    deleteMyReview: async (reviewId: string) => await api.delete(`/me/reviews/${reviewId}`),
    getEmployeeReviews: async (employeeId: string) => await api.get<MyReviewI[]>(`/employees/${employeeId}/reviews`),
}