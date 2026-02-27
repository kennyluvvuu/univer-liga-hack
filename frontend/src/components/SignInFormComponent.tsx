import {type ChangeEvent, type FormEvent, useState} from "react";
import type {UserCredentials} from "../types/types.ts";
import useAuthContext from "../hooks/context/useAuthContext.ts";
import {useNavigate} from "react-router-dom";

export default function SignInFormComponent() {
    const { register, isLoading } = useAuthContext()
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [signInUserData, setSignInUserData] = useState<UserCredentials>({
        email: "",
        password: ""
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            await register(signInUserData)
            navigate("/secure", {replace: true})
        } catch (err) {
            console.error("SignIn failed:", err)
            alert("Регистрация не удалась")
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSignInUserData({ ...signInUserData, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="password..."
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSignInUserData({ ...signInUserData, password: e.target.value })}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading || isSubmitting ? "Загрузка" : "Зарегестрироваться"}
                </button>
            </form>
        </div>
    )
}