import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToastContext from "./context/useToastContext";
import { reviewApi } from "@/api/services/review";

export const useMutationDeleteMyReview = () => {
    const queryClient = useQueryClient();
    const { success, error } = useToastContext();

    return useMutation({
        mutationFn: async (reviewId: string) => {
            await reviewApi.deleteMyReview(reviewId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-reviews"] })
            success("Отзыв успешно удален!");
        },
        onError: () => {
            error("Произошла ошибка");
        },
    });
};