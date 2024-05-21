import Loading from '../Spinner/Loading'
import { useState } from 'react'
import { useEffect } from 'react'
import getMyClients from '../../functions/ApiQuerys/MyClients'
import { ClientType } from '../../types/ClientsTypes'
import ClientsDetailCard from './ClientsDetailCard'

const ClientsList = () => {

    const [myClients, setMyClients] = useState<ClientType[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchClients = async () => {
            const clients : ClientType[] = await getMyClients();
            setMyClients(clients); 
        };
        fetchClients(); 
        setLoading(false)

    }, []);

    useEffect(() => { 
        console.log(myClients)
    }, [myClients])
   
  return (
    <div>
       {loading ? <Loading/> :  <ClientsDetailCard clientsData={myClients}/>}
    </div>
  )
}

export default ClientsList
