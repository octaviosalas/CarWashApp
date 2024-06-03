import { UserType } from "types/UserTypes"
import { ServiceType } from "types/ServicesTypes"
import {create} from "zustand"

type userAccountStore = { 
   user: UserType | null,
   userServices: ServiceType | null,
   userClients: ClientTypes[] | null,
   setUserAccountData: (data: UserType | null) => void,
   setUserServices: (data: ServiceType | null) => void,
   setUserClients: (data: ClientTypes[] | null) => void
}


export const userStore = create<userAccountStore>((set) => ({ 
     user: null,
     userServices: null,
     userClients: null,
     setUserAccountData: (data: UserType | null) => set({ user: data }),
     setUserServices: (data: ServiceType | null) => set({ userServices: data }),
     setUserClients: (data: ClientTypes[] | null) => set({ userClients: data }),
}))


