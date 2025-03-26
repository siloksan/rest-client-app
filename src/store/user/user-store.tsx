import { create } from 'zustand';

interface UserState {
  username: string | null;
}

export const useUserState = create<UserState>(() => ({
  username: null,
}));

export function setUserName(username: string | null) {
  useUserState.setState({ username });
}
