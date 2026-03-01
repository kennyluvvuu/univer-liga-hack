// frontend/src/screens/AnalyticsScreen.tsx
import useAuthContext from "@/hooks/context/useAuthContext";
import type { FilterI, AnalyticsResponseI } from "@/types/types";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useQueryDepartments from "@/hooks/useQueryDepartments";
import useQueryUsers from "@/hooks/useQueryUsers";
import useQueryAnalytics from "@/hooks/useQueryAnalytics";
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie,
    Legend,
} from "recharts";

function getIndexColor(index: number): string {
    if (index >= 50) return "text-green-600";
    if (index >= 20) return "text-yellow-500";
    if (index >= 0) return "text-orange-500";
    return "text-red-600";
}

function getIndexBg(index: number): string {
    if (index >= 50) return "border-green-200 bg-green-50";
    if (index >= 20) return "border-yellow-200 bg-yellow-50";
    if (index >= 0) return "border-orange-200 bg-orange-50";
    return "border-red-200 bg-red-50";
}

function SummaryCards({ summary }: { summary: AnalyticsResponseI["summary"] }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-4 rounded-xl border bg-card col-span-2 md:col-span-1">
                <div className="text-xs text-muted-foreground">
                    Всего отзывов
                </div>
                <div className="text-3xl font-bold mt-1">{summary.total}</div>
            </div>
            <div
                className={`p-4 rounded-xl border col-span-2 md:col-span-1 ${getIndexBg(summary.index)}`}
            >
                <div className="text-xs text-muted-foreground">Индекс</div>
                <div
                    className={`text-3xl font-bold mt-1 ${getIndexColor(summary.index)}`}
                >
                    {summary.index > 0 ? "+" : ""}
                    {summary.index}
                </div>
            </div>
            <div className="p-4 rounded-xl border bg-card">
                <div className="text-xs text-muted-foreground">
                    Средний балл
                </div>
                <div className="text-3xl font-bold mt-1">
                    {summary.avgScore.toFixed(1)}
                </div>
            </div>
            <div className="p-4 rounded-xl border bg-green-50 border-green-200">
                <div className="text-xs text-muted-foreground">Позитивных</div>
                <div className="text-3xl font-bold text-green-600 mt-1">
                    {summary.positive}
                </div>
            </div>
            <div className="p-4 rounded-xl border bg-card">
                <div className="text-xs text-muted-foreground">Нейтральных</div>
                <div className="text-3xl font-bold text-yellow-500 mt-1">
                    {summary.neutral}
                </div>
            </div>
            <div className="p-4 rounded-xl border bg-red-50 border-red-200">
                <div className="text-xs text-muted-foreground">Негативных</div>
                <div className="text-3xl font-bold text-red-600 mt-1">
                    {summary.negative}
                </div>
            </div>
        </div>
    );
}

function MonthChart({ data }: { data: AnalyticsResponseI["byMonth"] }) {
    if (data.length === 0) return null;

    const formatted = data.map((d) => ({
        ...d,
        month: d.month.slice(5),
    }));

    return (
        <div className="border rounded-xl bg-card p-5">
            <h3 className="text-base font-semibold mb-4">
                Динамика по месяцам
            </h3>
            <ResponsiveContainer width="100%" height={220}>
                <AreaChart
                    data={formatted}
                    margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                >
                    <defs>
                        <linearGradient
                            id="colorIndex"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#6366f1"
                                stopOpacity={0.3}
                            />
                            <stop
                                offset="95%"
                                stopColor="#6366f1"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip
                        formatter={(value, name) => {
                            const labels: Record<string, string> = {
                                index: "Индекс",
                                positive: "Позитивных",
                                negative: "Негативных",
                                total: "Всего",
                            };
                            return [
                                value ?? 0,
                                labels[String(name)] ?? String(name),
                            ];
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="index"
                        stroke="#6366f1"
                        fill="url(#colorIndex)"
                        strokeWidth={2}
                        name="index"
                    />
                    <Area
                        type="monotone"
                        dataKey="positive"
                        stroke="#22c55e"
                        fill="none"
                        strokeWidth={2}
                        strokeDasharray="4 2"
                        name="positive"
                    />
                    <Area
                        type="monotone"
                        dataKey="negative"
                        stroke="#ef4444"
                        fill="none"
                        strokeWidth={2}
                        strokeDasharray="4 2"
                        name="negative"
                    />
                </AreaChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2 justify-center text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                    <span className="w-3 h-0.5 bg-indigo-500 inline-block" />{" "}
                    Индекс
                </span>
                <span className="flex items-center gap-1">
                    <span className="w-3 h-0.5 bg-green-500 inline-block" />{" "}
                    Позитивных
                </span>
                <span className="flex items-center gap-1">
                    <span className="w-3 h-0.5 bg-red-500 inline-block" />{" "}
                    Негативных
                </span>
            </div>
        </div>
    );
}

function TagChart({ data }: { data: AnalyticsResponseI["byTag"] }) {
    if (data.length === 0) return null;

    return (
        <div className="border rounded-xl bg-card p-5">
            <h3 className="text-base font-semibold mb-4">Популярность тегов</h3>
            <ResponsiveContainer
                width="100%"
                height={Math.max(180, data.length * 36)}
            >
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ top: 0, right: 30, left: 10, bottom: 0 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#f0f0f0"
                        horizontal={false}
                    />
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis
                        type="category"
                        dataKey="title"
                        width={130}
                        tick={{ fontSize: 12 }}
                    />
                    <Tooltip formatter={(v) => [v ?? 0, "Упоминаний"]} />
                    <Bar dataKey="total" radius={[0, 4, 4, 0]}>
                        {data.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={
                                    entry.type === "positive"
                                        ? "#22c55e"
                                        : "#ef4444"
                                }
                                opacity={0.85}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

function SummaryPie({ summary }: { summary: AnalyticsResponseI["summary"] }) {
    if (summary.total === 0) return null;

    const pieData = [
        { name: "Позитив.", value: summary.positive, color: "#22c55e" },
        { name: "Нейтрал.", value: summary.neutral, color: "#eab308" },
        { name: "Негатив.", value: summary.negative, color: "#ef4444" },
    ].filter((d) => d.value > 0);
    return (
        <div className="border rounded-xl bg-card p-5">
            <h3 className="text-base font-semibold mb-1">Распределение</h3>
            <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                    <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        dataKey="value"
                        paddingAngle={3}
                    >
                        {pieData.map((entry, i) => (
                            <Cell key={i} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(v, name) => [v ?? 0, String(name)]} />
                </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
                {pieData.map((entry) => (
                    <div
                        key={entry.name}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground"
                    >
                        <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: entry.color }}
                        />
                        {entry.name}: {entry.value}
                    </div>
                ))}
            </div>
        </div>
    );
}

function EmployeeTable({ data }: { data: AnalyticsResponseI["byEmployee"] }) {
    if (data.length === 0) return null;

    return (
        <div className="border rounded-xl bg-card p-5">
            <h3 className="text-base font-semibold mb-4">По сотрудникам</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-muted-foreground text-xs border-b">
                            <th className="pb-2 pr-4 font-medium">Сотрудник</th>
                            <th className="pb-2 pr-4 font-medium text-center">
                                Отзывов
                            </th>
                            <th className="pb-2 pr-4 font-medium text-center">
                                Ср. балл
                            </th>
                            <th className="pb-2 pr-4 font-medium text-center">
                                Индекс
                            </th>
                            <th className="pb-2 font-medium">Топ теги</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((emp) => (
                            <tr
                                key={emp.id}
                                className={`border-b last:border-0 border-l-2 ${
                                    emp.index >= 50
                                        ? "border-l-green-400"
                                        : emp.index >= 0
                                          ? "border-l-yellow-400"
                                          : "border-l-red-400"
                                }`}
                            >
                                <td className="py-3 pr-4">
                                    <div className="flex items-center gap-2">
                                        {emp.avatar ? (
                                            <img
                                                src={emp.avatar}
                                                className="w-7 h-7 rounded-full object-cover"
                                                alt=""
                                            />
                                        ) : (
                                            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                                                {emp.name[0]}
                                            </div>
                                        )}
                                        <div>
                                            <div className="font-medium">
                                                {emp.name}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {emp.department}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3 pr-4 text-center">
                                    {emp.total}
                                </td>
                                <td className="py-3 pr-4 text-center">
                                    {emp.avgScore.toFixed(1)}
                                </td>
                                <td
                                    className={`py-3 pr-4 text-center font-semibold ${getIndexColor(emp.index)}`}
                                >
                                    {emp.index > 0 ? "+" : ""}
                                    {emp.index}
                                </td>
                                <td className="py-3">
                                    <div className="flex flex-wrap gap-1">
                                        {emp.topTags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-0.5 bg-muted rounded-full text-xs"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function DepartmentChart({
    data,
}: {
    data: AnalyticsResponseI["byDepartment"];
}) {
    if (data.length === 0) return null;

    return (
        <div className="border rounded-xl bg-card p-5">
            <h3 className="text-base font-semibold mb-4">Индекс по отделам</h3>
            <ResponsiveContainer width="100%" height={180}>
                <BarChart
                    data={data}
                    margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="department" tick={{ fontSize: 12 }} />
                    <YAxis domain={[-100, 100]} tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(v) => [v ?? 0, "Индекс"]} />
                    <Bar dataKey="index" radius={[4, 4, 0, 0]}>
                        {data.map((entry, i) => (
                            <Cell
                                key={i}
                                fill={
                                    entry.index >= 50
                                        ? "#22c55e"
                                        : entry.index >= 0
                                          ? "#eab308"
                                          : "#ef4444"
                                }
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default function AnalyticsScreen() {
    const { user } = useAuthContext();
    const [filter, setFilter] = useState<FilterI>({
        startPeriod: "2025-01-01",
        endPeriod: new Date().toISOString().split("T")[0],
        department: "all",
        employee: "all",
    });

    const { data: departments = [], isLoading: isDepartmentsLoading } =
        useQueryDepartments();
    const { data: users = [], isLoading: isUsersLoading } = useQueryUsers();
    const {
        data: analyticsData,
        refetch,
        isFetching,
    } = useQueryAnalytics(filter);

    const filteredEmployees =
        filter.department === "all"
            ? users
            : users.filter((e) => e.department === filter.department);

    if (!user || user.role !== "director") return <Navigate to="/" />;

    if (isDepartmentsLoading || isUsersLoading)
        return (
            <div className="min-h-40 border-2 border-dashed rounded-xl animate-pulse" />
        );

    return (
        <div className="space-y-6 pb-10">
            <article className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end border p-4 rounded-xl bg-card">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Период</label>
                    <div className="flex gap-2">
                        <Input
                            type="date"
                            value={filter.startPeriod}
                            onChange={(e) =>
                                setFilter({
                                    ...filter,
                                    startPeriod: e.target.value,
                                })
                            }
                        />
                        <Input
                            type="date"
                            value={filter.endPeriod}
                            onChange={(e) =>
                                setFilter({
                                    ...filter,
                                    endPeriod: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Отдел</label>
                    <Select
                        value={filter.department}
                        onValueChange={(dep) =>
                            setFilter({
                                ...filter,
                                department: dep,
                                employee: "all",
                            })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue />
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
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Сотрудник</label>
                    <Select
                        value={filter.employee}
                        onValueChange={(emp) =>
                            setFilter({ ...filter, employee: emp })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Все сотрудники</SelectItem>
                            {filteredEmployees.map((e) => (
                                <SelectItem key={e.id} value={e.id}>
                                    {e.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Button
                    onClick={() => refetch()}
                    disabled={isFetching}
                    className="w-full"
                >
                    {isFetching ? "Загрузка..." : "Показать"}
                </Button>
            </article>

            {isFetching ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-20 rounded-xl border bg-muted animate-pulse"
                        />
                    ))}
                </div>
            ) : analyticsData ? (
                <div className="space-y-5">
                    <SummaryCards summary={analyticsData.summary} />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="md:col-span-2">
                            <MonthChart data={analyticsData.byMonth} />
                        </div>
                        <SummaryPie summary={analyticsData.summary} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <TagChart data={analyticsData.byTag} />
                        <DepartmentChart data={analyticsData.byDepartment} />
                    </div>

                    <EmployeeTable data={analyticsData.byEmployee} />
                </div>
            ) : (
                <div className="border-2 border-dashed rounded-xl p-12 text-center text-muted-foreground">
                    Настройте фильтры и нажмите «Показать»
                </div>
            )}
        </div>
    );
}
