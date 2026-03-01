import { memo, useState, useMemo } from "react";
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

export default memo(function MainScreen() {
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
                u.department?.toLowerCase().includes(q);
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
                <div className="flex gap-2">
                    <div
                        className="flex-1 bg-muted animate-pulse rounded-xl"
                        style={{ height: "40px" }}
                    />
                    <div
                        className="w-44 bg-muted animate-pulse rounded-xl"
                        style={{ height: "40px" }}
                    />
                </div>
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-14 bg-muted animate-pulse rounded-xl"
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
            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
                <div className="relative flex-1 min-w-48">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                        placeholder="Поиск по имени или отделу..."
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

            {/* Results count */}
            {hasFilters && (
                <p className="text-xs text-muted-foreground">
                    Найдено: {filtered.length} из {users.length}
                </p>
            )}

            {/* List */}
            {filtered.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed rounded-xl text-muted-foreground">
                    <p className="font-medium">Никого не найдено</p>
                    <p className="text-sm mt-1">Попробуйте изменить фильтры</p>
                </div>
            ) : (
                <section className="flex flex-col gap-y-2">
                    {filtered.map((user) => (
                        <Link
                            key={user.id}
                            to={"user/" + user.id}
                            className="flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-accent"
                        >
                            <UserAvatarComponent path={user.avatar} />
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
                    ))}
                </section>
            )}
        </div>
    );
});
