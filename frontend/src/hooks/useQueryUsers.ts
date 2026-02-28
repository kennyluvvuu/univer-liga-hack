import { useQuery } from "@tanstack/react-query";
import type { UserI } from "../types/types";

export default function useQueryUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: async (): Promise<UserI[]> => ([
            {
                id: '1',
                name: 'John Doe',
                role: 'employee',
                department: 'IT',
                email: 'john.doe@example.com',
                avatar: 'https://example.com/avatars/john.jpg'
            },
            {
                id: '2',
                name: 'Jane Smith',
                role: 'director',
                department: 'HR',
                email: 'jane.smith@example.com',
                avatar: null
            },
            {
                id: '3',
                name: 'Alice Jones',
                role: 'employee',
                department: 'Marketing',
                email: 'alice.jones@example.com',
                avatar: 'https://example.com/avatars/alice.png'
            },
            {
                id: '4',
                name: 'Bob Brown',
                role: 'director',
                department: 'Finance',
                email: 'bob.brown@example.com',
                avatar: null
            }
        ])
    })
}