import { create } from 'zustand';

type userAuthStore = {
  userName: string | null;
  setUserName: (name: string | null) => void;
};

export const userAuthStore = create<userAuthStore>((set) => ({
  userName: null,
  setUserName: (name) => set({ userName: name }),
}));
