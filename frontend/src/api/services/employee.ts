import type { UserI } from "../../types/types.ts";
import {api} from "../axios.ts";

export const employeeApi = {
    getEmployees: async () => api.get<UserI[]>('/employees'),
    getEmployee: async (id: string) => api.get<UserI>(`/employee/${id}`)
}