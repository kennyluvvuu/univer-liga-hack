import { memo, useMemo } from "react";
import { Mail, BriefcaseBusiness } from "lucide-react";
import UserAvatarComponent from "@/components/UserAvatarComponent";
import useQueryUser from "@/hooks/auth/useQueryUser";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Словарь для перевода ролей
const roleMap: Record<string, string> = {
    "admin": "Администратор",
    "user": "Сотрудник",
    "manager": "Менеджер",
};

export default memo(function ProfileScreen() {
    const { data: user, isLoading } = useQueryUser();

    const translatedRole = useMemo(() => {
        if (!user) return "";
        return roleMap[user.role] || user.role;
    }, [user]);

    if (isLoading) {
        return <ProfileSkeleton />;
    }

    if (!user) {
        return (
            <div className="flex justify-center p-8 text-sm text-muted-foreground">
                Данные пользователя не найдены.
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <Card className="border-none shadow-lg rounded-3xl overflow-hidden bg-card">
                <CardContent className="flex flex-row items-center gap-6 p-6">
                    <div className="relative shrink-0">
                        <UserAvatarComponent 
                            path={user.avatar} 
                            className="w-24 h-24 rounded-full border-4 border-background shadow-inner" 
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1 min-w-0 flex-1">
                        <h1 className="text-3xl font-extrabold tracking-tight text-foreground truncate">
                            {user.name}
                        </h1>
                        
                        <div className="flex items-center gap-2 text-sm mt-1">
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                Сотрудник
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-muted-foreground mt-3 pt-3 border-t">
                            <div className="flex items-center gap-2 truncate">
                                <Mail className="w-4 h-4 text-primary shrink-0" />
                                <span className="truncate">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-2 truncate">
                                <BriefcaseBusiness className="w-4 h-4 text-primary shrink-0" />
                                <span className="truncate">{user.department || "Отдел не указан"}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
});

function ProfileSkeleton() {
    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <Card className="border-none shadow-sm rounded-3xl">
                <CardContent className="flex flex-row items-center gap-6 p-6">
                    <Skeleton className="w-24 h-24 shrink-0 rounded-full" />
                    <div className="flex flex-col gap-3 w-full max-w-md">
                        <Skeleton className="h-8 w-1/2" />
                        <Skeleton className="h-5 w-1/4" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}