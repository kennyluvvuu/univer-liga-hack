import { memo, useMemo, useState } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";

import UserAvatarComponent from "@/components/UserAvatarComponent";
import useQueryUsers from "@/hooks/useQueryUsers";
import useQueryTasks from "@/hooks/useQueryTasks";
import { useParams } from "react-router-dom";
import { useMutationReview } from "@/hooks/useMutationReview";
import type { ReviewTagI } from "@/types/types";
import useAuthContext from "@/hooks/context/useAuthContext";

const POSITIVE_TAGS: ReviewTagI[] = [
    { id: 'p1', title: 'Скорость', type: 'positive' },
    { id: 'p2', title: 'Качество', type: 'positive' },
    { id: 'p3', title: 'Понимание', type: 'positive' }
];
const NEGATIVE_TAGS: ReviewTagI[] = [
    { id: 'n1', title: 'Долго', type: 'negative' },
    { id: 'n2', title: 'Ошибки', type: 'negative' },
    { id: 'n3', title: 'ТЗ не соблюдено', type: 'negative' }
];

const ALL_TAGS: ReviewTagI[] = [...POSITIVE_TAGS, ...NEGATIVE_TAGS];

export default memo(function ReviewScreen() {
    const { id: recipientId } = useParams();
    const { user: currentUser } = useAuthContext();

    const { data: users = [], isLoading: usersLoading } = useQueryUsers();
    const { data: tasks = [] } = useQueryTasks();

    const { mutate: sendReview, isPending } = useMutationReview();

    const [selectedTaskId, setSelectedTaskId] = useState<string>("");
    const [score, setScore] = useState([5]);
    const [comment, setComment] = useState("");
    const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

    const user = useMemo(() => users.find((u) => u.id === recipientId), [users, recipientId]);

    const handleSubmit = () => {
        if (!recipientId || !selectedTaskId || !currentUser) return;

        const tags: ReviewTagI[] = ALL_TAGS.filter((tag) => selectedTagIds.includes(tag.id));
        console.log({
            recipientId,
            senderId: currentUser.id,
            taskId: selectedTaskId,
            score: score[0],
            tags,
            comment: comment.trim()
        });
        sendReview({
            recipientId,
            senderId: currentUser.id,
            taskId: selectedTaskId,
            score: score[0],
            tags,
            comment: comment.trim()
        });
    };

    if (usersLoading) return <div className="p-8 text-center animate-pulse text-muted-foreground">Загрузка...</div>;
    if (!user) return <div className="p-8 text-center text-destructive">Пользователь не найден</div>;

    return (
        <div className="space-y-8 p-4">
            <header className="flex items-center gap-4 p-5 border rounded-2xl bg-card shadow-sm">
                <UserAvatarComponent path={user.avatar} />
                <div>
                    <h1 className="text-lg font-semibold">{user.name}</h1>
                    <p className="text-xs text-muted-foreground">{user.department}</p>
                </div>
            </header>

            <div className="space-y-6">
                <div className="space-y-3">
                    <Label className="text-base font-medium">Выберите выполненную задачу</Label>
                    <Select onValueChange={setSelectedTaskId} value={selectedTaskId} disabled={isPending}>
                        <SelectTrigger className="h-12"><SelectValue placeholder="Список задач" /></SelectTrigger>
                        <SelectContent>
                            {tasks.map((t) => <SelectItem key={t.id} value={t.id}>{t.title}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>

                {selectedTaskId && (
                    <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="space-y-5">
                            <Label className="text-base flex justify-between items-center">
                                Ваша оценка: <span className="text-primary font-bold text-xl">{score[0]}</span>
                            </Label>
                            <div className="px-2">
                                <Slider value={score} onValueChange={setScore} max={10} min={1} step={1} disabled={isPending} />
                                <div className="flex justify-between mt-2 px-1 text-[10px] text-muted-foreground">
                                    {[...Array(10)].map((_, i) => <span key={i}>{i + 1}</span>)}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <TagSection label="Положительные стороны:" tags={POSITIVE_TAGS} selectedTagIds={selectedTagIds} onChange={setSelectedTagIds} disabled={isPending} activeClass="data-[state=on]:bg-green-50 data-[state=on]:text-green-700" />
                            <TagSection label="Отрицательные стороны:" tags={NEGATIVE_TAGS} selectedTagIds={selectedTagIds} onChange={setSelectedTagIds} disabled={isPending} activeClass="data-[state=on]:bg-red-50 data-[state=on]:text-red-700" />
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <Label>Ваш комментарий</Label>
                                <span className={`text-[11px] font-medium ${comment.length < 50 ? 'text-destructive' : 'text-green-600'}`}>
                                    {comment.length}/300
                                </span>
                            </div>
                            <Textarea 
                                placeholder="Опишите детали работы..." 
                                className="resize-none h-32 rounded-xl focus-visible:ring-primary shadow-sm"
                                value={comment}
                                disabled={isPending}
                                onChange={(e) => e.target.value.length <= 300 && setComment(e.target.value)}
                            />
                        </div>

                        <Button 
                            className="w-full h-12 text-base font-semibold" 
                            size="lg" 
                            disabled={comment.length < 50 || isPending}
                            onClick={handleSubmit}
                        >
                            {isPending ? "Отправка..." : "Опубликовать отзыв"}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
});

interface TagSectionProps {
    label: string;
    tags: ReviewTagI[];
    selectedTagIds: string[];
    onChange: (tags: string[]) => void;
    disabled?: boolean;
    activeClass: string;
}

function TagSection({ label, tags, selectedTagIds, onChange, disabled, activeClass }: TagSectionProps) {
    return (
        <div className="space-y-3">
            <Label className="text-sm text-muted-foreground uppercase tracking-wider">{label}</Label>
            <ToggleGroup type="multiple" variant="outline" className="justify-start flex-wrap gap-2" value={selectedTagIds} onValueChange={onChange} disabled={disabled}>
                {tags.map(tag => (
                    <ToggleGroupItem key={tag.id} value={tag.id} className={`rounded-full ${activeClass}`}>
                        {tag.title}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </div>
    );
}