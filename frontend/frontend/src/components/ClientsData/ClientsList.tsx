import Loading from '../Spinner/Loading'
import { useState } from 'react'
import { useEffect } from 'react'
import getMyClients from '../../functions/ApiQuerys/MyClients'
import { ClientType } from '../../types/ClientsTypes'
import ClientsDetailCard from './ClientsDetailCard'
import { userStore } from '../../store/store'

const ClientsList = () => {

    const [myClients, setMyClients] = useState<ClientType[]>([])
    const [originalClients, setOriginalClients] = useState<ClientType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const user = userStore(state => state.user)

    const fetchClients = async () => {
      setLoading(true)
      const clients : ClientType[] = await getMyClients(user?._id);
      setMyClients(clients); 
      setOriginalClients(clients)
      setLoading(false)
    };

    useEffect(() => {
        fetchClients(); 
        setLoading(false)
    }, []);

    const filterClientsByInput = (value: string) => { 
      if (!value.trim()) {
        setMyClients(originalClients);
      } else {
        const lowerCaseValue = value.toLowerCase();
        const filteredJobs = myClients.filter((client) => 
          client.name.toLowerCase().includes(lowerCaseValue) 
        );
        setMyClients(filteredJobs);
      }
    };

   


   
  return (
    <div className='h-full'>
       {loading ? <div className='flex flex-col items-center justify-center mt-24 2xl:mt-40'> <Loading/> </div> :  <ClientsDetailCard clientsData={myClients} update={fetchClients} filter={filterClientsByInput}/>}
    </div>
  )
}

export default ClientsList
