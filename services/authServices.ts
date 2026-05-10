import { useAuthStore, type User } from "@/store/authStore";
import api from "./api";

interface AuthResponse {
  token: string;
  data: User;
}

export async function loginUser(phone: string, password: string) {
  console.log("first");
  const response = await api.post<AuthResponse>("/auth/login", {
    phone,
    password,
  });

  const { token, data: user } = response.data;
  useAuthStore.getState().login(user, token);
  return response;
}

export async function signupUser(
  name: string,
  phone: string,
  password: string,
) {
  const response = await api.post<AuthResponse>("/auth/register", {
    name,
    phone,
    password,
  });

  const { token, data: user } = response.data;
  useAuthStore.getState().signup(user, token);
  return response;
}
