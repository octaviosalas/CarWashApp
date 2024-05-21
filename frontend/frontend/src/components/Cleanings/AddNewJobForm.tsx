import React, { useEffect, useState } from 'react'
import { Select, SelectItem } from '@nextui-org/react'
import { ClientType } from 'types/ClientsTypes'
import apiBackendUrl from '../../lib/axios'
import { ClientVehiclesType } from 'types/VehiclesTypes'
import AddNewVehicle from '../Modals/AddNewVehicle'
import Loading from '../Spinner/Loading'

interface Props { 
    clients: ClientType[]
}

const AddNewJobForm = ({clients}: Props) => {

    const [clientSelected, setClientSelected] = useState<string>("")
    const [clientSelectedVehicles, setClientSelectedVehicles] = useState<ClientVehiclesType[]>([])
    const [vehicleSelected, setVehicleSelected] = useState<ClientVehiclesType>();
    const [vehicleSelectedName, setVehicleSelectedName] = useState<string>("");
    const [load, setLoad] = useState<boolean>(false);

    const findClientVehicles = async (clientId: string) => { 
        setLoad(true)
        setClientSelected(clientId)
        try {
            const {data} = await apiBackendUrl.get(`/clients/clientData/${clientId}/6644b816b732651683c01b26`) //remplazar el id del user por el contexto
            const response = data.clientVehicles
            if(response) { 
                setClientSelectedVehicles(response)
                setLoad(false)
            } else { 
                console.log("sin response")
                setLoad(false)
            }
            console.log("Vehiclos del cliente", response)
        } catch (error) {
            console.log(error)
        }
    }

    const chooseVehicle = async (vehicle: ClientVehiclesType) => { 
        setVehicleSelected(vehicle)
        setVehicleSelectedName(vehicle.description)
    }

  return (
    <div>
         <div className='flex flex-col text-start justify-start mt-12'>
             <p className='font-medium text-black text-md ml-2'>Cliente</p>
             <Select className='w-3/4 rounded-none' label="Selecciona uno de tus clientes">
               {clients.map((cc: ClientType) => ( 
                 <SelectItem key={cc._id} onClick={() => findClientVehicles(cc._id)}>{cc.name}</SelectItem>
               ))}
             </Select>
         </div>
      
         {clientSelected === "" ? null : 
             <div className='flex flex-col text-start justify-start mt-12'>
                <p className='font-medium text-black text-md ml-2'>Vehiculo</p>

                {load ? 
                  <div className='mt-2'>
                       <Loading/>
                  </div>
                : 
                clientSelectedVehicles.length > 0 ? ( 
                    <div className='flex flex-col'>
                        <div>
                            <Select className='w-3/4' label="Selecciona uno de sus vehiculos">
                                {clientSelectedVehicles.map((cc: ClientVehiclesType) => ( 
                                    <SelectItem key={cc._id} onClick={() => chooseVehicle(cc)} textValue={cc.description}> {cc.description} - {cc.patent}   </SelectItem>
                                ))}
                            </Select>
                        </div> 
                        <div>
                            servicios
                        </div>
                    </div>
                  
                ) : ( 
                    <div className='flex flex-col justify-start'>
                    <p className='text-black text-md font-medium'>El cliente no tiene vehiculos cargado.</p>
                    <div className='flex mt-2'>
                       <AddNewVehicle clientId={clientSelected}/>
                    </div>
                </div>
                )}
             </div>
          }
 
         
    </div>
  )
}

export default AddNewJobForm
