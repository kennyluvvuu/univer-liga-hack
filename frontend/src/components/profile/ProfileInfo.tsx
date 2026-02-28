import { memo } from "react"
import { Mail, Briefcase, UserCog } from "lucide-react"
import type { UserI } from "@/api/services/auth"

interface ProfileInfoProps {
    user: UserI
}

export default memo(function ProfileInfo({ user }: ProfileInfoProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    Email
                </div>
                <p className="font-medium">{user.email}</p>
            </div>
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    Должность
                </div>
                <p className="font-medium">{user.postition}</p>
            </div>
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <UserCog className="h-4 w-4" />
                    Роль
                </div>
                <p className="font-medium">
                    {user.role === "director" ? "Директор" : "Сотрудник"}
                </p>
            </div>
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    ID в CRM
                </div>
                <p className="font-medium">{user.id_CRM}</p>
            </div>
        </div>
    )
})
