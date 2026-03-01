import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import type { CredentialsI } from "../types/types.ts";
import useToastContext from "../hooks/context/useToastContext.ts";
import { useMutationLogin } from "@/hooks/auth/useMutationLogin.ts"; // Твой новый хук
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import useAuthContext from "@/hooks/context/useAuthContext.ts";

export default function LoginScreen() {
    const { success, error } = useToastContext()
    const navigate = useNavigate()
    const { isAuthenticated } = useAuthContext()
    const { mutateAsync: login, isPending } = useMutationLogin()
    const [loginUserData, setLoginUserData] = useState<CredentialsI>({
        email: "",
        password: ""
    })

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
    }, [isAuthenticated, navigate])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!loginUserData.email || !loginUserData.password) {
            error("Заполните все поля")
            return
        }

        try {
            await login(loginUserData)
            success('Добро пожаловать!')
        } catch (err) {
            if (isAxiosError(err)) {
                const message = err?.response?.data?.message || "Неверный email или пароль"
                error(message)
            }
        }
    }

    return (
        <div className="flex flex-col gap-y-1 rounded-2xl border-2 mt-5 p-4">
            <h1 className="text-xl font-bold">Вход</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-3 mt-4">
                <input
                    className="border p-2 rounded"
                    type="email"
                    placeholder="email..."
                    value={loginUserData.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => 
                        setLoginUserData({ ...loginUserData, email: e.target.value })}
                    disabled={isPending}
                />
                <input
                    className="border p-2 rounded"
                    type="password"
                    placeholder="password..."
                    value={loginUserData.password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => 
                        setLoginUserData({ ...loginUserData, password: e.target.value })}
                    disabled={isPending}
                />
                <button
                    className="bg-primary text-white p-2 rounded disabled:bg-slate-400"
                    type="submit"
                    disabled={isPending}
                >
                    {isPending ? "Загрузка..." : "Войти"}
                </button>
            </form>
        </div>
    )
}