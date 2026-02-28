import {type ChangeEvent, type FormEvent, useState} from "react";
import type {UserCredentials} from "../types/types.ts";
import useAuthContext from "../hooks/context/useAuthContext.ts";
import {useNavigate} from "react-router-dom";
import useToastContext from "../hooks/context/useToastContext.ts";

export default function LoginFormComponent() {
    const { login } = useAuthContext()
    const { success, error } = useToastContext()
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [loginUserData, setLoginUserData] = useState<UserCredentials>({
        email: "",
        password: ""
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!loginUserData.email || !loginUserData.password) {
            error("Заполните все поля")
            return
        }

        setIsSubmitting(true)

        try {
            await login(loginUserData)
            success('Добро пожаловать!')
            navigate("/secure", {replace: true})
        } catch (err: unknown) {
            if (err instanceof Error) {
                error(err.message)
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex flex-col gap-y-1 rounded-2xl border-2 mt-5">
            <h1>Вход</h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-x-1 text-center"
            >
                <input
                    type="email"
                    placeholder="email..."
                    value={loginUserData.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setLoginUserData({ ...loginUserData, email: e.target.value })}
                    disabled={isSubmitting}
                />
                <input
                    type="password"
                    placeholder="password..."
                    value={loginUserData.password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setLoginUserData({ ...loginUserData, password: e.target.value })}
                    disabled={isSubmitting}
                />
                <button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Загрузка..." : "Войти"}
                </button>
            </form>
        </div>
    )
}        
