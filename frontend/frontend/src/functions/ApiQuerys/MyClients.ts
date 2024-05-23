
import apiBackendUrl from "../../lib/axios";
import { ClientType } from "types/ClientsTypes";

const userId : string = "6644b816b732651683c01b26"  //cambiar por id del contexto

const getMyClients = async (): Promise<ClientType[]> => {
  try {
      const response = await apiBackendUrl.get(`/users/myClients/${userId}`);
      const clients: ClientType[] = response.data.reverse();
      console.log(clients)
      return clients;
  } catch (error) {
      console.error('Error al obtener los trabajos:', error);
      return []; 
  }
};


export default getMyClients;

