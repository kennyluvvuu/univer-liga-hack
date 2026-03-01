import { analyticsApi } from '@/api/services/analytics';
import type { AnalyticsResponseI, FilterI } from '@/types/types'; // Импортируйте тип FilterI
import { useQuery } from "@tanstack/react-query";

export default function useQueryAnalytics(filter: FilterI) {
    return useQuery({
        queryKey: ["analytics", filter], 
        queryFn: async (): Promise<AnalyticsResponseI> => {
            const { data } = await analyticsApi.getAnalytics(filter)
            return data
        },
        enabled: false, 
    })
}