import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface User {
  name: string;
  phone: string;
  avatar_url?: string;
  about?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  signup: (user: User, token: string) => void;
  logout: () => void;
  setToken: (token: string | null) => void;
  updateUser: (updates: Partial<User>) => void;
}

const storage = createJSONStorage(() =>
  typeof window !== 'undefined' && Platform.OS === 'web'
    ? localStorage
    : AsyncStorage
);

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      login: (user: User, token: string) => set({
        isAuthenticated: true,
        user,
        token,
      }),
      signup: (user: User, token: string) => set({
        isAuthenticated: true,
        user,
        token,
      }),
      logout: () => set({ isAuthenticated: false, user: null, token: null }),
      setToken: (token: string | null) => set({ token }),
      updateUser: (updates: Partial<User>) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null,
      })),
    }),
    {
      name: 'auth-storage',
      storage,
    }
  )
);
