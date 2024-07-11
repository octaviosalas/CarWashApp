import { useEffect, useState } from 'react'
import { getDate } from '../../functions/TransformDateHour/HourAndDate'
import apiBackendUrl from '../../lib/axios'
import { JobType } from 'types/JobsTypes'
import Loading from '../Spinner/Loading'
import transformPrice from "../../functions/TransformDateHour/TransformPrice"
import transformDate from "../../functions/TransformDateHour/TransformDate"
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
    const date = getDate()

    const [load, setLoad] = useState<boolean>(false)
    const [jobsData, setJobsData] = useState<JobType[]>([])
    const [amountFactured, setAmountFactured] = useState<number>(0)
    const [efectiveAmount, setEfectiveAmount] = useState<number>(0)
    const [expenseAmount, setExpenseAmount] = useState<number>(0)
    const [jobsOrdersByTypeOfService, setJobsOrdersByTypeOfService] = useState<ServicesArray[]>([])



    const geDayData = async () => { 
        setLoad(true)
        try {
            const {data, status} = await apiBackendUrl.get(`/estadistics/todayEstadistics/${user?._id}/${date}`)
            if(status === 200) { 
                setJobsData(data.jobs)
                setAmountFactured(data.amount)
                setEfectiveAmount(data.amountEfective)
                setJobsOrdersByTypeOfService(data.orderByServices)
                setExpenseAmount(data.expensesAmount)
                console.log(data.expensesAmount)
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
            <div className='flex gap-6 xl:gap-12 2xl:gap-24 3xl:gap-36 items-center mt-2 2xl:mt-6'>
               <div className='flex flex-col justify-center items-center mt-2 border shadow-lg p-8'> 
                    <svg className="w-10 h-10 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round" >
                        <path d="M3 6h3" />
                        <path d="M17 6h.01" />
                        <rect width="18" height="20" x="3" y="2" rx="2" />
                        <circle cx="12" cy="13" r="5" />
                        <path d="M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5" />
                    </svg>
                    <p className="mb-2 text-lg font-semibold text-blue-600 mt-2 2xl:mt-4">Lavados</p>
                    <p className="text-2xl font-bold text-gray-800">{jobsData.length}</p>
                </div>
                <div className='flex flex-col jfy-center items-center mt-2 border shadow-lg p-8'> 
                     <svg  className="w-10 h-10 text-blue-600" 
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round">
                          <line x1="12" x2="12" y1="2" y2="22" />
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                      <p className="mb-2 text-lg font-semibold text-blue-600 mt-2 2xl:mt-4">Facturación</p>
                      <p className="text-2xl font-bold text-gray-800">{transformPrice(amountFactured)}</p>
                </div>
                <div className='flex flex-col jfy-center items-center mt-2 border shadow-lg p-8'>  
                <svg  className="w-10 h-10 text-blue-600" 
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
                      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                      <path d="M12 17.5v-11" />
                    </svg>
                     <p className="mb-2 text-lg font-semibold text-blue-600 mt-2 2xl:mt-4">Efectivo</p>
                     <p className="text-2xl font-bold text-gray-800">{transformPrice(efectiveAmount)}</p>
                </div>
                <div className='flex flex-col jfy-center items-center mt-2 border shadow-lg p-8'>  
                <svg  className="w-10 h-10 text-red-500" 
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
                      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                      <path d="M12 17.5v-11" />
                    </svg>
                     <p className="mb-2 text-lg font-semibold text-red-500 mt-2 2xl:mt-4">Gastos</p>
                     <p className="text-2xl font-bold text-red-600">{transformPrice(expenseAmount)}</p>
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
