import { Link } from "react-router-dom";
import useQueryUsers from "@/hooks/useQueryUsers";
import UserAvatarComponent from "@/components/UserAvatarComponent";
import { ChevronRight } from "lucide-react";

export default function EmployeesScreen() {
    const { data: users, isLoading, isError } = useQueryUsers();

    if (isLoading) {
        return <div className="text-center py-8">Загрузка сотрудников...</div>;
    }

    if (isError || !users) {
        return <div className="text-center py-8 text-red-500">Ошибка загрузки сотрудников</div>;
    }

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Сотрудники</h1>
            
            <div className="flex flex-col gap-2">
                {users.map(user => (
                    <Link
                        key={user.id}
                        to={`/employees/${user.id}`}
                        className="flex items-center gap-3 p-3 rounded-lg border transition-colors hover:bg-accent"
                    >
                        <UserAvatarComponent path={user.avatar} />
                        
                        <div className="flex-grow min-w-0">
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.department}</div>
                        </div>
                        
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                ))}
            </div>
        </div>
    );
}
