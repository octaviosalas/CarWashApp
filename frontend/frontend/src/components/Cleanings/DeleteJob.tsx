import React, { useState } from 'react'
import { JobType } from 'types/JobsTypes'
import arrowBack from "../../images/arrowBack.png"
import { Button } from '@nextui-org/react'
import apiBackendUrl from '../../lib/axios'
import {toast} from "react-toastify"
import Loading from '../Spinner/Loading'
import axios from 'axios'


interface Props { 
    detail: JobType,
    goBack: () => void,
    updateJobs: () => void,
    restart: () => void

  }
  
//router.delete("/:jobId/:userId",

const DeleteJob = ({detail, goBack, updateJobs, restart}: Props) => {


    const userId: string = "6644b816b732651683c01b26";//id contexto
    const [load, setLoad] = useState(false)

    const deleteJob = async () => { 
        setLoad(true)
        try {
            const {data, status} = await apiBackendUrl.delete(`/jobs/${detail._id}/${userId}`)
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

  return (
    <div className='w-full'>
        <div className='w-full  flex justify-start mt-2'>
           <img className='w-8 h-8 cursor-pointer' title="Volver al detalle" src={arrowBack} onClick={() => goBack()}/>
        </div>
     
            <div className='flex flex-col items-center jsutify-center mt-24'>
               <p className='font-medium text-black text-md'>¿Estas seguro de eliminar el lavado?</p> 
                  {detail.paid === true ? 
                        <div className='flex flex-col items-center justify-center mt-4'>
                            <p className='text-sm'>El lavado se encuentra abonado</p>
                            <p  className='text-sm'>Ten en cuenta que tambien se eliminara el cobro del mismo</p>
                        </div>
                        :
                        null
                    }
                <div className='flex gap-6 items-center mt-6'>
                   <Button className='bg-blue-500 font-medium text-white w-56' onClick={() => deleteJob()}>Eliminar</Button>
                   <Button className='bg-gray-400 font-medium text-md w-52 text-white'  onClick={() => goBack()}>Cancelar</Button>
               </div>
               {load ? <div className='flex flex-col items-center justify-center mt-4 mb-2'> <Loading/>  </div> : null}
            </div>

           
           
    </div>
  )
}

export default DeleteJob
