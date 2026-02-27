import useAuthContext from "../hooks/context/useAuthContext.ts";

export default function LogoutComponent() {
    const { isAuthenticated, logout } = useAuthContext()

    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            console.log(error)
        }
    }

    if (!isAuthenticated) return null

    return (
        <p
            onClick={handleLogout}
        >logout</p>
    )
}