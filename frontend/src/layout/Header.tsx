import { memo } from "react";
import { Link } from "react-router-dom";
import LogoutComponent from "../components/LogoutComponent.tsx";
import { cn } from "@/lib/utils";

export default memo(function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-8">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link 
                    to="/" 
                    className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity"
                >
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-sm">
                        Z
                    </div>
                    <span>ТУТ ЧТО-ТО</span>
                </Link>

                <nav className="flex items-center gap-2 sm:gap-6">
                    <Link 
                        to="/profile" 
                        className={cn(
                            "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                        )}
                    >
                        Профиль
                    </Link>
                    
                    <div className="flex items-center gap-4 pl-4 border-l">
                        <LogoutComponent />
                    </div>
                </nav>
            </div>
        </header>
    );
});