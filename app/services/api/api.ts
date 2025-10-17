// app/services/api/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7070/api", // yoki senga backend URL
});

// 🔒 Har bir so‘rovga token qo‘shish uchun interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api; // ✅ endi default export
