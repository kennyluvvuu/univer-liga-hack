import { useCallback, memo } from "react";
import useAuthContext from "../hooks/context/useAuthContext.ts";

export default memo(function LogoutComponent() {
    const { isAuthenticated, logout } = useAuthContext()

    const handleLogout = useCallback(async () => {
        try {
            await logout()
        } catch (error) {
            console.log(error)
        }
    }, [logout])

    if (!isAuthenticated) return null

    return (
        <p
            onClick={handleLogout}
        >logout</p>
    )
})