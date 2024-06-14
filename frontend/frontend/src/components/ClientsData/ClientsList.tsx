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
      setTimeout(() => { 
        setLoading(false)
      }, 4000)
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
       <ClientsDetailCard loading={loading} clientsData={myClients} update={fetchClients} filter={filterClientsByInput}/>
    </div>
  )
}

export default ClientsList
