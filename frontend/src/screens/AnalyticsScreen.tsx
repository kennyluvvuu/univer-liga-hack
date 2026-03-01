import useAuthContext from "@/hooks/context/useAuthContext";
import type { FilterI } from "@/types/types";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useQueryDepartments from "@/hooks/useQueryDepartments";
import useQueryUsers from "@/hooks/useQueryUsers";
import useQueryAnalytics from "@/hooks/useQueryAnalytics";

export default function AnalyticsScreen() {
    const { user } = useAuthContext();
    const [filter, setFilter] = useState<FilterI>({
        startPeriod: new Date().toISOString().split("T")[0],
        endPeriod: new Date().toISOString().split("T")[0],
        department: "all",
        employee: "all",
    });
    const { data: departments = [], isLoading: isDepartmentsLoading } = useQueryDepartments()
    const { data: users = [], isLoading: isUsersLoading } = useQueryUsers()
    const { data: analyticsData, refetch, isFetching } = useQueryAnalytics(filter)

    const filteredEmployees = () => {
        if (filter.department === "all") return users;
        return users.filter(e => e.department === filter.department);
    }

    const handleGetAnalytics = () => {
        refetch()
    }

    if (!user || user.role !== "director") return <Navigate to="/" />;

    if (isDepartmentsLoading || isUsersLoading) 
        return (
            <div className="min-h-200 border-2 border-dashed rounded-xl flex items-center justify-center text-muted-foreground" />
        )

    return (
        <div className="space-y-8">
            <article className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end border p-4 rounded-xl bg-card">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Период</label>
                    <div className="flex gap-2">
                        <Input type="date" value={filter?.startPeriod || ""} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilter({...filter, startPeriod: e.target.value})} />
                        <Input type="date" value={filter?.endPeriod || ""} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilter({...filter, endPeriod: e.target.value})} />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Отдел</label>
                    <Select value={filter.department} onValueChange={(dep) => setFilter({...filter, department: dep})}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Все отделы</SelectItem>
                            {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Сотрудник</label>
                    <Select value={filter.employee} onValueChange={(emp) => setFilter({...filter, employee: emp})}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Все сотрудники</SelectItem>
                            {filteredEmployees().map(e => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>

                <Button onClick={handleGetAnalytics} className="w-full">
                    Показать
                </Button>
            </article>

            <section className="border-2 border-dashed rounded-xl p-6 space-y-6">
                {isFetching ? (
                    <div className="flex items-center justify-center text-muted-foreground">Загрузка...</div>
                ) : analyticsData ? (
                    <div className="space-y-6">
                        {/* Summary */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 rounded-lg bg-card border">
                                <div className="text-sm text-muted-foreground">Всего отзывов</div>
                                <div className="text-2xl font-bold">{analyticsData.summary.total}</div>
                            </div>
                            <div className="p-4 rounded-lg bg-card border">
                                <div className="text-sm text-muted-foreground">Средний балл</div>
                                <div className="text-2xl font-bold">{analyticsData.summary.avgScore.toFixed(1)}</div>
                            </div>
                            <div className="p-4 rounded-lg bg-card border">
                                <div className="text-sm text-muted-foreground">Индекс лояльности</div>
                                <div className="text-2xl font-bold">{analyticsData.summary.index}</div>
                            </div>
                            <div className="p-4 rounded-lg bg-card border">
                                <div className="text-sm text-muted-foreground">Негативных</div>
                                <div className="text-2xl font-bold text-red-500">{analyticsData.summary.negative}</div>
                            </div>
                        </div>

                        {/* By Month */}
                        {analyticsData.byMonth.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold mb-3">По месяцам</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {analyticsData.byMonth.map(item => (
                                        <div key={item.month} className="p-3 rounded-lg bg-card border">
                                            <div className="text-sm text-muted-foreground">{item.month}</div>
                                            <div className="text-lg font-semibold">{item.total} отзывов</div>
                                            <div className="text-xs text-muted-foreground">Ср: {item.avgScore.toFixed(1)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* By Tag */}
                        {analyticsData.byTag.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold mb-3">По тегам</h3>
                                <div className="flex flex-wrap gap-2">
                                    {analyticsData.byTag.map(item => (
                                        <span
                                            key={item.title}
                                            className={`px-3 py-1 rounded-full text-sm ${
                                                item.type === "positive"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {item.title}: {item.total}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* By Employee */}
                        {analyticsData.byEmployee.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold mb-3">По сотрудникам</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {analyticsData.byEmployee.map(item => (
                                        <div key={item.id} className="p-4 rounded-lg bg-card border flex items-center gap-4">
                                            <img
                                                src={item.avatar || "/avatar-placeholder.png"}
                                                alt={item.name}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            <div className="flex-1">
                                                <div className="font-medium">{item.name}</div>
                                                <div className="text-sm text-muted-foreground">{item.department}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {item.total} отзывов | Ср: {item.avgScore.toFixed(1)}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* By Department */}
                        {analyticsData.byDepartment.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold mb-3">По отделам</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {analyticsData.byDepartment.map(item => (
                                        <div key={item.department} className="p-3 rounded-lg bg-card border">
                                            <div className="font-medium">{item.department}</div>
                                            <div className="text-sm text-muted-foreground">{item.total} отзывов</div>
                                            <div className="text-xs text-muted-foreground">Ср: {item.avgScore.toFixed(1)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center text-muted-foreground">
                        Настройте фильтры и нажмите кнопку «Показать»
                    </div>
                )}
            </section>
        </div>
    );
}