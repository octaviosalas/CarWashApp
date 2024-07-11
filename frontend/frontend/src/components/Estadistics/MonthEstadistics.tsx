import apiBackendUrl from '../../lib/axios'
import { useEffect, useState } from 'react'
import Loading from '../Spinner/Loading';
import { actualMonthName, actualMonthNow } from '../../functions/TransformDateHour/HourAndDate';
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
  const [amountExpense, setAmountExpense] = useState<number>(0)
  const [jobsOrdersByTypeOfService, setJobsOrdersByTypeOfService] = useState<ServicesArray[]>([])


  const getMonthEstadistic = async () => { 
     setLoad(true)
      try {
        const {status, data} = await apiBackendUrl.get(`/estadistics/monthEstadistics/${user?._id}`)
          if(status === 200) {          
            setTotalAmount(data.totalAmount)
            setQuantityJobs(data.quantityJobs)
            setJobsOrdersByTypeOfService(data.jobsOrderByType)
            console.log(data.amountExpenses)
            setAmountExpense(data.amountExpenses)
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
                   


                <div className='flex flex-col jfy-center items-center mt-2 border shadow-lg p-8'> 
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
                    {quantityJobs > 0 ? <p className="text-2xl font-bold text-gray-800">{quantityJobs}</p> : <p className="text-2xl font-bold text-gray-800">No hay lavados registrados</p>}                    
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
                      {totalAmount > 0 ? <p className="text-2xl font-bold text-gray-800">{transformPrice(totalAmount)}</p> :  <p className="text-2xl font-bold text-gray-800">No se registraron cobros</p>}
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
                     <p className="text-2xl font-bold text-red-600">{transformPrice(amountExpense)}</p>
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
