import { type PropsWithChildren, useMemo, memo } from "react";
import { AuthContext } from "./AuthContext.ts";
import useQueryUser from "@/hooks/auth/useQueryUser.ts";

export default memo(function AuthProvider({ children }: PropsWithChildren) {
    const { data: user, isLoading, isError } = useQueryUser()

    const isAuthenticated = !isLoading && !isError && !!user;
    
    const contextValue = useMemo(() => ({
        user: user || null,
        isLoading,
        isAuthenticated,
    }), [user, isLoading, isAuthenticated])

    return (
        <AuthContext value={contextValue}>
            {children}
        </AuthContext>
    )
})