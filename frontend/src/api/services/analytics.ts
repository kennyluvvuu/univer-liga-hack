import type { AnalyticsResponseI, FilterI } from "@/types/types.ts";
import {api} from "../axios.ts";

export const analyticsApi = {
    getAnalytics: async (filter: FilterI) => await api.get<AnalyticsResponseI>(`/analytics`, { params: filter }),
}