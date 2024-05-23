import Loading from '../Spinner/Loading'
import { useState } from 'react'
import { useEffect } from 'react'
import getMyClients from '../../functions/ApiQuerys/MyClients'
import { ClientType } from '../../types/ClientsTypes'
import ClientsDetailCard from './ClientsDetailCard'

const ClientsList = () => {

    const [myClients, setMyClients] = useState<ClientType[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const fetchClients = async () => {
      const clients : ClientType[] = await getMyClients();
      setMyClients(clients); 
    };

    useEffect(() => {
       
        fetchClients(); 
        setLoading(false)

    }, []);

    useEffect(() => { 
        console.log(myClients)
    }, [myClients])
   
  return (
    <div className='h-full'>
       {loading ? <Loading/> :  <ClientsDetailCard clientsData={myClients} update={fetchClients}/>}
    </div>
  )
}

export default ClientsList
