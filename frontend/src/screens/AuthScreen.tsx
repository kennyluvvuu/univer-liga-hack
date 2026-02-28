import { useNavigate } from "react-router-dom"
import useAuthContext from "@/hooks/context/useAuthContext"
import useToastContext from "@/hooks/context/useToastContext"
import { useAuthForm } from "@/hooks/useAuthForm"
import LoginForm from "@/components/LoginForm"
import { Building2 } from "lucide-react"

export default function AuthScreen() {
    const navigate = useNavigate()
    const { login } = useAuthContext()
    const { success, error } = useToastContext()

    const { isSubmitting, formData, handleSubmit, handleChange } = useAuthForm({
        onLogin: login,
        onSuccess: () => {
            success("Добро пожаловать!")
            navigate("/secure", { replace: true })
        },
        onError: error,
    })

    return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <div className="w-full max-w-sm space-y-6 md:max-w-md">
                <div className="text-center">
                    <div className="mb-4 flex justify-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground md:h-16 md:w-16">
                            <Building2 className="h-7 w-7 md:h-8 md:w-8" />
                        </div>
                    </div>
                    <h1 className="text-xl font-bold md:text-2xl">HR Portal</h1>
                    <p className="text-sm text-muted-foreground md:text-base">
                        Система управления персоналом
                    </p>
                </div>

                <LoginForm
                    isSubmitting={isSubmitting}
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    )
}
