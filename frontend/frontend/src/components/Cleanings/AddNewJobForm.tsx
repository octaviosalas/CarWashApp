import React, { useEffect, useState } from 'react'
import { Button, Select, SelectItem } from '@nextui-org/react'
import { ClientType } from 'types/ClientsTypes'
import apiBackendUrl from '../../lib/axios'
import { ClientVehiclesType } from 'types/VehiclesTypes'
import Loading from '../Spinner/Loading'
import { ServiceType } from 'types/ServicesTypes'
import {Checkbox} from "@nextui-org/react";
import transformPrice from '../../functions/TransformDateHour/TransformPrice'
import { getDate, getHour } from '../../functions/TransformDateHour/HourAndDate'
import { newJobType } from 'types/JobsTypes'
import {toast} from "react-toastify"
import arrowBack from "../../images/arrowBack.png"
import { userStore } from '../../store/store'
import handleError from '../../utils/AxiosErrorFragment'
import AddVehicle from '../ClientsData/AddVehicle'

interface Props { 
    clients: ClientType[],
    updateJobs: () => void,
    goBack: () => void
}


const AddNewJobForm = ({clients, updateJobs, goBack}: Props) => {

    const [clientSelected, setClientSelected] = useState<string>("")
    const [clientSelectedData, setClientSelectedData] = useState<ClientType>()
    const [clientSelectedVehicles, setClientSelectedVehicles] = useState<ClientVehiclesType[]>([])
    const [userServices, setUserServices] = useState<ServiceType[]>([])
    const [vehicleSelected, setVehicleSelected] = useState<ClientVehiclesType>();
    const [vehicleSelectedName, setVehicleSelectedName] = useState<string>("");
    const [load, setLoad] = useState<boolean>(false);
    const [servicesSelected, setServicesSelected] = useState<ServiceType[]>([]);
    const [date, setDate] = useState<Date>(getDate())
    const [hour, setHour] = useState<string>(getHour().toString())
    const [loading, setLoading] = useState<boolean>(false)
    const [showAddVehicle, setShowAddVehicle] = useState<boolean>(false)


    const user = userStore(state => state.user)

    const findClientVehicles = async (clientId: string, cc: ClientType) => { 
        setLoad(true)
        setClientSelected(clientId)
        setClientSelectedData(cc)
        console.log("SOY EL CC", cc)
        try {
            const {data} = await apiBackendUrl.get(`/clients/clientData/${clientId}/${user?._id}`) 
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
        try {
            const {data} = await apiBackendUrl.post(`/jobs/createJob/${user?._id}/${clientSelected}`, jobData);
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
            handleError(error, setLoading)
        } 
    };

    const needToAddClientVehicle = () => { 
        setShowAddVehicle(!showAddVehicle)
    }
    


    

  return (
    <div>
         <div className='ml-4 mt-2 2xl:mt-3'>
            <img src={arrowBack} className='w-6 h-6 2xl:w-6 2xl:h-6 cursor-pointer' onClick={() => goBack()}/>
          </div>
        {clients.length > 0 ?
             <div className='flex flex-col text-start justify-start mt-4 2xl:mt-8 3xl:mt-12 ml-2'>
                <p className='font-medium text-black text-md ml-2'>Cliente</p>
                    <Select radius="none" color="primary" className='w-3/4 border mt-1 text-white font-medium ml-2' label="Selecciona uno de tus clientes">
                        {clients.map((cc: ClientType) => ( 
                            <SelectItem className='bg-blue-500 text-white font-bold' key={cc._id} onClick={() => findClientVehicles(cc._id, cc)}>{cc.name}</SelectItem>
                        ))}
                    </Select>
             </div> : 
             <div className='flex flex-col text-center justify-center mt-4 2xl:mt-8 3xl:mt-12 ml-2'>
                 <p className='text-zinc-500 text-md 2xl:text-lg'>No se encuentran clientes registrados para poder guardar un nuevo lavado.</p>
                 <p className='text-zinc-500 text-md 2xl:text-lg'>Ve a la pestaña de Clientes y crea el primero.</p>
             </div>
            }
        
         {clientSelected === "" ? null : 
             <div className='flex flex-col text-start justify-start mt-4 2xl:mt-8 3xl:mt-12'>
               

                {load ? 
                  <div className='mt-0 2xl:mt-2 flex items-center justify-center'>
                       <Loading/>
                  </div>
                : 
                clientSelectedVehicles.length > 0 ? ( 
                    <div className='flex flex-col ml-2'>
                        <div>
                        <p className='font-medium text-black text-md ml-2'>Vehiculo</p>
                            <Select radius="none" color="primary" className='w-3/4 border mt-1 text-white font-medium ml-2' label="Selecciona uno de sus vehiculos">
                                {clientSelectedVehicles.map((cc: ClientVehiclesType) => ( 
                                    <SelectItem className='bg-blue-500 text-white font-bold'  key={cc._id} onClick={() => chooseVehicle(cc)} textValue={cc.description}> {cc.description} - {cc.patent}   </SelectItem>
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
                                <div className='mt-3 w-full  max-h-[100px] 2xl:max-h-[300px] overflow-y-auto'>
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
                                         <Button className='bg-blue-500 font-medium text-white w-1/4' onClick={() => createJob()}>Confirmar</Button>
                                         <Button className='bg-gray-400 font-medium text-white  w-1/4' onClick={() => cancelJob()}>Cancelar</Button>
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
                    <div className='flex flex-col justify-start w-3/4'> 
                         {showAddVehicle !== true ? 
                         <>
                          <div className='h-12 bg-red-500 text-center rounded-lg'>
                            <p className='text-white text-md font-medium mt-2'>El cliente no tiene vehiculos cargados</p>
                          </div>
                          <div className='flex mt-4'>
                             <Button className='bg-blue-500 text-white font-medium text-md w-full' onClick={() => needToAddClientVehicle()}>Agregar Vehiculo</Button>
                          </div> 
                        </> 
                         : 
                         <AddVehicle cancel={goBack} update={updateJobs} detail={clientSelectedData} showArrow={"false"}/>}
                    </div>
                )}
             </div>
          }
 
         
    </div>
  )
}

export default AddNewJobForm
