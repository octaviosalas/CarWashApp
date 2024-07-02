import {useEffect, useState} from 'react'
import { ClientVehiclesType } from 'types/VehiclesTypes'
import carBlack from "../../images/carBlack.png"
import camioneta from "../../images/camioneta.png"
import motorbike from "../../images/motorBike.png"
import Loading from "../Spinner/Loading";
import apiBackendUrl from '../../lib/axios'
import { JobType } from 'types/JobsTypes'
import formatDate from '../../functions/TransformDateHour/TransformDate'
import formatHourToText from '../../functions/TransformDateHour/TransformHour'
import transformPrice from '../../functions/TransformDateHour/TransformPrice'
import { userStore } from '../../store/store'
import handleError from '../../utils/AxiosErrorFragment'
import ClientHistoric from './ClientHistoric'
import { ClientType } from 'types/ClientsTypes'
import { ServiceType } from 'types/ServicesTypes'


interface Props { 
    clientVehicles: ClientVehiclesType[]
    detail: ClientType | undefined
}

const ClientVehiclesData = ({clientVehicles, detail}: Props) => {


    const [viewLastWashed, setViewLastWashed] = useState<boolean>(false)
    const [lastWashed, setLastWashed] = useState<JobType>()
    const [load, setLoad] = useState<boolean>(false)
    const user = userStore(state => state.user)

    const getLastWashed = async (vehicleId: string) => { 
       
            setLoad(true)
            setViewLastWashed(false)
            try {
                const {status, data} = await apiBackendUrl.get(`/vehicles/getLastWashed/${vehicleId}/${user?._id}`)
                console.log("Mirame aca!", data)
                if(status === 200 && data) { 
                    const sortedData = data.sort((a: JobType, b: JobType) => new Date(b.date).getTime() - new Date(a.date).getTime());
                    const lastWash = sortedData[0]
                    setLastWashed(lastWash); 
                    setLoad(false)
                    setViewLastWashed(true)
                } else if (status === 200 && data === undefined) { 
                    console.log("nada", status)
                }
            } catch (error) {
                console.log(error)
                setViewLastWashed(true)
                handleError(error, setLoad)
            }     
    }

    useEffect(() => { 
        setViewLastWashed(false)
    }, [clientVehicles])

  return (
    <div className='w-full flex flex-col mt-6 2xl:mt-0'>
         <div className='w-full bg-blue-500 flex items-center justify-start text-start h-10 2xl:h-12 rounded-md'>
              <h4 className='font-medium text-white text-md 2xl:text-lg ml-2'>Vehiculos</h4>
         </div>
        {clientVehicles ? 
         <div className='flex  justify-start items-start ml-4 mt-6 gap-12 2xl:gap-24'>
            {clientVehicles.map((cc: ClientVehiclesType) => ( 
                <> 
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
                            <p className='text-blue-500 font-medium cursor-pointer hover:text-blue-300' title="Ver ultimo Lavado" onClick={() => getLastWashed(cc._id)}>{cc.description}</p>
                            <p className='font-medium'>{cc.patent}</p>
                        </div>
                    </div>
                  
                </>
            ))}
         </div>: <div className='flex items-center justify-center mt-8'><Loading /></div>}

        { load === true && viewLastWashed === false ? 
            <div className='flex items-center justify-center mt-4'>
                <Loading/>
            </div> : load === false && viewLastWashed === true &&  lastWashed !== undefined ? ( 
                <> 
                    <div className='w-full bg-blue-500 flex items-center justify-between text-start h-12 rounded-md mt-4'>
                        <h4 className='font-medium text-white text-lg ml-2'>Ultimo Lavado - <span className='text-md'>{lastWashed.vehicle.description}</span></h4>
                        <p className='text-white font-medium text-md mr-6 cursor-pointer' onClick={() => setViewLastWashed(false)}>X</p>
                    </div>
                    <div className='flex flex-col items-start justify-start w-full mt-2 ml-2'>
                        <p className='font-medium text-black text-md'>Fecha: {formatDate(lastWashed.date)}</p> 
                        <p className='font-medium text-black text-md'>Horario: {formatHourToText(lastWashed.hour)}</p>
                       {lastWashed.typeOfJob.length === 1 ?
                        <p className='flex font-medium text-black text-md'>Servicios: {lastWashed.typeOfJob.map((lt: ServiceType) => <p>{lt.service}</p>)}</p> : 
                        <p className='flex font-medium text-black text-md'>  Servicios: {lastWashed.typeOfJob.map((lt: ServiceType) => lt.service).join(' - ')}</p> 
                        }
                        <p className='font-medium text-black text-md'>Total Lavado: {transformPrice(lastWashed.amount)}</p>
                    </div>
            </>
         ) : load === false && viewLastWashed === false && load === false ?  (
            null
         ) :  
         <div className='w-full bg-red-500 flex items-center justify-between text-center h-12 rounded-md mt-6'>
              <h4 className='font-medium text-white text-lg ml-2'>No hay lavados registrados para este vehiculo</h4>
              <p className='text-white font-medium mr-3 cursor-pointer' onClick={() => setViewLastWashed(false)}>X</p>
         </div>
        }
           {clientVehicles.length !== 0  && !viewLastWashed ? <ClientHistoric detail={detail}/> : null}
    </div>
  )
}

export default ClientVehiclesData
