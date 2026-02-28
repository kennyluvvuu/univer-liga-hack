import { type PropsWithChildren, useCallback, useEffect, useMemo, useState, memo } from "react";
import { AuthContext } from "./AuthContext.ts";
import type { CredentialsI } from "../../types/types.ts";
import type { UserI } from "../../api/services/auth.ts";
import { authApi } from "../../api/services/auth.ts";

export default memo(function AuthProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<UserI | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const checkAuth = useCallback(async () => {
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
    }, [])

    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    const login = useCallback(async (userData: CredentialsI) => {
        try {
            const response = await authApi.login(userData)

            if (!response.data?.token) {
                throw new Error('Токен не получен от сервера')
            }
            localStorage.setItem('token', response.data.token)
            setUser(response.data.user)
        } catch (err) {
            if (typeof(err) === 'string') {
                throw new Error('Неверный email или пароль')
            }

            throw new Error('Ошибка подключения к серверу')
        }
    }, [])

    const logout = useCallback(async () => {
        localStorage.removeItem('token')
        setUser(null)
    }, [])

    const register = useCallback(async (userData: CredentialsI) => {
        try {
            const response = await authApi.register(userData)
            if (!response.data?.token) {
                throw new Error('Токен не получен от сервера')
            }
            localStorage.setItem('token', response.data.token)
            setUser(response.data.user)
        } catch {
            throw new Error('Ошибка подключения к серверу')
        }
    }, [])

    const contextValue = useMemo(() => ({
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        register
    }), [user, isLoading, login, logout, register])

    return (
        <AuthContext value={contextValue}>
            {children}
        </AuthContext>
    )
})