import { useMemo } from "react";
import useAuthContext from "./hooks/context/useAuthContext.ts";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuthContext()

    const result = useMemo(() => {
        if (isLoading) return <div>Загрузка...</div>
        if (!isAuthenticated) return <Navigate to="/auth" replace />
        return <Outlet />
    }, [isLoading, isAuthenticated])

    return result
}