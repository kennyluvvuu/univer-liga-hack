import { useMutationDeleteMyReview } from "@/hooks/useMutationDeleteMyReview";
import type { MyReviewI } from "@/types/types";
import { Star, CalendarDays, ClipboardList } from "lucide-react"; // npm i lucide-react

interface ReviewHistoryProps {
  review: MyReviewI;
}

export default function ReviewHistory({ review }: ReviewHistoryProps) {
  const { mutate: deleteMyReview } = useMutationDeleteMyReview()

  return (
    <article className="border rounded-xl p-5 bg-card text-card-foreground shadow-sm flex flex-col gap-3 hover:border-primary/50 transition-colors">
      <div className="flex justify-between items-start gap-2">
        <h2 className="text-lg font-semibold tracking-tight">
          {review.recipientName}
        </h2>
        {/* Оценка со звездочкой */}
        <div className="flex items-center gap-1.5 bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm font-medium">
          <Star className="h-4 w-4 fill-primary text-primary" />
          {review.score}
        </div>
      </div>

      <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
        "{review.comment}"
      </p>

      <div className="flex flex-col gap-1.5 text-xs text-muted-foreground mt-auto pt-2 border-t">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-3.5 w-3.5" />
          <span>Задача: {review.taskTitle}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-3.5 w-3.5" />
          <span>{new Date(review.date).toLocaleDateString('ru-RU')}</span>
        </div>
        <button
          onClick={() => deleteMyReview(review.id)}
        >
          Удалить отзыв
        </button>
      </div>
    </article>
  );
}