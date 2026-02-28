import {type AxiosError, type InternalAxiosRequestConfig} from "axios"
import {api} from "./axios.ts";

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => (config),
    (error: AxiosError) => (Promise.reject(error))
)

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
            return Promise.reject(error.response.data);
        }
    }
)