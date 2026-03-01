import { memo, useMemo, useState } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import UserAvatarComponent from "@/components/UserAvatarComponent";
import useQueryUsers from "@/hooks/useQueryUsers";
import useQueryTasks from "@/hooks/useQueryTasks";
import { useParams } from "react-router-dom";
import { useMutationReview } from "@/hooks/useMutationReview";
import type { ReviewTagI } from "@/types/types";
import useAuthContext from "@/hooks/context/useAuthContext";

const POSITIVE_TAGS: ReviewTagI[] = [
    { title: "Скорость", type: "positive" },
    { title: "Качество", type: "positive" },
    { title: "Понимание", type: "positive" },
];
const NEGATIVE_TAGS: ReviewTagI[] = [
    { title: "Долго", type: "negative" },
    { title: "Ошибки", type: "negative" },
    { title: "ТЗ не соблюдено", type: "negative" },
];

const ALL_TAGS: ReviewTagI[] = [...POSITIVE_TAGS, ...NEGATIVE_TAGS];

const SCORE_LABELS: Record<
    number,
    { label: string; color: string; bg: string }
> = {
    1: {
        label: "Ужасно",
        color: "text-red-600",
        bg: "bg-red-50 border-red-200",
    },
    2: {
        label: "Очень плохо",
        color: "text-red-500",
        bg: "bg-red-50 border-red-200",
    },
    3: {
        label: "Плохо",
        color: "text-orange-600",
        bg: "bg-orange-50 border-orange-200",
    },
    4: {
        label: "Ниже среднего",
        color: "text-orange-500",
        bg: "bg-orange-50 border-orange-200",
    },
    5: {
        label: "Средне",
        color: "text-yellow-600",
        bg: "bg-yellow-50 border-yellow-200",
    },
    6: {
        label: "Нормально",
        color: "text-yellow-500",
        bg: "bg-yellow-50 border-yellow-200",
    },
    7: {
        label: "Хорошо",
        color: "text-lime-600",
        bg: "bg-lime-50 border-lime-200",
    },
    8: {
        label: "Очень хорошо",
        color: "text-green-600",
        bg: "bg-green-50 border-green-200",
    },
    9: {
        label: "Отлично",
        color: "text-green-600",
        bg: "bg-green-50 border-green-200",
    },
    10: {
        label: "Превосходно",
        color: "text-emerald-600",
        bg: "bg-emerald-50 border-emerald-200",
    },
};

function ScorePicker({
    value,
    onChange,
    disabled,
}: {
    value: number;
    onChange: (v: number) => void;
    disabled?: boolean;
}) {
    const meta = SCORE_LABELS[value];
    const t = (value - 1) / 9; // 0..1

    // Emoji: maps score 1-10 to expressive emojis
    const emojis: Record<number, string> = {
        1: "😡",
        2: "😠",
        3: "😟",
        4: "😕",
        5: "😐",
        6: "🙂",
        7: "😊",
        8: "😄",
        9: "😁",
        10: "🤩",
    };

    const emoji = emojis[value] ?? "😐";

    // Track fill color for gradient
    const trackColor =
        t < 0.5
            ? `hsl(${Math.round(t * 2 * 40)}deg, 88%, 52%)`
            : `hsl(${Math.round(40 + (t - 0.5) * 2 * 80)}deg, 76%, 45%)`;

    const thumbPercent = ((value - 1) / 9) * 100;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Оценка</Label>
                <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-semibold transition-all ${meta.bg} ${meta.color}`}
                >
                    <span className="text-lg font-bold">{value}</span>
                    <span className="text-xs font-medium opacity-80">
                        {meta.label}
                    </span>
                </span>
            </div>

            {/* Slider with emoji thumb via CSS custom property */}
            <div className="relative px-1">
                <style>{`
                    .emoji-slider {
                        -webkit-appearance: none;
                        appearance: none;
                        width: 100%;
                        height: 6px;
                        border-radius: 9999px;
                        outline: none;
                        cursor: pointer;
                    }
                    .emoji-slider::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        appearance: none;
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                        background: transparent;
                        border: none;
                        box-shadow: none;
                        cursor: pointer;
                        font-size: 28px;
                        line-height: 1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-top: -13px;
                        /* Use the emoji as background image via data URI */
                        background-image: var(--emoji-bg);
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: contain;
                        transition: transform 0.15s ease, background-image 0.1s;
                        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.25));
                    }
                    .emoji-slider::-webkit-slider-thumb:hover {
                        transform: scale(1.2) translateY(-2px);
                    }
                    .emoji-slider::-moz-range-thumb {
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                        background: transparent;
                        border: none;
                        cursor: pointer;
                        background-image: var(--emoji-bg);
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: contain;
                        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.25));
                    }
                `}</style>
                <input
                    type="range"
                    min={1}
                    max={10}
                    step={1}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="emoji-slider"
                    style={
                        {
                            background: `linear-gradient(to right, ${trackColor} 0%, ${trackColor} ${thumbPercent}%, #e5e7eb ${thumbPercent}%, #e5e7eb 100%)`,
                            // encode emoji as SVG data URI for CSS variable
                            ["--emoji-bg" as string]: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><text y='26' font-size='28'>${emoji}</text></svg>")`,
                        } as React.CSSProperties
                    }
                />
                {/* Tick marks */}
                <div className="flex justify-between mt-2 px-0.5">
                    {Array.from({ length: 10 }, (_, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center gap-0.5"
                        >
                            <div
                                className={`w-px h-1.5 rounded-full ${i + 1 <= value ? "bg-foreground/30" : "bg-muted-foreground/20"}`}
                            />
                            <span
                                className={`text-[9px] tabular-nums transition-all ${i + 1 === value ? "font-bold text-foreground" : "text-muted-foreground/40"}`}
                            >
                                {i + 1}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function TagButton({
    tag,
    selected,
    onToggle,
    disabled,
}: {
    tag: ReviewTagI;
    selected: boolean;
    onToggle: () => void;
    disabled?: boolean;
}) {
    const isPositive = tag.type === "positive";
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onToggle}
            className={`
                inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border
                transition-all duration-150 select-none
                ${
                    selected
                        ? isPositive
                            ? "bg-green-100 text-green-700 border-green-300 shadow-sm"
                            : "bg-red-100 text-red-700 border-red-300 shadow-sm"
                        : "bg-transparent text-muted-foreground border-border hover:border-muted-foreground/40 hover:bg-muted/50"
                }
            `}
        >
            <span
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${selected ? (isPositive ? "bg-green-500" : "bg-red-500") : "bg-muted-foreground/30"}`}
            />
            {tag.title}
        </button>
    );
}

export default memo(function ReviewScreen() {
    const { id: recipientId } = useParams();
    const { user: currentUser } = useAuthContext();

    const { data: users = [], isLoading: usersLoading } = useQueryUsers();
    const { data: tasks = [] } = useQueryTasks();
    const { mutate: sendReview, isPending } = useMutationReview();

    const [selectedTaskId, setSelectedTaskId] = useState<string>("");
    const [score, setScore] = useState(5);
    const [comment, setComment] = useState("");
    const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

    const user = useMemo(
        () => users.find((u) => u.id === recipientId),
        [users, recipientId],
    );

    const toggleTag = (title: string) => {
        setSelectedTagIds((prev) =>
            prev.includes(title)
                ? prev.filter((t) => t !== title)
                : [...prev, title],
        );
    };

    const handleSubmit = () => {
        if (!recipientId || !selectedTaskId || !currentUser) return;
        const tags: ReviewTagI[] = ALL_TAGS.filter((tag) =>
            selectedTagIds.includes(tag.title),
        ).map((tag) => ({ title: tag.title, type: tag.type }));
        sendReview({
            recipientId,
            senderId: currentUser.id,
            taskId: selectedTaskId,
            score,
            tags,
            comment: comment.trim(),
        });
        setSelectedTaskId("");
    };

    const commentTooShort = comment.trim().length < 50;
    const commentLen = comment.length;
    const canSubmit = !commentTooShort && !isPending && !!selectedTaskId;

    if (usersLoading)
        return (
            <div className="p-8 text-center text-muted-foreground animate-pulse">
                Загрузка...
            </div>
        );
    if (!user)
        return (
            <div className="p-8 text-center text-destructive">
                Пользователь не найден
            </div>
        );

    return (
        <div className="max-w-xl mx-auto space-y-6 p-4 pb-10">
            {/* User card */}
            <div className="flex items-center gap-4 p-4 border rounded-2xl bg-card shadow-sm">
                <UserAvatarComponent path={user.avatar} />
                <div className="min-w-0">
                    <div className="font-semibold text-base truncate">
                        {user.name}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                        {user.department}
                    </div>
                </div>
                <div className="ml-auto shrink-0">
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                        Отзыв
                    </span>
                </div>
            </div>

            {/* Step 1: Task */}
            <div className="space-y-2">
                <Label className="text-sm font-semibold text-foreground">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs mr-2">
                        1
                    </span>
                    Выберите задачу
                </Label>
                <Select
                    onValueChange={setSelectedTaskId}
                    value={selectedTaskId}
                    disabled={isPending}
                >
                    <SelectTrigger className="h-11 w-full rounded-xl">
                        <SelectValue placeholder="Выберите задачу из списка..." />
                    </SelectTrigger>
                    <SelectContent>
                        {tasks.map((t) => (
                            <SelectItem key={t.id} value={t.id}>
                                {t.title}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Steps 2–4: visible after task selected */}
            {selectedTaskId && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
                    {/* Step 2: Score */}
                    <div className="space-y-2 p-4 border rounded-2xl bg-card">
                        <p className="text-sm font-semibold text-foreground mb-3">
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs mr-2">
                                2
                            </span>
                            Поставьте оценку
                        </p>
                        <ScorePicker
                            value={score}
                            onChange={setScore}
                            disabled={isPending}
                        />
                    </div>

                    {/* Step 3: Tags */}
                    <div className="space-y-3 p-4 border rounded-2xl bg-card">
                        <p className="text-sm font-semibold text-foreground">
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs mr-2">
                                3
                            </span>
                            Отметьте стороны
                        </p>
                        <div className="space-y-2">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">
                                Положительные
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {POSITIVE_TAGS.map((tag) => (
                                    <TagButton
                                        key={tag.title}
                                        tag={tag}
                                        selected={selectedTagIds.includes(
                                            tag.title,
                                        )}
                                        onToggle={() => toggleTag(tag.title)}
                                        disabled={isPending}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2 pt-1">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">
                                Отрицательные
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {NEGATIVE_TAGS.map((tag) => (
                                    <TagButton
                                        key={tag.title}
                                        tag={tag}
                                        selected={selectedTagIds.includes(
                                            tag.title,
                                        )}
                                        onToggle={() => toggleTag(tag.title)}
                                        disabled={isPending}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Step 4: Comment */}
                    <div className="space-y-2 p-4 border rounded-2xl bg-card">
                        <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-semibold text-foreground">
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs mr-2">
                                    4
                                </span>
                                Комментарий
                            </p>
                            <span
                                className={`text-xs font-medium tabular-nums ${commentLen < 50 ? "text-destructive" : commentLen >= 270 ? "text-orange-500" : "text-green-600"}`}
                            >
                                {commentLen}/300
                            </span>
                        </div>
                        <Textarea
                            placeholder="Опишите детали совместной работы — чем помог коллега, что можно улучшить..."
                            className="resize-none h-28 rounded-xl shadow-none focus-visible:ring-primary"
                            value={comment}
                            disabled={isPending}
                            onChange={(e) =>
                                e.target.value.length <= 300 &&
                                setComment(e.target.value)
                            }
                        />
                        {commentTooShort && commentLen > 0 && (
                            <p className="text-xs text-destructive">
                                Ещё {50 - commentLen} символов до минимума
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <Button
                        className="w-full h-12 text-base font-semibold rounded-xl"
                        disabled={!canSubmit}
                        onClick={handleSubmit}
                    >
                        {isPending ? (
                            <span className="flex items-center gap-2">
                                <svg
                                    className="animate-spin h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    />
                                </svg>
                                Отправка...
                            </span>
                        ) : (
                            "Опубликовать отзыв"
                        )}
                    </Button>
                </div>
            )}
        </div>
    );
});
