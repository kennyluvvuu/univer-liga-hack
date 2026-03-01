import { departmentsApi } from "@/api/services/departments";
import { useQuery } from "@tanstack/react-query";

export default  function useQueryDepartments() {
    return useQuery({
        queryKey: ["departments"],
        queryFn: async (): Promise<string[]> => {
            const { data } = await departmentsApi.getDepartments()
            return data
        }
    })
}