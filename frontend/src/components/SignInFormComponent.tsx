import {type ChangeEvent, type FormEvent, useState} from "react";
import type {UserCredentials} from "../types/types.ts";
import useAuthContext from "../hooks/context/useAuthContext.ts";
import {useNavigate} from "react-router-dom";
import useToastContext from "../hooks/context/useToastContext.ts";

export default function SignInFormComponent() {
    const { register } = useAuthContext()
    const navigate = useNavigate()
    const { success, error } = useToastContext()
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [signInUserData, setSignInUserData] = useState<UserCredentials>({
        email: "",
        password: ""
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!signInUserData.email || !signInUserData.password) {
            error("Заполните все поля")
            return
        }

        if (signInUserData.password.length < 6) {
            error("Пароль должен быть не менее 6 символов")
            return
        }

        setIsSubmitting(true)

        try {
            await register(signInUserData)
            navigate("/secure", {replace: true})
            success("Регистрация прошла успешно")
        } catch (err) {
            if (err instanceof Error) {
                error(err.message)
            }
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