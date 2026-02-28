import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import useEmployeeContext from "@/hooks/context/useEmployeeContext"
import ReviewScreenLoading from "../components/review/ReviewScreenLoading"
import ReviewScreenNotFound from "../components/review/ReviewScreenNotFound"
import ReviewForm from "../components/review/ReviewForm"

const LOADING_DELAY = 300

export default memo(function ReviewScreen() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { employees } = useEmployeeContext()

    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const employee = useMemo(
        () => employees.find((p) => p.id === id),
        [employees, id]
    )

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, LOADING_DELAY)
        return () => clearTimeout(timer)
    }, [])

    const handleSubmit = useCallback(async (data: {
        rating: number
        comment: string
        positiveAspect: string
        negativeAspect: string
    }) => {
        setIsSubmitting(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            console.log("Отправка отзыва:", { employeeId: employee?.id, ...data })
            navigate("/")
        } catch (error) {
            console.error("Ошибка при отправке отзыва:", error)
        } finally {
            setIsSubmitting(false)
        }
    }, [employee, navigate])

    if (isLoading) {
        return <ReviewScreenLoading />
    }

    if (!employee) {
        return <ReviewScreenNotFound onBack={() => navigate("/")} />
    }

    return (
        <ReviewForm
            employee={employee}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
        />
    )
})
