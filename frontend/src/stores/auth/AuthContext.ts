import {createContext } from "react";
import type {UserI} from "../../types/types.ts";

export interface AuthContextI {
    user: UserI | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (user: UserI) => Promise<void>
    logout: () => Promise<void>
    register: (user: UserI) => Promise<void>
}

export const AuthContext = createContext<AuthContextI | null>(null)