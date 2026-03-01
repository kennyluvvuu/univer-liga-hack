import type { CreateReviewDto } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToastContext from "./context/useToastContext";
import { reviewApi } from "@/api/services/review";
import { isAxiosError } from "axios";

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
            queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
        },
        onError: (err) => {
            if (isAxiosError(err)) {
                error(err.response?.status === 409 ? "Вы уже оставили отзыв этому сотруднику." : "Ошибка сервера при отправке отзыва.")
            }
        },
    });
};