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
      setLoading(true)
      const clients : ClientType[] = await getMyClients();
      setMyClients(clients); 
      setLoading(false)
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
       {loading ? <div className='flex flex-col items-center justify-center mt-24 2xl:mt-40'> <Loading/> </div> :  <ClientsDetailCard clientsData={myClients} update={fetchClients}/>}
    </div>
  )
}

export default ClientsList
