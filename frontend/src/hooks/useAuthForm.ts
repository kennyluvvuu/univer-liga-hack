import { useState, useCallback } from "react"
import type { CredentialsI } from "@/types/types"

interface UseAuthFormProps {
    onLogin: (data: CredentialsI) => Promise<void>
    onSuccess: () => void
    onError: (message: string) => void
}

export function useAuthForm({ onLogin, onSuccess, onError }: UseAuthFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState<CredentialsI>({
        email: "",
        password: "",
    })

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.email || !formData.password) {
            onError("Заполните все поля")
            return
        }

        setIsSubmitting(true)
        try {
            await onLogin(formData)
            onSuccess()
        } catch (err: unknown) {
            if (err instanceof Error) {
                onError(err.message)
            }
        } finally {
            setIsSubmitting(false)
        }
    }, [formData, onLogin, onSuccess, onError])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }, [formData])

    return {
        isSubmitting,
        formData,
        handleSubmit,
        handleChange,
    }
}
