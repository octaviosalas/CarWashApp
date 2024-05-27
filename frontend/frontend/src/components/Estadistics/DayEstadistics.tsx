import React, { useEffect, useState } from 'react'
import { getDate } from '../../functions/TransformDateHour/HourAndDate'
import apiBackendUrl from '../../lib/axios'
import { JobType } from 'types/JobsTypes'
import { CollectionsType } from 'types/CollectionsType'
import Loading from '../Spinner/Loading'
import transformPrice from "../../functions/TransformDateHour/TransformPrice"
import transformDate from "../../functions/TransformDateHour/TransformDate"
import wash from "../../images/wash.png"
import money from "../../images/money.png"
import servicess from "../../images/servicess.jpg"

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

    const userId: string = "6644b816b732651683c01b26";//id contexto
    const [date, setDate] = useState<Date>(getDate())
    const [load, setLoad] = useState<boolean>(false)
    const [jobsData, setJobsData] = useState<JobType[]>([])
    const [dayCollections, setDayCollections] = useState<CollectionsType[] | []>([])
    const [amountFactured, setAmountFactured] = useState<number>(0)
    const [jobsOrdersByTypeOfService, setJobsOrdersByTypeOfService] = useState<ServicesArray[]>([])


    const geDayData = async () => { 
        setLoad(true)
        try {
            const {data, status} = await apiBackendUrl.get(`/estadistics/todayEstadistics/${userId}/${date}`)
            console.log(data, status)
            if(status === 200) { 
                setJobsData(data.jobs)
                setDayCollections(data.collectons)
                setAmountFactured(data.amount)
                setJobsOrdersByTypeOfService(data.orderByServices)
            }
            setLoad(false)
        } catch (error) {
            console.log(error)
            setLoad(false)
        }
    }

    useEffect(() => { 
        geDayData()
    }, [])

    useEffect(() => { 
        console.log("jobsData", jobsData)
        console.log("dayCollections", dayCollections)
        console.log("amount factured", amountFactured)
        console.log("byTYPESERVICES", jobsOrdersByTypeOfService)
    }, [jobsData, dayCollections, amountFactured, jobsOrdersByTypeOfService])





  return (
    <div className='w-full '>
          {load ? <Loading/> : 
          <div className='flex flex-col justify-center items-center mt-12'>
            <div className='bg-blue-500 w-full border h-12 rounded-lg flex items-center text-center justify-center'>
                 <p className='text-white font-medium text-lg '> {transformDate(date.toString())} </p>
            </div>
            <div className='flex gap-36 items-center mt-6'>
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
            <div className='w-full flex flex-col gap-6 mt-4'>
                 <div className='bg-blue-500 w-full border h-12 rounded-lg flex items-center text-center justify-center'>
                    <p className='text-white font-medium text-lg'> Servicios </p>
                </div>
                <div className='flex items-center justify-center gap-36'>
                    {jobsOrdersByTypeOfService.map((serv) => ( 
                        <div className='flex flex-col'>
                            <img src={servicess} className='w-16 h-16 2xl:w-36 2xl:h-36'/>
                            <p className='font-medium text-blue-500 mt-2 text-lg'>{serv.services}</p>
                            <p className='text-black mt-2 text-md'>Total facturado: {transformPrice(serv.data.reduce((acc, el) => acc + el.price, 0))}</p> 
                            <p className='text-black mt-2 text-md'>Cantidad de Lavados: {serv.data.length}</p> 
                        </div>
                    ))}
                </div>
            </div>
        </div>
         }
    </div>
  )
}

export default DayEstadistics
