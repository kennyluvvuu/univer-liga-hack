import { taskApi } from "@/api/services/task";
import type { TaskI } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export default  function useQueryTasks() {
    return useQuery({
        queryKey: ["tasks"],
        queryFn: async (): Promise<TaskI[]> => {
            const { data } = await taskApi.getTasks()
            return data
        }
    })
}