import type { CreateReviewDto } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToastContext from "./context/useToastContext";
import { reviewApi } from "@/api/services/review";

export const useMutationReview = () => {
    const queryClient = useQueryClient();
    const { success, error } = useToastContext();

    return useMutation({
        mutationFn: async (newReview: CreateReviewDto) => {
            const { data } = await reviewApi.sendReview(newReview);
            return data
        },
        onSuccess: () => {
            success("Отзыв успешно опубликован!");
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
        onError: () => {
            error("Произошла ошибка");
        },
    });
};