// app/services/api/api.ts
import axios, { InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "http://localhost:7070/api",
});

// 🔒 Har bir so‘rovga token qo‘shish uchun interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      // Axios 1.x dan boshlab headers alohida turda saqlanadi
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
