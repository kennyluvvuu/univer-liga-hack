import { memo } from "react"
import Avatar from "@/components/Avatar"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase } from "lucide-react"
import type { UserI } from "@/api/services/auth"

interface ProfileHeaderProps {
    user: UserI
}

export default memo(function ProfileHeader({ user }: ProfileHeaderProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-3 md:gap-4">
                    <Avatar src={user.avatar} alt={user.name} size="md" />
                    <div>
                        <CardTitle className="text-xl md:text-2xl">{user.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2 text-sm md:text-base">
                            <Briefcase className="h-3 w-3 md:h-4 md:w-4" />
                            {user.postition}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
})
