import {api} from "../axios.ts";
import type { CredentialsI, UserI} from "../../types/types.ts";

export interface AuthResponse {
    token: string
    user: UserI
}

export const authApi = {
    login: (data: CredentialsI) => api.post<AuthResponse>('/auth/login', data),
    register: (data: CredentialsI) => api.post<AuthResponse>('/auth/register', data),
    getProfile: () => api.get<UserI>('/me')
}