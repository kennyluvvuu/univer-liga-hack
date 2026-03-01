import { useParams } from "react-router-dom";
import useQueryEmployeeReviews from "@/hooks/useQueryEmployeeReviews";
import { Star, CalendarDays, ClipboardList } from "lucide-react";

export default function EmployeeReviewsScreen() {
    const { id } = useParams<{ id: string }>();
    const { data: reviews, isLoading, isError } = useQueryEmployeeReviews(id!);

    if (isLoading) {
        return <div className="text-center py-8">Загрузка отзывов...</div>;
    }

    if (isError || !reviews) {
        console.log(id);
        return (
            <div className="text-center py-8 text-red-500">
                Ошибка загрузки отзывов
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Отзывы о сотруднике</h1>

            {reviews.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                    Нет отзывов
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {reviews.map((review) => (
                        <article
                            key={review.id}
                            className="border rounded-xl p-5 bg-card text-card-foreground shadow-sm flex flex-col gap-3"
                        >
                            <div className="flex justify-between items-start gap-2">
                                <h2 className="text-lg font-semibold">
                                    {review.senderName}
                                </h2>
                                <div className="flex items-center shrink-0 gap-1.5 bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm font-medium">
                                    <Star className="h-4 w-4 fill-primary text-primary" />
                                    {review.score}
                                </div>
                            </div>

                            <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md break-words whitespace-pre-wrap leading-relaxed">
                                "{review.comment}"
                            </p>

                            <div className="flex flex-col gap-1.5 text-xs text-muted-foreground mt-auto pt-2 border-t">
                                <div className="flex items-center gap-2">
                                    <ClipboardList className="h-3.5 w-3.5 shrink-0" />
                                    <span
                                        className="truncate"
                                        title={review.taskTitle}
                                    >
                                        Задача: {review.taskTitle}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                                    <span>
                                        {new Date(
                                            review.date,
                                        ).toLocaleDateString("ru-RU")}
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}
