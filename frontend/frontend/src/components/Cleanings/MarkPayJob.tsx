import React, { useState } from 'react'
import { Button, Select, SelectItem } from '@nextui-org/react'
import arrowBack from "../../images/arrowBack.png"
import transformPrice from '../../functions/TransformDateHour/TransformPrice'
import { JobType } from 'types/JobsTypes'
import apiBackendUrl from '../../lib/axios'
import {toast} from "react-toastify"
import Loading from '../Spinner/Loading'
import axios from 'axios'
import { getDate } from '../../functions/TransformDateHour/HourAndDate'
import DeleteJobCollection from './DeleteJobCollection'

interface Props { 
    goBack: () => void,
    updateJobs: () => void,
    detail: JobType,
    restart: () => void
}

interface collectionData  { 
    paymentMethod: string,
    date: Date
}

const MarkPayJob = ({goBack, updateJobs, detail, restart}: Props) => {

    const [paymentMethod, setPaymentMethod] = useState<string>("")
    const userId: string = "6644b816b732651683c01b26";//id contexto
    const [load, setLoad] = useState(false)
    const [badMessage, setBadMessage] = useState(false)
    const [message, setMessage] = useState<string>("")
    const [date, setDate] = useState(getDate())

    const createCollection = async () => { 
        setLoad(true)
        const collectionDataDetail  : collectionData = ({
            paymentMethod: paymentMethod,
            date: date
        })
        try {
          const {data, status}  = await apiBackendUrl.put(`/jobs/markAsPaid/${detail._id}/${userId}`, collectionDataDetail)    //id contexto
                if(status === 200) { 
                    toast.success(data, {
                    style: { backgroundColor: 'white', color: 'blue' },
                    pauseOnHover: false,
                    autoClose: 3500
                    });
                    updateJobs()
                    setLoad(false)
                    setTimeout(() => { 
                    restart()
                    goBack()
                }, 2000)
              } 
           } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                    setLoad(false)
                    setBadMessage(true)
                    setMessage(error.response.data)
                    setTimeout(() => { 
                        setBadMessage(false)
                        setMessage("")
                        setPaymentMethod("")
                    }, 2000)
                } else {
                    console.log('Unexpected error:', error);
                    setLoad(false)
                }
        }
    }
    }

  return (
    <div className="flex flex-col items-center justify-center w-full">
         <div className='w-full  flex justify-start mt-2'>
           <img className='w-8 h-8 cursor-pointer' title="Volver al detalle" src={arrowBack} onClick={() => goBack()}/>
        </div>
          
        {detail.paid === false ? 
         <>
                <div className='mt-12'>
                    <h5 className='font-medium text-black text-md'>Cargar cobro</h5>
                </div>
                <div className='mt-4 w-full'>
                    <Select label="Seleciona el metodo de pago" className='border border-blue-600 rounded-xl w-2/4'>
                        <SelectItem  key="Efectivo" onClick={() => setPaymentMethod("Efectivo")}>Efectivo</SelectItem>
                        <SelectItem  key="Transferencia" onClick={() => setPaymentMethod("Transferencia")}>Transferencia</SelectItem>
                        <SelectItem  key="Tarjeta de Debito" onClick={() => setPaymentMethod("Tarjeta de Debito")}>Tarjeta de Debito</SelectItem>
                        <SelectItem  key="Tarjeta de Credito" onClick={() => setPaymentMethod("Tarjeta de Credito")}>Tarjeta de Credito</SelectItem>
                    </Select>
                </div>
                <div className="flex items-center justify-center mt-4 gap-2">
                    <p className="font-medium text-black text-md">Monto a cobrar:</p>
                    <p className="font-medium text-black text-md">{transformPrice(detail.amount)}</p>
                </div>
                <div>
                {paymentMethod.length > 0 ? 
                    <div className='flex items-center gap-6 mt-4'>
                    <Button className='bg-blue-500 font-medium text-md w-52 text-white' onClick={() => createCollection()}>Guardar Cobro</Button>
                    <Button className='bg-gray-400 font-medium text-md w-52 text-white'  onClick={() => goBack()}>Cancelar</Button>
                    </div>
                    :
                    null
                }
                </div>
         </>
          : 
          <div>
              <DeleteJobCollection detail={detail} updateJobs={updateJobs} goBack={goBack} restart={restart}/>
          </div>
        }
          
        

           {badMessage ? <div className='mt-4 flex items-center justify-center'> <p className='text-white bg-red-600 text-center'>{message}</p> </div> : null}
    </div>
  )
}

export default MarkPayJob
