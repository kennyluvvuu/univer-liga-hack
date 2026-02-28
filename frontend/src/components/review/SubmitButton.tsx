import { memo } from "react"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface SubmitButtonProps {
    isSubmitting: boolean
    onClick: () => void
}

export default memo(function SubmitButton({ isSubmitting, onClick }: SubmitButtonProps) {
    return (
        <Button
            className="w-full"
            size="lg"
            onClick={onClick}
            disabled={isSubmitting}
        >
            {isSubmitting ? (
                <>
                    <Star className="mr-2 h-4 w-4 animate-spin" />
                    Отправка...
                </>
            ) : (
                <>
                    <Star className="mr-2 h-4 w-4" />
                    Отправить отзыв
                </>
            )}
        </Button>
    )
})
