import { memo } from "react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

interface ProfileActionsProps {
    onLogout: () => void
}

export default memo(function ProfileActions({ onLogout }: ProfileActionsProps) {
    return (
        <div className="flex gap-3 pt-4">
            <Button onClick={onLogout} variant="outline" className="gap-2">
                <LogOut className="h-4 w-4" />
                Выйти
            </Button>
        </div>
    )
})
