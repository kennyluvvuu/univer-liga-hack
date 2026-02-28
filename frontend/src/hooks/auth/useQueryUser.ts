import { authApi } from "@/api/services/auth";
import type { UserI } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export default function useQueryUser() {
    return useQuery({
        queryKey: ['user'],
        queryFn: async (): Promise<UserI> => {
            const { data } = await authApi.getProfile()
            return data
        },
        enabled: !!localStorage.getItem('token')
    })
}