import {api} from "../axios.ts";

export const departmentsApi = {
    getDepartments: async () => await api.get<string[]>(`/departments`)
}