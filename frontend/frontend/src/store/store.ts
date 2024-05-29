import { UserType } from "types/UserTypes"
import {create} from "zustand"

type userAccountStore = { 
   user: UserType | null,
   setUserAccountData: (data: UserType) => void
}

export const userStore = create<userAccountStore>((set) => ({ 
     user: null,
     setUserAccountData: (data: UserType) => set({ user: data })
}))

