import { UserType } from "types/UserTypes"
import { ServiceType } from "types/ServicesTypes"
import {create} from "zustand"
import { TypeOfExpensesType } from "types/ExpensesTypes"
import apiBackendUrl from "../lib/axios"

type userAccountStore = { 
   user: UserType | null,
   userServices: ServiceType | null,
   userClients: ClientTypes[] | null,
   userTypeOfExpenses: TypeOfExpensesType[] | [],
   setUserAccountData: (data: UserType | null) => void,
   setUserServices: (data: ServiceType | null) => void,
   setUserClients: (data: ClientTypes[] | null) => void,
   setUserTypeOfExpenses: (data: TypeOfExpensesType[] | []) => void,
   fetchAndSetUserTypeOfExpenses: () => void 

}


export const userStore = create<userAccountStore>((set, get) => ({ 
     user: null,
     userServices: null,
     userClients: null,
     userTypeOfExpenses: [],
     setUserAccountData: (data: UserType | null) => set({ user: data }),
     setUserServices: (data: ServiceType | null) => set({ userServices: data }),
     setUserClients: (data: ClientTypes[] | null) => set({ userClients: data }),
     setUserTypeOfExpenses: (data: TypeOfExpensesType[] | []) => set({ userTypeOfExpenses: data }),

     fetchAndSetUserTypeOfExpenses: async () => {
      const { user } = get();
      try {
         const response = await apiBackendUrl.get(`/expenres/getExpensesTypes/${user?._id}`); 
         set({ userTypeOfExpenses: response.data });
      } catch (error) {
         console.error("Error fetching user type of expenses:", error);
      }
   }


}))


