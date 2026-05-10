import { useAuthStore } from "@/store/authStore";
import axios, { type AxiosRequestHeaders } from "axios";

const api = axios.create({
  baseURL: `http://10.113.204.96:5000/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers = {
      ...(config.headers ?? {}),
      Authorization: `Bearer ${token}`,
    } as AxiosRequestHeaders;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  },
);

export default api;
