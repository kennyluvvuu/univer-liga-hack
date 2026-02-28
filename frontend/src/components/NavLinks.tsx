import { memo } from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Home, User } from "lucide-react"
import useAuthContext from "@/hooks/context/useAuthContext"

export default memo(function NavLinks() {
    const location = useLocation()
    const { isAuthenticated } = useAuthContext()

    return (
        <div className="flex items-center gap-1">
            <Link
                to="/"
                className={cn(
                    "flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium transition-colors md:px-3",
                    location.pathname === "/"
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
            >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Главная</span>
            </Link>

            {isAuthenticated && (
                <Link
                    to="/profile"
                    className={cn(
                        "flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium transition-colors md:px-3",
                        location.pathname === "/profile"
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Профиль</span>
                </Link>
            )}
        </div>
    )
})
