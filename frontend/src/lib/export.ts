import type { AnalyticsResponseI } from "@/types/types";

function toCSV(rows: Record<string, unknown>[]): string {
    if (rows.length === 0) return "";
    const headers = Object.keys(rows[0]);
    const lines = [
        headers.join(";"),
        ...rows.map((row) =>
            headers
                .map((h) => {
                    const val = row[h];
                    const str = Array.isArray(val)
                        ? val.join(", ")
                        : String(val ?? "");
                    return str.includes(";") ? `"${str}"` : str;
                })
                .join(";"),
        ),
    ];
    return lines.join("\n");
}

function downloadCSV(content: string, filename: string) {
    const bom = "\uFEFF";
    const blob = new Blob([bom + content], {
        type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

async function downloadXLSX(data: AnalyticsResponseI, filename: string) {
    const XLSX = await import("xlsx");
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        wb,
        XLSX.utils.json_to_sheet([
            {
                "Всего отзывов": data.summary.total,
                Позитивных: data.summary.positive,
                Нейтральных: data.summary.neutral,
                Негативных: data.summary.negative,
                Индекс: data.summary.index,
                "Средний балл": data.summary.avgScore,
            },
        ]),
        "Сводка",
    );

    XLSX.utils.book_append_sheet(
        wb,
        XLSX.utils.json_to_sheet(
            data.byMonth.map((m) => ({
                Месяц: m.month,
                Всего: m.total,
                Позитивных: m.positive,
                Нейтральных: m.neutral,
                Негативных: m.negative,
                Индекс: m.index,
                "Средний балл": m.avgScore,
            })),
        ),
        "По месяцам",
    );

    XLSX.utils.book_append_sheet(
        wb,
        XLSX.utils.json_to_sheet(
            data.byEmployee.map((e) => ({
                Сотрудник: e.name,
                Отдел: e.department,
                Всего: e.total,
                Позитивных: e.positive,
                Нейтральных: e.neutral,
                Негативных: e.negative,
                Индекс: e.index,
                "Средний балл": e.avgScore,
                "Топ теги": e.topTags.join(", "),
            })),
        ),
        "Сотрудники",
    );

    XLSX.utils.book_append_sheet(
        wb,
        XLSX.utils.json_to_sheet(
            data.byDepartment.map((d) => ({
                Отдел: d.department,
                Всего: d.total,
                Позитивных: d.positive,
                Нейтральных: d.neutral,
                Негативных: d.negative,
                Индекс: d.index,
                "Средний балл": d.avgScore,
            })),
        ),
        "Отделы",
    );

    XLSX.utils.book_append_sheet(
        wb,
        XLSX.utils.json_to_sheet(
            data.byTag.map((t) => ({
                Тег: t.title,
                Тип: t.type === "positive" ? "Позитивный" : "Негативный",
                Упоминаний: t.total,
                "Средний балл": t.avgScore,
            })),
        ),
        "Теги",
    );

    XLSX.writeFile(wb, filename);
}

export async function exportAnalytics(
    data: AnalyticsResponseI,
    format: "csv" | "xlsx" | "pdf",
) {
    const date = new Date().toISOString().slice(0, 10);
    const filename = `analytics_${date}`;

    if (format === "csv") {
        const rows = data.byEmployee.map((e) => ({
            Сотрудник: e.name,
            Отдел: e.department,
            Всего: e.total,
            Позитивных: e.positive,
            Нейтральных: e.neutral,
            Негативных: e.negative,
            Индекс: e.index,
            "Средний балл": e.avgScore,
            "Топ теги": e.topTags.join(", "),
        }));
        downloadCSV(toCSV(rows), `${filename}.csv`);
    }

    if (format === "xlsx") {
        await downloadXLSX(data, `${filename}.xlsx`);
    }

    if (format === "pdf") {
        window.print();
    }
}
