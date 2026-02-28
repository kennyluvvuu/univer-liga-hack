import { authApi } from "@/api/services/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useMutationLogin() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: authApi.login,
        onSuccess: async (response) => {
            if (response.data?.token) {
                localStorage.setItem('token', response.data.token)
                await queryClient.invalidateQueries({ queryKey: ['user'] })
            }
        }
    });
}