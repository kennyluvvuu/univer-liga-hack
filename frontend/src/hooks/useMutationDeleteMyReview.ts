import { useMutation } from "@tanstack/react-query";
import useToastContext from "./context/useToastContext";
import { reviewApi } from "@/api/services/review";

export const useMutationDeleteMyReview = () => {
    const { success, error } = useToastContext();

    return useMutation({
        mutationFn: async (reviewId: string) => {
            await reviewApi.deleteMyReview(reviewId);
        },
        onSuccess: () => {
            success("Отзыв успешно удален!");
        },
        onError: () => {
            error("Произошла ошибка");
        },
    });
};