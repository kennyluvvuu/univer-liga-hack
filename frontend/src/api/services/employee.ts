import type { UserI } from "../../types/types.ts";
import {api} from "../axios.ts";

export const employeeApi = {
    getEmployees: async () => await api.get<UserI[]>('/employees'),
    getEmployee: async (id: string) => await api.get<UserI>(`/employee/${id}`)
}