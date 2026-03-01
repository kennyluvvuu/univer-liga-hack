import type { TaskI } from "../../types/types.ts";
import {api} from "../axios.ts";

export const taskApi = {
    getTasks: async () => api.get<TaskI[]>('/tasks')
}