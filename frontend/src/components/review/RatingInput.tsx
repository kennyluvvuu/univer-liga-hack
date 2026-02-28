import { memo } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface RatingInputProps {
    value: string
    onChange: (value: string) => void
    error?: string
}

export default memo(function RatingInput({ value, onChange, error }: RatingInputProps) {
    return (
        <div className="space-y-3">
            <Label>Оценка от 1 до 10</Label>
            <div className="flex flex-wrap gap-2">
                {[...Array(10)].map((_, i) => {
                    const ratingValue = String(i + 1)
                    return (
                        <Button
                            key={ratingValue}
                            type="button"
                            variant={value === ratingValue ? "default" : "outline"}
                            size="sm"
                            className={cn(
                                "h-10 w-10 p-0",
                                value === ratingValue && "bg-primary text-primary-foreground"
                            )}
                            onClick={() => onChange(ratingValue)}
                        >
                            {i + 1}
                        </Button>
                    )
                })}
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    )
})
