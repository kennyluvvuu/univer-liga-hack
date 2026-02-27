import useAuthContext from "./hooks/context/useAuthContext.ts";
import {Navigate, Outlet} from "react-router-dom";

export default function ProtectedRoute() {
    const { isAuthenticated } = useAuthContext()

    if (!isAuthenticated) return <Navigate to="/auth" replace />

    return <Outlet />
}