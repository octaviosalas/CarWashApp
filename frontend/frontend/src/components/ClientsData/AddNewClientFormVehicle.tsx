import React from 'react'
import { useState } from 'react'
import { Select, SelectItem, Button } from '@nextui-org/react'
import motorBike from "../../images/motorBike.png"
import carBlack from "../../images/carBlack.png"
import camioneta from "../../images/camioneta.png"
import Loading from '../Spinner/Loading'
import apiBackendUrl from '../../lib/axios'

const AddNewClientFormVehicle = () => {

    const [description, setDescription] = useState("")
    const [patente, setPatente] = useState("")
    const [typeOfVehicle, setTypeOfVehicle] = useState("")
    const [showVehicleData, setShowVehicleData] = useState<boolean>(false)
    const [load, setLoad] = useState<boolean>(false)

    const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setDescription(e.target.value)
    }

    const handleChangePatent = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setPatente(e.target.value)
    }

    const handleChangeTypeOfVehicle = (e: React.ChangeEvent<HTMLSelectElement>) => { 
        setTypeOfVehicle(e.target.value)
    }

 



  return (
    <div className='ml-4 border-t mt-6'>
        <div className='flex justify-start items-start mt-2'>
            <h5 className='font-medium text-black text-md'>Añadir Vehiculo</h5>
        </div>
        <div className='flex items-center gap-8 mt-8'>
            <div className='flex flex-col justify-start items-start'>
                <p className='font-medium text-black text-md'>Modelo</p>
                <input type="text" name="price" id="price" className="block mt-1s w-72 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none"
                value={description} 
                onChange={handleChangeDescription}
                />
            </div>
            <div className='flex flex-col justify-start items-start'>
                <p className='font-medium text-black text-md'>Patente</p>
                <input type="text" name="price" id="price" className="block mt-1s w-72 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none"
                value={patente} 
                onChange={handleChangePatent}
                />
            </div>
            <div className='flex flex-col justify-start items-start'>
                <p className='font-medium text-black text-md'>Vehiculo</p>
                <select className='block mt-1s w-72 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none cursor-pointer'
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
                 <img src={carBlack} className='w-20 h-20'/> :
                  typeOfVehicle === "Moto" ? ( 
                 <img src={motorBike} className='w-20 h-20'/>  ) : 
                 <img src={camioneta} className='w-20 h-20'/>
                }
            </div>
            <div className='flex flex-col items-start text-start justify-center'>
                <p className='text-blue-600 font-medium text-md'>{description}</p>
                <p className='text-green-700 font-medium text-md'>{patente}</p>
                <p className='text-black font-medium text-md'>{typeOfVehicle}</p>
            </div>
         </div> : null
        }
        <div className='flex items-center justify-center mt-4 gap-4'>
            <Button className="bg-blue-500 text-white font-medium w-full" onClick={() => setShowVehicleData(true)}>Añadir Vehiculo</Button>
            <Button className="bg-gray-300 text-white font-medium w-full" onClick={() => setShowVehicleData(true)}>Cancelar</Button>
        </div>
    </div>
  )
}

export default AddNewClientFormVehicle
