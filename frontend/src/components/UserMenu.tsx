import { memo } from "react"
import { useNavigate } from "react-router-dom"
import { LogIn, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import useAuthContext from "@/hooks/context/useAuthContext"

export default memo(function UserMenu() {
    const navigate = useNavigate()
    const { isAuthenticated, logout } = useAuthContext()

    const handleLogout = async () => {
        try {
            await logout()
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    if (isAuthenticated) {
        return (
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                Выйти
            </Button>
        )
    }

    return (
        <Button asChild size="sm" className="gap-2">
            <a href="/auth">
                <LogIn className="h-4 w-4" />
                Войти
            </a>
        </Button>
    )
})
