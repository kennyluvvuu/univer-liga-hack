import { useQuery } from "@tanstack/react-query";
import type { UserI } from "../types/types";

export default function useQueryUser() {
    return useQuery({
        queryKey: ['user'],
        queryFn: async (): Promise<UserI> => ({
                id: '2',
                name: 'Jane Smith',
                role: 'director',
                department: 'HR',
                email: 'jane.smith@example.com',
                avatar: null
            })
    })
}