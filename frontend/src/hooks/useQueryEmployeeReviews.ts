import { reviewApi } from '@/api/services/review';
import type { MyReviewI } from '@/types/types'; // Импортируйте тип FilterI
import { useQuery } from "@tanstack/react-query";

export default function useQueryEmployeeReviews(employeeId: string) {
    return useQuery({
        queryKey: ["employee-reviews", employeeId], 
        queryFn: async (): Promise<MyReviewI[]> => {
            const { data } = await reviewApi.getEmployeeReviews(employeeId)
            return data
        },
        enabled: false, 
    })
}