import { Button } from '@nextui-org/react'
import React, { useState } from 'react'
import { JobType } from 'types/JobsTypes'
import apiBackendUrl from '../../lib/axios'
import axios from 'axios'
import {toast} from "react-toastify"
import { getDate } from '../../functions/TransformDateHour/HourAndDate'
import Loading from '../Spinner/Loading'

interface Props { 
    detail: JobType,
    goBack: () => void,
    updateJobs: () => void,
    restart: () => void
}

type newStatus = { 
    status: string
}

type emailType = { 
    addressee: string,
    date: Date,
    message: string,
    title: string
}

const MarkJobAsFinished = ({detail, goBack, updateJobs, restart}: Props) => {

    const userId: string = "6644b816b732651683c01b26";//id contexto
    const [load, setLoad] = useState<boolean>(false)
    const [badMessage, setBadMessage] = useState(false)
    const [message, setMessage] = useState<string>("")
    const [date, setDate] = useState(getDate())


    const jobFinished = async () => { 
        setLoad(true)
        const newStatus : newStatus = ({ 
            status: "completed"
        }) 
      try {
          const {data, status} = await apiBackendUrl.put(`/jobs/${detail._id}/${userId}`, newStatus) //id contexto
          if(status === 200) { 
                    toast.success(data, {
                            style: { backgroundColor: 'white', color: 'blue' },
                            pauseOnHover: false,
                            autoClose: 2000
                        });
                    updateJobs()
                    setLoad(false)
                    setTimeout(() => { 
                        restart()
                    goBack()
            }, 2000)
          }
      } catch (error) {
        setLoad(false)
        if (axios.isAxiosError(error)) {
            console.log("axios error")
            console.log(error.response)
            if (error.response) {
            setLoad(false)
            setBadMessage(true)
            setMessage(error.response.data)
            setTimeout(() => { 
                setBadMessage(false)
                setMessage("")
            }, 2000)
        } else {
            console.log('Unexpected error:', error);
            setLoad(false)
        }
          }
        }
    }

    const jobFinishedAndNotifyClientByEmail = async () => { //POST: addresse title message date
        setLoad(true)
        const emailData : emailType = ({ 
            addressee: "salasoctavio129@gmail.com",
            title: "LAVADERO DE AUTOS DIGITAL",
            message: "Tu auto se encuentra listo. Ya podes pasar a buscarLo. Recorda que estamos hasta las 18hs. Saludos.",
            date: date
        })
        try {
            const {data, status} = await apiBackendUrl.post(`/jobs/sendEmail/${detail._id}/${userId}`, emailData) //id contexto
            if(status === 200) { 
                toast.success(data, {
                        style: { backgroundColor: 'white', color: 'blue' },
                        pauseOnHover: false,
                        autoClose: 2000
                    });
                updateJobs()
                setLoad(false)
                setTimeout(() => { 
                    restart()
                goBack()
        }, 2000)
      }
        } catch (error) {
            setLoad(false)
            if (axios.isAxiosError(error)) {
                if (error.response) {
                setLoad(false)
                setBadMessage(true)
                setMessage(error.response.data)
                setTimeout(() => { 
                    setBadMessage(false)
                    setMessage("")
                }, 2000)
            } else {
                console.log('Unexpected error:', error);
                setLoad(false)
            }
          }
        }
    }

  return (
    <div className='mt-24 flex flex-col items-center justify-center '>
       {detail.status === "pending" && detail.notified === false? 
            <div> 
                <div className='flex flex-col items-center justify-center'>
                    <p className='font-medium text-black text-md'>¿Deseas finalizar el lavado y avisar al cliente por correo electronico?</p>
                </div>
                <div className='flex items-center gap-4 mt-6'>
                    <Button className='bg-blue-600 text-white font-medium text-sm w-52' onClick={() => jobFinishedAndNotifyClientByEmail()} >Finalizar y Notificar</Button>
                    <Button className='bg-blue-500 text-white font-medium text-sm w-52' onClick={() => jobFinished()}>Finalizar</Button>
                    <Button className='bg-gray-400 text-white font-medium text-sm w-52' onClick={() => goBack()}>Cancelar</Button>
                </div>
            </div> 
        : detail.status === "completed" && detail.notified === false ? ( 
            <div>
                <div> 
                    <div className='flex flex-col items-center justify-center'>
                        <p className='font-medium text-black text-md'>El lavado ya se encuentra finalizado</p>
                        <p className='text-black text-md mt-2'>¿Deseas avisar al cliente por correo electronico?</p>
                    </div>
                    <div className='flex items-center gap-4 mt-6'>
                        <Button className='bg-blue-600 text-white font-medium text-sm w-52'  onClick={() => jobFinishedAndNotifyClientByEmail()}> Notificar</Button>
                        <Button className='bg-gray-400 text-white font-medium text-sm w-52' onClick={() => goBack()}>Cancelar</Button>
                    </div>
                </div> 
            </div>
        ) : ( 
            <div>
            <div className="flex flex-col items-center justify-center"> 
                <div className='flex flex-col items-center justify-center'>
                    <p className='font-medium text-black text-md'>El lavado ya se encuentra finalizado y el cliente fue notificado por correo electronico</p>
                </div>
                <div className='flex items-center gap-4 mt-6'>
                    <Button className='bg-gray-400 text-white font-medium text-sm w-52' onClick={() => goBack()}>Volver</Button>
                </div>
            </div> 
        </div>
        )
         }
        {badMessage ? <div className='mt-4 flex items-center justify-center'> <p className='text-white bg-red-600 text-center'>{message}</p> </div> : null}
        {load ? <div className='mt-4 flex items-center justify-center'> <Loading/> </div> : null}

    </div>
  )
}

export default MarkJobAsFinished
