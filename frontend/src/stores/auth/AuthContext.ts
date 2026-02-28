import {createContext } from "react";
import type {UserI} from "../../types/types.ts";

export interface AuthContextI {
    user: UserI | null
    isLoading: boolean
    isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextI | null>(null)