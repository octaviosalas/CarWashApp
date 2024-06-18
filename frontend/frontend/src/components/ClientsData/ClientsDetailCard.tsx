import { useEffect, useState } from 'react';
import {ClientType} from "../../types/ClientsTypes"
import ClientDetail from '../JobDetail/ClientDetail';
import wsp from "../../images/whatsapp.png"
import AddNewClient from './AddNewClient';
import AddNewClientForm from './AddNewClientForm';
import apiBackendUrl from '../../lib/axios';
import { ClientVehiclesType } from "types/VehiclesTypes";
import Loading from '../Spinner/Loading';
import { userStore } from '../../store/store';
import handleError from '../../utils/AxiosErrorFragment';

interface Props {
   clientsData: ClientType[];
   update: () => void,
   filter: (value: string) => void,
}

const ClientsDetailCard = ({clientsData, update, filter}: Props) => {

    const [clientSelected, setClientSelected] = useState<ClientType>()
    const [showNewClient, setShowNewClient] = useState<boolean>(false)
    const [clientVehicles, setClientVehicles] = useState<ClientVehiclesType[]>([]);
    const [inputValue, setInputValue] = useState<string>("")
    const [load, setLoad] = useState<boolean>(false)

    const user = userStore(state => state.user)

    const addNewJobClient = () => { 
      setShowNewClient(true)
    }

    const goBack = () => { 
      setShowNewClient(false)
    }

    const selectClientAndGetVehicles = async  (item: ClientType) => { 
       setLoad(true)
       setClientSelected(item)
       try {
            const {status, data} = await apiBackendUrl.get(`/vehicles/clientVehicles/${item?._id}/${user?._id}`)
            if(status === 200) { 
              setClientVehicles(data)
              setLoad(false)
          }  
          } catch (error) {
           handleError(error, setLoad)
           setClientVehicles([])
        }
    }

    const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => { 
      setInputValue(e.target.value);
      filter(e.target.value); 
    };

  return (

    <div className='flex gap-4 h-full'>
              {clientsData ? 
              <div className='flex flex-col '>
                  <div className='mt-2 w-full flex justify-start'>
                      <AddNewClient add={addNewJobClient}/>
                  </div>
                  <div className='flex items-center gap-1 2xl:gap-2 mt-2 w-3/4 ml-2'>
                      <input type="text" name="search" placeholder='Buscar' className=" mt-1s w-64 xl:w-72 2xl:w-96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                      onChange={handleChangeInputValue}
                      value={inputValue}
                      />
                  </div>
           
                 { clientsData.length === 0  ? ( 
                    <div className='flex items-center justify-center mt-6 2xl:mt-24'>
                        <p className='text-zinc-500 text-md font-medium'>No tenes clientes registrados</p>
                    </div>

                 ) : ( 
                  <div className='max-h-[420px] 2xl:max-h-[645px] 3xl:max-h-[670px] overflow-y-auto w-full ml-2 mt-2'>  
                  {clientsData.map((client: ClientType) => ( 
                      <div className='mt-4 w-full cursor-pointer hover:bg-blue-100' key={client._id} onClick={() => selectClientAndGetVehicles(client)}>
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
                 )
                 }

              </div> : <Loading/>}
           

           <div className='w-4/5  h-full'>
               {showNewClient ? 
                <AddNewClientForm update={update} goBack={goBack}/>
                :
                <ClientDetail detail={clientSelected} clientVehicles={clientVehicles} update={update} updateVehicles={selectClientAndGetVehicles}/>}
           </div>
    </div>
   
 
  )
}

export default ClientsDetailCard
