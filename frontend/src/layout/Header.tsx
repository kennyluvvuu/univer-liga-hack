import { memo } from "react";
import { Link } from "react-router-dom";
import LogoutComponent from "../components/LogoutComponent.tsx";
import { cn } from "@/lib/utils";
import useAuthContext from "@/hooks/context/useAuthContext.ts";

export default memo(function Header() {
    const { user } = useAuthContext()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-8">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link
                    to="/" 
                    className={cn(
                        "flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity",
                        user?.role === "director" && "pointer-events-none cursor-not-allowed"
                    )}
                >
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-sm">
                        A
                    </div>
                    <span>Апогей</span>
                </Link>

                <nav className="flex items-center gap-2 sm:gap-6">
                    {user?.role !== "director" ? <Link 
                        to="/profile" 
                        className={cn(
                            "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                        )}
                    >
                        Профиль
                    </Link> : <Link
                        to="/employees"
                        className={cn(
                            "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                        )}
                        >Сотрудники</Link>}
                    
                    <div className="flex items-center gap-4 pl-4 border-l">
                        <LogoutComponent />
                    </div>
                </nav>
            </div>
        </header>
    );
});