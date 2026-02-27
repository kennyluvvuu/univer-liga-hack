import {useState} from "react";
import LoginFormComponent from "../components/LoginFormComponent.tsx";
import SignInFormComponent from "../components/SignInFormComponent.tsx";

type FormType = "login" | "signIn"

export default function AuthScreen() {
    const [form, setForm] = useState<FormType>("login")

    return (
        <>
            <div className="flex justify-center gap-x-1 rounded-2xl border-2 text-center">
                <button
                    onClick={() => setForm("login")}
                >
                    Вход
                </button>
                <button
                    onClick={() => setForm("signIn")}
                >
                    Регистрация
                </button>
            </div>
            {form === "login" ? <LoginFormComponent /> : <SignInFormComponent />}
        </>
    )
}