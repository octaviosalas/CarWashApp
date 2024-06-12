import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button } from '@nextui-org/react'
import motorBike from "../../images/motorBike.png"
import carBlack from "../../images/carBlack.png"
import camioneta from "../../images/camioneta.png"
import Loading from '../Spinner/Loading'
import apiBackendUrl from '../../lib/axios'
import {toast} from "react-toastify"
import {ClientType } from 'types/ClientsTypes'
import { newClientVehicleType } from 'types/VehiclesTypes'
import axios from 'axios'
import arrow from "../../images/arrowBack.png"
import { userStore } from '../../store/store'
import handleError from '../../utils/AxiosErrorFragment'

interface Props { 
    cancel: () => void,
    detail: ClientType | undefined,
    update: () => void,
    updateVehicles: (item: ClientType) => Promise<void>;
    showArrow: string
}

const AddVehicle = ({cancel, detail, update, updateVehicles, showArrow}: Props) => {


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

    useEffect(() => { 
       if(patente.length === 0 || description.length === 0 || typeOfVehicle.length === 0) { 
        setShowVehicleData(false)
       } else { 
        setShowVehicleData(true)
       }
    }, [patente, description, typeOfVehicle])

    const addClientVehicle = async () => { 
        setLoad(true)
        const newVehicle : newClientVehicleType = ({ 
           description: description,
           patent: patente,
           typeOfVehicle: typeOfVehicle
        })
        try {
            const {data, status} = await apiBackendUrl.post(`/vehicles/addClientVehicle/${detail?._id}/${user?._id}`, newVehicle)
            if(status === 200) { 
                setLoad(false)
                toast.success(data, {
                    style: { backgroundColor: 'white', color: 'blue' },
                    pauseOnHover: false,
                    autoClose: 1500
                });
                update()
                if(detail !== undefined) { 
                    updateVehicles(detail)
                }
                cancel()
            } 
        } catch (error) {         
          handleError(error, setLoad)
        }
    }

    const errorInAddVehicle = () => { 
        toast.error("Debes completar todos los datos solicitados del Vehiculo", {
            style: { backgroundColor: 'white', color: 'blue' },
            pauseOnHover: false,
            autoClose: 1500
        });
    }


  return (
    <div>
       {showArrow !== "false" ? 
        <div className='w-full justify-start text-start'>
            <img src={arrow} className='w-5 h-5 2xl:w-7 2xl:h-7 cursor-pointer' title="Volver" onClick={() => cancel()}/>
        </div> : null}
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
            {!showVehicleData ? <Button className="bg-blue-500 text-white font-medium xl:w-80 2xl:w-96" onClick={() => errorInAddVehicle()}>Añadir Vehiculo</Button> : 
             <Button className="bg-blue-500 text-white font-medium xl:w-80 2xl:w-96" onClick={() => addClientVehicle()}>Confirmar</Button>
            }
            <Button className="bg-gray-300 text-white font-medium xl:w-80 2xl:w-96" onClick={() => cancel()}>Cancelar</Button>
        </div>
        {load ? <div className='flex items-center justify-center mt-4'><Loading/></div> : null}
    </div>
  )
}

export default AddVehicle
