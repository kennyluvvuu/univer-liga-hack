import type { ReviewI, CreateReviewDto } from "../../types/types.ts";
import {api} from "../axios.ts";

export const reviewApi = {
    sendReview: async (data: CreateReviewDto) => api.post<ReviewI>(`/employees/${data.recipientId}/review`, data)
}