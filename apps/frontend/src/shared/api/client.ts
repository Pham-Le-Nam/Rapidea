import axios from "axios";
import { env } from "@/config/env";
import { authTokenStorage } from "@/shared/storage/authToken";

export const apiClient = axios.create({
    baseURL: env.apiUrl,
});

apiClient.interceptors.request.use((config) => {
    const token = authTokenStorage.get();

    if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
