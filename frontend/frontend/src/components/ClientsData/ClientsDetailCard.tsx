import { useEffect, useState } from 'react';
import {ClientType} from "../../types/ClientsTypes"
import ClientDetail from '../JobDetail/ClientDetail';
import wsp from "../../images/whatsapp.png"
import AddNewClient from './AddNewClient';
import AddNewClientForm from './AddNewClientForm';
import axios from "axios";
import apiBackendUrl from '../../lib/axios';
import { ClientVehiclesType } from "types/VehiclesTypes";
import {toast} from "react-toastify"


interface Props {
   clientsData: ClientType[];
   update: () => void
}

const ClientsDetailCard = ({clientsData, update}: Props) => {

    const [clientSelected, setClientSelected] = useState<ClientType>()
    const [showNewClient, setShowNewClient] = useState<boolean>(false)
    const [clientVehicles, setClientVehicles] = useState<ClientVehiclesType[]>([]);
    const userId: string = "6644b816b732651683c01b26";//id contexto

    const addNewJobClient = () => { 
      setShowNewClient(true)
    }

    const goBack = () => { 
      setShowNewClient(false)
      //setClientSelected([])
    }

    const selectClientAndGetVehicles = async  (item: ClientType) => { 
       setClientSelected(item)
       try {
            const {status, data} = await apiBackendUrl.get(`/vehicles/clientVehicles/${item?._id}/${userId}`)
            if(status === 200) { 
              console.log(data)
              setClientVehicles(data)
          }  
          } catch (error) {
            if (axios.isAxiosError(error)) {
              setClientVehicles([])
              if (error.response) {
                  toast.error(error.response.data, {
                      style: { backgroundColor: 'white', color: 'red' },
                      pauseOnHover: false,
                      autoClose: 2500
                  });
              } else {
                  console.log('Unexpected error:', error);         
            }
          }
        }
    }

  return (

    <div className='flex gap-4 h-full '>
              <div className='flex flex-col '>
                  <div className='mt-2 w-full flex justify-start'>
                      <AddNewClient add={addNewJobClient}/>
                  </div>
                  <div className='max-h-[420px] 2xl:max-h-[645px] overflow-y-auto w-full '>  
                    {clientsData.map((client: ClientType) => ( 
                        <div className='mt-4 w-full' key={client._id} onClick={() => selectClientAndGetVehicles(client)}>
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
                <AddNewClientForm update={update} goBack={goBack}/>
                :
                <ClientDetail detail={clientSelected} clientVehicles={clientVehicles}/>}
           </div>
    </div>
   
 
  )
}

export default ClientsDetailCard
