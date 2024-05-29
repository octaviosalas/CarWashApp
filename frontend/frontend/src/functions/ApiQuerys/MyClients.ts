import apiBackendUrl from "../../lib/axios";
import { ClientType } from "types/ClientsTypes";

const getMyClients = async (userId: string | undefined): Promise<ClientType[]> => {

  if (!userId) {
    console.error('User ID is undefined');
    return [];
  }


  try {
      console.log(`Consultando clientes de ${userId}`)
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


