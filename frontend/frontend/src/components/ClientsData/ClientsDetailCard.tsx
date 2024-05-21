import { useEffect, useState } from 'react';
import {ClientType} from "../../types/ClientsTypes"
import ClientDetail from '../JobDetail/ClientDetail';

interface Props {
   clientsData: ClientType[];
}

const ClientsDetailCard = ({clientsData}: Props) => {

    const [clientSelected, setClientSelected] = useState<ClientType>()

    useEffect(() => { 
      console.log(clientSelected)
    }, [clientSelected])

  return (

    <div className='flex gap-4'>
            <div className=' max-h-[645px] overflow-y-auto flex flex-col items-start justify-start w-2/5 ml-2'>
                {clientsData.map((client: ClientType) => ( 
                    <div className='mt-4 w-full' onClick={() => setClientSelected(client)}>
                            <div className='flex items-start text-start justify-start' key={client._id}>
                                <p className='font-medium text-sm text-blue-500'>{client.name.toUpperCase()}</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <p className='font-medium text-black text-sm'>{client.telephone}</p>
                            </div>            
                    </div>  
                ))}
           </div>

           <div className=' h-full w-4/5'>
               <ClientDetail detail={clientSelected}/>
           </div>
    </div>
   
 
  )
}

export default ClientsDetailCard
