import { api } from "../axios.ts";
import type { UserI } from "../../types/types.ts";

export const authApi = {
  login: (data: UserI) => api.post<void>("/login", data),
  register: (data: UserI) => api.post<void>("/register", data),
  logout: () => api.post<void>("/auth/logout"),
  getProfile: () => api.get<UserI>("/me"),
};

