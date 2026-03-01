import { reviewApi } from "@/api/services/review";
import type { MyReviewI } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export default  function useQueryMyReviews() {
    return useQuery({
        queryKey: ["my-reviews"],
        queryFn: async (): Promise<MyReviewI[]> => {
            const { data } = await reviewApi.getMyReviews()
            return data
        }
    })
}