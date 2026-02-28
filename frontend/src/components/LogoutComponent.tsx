import { useCallback, memo } from "react"
import { useNavigate } from "react-router-dom"
import useAuthContext from "@/hooks/context/useAuthContext"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default memo(function LogoutComponent() {
    const navigate = useNavigate()
    const { isAuthenticated, logout } = useAuthContext()

    const handleLogout = useCallback(async () => {
        try {
            await logout()
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }, [logout, navigate])

    if (!isAuthenticated) return null

    return (
        <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Выйти
        </Button>
    )
})
