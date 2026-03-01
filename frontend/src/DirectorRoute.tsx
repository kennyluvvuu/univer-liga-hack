import { useMemo } from "react";
import useAuthContext from "./hooks/context/useAuthContext.ts";
import { Navigate, Outlet } from "react-router-dom";

export default function DirectorRoute() {
    const { isAuthenticated, isLoading, user } = useAuthContext()

    const result = useMemo(() => {
        if (isLoading) {
            return <div className="p-4">Загрузка...</div>
        }
        
        if (!isAuthenticated) {
            return <Navigate to="/auth" replace />
        }
        
        if (!user?.role?.startsWith("director")) {
            return <Navigate to="/" replace />
        }
        
        return <Outlet />
    }, [isLoading, isAuthenticated, user])

    return result
}