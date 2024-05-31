import { UserType } from "types/UserTypes"
import { ServiceType } from "types/ServicesTypes"
import {create} from "zustand"

type userAccountStore = { 
   user: UserType | null,
   userServices: ServiceType | null,
   setUserAccountData: (data: UserType | null) => void,
   setUserServices: (data: ServiceType | null) => void
}


export const userStore = create<userAccountStore>((set) => ({ 
     user: null,
     userServices: null,
     setUserAccountData: (data: UserType | null) => set({ user: data }),
     setUserServices: (data: ServiceType | null) => set({ userServices: data }),
}))


