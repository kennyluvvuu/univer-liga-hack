import { useMutationDeleteMyReview } from "@/hooks/useMutationDeleteMyReview";
import type { MyReviewI } from "@/types/types";
import { Star, CalendarDays, ClipboardList, Trash2, Loader2 } from "lucide-react"; 

interface ReviewHistoryProps {
  review: MyReviewI;
}

export default function ReviewHistory({ review }: ReviewHistoryProps) {
  const { mutate: deleteMyReview, isPending } = useMutationDeleteMyReview();

  return (
    // Добавлен overflow-hidden, чтобы ничего точно не вылетало
    <article className="border rounded-xl p-5 bg-card text-card-foreground shadow-sm flex flex-col gap-3 hover:border-primary/50 transition-colors overflow-hidden">
      <div className="flex justify-between items-start gap-2">
        {/* Имя тоже может быть длинным — добавим break-words */}
        <h2 className="text-lg font-semibold tracking-tight break-words max-w-[70%]">
          {review.recipientName}
        </h2>
        <div className="flex items-center shrink-0 gap-1.5 bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm font-medium">
          <Star className="h-4 w-4 fill-primary text-primary" />
          {review.score}
        </div>
      </div>

      {/* РЕШЕНИЕ ПРОБЛЕМЫ ЗДЕСЬ: break-words и whitespace-pre-wrap */}
      <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md break-words whitespace-pre-wrap leading-relaxed">
        "{review.comment}"
      </p>

      <div className="flex flex-col gap-1.5 text-xs text-muted-foreground mt-auto pt-2 border-t">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-3.5 w-3.5 shrink-0" />
          {/* Название задачи тоже ограничиваем */}
          <span className="truncate" title={review.taskTitle}>Задача: {review.taskTitle}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-3.5 w-3.5 shrink-0" />
          <span>{new Date(review.date).toLocaleDateString('ru-RU')}</span>
        </div>
        
        {/* Стилизованная кнопка удаления */}
        <button
          onClick={() => deleteMyReview(review.id)}
          disabled={isPending}
          className="flex items-center gap-2 text-destructive hover:underline mt-2 self-start disabled:opacity-50"
        >
          {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
          Удалить отзыв
        </button>
      </div>
    </article>
  );
}