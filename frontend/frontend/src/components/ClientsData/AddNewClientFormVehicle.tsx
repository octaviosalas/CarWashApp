import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button } from '@nextui-org/react'
import motorBike from "../../images/motorBike.png"
import carBlack from "../../images/carBlack.png"
import camioneta from "../../images/camioneta.png"
import Loading from '../Spinner/Loading'
import apiBackendUrl from '../../lib/axios'
import {toast} from "react-toastify"
import { newClientType } from 'types/ClientsTypes'
import { newClientVehicleType } from 'types/VehiclesTypes'
import { userStore } from '../../store/store'
import handleError from '../../utils/AxiosErrorFragment'


interface Props { 
    newClientData: newClientType,
    comeBack: () => void,
    update: () => void,
    clean: () => void
}

interface userAndVehicleData { 
   client: newClientType,
   vehicle: newClientVehicleType
}

const AddNewClientFormVehicle = ({newClientData, comeBack, update, clean}: Props) => {

    const [description, setDescription] = useState("")
    const [patente, setPatente] = useState("")
    const [typeOfVehicle, setTypeOfVehicle] = useState("Auto")
    const [showVehicleData, setShowVehicleData] = useState<boolean>(false)
    const [load, setLoad] = useState<boolean>(false)
    const user = userStore(state => state.user)
    
    const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setDescription(e.target.value)
    }

    const handleChangePatent = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setPatente(e.target.value)
    }

    const handleChangeTypeOfVehicle = (e: React.ChangeEvent<HTMLSelectElement>) => { 
        setTypeOfVehicle(e.target.value)
    }

    const showVehicleDataNow = () => { 
        if(description.length > 0 && patente.length > 0 && typeOfVehicle.length > 0)  {
            setShowVehicleData(true)
        } else { 
            setShowVehicleData(false)
            toast.error("Debes completar todos los campos para añadir un Vehiculo", {
                style: { backgroundColor: 'white', color: 'red' },
                pauseOnHover: false,
                autoClose: 1000
            });
        }
    }

    useEffect(() => { 
       if(patente.length === 0 || description.length === 0 || typeOfVehicle.length === 0) { 
        setShowVehicleData(false)
       } else { 
        setShowVehicleData(true)
       }
    }, [patente, description, typeOfVehicle])

    const clientVehicle : newClientVehicleType = { 
        patent: patente,
        description: description,
        typeOfVehicle: typeOfVehicle
    }

    const createClientWithVehicle = async () => { 
        setLoad(true)
         const clientData : userAndVehicleData= ({
            client: newClientData,
            vehicle : clientVehicle
         })
        
        try {
            const {data, status} = await apiBackendUrl.post(`/clients/createWithVehicle/${user?._id}`, clientData)
            console.log(data, status)
            if(status === 200) { 
                setLoad(false)
                toast.success(data, {
                    style: { backgroundColor: 'white', color: 'blue' },
                    pauseOnHover: false,
                    autoClose: 1500
                });
                update()
                comeBack()
                clean()
            } 
        } catch (error) {
           handleError(error, setLoad)
        }
    }

 

 



  return (
    <div className='ml-4 border-t mt-2 2xl:mt-6'>
        <div className='flex justify-start items-start mt-2'>
            <h5 className='font-medium text-black text-md'>Añadir Vehiculo</h5>
        </div>
        <div className='flex items-center gap-8 mt-3 2xl:mt-8'>
            <div className='flex flex-col justify-start items-start'>
                <p className='font-medium text-black text-md'>Modelo</p>
                <input type="text" name="price" id="price" className="block mt-1s w-40 xl:w-52 2xl:w-72 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none"
                value={description} 
                onChange={handleChangeDescription}
                />
            </div>
            <div className='flex flex-col justify-start items-start'>
                <p className='font-medium text-black text-md'>Patente</p>
                <input type="text" name="price" id="price" className="block mt-1s w-40 xl:w-52 2xl:w-72 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none"
                value={patente} 
                onChange={handleChangePatent}
                />
            </div>
            <div className='flex flex-col justify-start items-start'>
                <p className='font-medium text-black text-md'>Vehiculo</p>
                <select className='block mt-1s w-40 xl:w-52 2xl:w-72 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none cursor-pointer'
                 value={typeOfVehicle}
                 onChange={handleChangeTypeOfVehicle}>
                    <option className='cursor-pointer' key="Auto">Auto</option>
                    <option className='cursor-pointer' key="Moto">Moto</option>
                    <option className='cursor-pointer' key="Camioneta">Camioneta</option>
                </select>
            </div>
        </div>
        {showVehicleData ?
         <div className='flex justify-start items-start mt-6 gap-2'>
            <div>
                {typeOfVehicle === "Auto" ? 
                 <img src={carBlack} className='w-14 h-14 2xl:w-20 2xl:h-20'/> :
                  typeOfVehicle === "Moto" ? ( 
                 <img src={motorBike} className='w-14 h-14 2xl:w-20 2xl:h-20'/>  ) : 
                 <img src={camioneta} className='w-14 h-14 2xl:w-20 2xl:h-20'/>
                }
            </div>
            <div className='flex flex-col items-start text-start justify-center'>
                <p className='text-blue-600 font-medium text-sm 2xl:text-md'>{description}</p>
                <p className='text-green-700 font-medium text-sm 2xl:text-md'>{patente}</p>
                <p className='text-black font-medium text-sm 2xl:text-md'>{typeOfVehicle}</p>
            </div>
         </div> : null
        }
        <div className='flex items-center justify-start mt-4 2xl:mt-8 gap-4'>
            {!showVehicleData ? 
             <Button className="bg-blue-500 text-white font-medium xl:w-80 2xl:w-96" onClick={() => showVehicleDataNow()}>Añadir Vehiculo</Button> : 
             <Button className="bg-blue-500 text-white font-medium xl:w-80 2xl:w-96" onClick={() => createClientWithVehicle()}>Confirmar</Button>
            }
            <Button className="bg-gray-300 text-white font-medium xl:w-80 2xl:w-96" onClick={() => comeBack()}>Cancelar</Button>
        </div>
    </div>
  )
}

export default AddNewClientFormVehicle
