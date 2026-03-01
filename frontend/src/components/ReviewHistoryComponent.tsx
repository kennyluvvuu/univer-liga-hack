import useQueryMyReviews from "@/hooks/useQueryMyReviews";
import ReviewComponent from "./ReviewComponent";

export default function ReviewHistoryComponent() {
  const { data: myReviews = [], isLoading } = useQueryMyReviews();

  if (isLoading)
    return (
      <div className="flex flex-col gap-4">
        {/* Стилизация состояния загрузки */}
        <div className="h-8 w-48 bg-muted animate-pulse rounded-md" />
        <div className="min-h-[200px] border-2 border-dashed rounded-xl flex items-center justify-center text-muted-foreground p-6">
          Загрузка истории отзывов...
        </div>
      </div>
    );

  return (
    <section className="space-y-6 mt-5">
      <h1 className="text-3xl font-bold tracking-tight">История отзывов</h1>
      
      {myReviews.length === 0 ? (
        <div className="text-center py-10 border rounded-lg bg-card">
          <p className="text-muted-foreground">У вас пока нет отзывов.</p>
        </div>
      ) : (
        <article className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myReviews.map((review, idx) => (
            <ReviewComponent key={idx} review={review} />
          ))}
        </article>
      )}
    </section>
  );
}