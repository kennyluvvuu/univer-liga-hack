import { type PropsWithChildren, useCallback, useEffect, useMemo, useState, memo } from "react";
import { AuthContext } from "./AuthContext.ts";
import type { UserI, CredentialsI } from "../../types/types.ts";
import { authApi } from "../../api/services/auth.ts";

export default memo(function AuthProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<UserI | null>({
                id: '2',
                name: 'Jane Smith',
                role: 'director',
                department: 'HR',
                email: 'jane.smith@example.com',
                avatar: null
            })
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

    const login = useCallback(async (credentials: CredentialsI) => {
        try {
            const response = await authApi.login(credentials)

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

    const register = useCallback(async (credentials: CredentialsI) => {
        try {
            const response = await authApi.register(credentials)
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