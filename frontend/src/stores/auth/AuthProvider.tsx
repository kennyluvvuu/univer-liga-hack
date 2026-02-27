import {type PropsWithChildren, useEffect, useState} from "react";
import {AuthContext} from "./AuthContext.ts";
import type {UserI} from "../../types/types.ts";
import {authApi} from "../../api/services/auth.ts";

export default function AuthProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<UserI | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        try {
            const { data } = await authApi.getProfile()
            setUser(data)
        } catch (err) {
            setUser(null)
        } finally {
            setIsLoading(false)
        }
    }

    const login = async (user: UserI) => {
        await authApi.login(user)
        await checkAuth()
    }

    const logout = async () => {
        await authApi.logout()
        setUser(null)
    }

    const register = async (user: UserI) => {
        await authApi.register(user)
        await login(user)
    }

    return (
        <AuthContext value={{ user, isLoading, isAuthenticated: !!user, login, logout, register }}>
            { children }
        </AuthContext>
    )
}