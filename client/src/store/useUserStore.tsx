import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const USER_STORE = 'user-store';

export const useUserStore = create<IUserState>()(
  devtools(
    persist(
      (set) => ({
        token: '',
        setToken: (token: string) => set({ token }),
        logOut: () => set({ token: '' }),
      }),
      {
        name: USER_STORE,
        getStorage: () => localStorage,
      },
    ),
  ),
);

export const useToken = () => useUserStore((state) => state.token);

export const useUserActions = () => useUserStore(({ setToken, logOut }) => ({ setToken, logOut }));
