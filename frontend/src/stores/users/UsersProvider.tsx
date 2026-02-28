import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type PropsWithChildren } from "react";

export default function UsersProvider({ children }: PropsWithChildren) {
    const [client] = useState(new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: Infinity,
                gcTime: Infinity,
                retry: false,
                refetchOnWindowFocus: false,
                refetchOnReconnect: false
            }
        }
    }))

    return (
        <QueryClientProvider client={client}>
            { children }
        </QueryClientProvider>
    )
}