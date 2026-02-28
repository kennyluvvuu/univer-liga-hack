import { useMemo } from "react";
import useAuthContext from "./hooks/context/useAuthContext.ts";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const { isAuthenticated, isLoading, user } = useAuthContext()

    const result = useMemo(() => {
        if (isLoading) return <div>Загрузка...</div>
        if (!isAuthenticated) return <Navigate to="/auth" replace />
        if (user?.role === "director") return <Navigate to="/director" replace />
        return <Outlet />
    }, [isLoading, isAuthenticated, user])

    return result
}