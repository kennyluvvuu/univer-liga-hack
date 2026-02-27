import {api} from "../axios.ts";
import type {UserI, UserCredentials} from "../../types/types.ts";

export interface AuthResponse {
    token: string
    user: UserI
}

export const authApi = {
    login: (data: UserCredentials) => api.post<AuthResponse>('/auth/login', data),
    register: (data: UserCredentials) => api.post<AuthResponse>('/auth/register', data),
    getProfile: () => api.get<UserI>('/me')
}