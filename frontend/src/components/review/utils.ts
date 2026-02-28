const COMMENT_MIN_LENGTH = 50
const COMMENT_MAX_LENGTH = 300

export { COMMENT_MIN_LENGTH, COMMENT_MAX_LENGTH }

export const POSITIVE_ASPECTS = [
    { id: "professionalism", label: "Профессионализм" },
    { id: "communication", label: "Коммуникабельность" },
    { id: "responsibility", label: "Ответственность" },
    { id: "teamwork", label: "Работа в команде" },
    { id: "initiative", label: "Инициативность" },
]

export const NEGATIVE_ASPECTS = [
    { id: "deadlines", label: "Срыв сроков" },
    { id: "communication_poor", label: "Плохая коммуникация" },
    { id: "incompetence", label: "Некомпетентность" },
    { id: "irresponsibility", label: "Безответственность" },
    { id: "passivity", label: "Пассивность" },
]

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

interface ValidateFormResult {
    isValid: boolean
    errors: ReviewFormErrors
}

export function validateReviewForm(data: ReviewFormData): ValidateFormResult {
    const errors: ReviewFormErrors = {}

    if (!data.rating) {
        errors.rating = "Выберите оценку"
    }

    if (!data.comment.trim()) {
        errors.comment = "Введите комментарий"
    } else if (data.comment.length < COMMENT_MIN_LENGTH) {
        errors.comment = `Минимум ${COMMENT_MIN_LENGTH} символов`
    } else if (data.comment.length > COMMENT_MAX_LENGTH) {
        errors.comment = `Максимум ${COMMENT_MAX_LENGTH} символов`
    }

    if (!data.positiveAspect) {
        errors.positiveAspect = "Выберите положительный аспект"
    }

    if (!data.negativeAspect) {
        errors.negativeAspect = "Выберите отрицательный аспект"
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    }
}

export function isCommentValid(length: number): boolean {
    return length >= COMMENT_MIN_LENGTH && length <= COMMENT_MAX_LENGTH
}
