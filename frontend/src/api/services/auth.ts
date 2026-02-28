import {api} from "../axios.ts";
import type {CredentialsI} from "../../types/types.ts";

export interface UserI {
    id: string
    name: string
    role: "employee" | "director"
    postition: string
    email: string
    id_CRM: string
    avatar: string
    tasks: string[]
}

export interface AuthResponse {
    token: string
    user: UserI
}

export const authApi = {
    login: (data: CredentialsI) => api.post<AuthResponse>('/auth/login', data),
    register: (data: CredentialsI) => api.post<AuthResponse>('/auth/register', data),
    getProfile: () => api.get<UserI>('/me')
}