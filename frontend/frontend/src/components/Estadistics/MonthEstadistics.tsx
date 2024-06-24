import apiBackendUrl from '../../lib/axios'
import { useEffect, useState } from 'react'
import Loading from '../Spinner/Loading';
import { actualMonthName, actualMonthNow } from '../../functions/TransformDateHour/HourAndDate';
import wash from "../../images/wash.png"
import money from "../../images/money.png"
import axios from 'axios';
import {toast} from "react-toastify"
import transformPrice from '../../functions/TransformDateHour/TransformPrice';
import { userStore } from '../../store/store';
import TableEstadistics from './TableEstadistics';

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



const MonthEstadistics = () => {

  const user = userStore(state => state.user)
  const [load, setLoad] = useState<boolean>(false)
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [quantityJobs, setQuantityJobs] = useState<number>(0)
  const [jobsOrdersByTypeOfService, setJobsOrdersByTypeOfService] = useState<ServicesArray[]>([])


  const getMonthEstadistic = async () => { 
     setLoad(true)
      try {
        const {status, data} = await apiBackendUrl.get(`/estadistics/monthEstadistics/${user?._id}`)
          if(status === 200) {          
            setTotalAmount(data.totalAmount)
            setQuantityJobs(data.quantityJobs)
            setJobsOrdersByTypeOfService(data.jobsOrderByType)
          }
        setLoad(false)
      } catch (error) {
        setLoad(false)
        if (axios.isAxiosError(error)) {
          if (error.response) {
          setLoad(false)
          toast.success(error.response.data, {
              style: { backgroundColor: 'white', color: 'blue' },
              pauseOnHover: false,
              autoClose: 2000
          });
      } else {
          console.log('Unexpected error:', error);
          setLoad(false)
      }
    }
      }
  }

  useEffect(() => { 
    getMonthEstadistic()
  }, [])

  return (
    <div className='w-full '>
        {load ? 
          <div className='flex items-center justify-center mt-12'>
            <Loading/> 
          </div>  : 
          <div className='flex flex-col justify-center items-center mt-12'>
             <div className='bg-blue-500 w-full border h-12 rounded-lg flex items-center text-center justify-center'>
                <p className='text-white font-medium text-lg '> {actualMonthName(actualMonthNow())} </p>
             </div>
             <div className='flex gap-36 items-center mt-2 2xl:mt-6'>
             <div className='flex flex-col justify-center items-center mt-2'>
                    <p className='font-medium text-blue-500 text-lg'>Lavados</p>
                    <img src={wash} className='w-16 h-16 2xl:h-24 2xl:w-24 mt-2'/>
                    {quantityJobs > 0 ? <p className='mt-2 font-medium text-blue-500'>{quantityJobs}</p> : <p className='mt-4 2xl:mt-6'>No hay lavados registrados</p>}
                </div>
                <div className='flex flex-col justify-center items-center mt-2'> 
                     <p className='font-medium text-blue-500 text-lg'>Facturacion:</p>
                     <img src={money} className='w-16 h-16 2xl:h-24 2xl:w-24 mt-2'/>
                     {totalAmount > 0 ? <p className='mt-2 font-medium text-blue-500'>{transformPrice(totalAmount)}</p> :  <p className='mt-4 2xl:mt-6'>No se registraron cobros</p>}
                </div>
            </div>
            <div className='w-full flex flex-col'>
               <div className='w-full flex flex-col gap-6 mt-0 2xl:mt-4'>    

              {jobsOrdersByTypeOfService.length > 0 ? 
                <div className='flex flex-col  ml-4 max-h-[210px] 2xl:max-h-[350px] overflow-y-auto'>
                  <TableEstadistics data={jobsOrdersByTypeOfService}/>
                </div>  
                : 
                <div className='flex items-center justify-center mt-12 '>
                    <p className='text-zinc-500'>No hay servicios utilizados en el mes actual</p>    
                </div>
                }

        </div>
            </div>
          </div>
        }
    </div>
  )
}

export default MonthEstadistics
