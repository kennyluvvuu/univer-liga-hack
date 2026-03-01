import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import useQueryUsers from "@/hooks/useQueryUsers";
import useQueryDepartments from "@/hooks/useQueryDepartments";
import UserAvatarComponent from "@/components/UserAvatarComponent";
import { ChevronRight, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function EmployeesScreen() {
    const { data: users, isLoading, isError } = useQueryUsers();
    const { data: departments = [] } = useQueryDepartments();

    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("all");

    const filtered = useMemo(() => {
        if (!users) return [];
        return users.filter((u) => {
            const matchesDept =
                department === "all" || u.department === department;
            const q = search.toLowerCase();
            const matchesSearch =
                !q ||
                u.name?.toLowerCase().includes(q) ||
                u.department?.toLowerCase().includes(q) ||
                u.email?.toLowerCase().includes(q);
            return matchesDept && matchesSearch;
        });
    }, [users, search, department]);

    const hasFilters = search !== "" || department !== "all";

    const clearFilters = () => {
        setSearch("");
        setDepartment("all");
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="h-8 w-40 bg-muted animate-pulse rounded-md" />
                <div className="flex gap-2">
                    <div className="h-10 flex-1 bg-muted animate-pulse rounded-xl" />
                    <div className="h-10 w-44 bg-muted animate-pulse rounded-xl" />
                </div>
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-16 bg-muted animate-pulse rounded-xl"
                    />
                ))}
            </div>
        );
    }

    if (isError || !users) {
        return (
            <div className="text-center py-8 text-red-500">
                Ошибка загрузки сотрудников
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Сотрудники</h1>
                <span className="text-sm text-muted-foreground tabular-nums">
                    {filtered.length} / {users.length}
                </span>
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
                <div className="relative flex-1 min-w-48">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                        placeholder="Поиск по имени, отделу, email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 rounded-xl"
                        style={{ height: "40px" }}
                    />
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>

                <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger
                        className="w-48 rounded-xl"
                        style={{ height: "40px" }}
                    >
                        <SelectValue placeholder="Все отделы" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Все отделы</SelectItem>
                        {departments.map((d) => (
                            <SelectItem key={d} value={d}>
                                {d}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {hasFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="px-3 text-muted-foreground hover:text-foreground rounded-xl"
                        style={{ height: "40px" }}
                    >
                        <X className="h-3.5 w-3.5 mr-1" />
                        Сбросить
                    </Button>
                )}
            </div>

            {/* List */}
            {filtered.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed rounded-xl text-muted-foreground">
                    <p className="font-medium">Никого не найдено</p>
                    <p className="text-sm mt-1">Попробуйте изменить фильтры</p>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    {filtered.map((user) => (
                        <Link
                            key={user.id}
                            to={`/employees/${user.id}`}
                            className="flex items-center gap-3 p-3 rounded-xl border transition-colors hover:bg-accent"
                        >
                            <UserAvatarComponent path={user.avatar} />
                            <div className="flex-grow min-w-0">
                                <div className="font-medium text-sm">
                                    {user.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {user.department}
                                </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
