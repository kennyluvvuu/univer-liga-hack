import { useQuery } from "@tanstack/react-query";
import type { UserI } from "../types/types";
import { employeeApi } from "@/api/services/employee";

export default function useQueryUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: async (): Promise<UserI[]> => {
            const { data } = await employeeApi.getEmployees()
            return data
        },
    })
}