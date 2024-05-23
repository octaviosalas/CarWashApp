import React, { useEffect, useState } from 'react'
import { Button, Select, SelectItem } from '@nextui-org/react'
import { ClientType } from 'types/ClientsTypes'
import apiBackendUrl from '../../lib/axios'
import { ClientVehiclesType } from 'types/VehiclesTypes'
import AddNewVehicle from '../Modals/AddNewVehicle'
import Loading from '../Spinner/Loading'
import { ServiceType } from 'types/ServicesTypes'
import {Checkbox} from "@nextui-org/react";
import transformPrice from '../../functions/TransformDateHour/TransformPrice'
import { getDate, getHour } from '../../functions/TransformDateHour/HourAndDate'
import { newJobType } from 'types/JobsTypes'
import {toast} from "react-toastify"
import arrowBack from "../../images/arrowBack.png"


interface Props { 
    clients: ClientType[],
    updateJobs: () => void,
    goBack: () => void
}


const AddNewJobForm = ({clients, updateJobs, goBack}: Props) => {

    const [clientSelected, setClientSelected] = useState<string>("")
    const [clientSelectedVehicles, setClientSelectedVehicles] = useState<ClientVehiclesType[]>([])
    const [userServices, setUserServices] = useState<ServiceType[]>([])
    const [vehicleSelected, setVehicleSelected] = useState<ClientVehiclesType>();
    const [vehicleSelectedName, setVehicleSelectedName] = useState<string>("");
    const [load, setLoad] = useState<boolean>(false);
    const [servicesSelected, setServicesSelected] = useState<ServiceType[]>([]);
    const [date, setDate] = useState<Date>(getDate())
    const [hour, setHour] = useState<string>(getHour().toString())
    const [loading, setLoading] = useState<boolean>(false)

    const userId: string = "6644b816b732651683c01b26" //id contexto

    const findClientVehicles = async (clientId: string) => { 
        setLoad(true)
        setClientSelected(clientId)
        try {
            const {data} = await apiBackendUrl.get(`/clients/clientData/${clientId}/6644b816b732651683c01b26`) //remplazar el id del user por el contexto
            const response = data.clientVehicles
            const userServices = data.services
            console.log("userservices", userServices)
            if(response) { 
                setClientSelectedVehicles(response)
                setUserServices(userServices)
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

    const addService = (item: ServiceType) => {
        setServicesSelected(prevServices => {
          const isServiceSelected = prevServices.some(service => service._id === item._id);
          if (isServiceSelected) {
            return prevServices.filter(service => service._id !== item._id);
          } else {
            return [...prevServices, item];
          }
        });
    };

    const cancelJob = () => { 
        setServicesSelected([])
        setClientSelected("")
        setClientSelectedVehicles([])
    }

    const createJob = async () => {
        setLoading(true)
        if(servicesSelected.length === 0) { 
            
        }
        const jobData : newJobType  = ({
            date: date,
            hour: hour,
            typeOfJob: servicesSelected,
            amount: servicesSelected.reduce((acc, el) => acc + el.price, 0),
            vehicle: vehicleSelected ? vehicleSelected._id : undefined
        })
        console.log(jobData)
        try {
            const {data} = await apiBackendUrl.post(`/jobs/createJob/${userId}/${clientSelected}`, jobData);
            console.log(data)
            updateJobs()
                toast.success("El lavado se guardó correctamente", {
                    style: { backgroundColor: 'white', color: 'blue' },
                    pauseOnHover: false,
                    autoClose: 1500
                });
                setLoading(false)
                setTimeout(() => { 
                    setServicesSelected([])
                    setClientSelected("")
                    setClientSelectedVehicles([])
            }, 2000)
        } catch (error) {
            console.error('Error al crear el lavado:', error);
            return []; 
        } 
    };


    

  return (
    <div>
         <div className='ml-4 mt-0 2xl:mt-3'>
            <img src={arrowBack} className='w-5 h-5 2xl:w-6 2xl:h-6 cursor-pointer' onClick={() => goBack()}/>
          </div>
         <div className='flex flex-col text-start justify-start mt-12'>
             <p className='font-medium text-black text-md ml-2'>Cliente</p>
             <Select className='w-3/4 rounded-xl border border-blue-600 mt-1' label="Selecciona uno de tus clientes">
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
                            <Select className='w-3/4 rounded-xl border border-blue-600 mt-1' label="Selecciona uno de sus vehiculos">
                                {clientSelectedVehicles.map((cc: ClientVehiclesType) => ( 
                                    <SelectItem key={cc._id} onClick={() => chooseVehicle(cc)} textValue={cc.description}> {cc.description} - {cc.patent}   </SelectItem>
                                ))}
                            </Select>
                        </div> 
                        <div>
                            {userServices.length === 0 ? 
                              <div className='flex justify-center items-center'>
                                 <p className='text-sm font-medium text-black'>No tenes servicios para ofrecer</p>
                                 <p className='underline text-sm text-black mt-2'>Has click en tus servicios y crea el primero</p>
                              </div>
                                :
                              <div className='flex flex-col mt-6 ml-2'>
                                <div className='flex gap-12 items-center'>
                                   <p className='text-lg font-medium text-blue-600 underline'>Tus Servicios</p>
                                   {servicesSelected.length > 0 ?                                   
                                       <p className='text-black font-medium text-md'>{transformPrice(servicesSelected.reduce((acc, el) => acc + el.price, 0))}</p>                                    
                                   : null}
                                </div>
                                <div className='mt-3'>
                                    {userServices.map((us: ServiceType) => ( 
                                        <div className='flex gap-6 items-center'>
                                        <p className='font-medium text-black text-md'>{us.service}</p>
                                        <p className='font-medium text-zinc-600 text-sm'>{transformPrice(us.price)}</p>
                                        <Checkbox size="md" onChange={() => addService(us)}/>
                                        </div>
                                    ))}
                                 </div>

                                  {servicesSelected.length > 0 ? 
                                    <div className='flex items-center gap-6 mt-5'>
                                         <Button className='bg-blue-500 font-medium text-white w-32' onClick={() => createJob()}>Confirmar</Button>
                                         <Button className='bg-gray-400 font-medium text-white w-32' onClick={() => cancelJob()}>Cancelar</Button>
                                    </div>
                                     : 
                                    null
                                  }

                                  {loading ? <div className='flex items-center justify-center mt-4 mb-2'> <Loading/> </div> : null}
                                  
                              </div>
                            }
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
