import { useCallback, memo } from "react";
import { LogOut } from "lucide-react";
import useAuthContext from "../hooks/context/useAuthContext.ts";
import { useMutationLogout } from "@/hooks/auth/useMutationLogout.ts";
import { Button } from "@/components/ui/button";

export default memo(function LogoutComponent() {
    const { isAuthenticated } = useAuthContext();
    const { mutateAsync: logout, isPending } = useMutationLogout();

    const handleLogout = useCallback(async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }, [logout]);

    if (!isAuthenticated) return null;

    return (
        <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            disabled={isPending}
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
        >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Выйти</span>
        </Button>
    );
});