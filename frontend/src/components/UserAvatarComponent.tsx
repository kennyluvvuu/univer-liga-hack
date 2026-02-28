import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { User } from "lucide-react"

interface UserAvatarComponentProps {
    path: string | null
}

export default function UserAvatarComponent({ path }: UserAvatarComponentProps) {
    return (
        <Avatar>
            <AvatarImage 
                src={path || ''} 
                alt="avatar" 
                className="object-cover"
            />

            <AvatarFallback>
                <User />
            </AvatarFallback>
        </Avatar>
    )
}