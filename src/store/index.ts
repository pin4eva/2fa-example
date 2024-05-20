import create from "zustand";
import { ILoginResponse, IUser, Profile } from "../api/types";

type Store = {
  authUser: IUser | null;
  requestLoading: boolean;
  setAuthUser: (user: IUser | null) => void;
  setRequestLoading: (isLoading: boolean) => void;
  profiles: Profile[];
  setProfiles: (profiles: Profile[]) => void;
  loginResponse: ILoginResponse | null;
  setLoginResponse: (input: ILoginResponse) => void;
};

const useStore = create<Store>((set) => ({
  authUser: null,
  loginResponse: null,
  requestLoading: false,
  profiles: [],
  setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
  setRequestLoading: (isLoading) =>
    set((state) => ({ ...state, requestLoading: isLoading })),
  setProfiles: (profiles: Profile[]) => set({ profiles }),
  setLoginResponse: (loginResponse) => set({ loginResponse }),
}));

export default useStore;
