import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

type userAuthStore = {
  userData: User | null;
  setUser: (user: User | null) => void;
};

export const userAuthStore = create<userAuthStore>((set) => ({
  userData: null,
  setUser: (user: User | null) => set({ userData: user }),
}));
