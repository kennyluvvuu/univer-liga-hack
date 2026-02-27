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
        } catch {
            localStorage.removeItem('token')
            setUser(null)
        } finally {
            setIsLoading(false)
        }
    }

    const login = async (user: UserCredentials) => {
        try {
            const response = await authApi.login(user)
            if (!response.data?.token) {
                throw new Error('Токен не получен от сервера')
            }
            localStorage.setItem('token', response.data.token)
            setUser(response.data.user)
        } catch (err) {
            if (err instanceof Error && err.message === 'Токен не получен от сервера') {
                throw err
            }
            throw new Error('Ошибка подключения к серверу')
        }
    }

    const logout = async () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    const register = async (user: UserCredentials) => {
        try {
            const response = await authApi.register(user)
            if (!response.data?.token) {
                throw new Error('Токен не получен от сервера')
            }
            localStorage.setItem('token', response.data.token)
            setUser(response.data.user)
        } catch (err) {
            if (err instanceof Error && err.message === 'Токен не получен от сервера') {
                throw err
            }
            throw new Error('Ошибка подключения к серверу')
        }
    }

    return (
        <AuthContext value={{ user, isLoading, isAuthenticated: !!user, login, logout, register }}>
            { children }
        </AuthContext>
    )
}