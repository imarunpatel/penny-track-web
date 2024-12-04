import { create } from "zustand";
import { IUser } from "../models/User";


const useUserStore = create<unknown>((set) => ({
    user: null,
    setUser: (user: IUser) => set({user})
}));

export default useUserStore;