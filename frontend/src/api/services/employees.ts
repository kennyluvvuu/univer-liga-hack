import type { UserI } from "../../types/types.ts";
import {api} from "../axios.ts";

export const employeeApi = {
    getUsers: async () => api.get<UserI[]>('/users'),
    getUser: async (id: string) => api.get<UserI>(`/user/${id}`)
}