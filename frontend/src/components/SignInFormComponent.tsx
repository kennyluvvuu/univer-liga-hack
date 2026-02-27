import {type ChangeEvent, type FormEvent, useState} from "react";
import type {UserCredentials} from "../types/types.ts";
import useAuthContext from "../hooks/context/useAuthContext.ts";
import {useNavigate} from "react-router-dom";

export default function SignInFormComponent() {
    const { register } = useAuthContext()
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [signInUserData, setSignInUserData] = useState<UserCredentials>({
        email: "",
        password: ""
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError("")

        if (!signInUserData.email || !signInUserData.password) {
            setError("Заполните все поля")
            return
        }

        if (signInUserData.password.length < 6) {
            setError("Пароль должен быть не менее 6 символов")
            return
        }

        setIsSubmitting(true)

        try {
            await register(signInUserData)
            navigate("/secure", {replace: true})
        } catch (err) {
            setError(err instanceof Error ? err.message : "Регистрация не удалась")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex flex-col gap-y-1 rounded-2xl border-2 mt-5">
            <h1>Регистрация</h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-x-1 text-center"
            >
                <input
                    type="email"
                    placeholder="email..."
                    value={signInUserData.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSignInUserData({ ...signInUserData, email: e.target.value })}
                    disabled={isSubmitting}
                />
                <input
                    type="password"
                    placeholder="password..."
                    value={signInUserData.password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSignInUserData({ ...signInUserData, password: e.target.value })}
                    disabled={isSubmitting}
                />
                {error && <span className="text-red-500">{error}</span>}
                <button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Загрузка..." : "Зарегистрироваться"}
                </button>
            </form>
        </div>
    )
}