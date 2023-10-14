import { create } from 'zustand';
import { User } from '../types';

interface UserState {
  data: User | null
  setUser: (user: User) => void
  removeUser: () => void
}

export const useUserStore = create<UserState> ((set) => ({
    data: null,
    setUser: (user: User) => set(({ data: user })),
    removeUser: () => set({ data: null }),
}));