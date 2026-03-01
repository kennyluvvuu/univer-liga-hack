import type { UserI } from "../types/types.ts";
import { Link } from "react-router-dom";
import UserAvatarComponent from "./UserAvatarComponent.tsx";
import { ChevronRight } from "lucide-react";

interface UserComponentProps {
    user: UserI
    searchData: string;
}

export default function UserComponent({ user, searchData }: UserComponentProps) {
    if (searchData && user.name?.toLowerCase().indexOf(searchData.toLowerCase()) === -1 && user.department?.toLowerCase().indexOf(searchData.toLowerCase()) === -1) {
        return null;
    }

    return (
        <Link 
            to={'user/' + user.id} 
            className="flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-accent"
        >
            <UserAvatarComponent 
                path={user.avatar} 
            />
            
            <div className="flex-grow min-w-0 flex items-baseline gap-2">
                <span className="font-medium text-sm text-foreground truncate">
                    {user.name}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                    {user.department}
                </span>
            </div>
            
            <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </Link>
    );
}