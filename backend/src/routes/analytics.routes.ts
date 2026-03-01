import Elysia from "elysia";
import { CommentModel } from "../models/comment.model";
import { UserModel } from "../models/user.model";
import { authPlugin } from "../plugins/auth.plugin";
import UserService from "../services/user.serivce";

export const analyticsRoutes = (userService: UserService) =>
    new Elysia()
        .use(authPlugin)
        .get("/analytics", async ({ payload, status, query }) => {
            if (!payload || !payload.sub) return status(401);
            const currentUser = await userService.getById(payload.sub);
            if (currentUser?.role !== "director")
                return status(403, { message: "Только для руководителя" });

            const { from, to, employeeId, department } = query as {
                from?: string;
                to?: string;
                employeeId?: string;
                department?: string;
            };

            const effectiveEmployeeId =
                employeeId === "all" ? undefined : employeeId;
            const effectiveDepartament =
                department === "all" ? undefined : department;

            // Строим фильтр
            const filter: Record<string, unknown> = {};
            if (from || to) {
                filter.createdAt = {};
                if (from)
                    (filter.createdAt as Record<string, unknown>).$gte =
                        new Date(from);
                if (to)
                    (filter.createdAt as Record<string, unknown>).$lte =
                        new Date(to);
            }
            if (effectiveEmployeeId) filter.recipientId = effectiveEmployeeId;

            const comments = await CommentModel.find(filter).lean();

            // Если фильтр по department — нужно знать кто в этом отделе
            let allowedUserIds: Set<string> | null = null;
            if (effectiveDepartament) {
                const deptUsers = await UserModel.find({
                    department: effectiveDepartament,
                }).lean();
                allowedUserIds = new Set(
                    deptUsers.map((u) => u._id.toString()),
                );
            }

            const filtered = allowedUserIds
                ? comments.filter((c) =>
                      allowedUserIds!.has(c.recipientId.toString()),
                  )
                : comments;

            // Хелпер для подсчёта (10-балльная система: >= 7 позитив, <= 4 негатив)
            const calcStats = (items: typeof filtered) => {
                const total = items.length;
                const positive = items.filter((c) => c.score >= 7).length;
                const negative = items.filter((c) => c.score <= 4).length;
                const neutral = total - positive - negative;
                const index =
                    total > 0
                        ? Math.round(
                              ((positive - negative) / total) * 100 * 10,
                          ) / 10
                        : 0;
                const avgScore =
                    total > 0
                        ? Math.round(
                              (items.reduce((s, c) => s + c.score, 0) / total) *
                                  10,
                          ) / 10
                        : 0;
                return { total, positive, negative, neutral, index, avgScore };
            };

            // Блок 1 — summary
            const summary = calcStats(filtered);

            // Блок 2 — по месяцам
            const monthMap: Record<string, typeof filtered> = {};
            filtered.forEach((c) => {
                const month = new Date(c.createdAt).toISOString().slice(0, 7);
                if (!monthMap[month]) monthMap[month] = [];
                monthMap[month].push(c);
            });
            const byMonth = Object.entries(monthMap)
                .sort((a, b) => a[0].localeCompare(b[0]))
                .map(([month, items]) => ({ month, ...calcStats(items) }));

            // Блок 3 — по тегам
            const tagMap: Record<
                string,
                { items: typeof filtered; type: string }
            > = {};
            filtered.forEach((c) => {
                c.tags.forEach((tag) => {
                    if (!tagMap[tag.title])
                        tagMap[tag.title] = { items: [], type: tag.type };
                    tagMap[tag.title].items.push(c);
                });
            });
            const byTag = Object.entries(tagMap)
                .map(([title, { items, type }]) => {
                    const total = items.length;
                    // Считаем по типу тега, а не по score
                    const positive = type === "positive" ? total : 0;
                    const negative = type === "negative" ? total : 0;
                    const neutral = 0;
                    const index =
                        total > 0
                            ? Math.round(
                                  ((positive - negative) / total) * 100 * 10,
                              ) / 10
                            : 0;
                    const avgScore =
                        total > 0
                            ? Math.round(
                                  (items.reduce((s, c) => s + c.score, 0) /
                                      total) *
                                      10,
                              ) / 10
                            : 0;
                    return {
                        title,
                        type,
                        total,
                        positive,
                        negative,
                        neutral,
                        index,
                        avgScore,
                    };
                })
                .sort((a, b) => b.total - a.total);
            // Блок 4 — по сотрудникам (нужны имена)
            const employeeMap: Record<string, typeof filtered> = {};
            filtered.forEach((c) => {
                const id = c.recipientId.toString();
                if (!employeeMap[id]) employeeMap[id] = [];
                employeeMap[id].push(c);
            });

            const employeeIds = Object.keys(employeeMap);
            const employeeUsers = await UserModel.find({
                _id: { $in: employeeIds },
            }).lean();
            const userLookup = Object.fromEntries(
                employeeUsers.map((u) => [u._id.toString(), u]),
            );

            const byEmployee = employeeIds
                .map((id) => {
                    const items = employeeMap[id];
                    const u = userLookup[id];

                    // Топ теги для этого сотрудника
                    const tagCount: Record<string, number> = {};
                    items.forEach((c) =>
                        c.tags.forEach((t) => {
                            tagCount[t.title] = (tagCount[t.title] || 0) + 1;
                        }),
                    );
                    const topTags = Object.entries(tagCount)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 3)
                        .map(([title]) => title);

                    return {
                        id,
                        name: u?.name ?? "Неизвестно",
                        department: u?.department ?? "",
                        avatar: u?.avatar ?? null,
                        ...calcStats(items),
                        topTags,
                    };
                })
                .sort((a, b) => b.index - a.index);

            // Блок 5 — по подразделениям
            const deptMap: Record<string, typeof filtered> = {};
            for (const emp of byEmployee) {
                if (!deptMap[emp.department]) deptMap[emp.department] = [];
                // берём оригинальные комменты этого сотрудника
                deptMap[emp.department].push(...(employeeMap[emp.id] ?? []));
            }
            const byDepartment = Object.entries(deptMap)
                .map(([dept, items]) => ({
                    department: dept,
                    ...calcStats(items),
                }))
                .sort((a, b) => b.index - a.index);

            return { summary, byMonth, byTag, byEmployee, byDepartment };
        });
