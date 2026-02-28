import {createContext } from "react";
import type {UserI, CredentialsI} from "../../types/types.ts";

export interface AuthContextI {
    user: UserI | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (data: CredentialsI) => Promise<void>
    logout: () => Promise<void>
    register: (data: CredentialsI) => Promise<void>
}

export const AuthContext = createContext<AuthContextI | null>(null)