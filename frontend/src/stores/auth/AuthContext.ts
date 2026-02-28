import {createContext } from "react";
import type {CredentialsI} from "../../types/types.ts";
import type {UserI} from "../../api/services/auth.ts";

export interface AuthContextI {
    user: UserI | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (user: CredentialsI) => Promise<void>
    logout: () => Promise<void>
    register: (user: CredentialsI) => Promise<void>
}

export const AuthContext = createContext<AuthContextI | null>(null)