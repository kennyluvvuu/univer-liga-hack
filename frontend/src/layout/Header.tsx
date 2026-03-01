import { memo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LogoutComponent from "../components/LogoutComponent.tsx";
import { cn } from "@/lib/utils";
import useAuthContext from "@/hooks/context/useAuthContext.ts";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const HIDE_BACK_PATHS = ["/", "/director", "/auth"];

export default memo(function Header() {
    const { user, isAuthenticated } = useAuthContext();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const showBack = isAuthenticated && !HIDE_BACK_PATHS.includes(pathname);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-8">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-3">
                    {showBack && (
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => navigate(-1)}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    )}

                    <Link
                        to="/"
                        className={cn(
                            "flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity",
                            user?.role === "director" &&
                                "pointer-events-none cursor-not-allowed",
                        )}
                    >
                        <img
                            src="https://cdn1.flamp.ru/1a736c69ff255bf933ed616784ee3879_300_300.jpg"
                            alt="Апогей"
                            className="w-8 h-8 rounded-lg object-cover"
                        />
                        <span>Апогей</span>
                    </Link>
                </div>

                <nav className="flex items-center gap-2 sm:gap-6">
                    {user?.role !== "director" ? (
                        <Link
                            to="/profile"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            Профиль
                        </Link>
                    ) : (
                        <Link
                            to="/employees"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            Сотрудники
                        </Link>
                    )}

                    <div className="flex items-center gap-4 pl-4 border-l">
                        <LogoutComponent />
                    </div>
                </nav>
            </div>
        </header>
    );
});
