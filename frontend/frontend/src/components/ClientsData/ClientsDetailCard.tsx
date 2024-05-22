import { useEffect, useState } from 'react';
import {ClientType} from "../../types/ClientsTypes"
import ClientDetail from '../JobDetail/ClientDetail';
import wsp from "../../images/whatsapp.png"
import AddNewClient from './AddNewClient';
import AddNewClientForm from './AddNewClientForm';

interface Props {
   clientsData: ClientType[];
}

const ClientsDetailCard = ({clientsData}: Props) => {

    const [clientSelected, setClientSelected] = useState<ClientType>()
    const [showNewClient, setShowNewClient] = useState<boolean>(false)

    const addNewJobClient = () => { 
      setShowNewClient(true)
  }

    useEffect(() => { 
      console.log(clientSelected)
    }, [clientSelected])

  return (

    <div className='flex gap-4 h-full '>
              <div className='flex flex-col '>
                  <div className='mt-2 w-full flex justify-start'>
                      <AddNewClient add={addNewJobClient}/>
                  </div>
                  <div className='max-h-[420px] 2xl:max-h-[645px] overflow-y-auto w-full '>  
                    {clientsData.map((client: ClientType) => ( 
                        <div className='mt-4 w-full' onClick={() => setClientSelected(client)}>
                                <div className='flex items-start text-start justify-between' key={client._id}>
                                    <p className='font-medium text-md text-blue-500'>{client.name}</p>                             
                                </div>
                                <div className='flex items-center gap-2'>
                                    <p className=' text-zinc-500 text-md'>{client.email}</p>
                                </div>   
                                <div className='flex items-center justify-between'>
                                    <p className=' text-zinc-500 text-md'>{client.telephone}</p>
                                    <img src={wsp} className='w-6 h-6 cursor-pointer' title="Enviar WhatsApp"/>
                                </div>            
                        </div>  
                     ))}
                </div>
              </div>
           

           <div className='w-4/5  h-full'>
               {showNewClient ? 
                <AddNewClientForm/>
                :
                <ClientDetail detail={clientSelected}/>}
           </div>
    </div>
   
 
  )
}

export default ClientsDetailCard
