import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useMutationLogout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            localStorage.removeItem('token');
        },
        onSuccess: () => {
            queryClient.setQueryData(['user'], null);
        }
    });
}