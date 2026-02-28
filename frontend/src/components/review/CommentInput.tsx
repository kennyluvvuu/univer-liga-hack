import { memo } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { COMMENT_MIN_LENGTH, COMMENT_MAX_LENGTH, isCommentValid } from "./utils"

interface CommentInputProps {
    value: string
    onChange: (value: string) => void
    error?: string
}

export default memo(function CommentInput({ value, onChange, error }: CommentInputProps) {
    const characterCount = value.length
    const isValid = isCommentValid(characterCount)

    return (
        <div className="space-y-3">
            <Label htmlFor="comment">
                Комментарий ({COMMENT_MIN_LENGTH}-{COMMENT_MAX_LENGTH} символов)
            </Label>
            <Textarea
                id="comment"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Опишите сильные и слабые стороны сотрудника..."
                className={cn(
                    "min-h-[120px] resize-none",
                    error && "border-destructive focus-visible:ring-destructive"
                )}
            />
            <div className="flex items-center justify-between">
                <span
                    className={cn(
                        "text-sm",
                        isValid ? "text-muted-foreground" : "text-destructive"
                    )}
                >
                    {characterCount} / {COMMENT_MAX_LENGTH}
                </span>
                {error && (
                    <span className="text-sm text-destructive">{error}</span>
                )}
            </div>
        </div>
    )
})
