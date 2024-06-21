import { useEffect, useState } from 'react'
import { getDate } from '../../functions/TransformDateHour/HourAndDate'
import apiBackendUrl from '../../lib/axios'
import { JobType } from 'types/JobsTypes'
import { CollectionsType } from 'types/CollectionsType'
import Loading from '../Spinner/Loading'
import transformPrice from "../../functions/TransformDateHour/TransformPrice"
import transformDate from "../../functions/TransformDateHour/TransformDate"
import wash from "../../images/wash.png"
import money from "../../images/money.png"
import { userStore } from '../../store/store'
import TableEstadistics from './TableEstadistics';
import handleError from '../../utils/AxiosErrorFragment'

interface agroupType {
    price: number,
    service: string,
    user: string,
    __v: number
    _id: string
  }
  
  type ServicesArray = {
    services: string,
    data: agroupType[]
  };

const DayEstadistics = () => {

    const user = userStore(state => state.user)
    const [date, setDate] = useState<Date>(getDate())
    const [load, setLoad] = useState<boolean>(false)
    const [jobsData, setJobsData] = useState<JobType[]>([])
    const [dayCollections, setDayCollections] = useState<CollectionsType[] | []>([])
    const [amountFactured, setAmountFactured] = useState<number>(0)
    const [jobsOrdersByTypeOfService, setJobsOrdersByTypeOfService] = useState<ServicesArray[]>([])


    const geDayData = async () => { 
        setLoad(true)
        try {
            const {data, status} = await apiBackendUrl.get(`/estadistics/todayEstadistics/${user?._id}/${date}`)
            if(status === 200) { 
                setJobsData(data.jobs)
                setDayCollections(data.collectons)
                setAmountFactured(data.amount)
                setJobsOrdersByTypeOfService(data.orderByServices)
            }
            setLoad(false)
        } catch (error) {
           handleError(error, setLoad)
        }
    }

    useEffect(() => { 
        geDayData()
    }, [])

    
  return (
    <div className='w-full '>
          {load ? <Loading/> : 
          <div className='flex flex-col justify-center items-center mt-12'>
            <div className='bg-blue-500 w-full border h-12 rounded-lg flex items-center text-center justify-center'>
                 <p className='text-white font-medium text-lg '> {transformDate(date.toString())} </p>
            </div>
            <div className='flex gap-36 items-center mt-2 2xl:mt-6'>
            <div className='flex flex-col mt-2'>
                    <p className='font-medium text-blue-500 text-lg'>Lavados</p>
                    <img src={wash} className='w-16 h-16 2xl:h-24 2xl:w-24 mt-2'/>
                    <p className='mt-2 font-medium text-blue-500'>{jobsData.length}</p>
                </div>
                <div className='flex flex-col mt-2'> 
                     <p className='font-medium text-blue-500 text-lg'>Facturacion:</p>
                     <img src={money} className='w-16 h-16 2xl:h-24 2xl:w-24 mt-2'/>
                     <p className='mt-2 font-medium text-blue-500'>{transformPrice(amountFactured)}</p>
                </div>
            </div>
            <div className='w-full flex flex-col gap-6 mt-0 2xl:mt-4'>    

              {jobsOrdersByTypeOfService.length > 0 ? 
                <div className='flex flex-col  ml-4 max-h-[210px] 2xl:max-h-[350px] overflow-y-auto'>
                  <TableEstadistics data={jobsOrdersByTypeOfService}/>
                </div>  
                : 
                <div className='flex items-center justify-center mt-12 2xl:mt-24 '>
                    <p className='text-zinc-500'>No hay servicios utilizados en el dia </p>    
                </div>
                }

        </div>
        </div>
         }
    </div>
  )
}

export default DayEstadistics
