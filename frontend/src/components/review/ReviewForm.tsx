import { memo, useCallback } from "react"
import type { EmployeeI } from "@/types/types"
import { useReviewForm } from "@/hooks/useReviewForm"
import Avatar from "@/components/Avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import RatingInput from "./RatingInput"
import CommentInput from "./CommentInput"
import AspectRadioGroup from "./AspectRadioGroup"
import SubmitButton from "./SubmitButton"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { POSITIVE_ASPECTS, NEGATIVE_ASPECTS } from "./utils"

interface ReviewFormProps {
    employee: EmployeeI
    onSubmit: (data: {
        rating: number
        comment: string
        positiveAspect: string
        negativeAspect: string
    }) => Promise<void>
    isSubmitting: boolean
}

export default memo(function ReviewForm({
    employee,
    onSubmit,
    isSubmitting,
}: ReviewFormProps) {
    const {
        formData,
        errors,
        validateForm,
        setRating,
        setComment,
        setPositiveAspect,
        setNegativeAspect,
    } = useReviewForm()

    const handleSubmit = useCallback(async () => {
        if (!validateForm()) return

        await onSubmit({
            rating: Number(formData.rating),
            comment: formData.comment,
            positiveAspect: formData.positiveAspect,
            negativeAspect: formData.negativeAspect,
        })
    }, [validateForm, onSubmit, formData])

    return (
        <div className="w-full">
            <div className="mx-auto w-full max-w-2xl space-y-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3 md:gap-4">
                            <Avatar src={employee.avatar} alt={employee.name} size="md" />
                            <div>
                                <CardTitle className="text-lg md:text-xl">{employee.name}</CardTitle>
                                <CardDescription className="text-sm md:text-base">{employee.postition}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg md:text-xl">Оценка сотрудника</CardTitle>
                        <CardDescription className="text-sm md:text-base">
                            Заполните форму для оценки работы сотрудника
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <RatingInput
                            value={formData.rating}
                            onChange={setRating}
                            error={errors.rating}
                        />

                        <CommentInput
                            value={formData.comment}
                            onChange={setComment}
                            error={errors.comment}
                        />

                        <AspectRadioGroup
                            label="Положительные качества"
                            icon={ThumbsUp}
                            options={POSITIVE_ASPECTS}
                            value={formData.positiveAspect}
                            onChange={setPositiveAspect}
                            error={errors.positiveAspect}
                        />

                        <AspectRadioGroup
                            label="Отрицательные качества"
                            icon={ThumbsDown}
                            options={NEGATIVE_ASPECTS}
                            value={formData.negativeAspect}
                            onChange={setNegativeAspect}
                            error={errors.negativeAspect}
                        />

                        <SubmitButton
                            isSubmitting={isSubmitting}
                            onClick={handleSubmit}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
})
