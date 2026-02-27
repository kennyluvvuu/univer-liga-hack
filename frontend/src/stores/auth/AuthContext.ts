import {createContext } from "react";
import type {UserI, UserCredentials} from "../../types/types.ts";

export interface AuthContextI {
    user: UserI | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (user: UserCredentials) => Promise<void>
    logout: () => Promise<void>
    register: (user: UserCredentials) => Promise<void>
}

export const AuthContext = createContext<AuthContextI | null>(null)