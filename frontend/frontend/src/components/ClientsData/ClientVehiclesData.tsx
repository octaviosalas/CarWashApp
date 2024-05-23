import React, {useState} from 'react'
import { ClientVehiclesType } from 'types/VehiclesTypes'
import carBlack from "../../images/carBlack.png"
import camioneta from "../../images/camioneta.png"
import motorbike from "../../images/motorBike.png"
import Loading from "../Spinner/Loading";
import apiBackendUrl from '../../lib/axios'

interface Props { 
    clientVehicles: ClientVehiclesType[]
}

const ClientVehiclesData = ({clientVehicles}: Props) => {


    const userId: string = "6644b816b732651683c01b26";//id contexto
    const [loadVehicles, setLoadVehicles] = useState<boolean>(false)
    const [viewLastWashed, setViewLastWashed] = useState<boolean>(false)

    const getLastWashed = async (vehicleId: string) => { 
        try {
            const {status, data} = await apiBackendUrl.get(`/vehicles/getLastWashed/${vehicleId}/${userId}`)
            console.log(status, data)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='w-full flex flex-col'>
         <div className='w-full bg-blue-500 flex items-center justify-start text-start h-12 rounded-md'>
              <h4 className='font-medium text-white text-lg ml-2'>Vehiculos</h4>
         </div>
        {clientVehicles ? 
         <div className='flex justify-start items-start ml-4 mt-6 gap-12 2xl:gap-24'>
            {clientVehicles.map((cc: ClientVehiclesType) => ( 
                <div className='flex gap-2 items-center justify-start text-start'>
                    <div>
                        {cc.typeOfVehicle === "Auto" ? 
                                  <img className='h-14 w-14 2xl:h-20 2xl:w-20' src={carBlack}/> :  cc.typeOfVehicle === "Moto" ? 
                             ( 
                                   <img className='h-14 w-14 2xl:h-20 2xl:w-20' src={motorbike}/>
                             ) :   <img className='h-14 w-14 2xl:h-20 2xl:w-20' src={camioneta}/> 
                        }
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-blue-500 font-medium cursor-pointer hover:text-blue-300' onClick={() => getLastWashed(cc._id)}>{cc.description}</p>
                        <p className='font-medium'>{cc.patent}</p>
                    </div>
                </div>
            ))}
         </div>: <div className='flex items-center justify-center mt-8'><Loading /></div>}
    </div>
  )
}

export default ClientVehiclesData
