import {type PropsWithChildren, useEffect, useState} from "react";
import {AuthContext} from "./AuthContext.ts";
import type {UserI, UserCredentials} from "../../types/types.ts";
import {authApi} from "../../api/services/auth.ts";

export default function AuthProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<UserI | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        const token = localStorage.getItem('token')
        if (!token) {
            setIsLoading(false)
            return
        }

        try {
            const { data } = await authApi.getProfile()
            setUser(data)
        } catch (err) {
            localStorage.removeItem('token')
            setUser(null)
        } finally {
            setIsLoading(false)
        }
    }

    const login = async (user: UserCredentials) => {
        const { data } = await authApi.login(user)
        localStorage.setItem('token', data.token)
        setUser(data.user)
    }

    const logout = async () => {
        await authApi.logout()
        localStorage.removeItem('token')
        setUser(null)
    }

    const register = async (user: UserCredentials) => {
        const { data } = await authApi.register(user)
        localStorage.setItem('token', data.token)
        setUser(data.user)
    }

    return (
        <AuthContext value={{ user, isLoading, isAuthenticated: !!user, login, logout, register }}>
            { children }
        </AuthContext>
    )
}