import { useState, useCallback } from "react"
import {
    validateReviewForm,
    isCommentValid as checkCommentValid,
    COMMENT_MIN_LENGTH,
    COMMENT_MAX_LENGTH,
} from "../components/review/utils"

interface ReviewFormData {
    rating: string
    comment: string
    positiveAspect: string
    negativeAspect: string
}

interface ReviewFormErrors {
    rating?: string
    comment?: string
    positiveAspect?: string
    negativeAspect?: string
}

export function useReviewForm() {
    const [formData, setFormData] = useState<ReviewFormData>({
        rating: "",
        comment: "",
        positiveAspect: "",
        negativeAspect: "",
    })

    const [errors, setErrors] = useState<ReviewFormErrors>({})

    const validateForm = useCallback(() => {
        const { isValid, errors } = validateReviewForm(formData)
        setErrors(errors)
        return isValid
    }, [formData])

    const setRating = useCallback((value: string) => {
        setFormData((prev) => ({ ...prev, rating: value }))
        setErrors((prev) => ({ ...prev, rating: undefined }))
    }, [])

    const setComment = useCallback((value: string) => {
        setFormData((prev) => ({ ...prev, comment: value }))
        setErrors((prev) => ({ ...prev, comment: undefined }))
    }, [])

    const setPositiveAspect = useCallback((value: string) => {
        setFormData((prev) => ({ ...prev, positiveAspect: value }))
        setErrors((prev) => ({ ...prev, positiveAspect: undefined }))
    }, [])

    const setNegativeAspect = useCallback((value: string) => {
        setFormData((prev) => ({ ...prev, negativeAspect: value }))
        setErrors((prev) => ({ ...prev, negativeAspect: undefined }))
    }, [])

    const resetForm = useCallback(() => {
        setFormData({
            rating: "",
            comment: "",
            positiveAspect: "",
            negativeAspect: "",
        })
        setErrors({})
    }, [])

    return {
        formData,
        errors,
        validateForm,
        setRating,
        setComment,
        setPositiveAspect,
        setNegativeAspect,
        resetForm,
        characterCount: formData.comment.length,
        isCommentValid: checkCommentValid(formData.comment.length),
        COMMENT_MIN_LENGTH,
        COMMENT_MAX_LENGTH,
    }
}
