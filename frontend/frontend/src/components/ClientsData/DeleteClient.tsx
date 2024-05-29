import { Button } from '@nextui-org/react'
import { useState} from 'react'
import { ClientType } from 'types/ClientsTypes'
import arrow from "../../images/arrowBack.png"
import apiBackendUrl from '../../lib/axios'
import {toast} from "react-toastify"
import Loading from '../Spinner/Loading'
import axios from 'axios'
import { userStore } from '../../store/store'

//router.delete("/deleteClient/:clientId/:userId",

interface Props { 
    detail: ClientType | undefined,
    goBack: () => void,
    update: () => void
}

const DeleteClient = ({detail, goBack, update}: Props) => {

    const [load, setLoad] = useState<boolean>(false)
    const user = userStore(state => state.user)

    const deleteClient = async () => { 
        setLoad(true)
        try {
            const {data, status} = await apiBackendUrl.delete(`/clients/deleteClient/${detail?._id}/${user?._id}`)
            if(status === 200) { 
                setLoad(false)
                toast.success(data, {
                    style: { backgroundColor: 'white', color: 'blue' },
                    pauseOnHover: false,
                    autoClose: 1500
                });
                update()
                goBack()
            }
        } catch (error) {
            console.log(error)
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    toast.error(error.response.data, {
                        style: { backgroundColor: 'white', color: 'red' },
                        pauseOnHover: false,
                        autoClose: 2500
                    });
                setLoad(false)
            } else {
                console.log('Unexpected error:', error);
                setLoad(false)
            }
          }
        }
    }

  return (
    <div>
         <div className='w-full justify-start text-start'>
            <img src={arrow} className='w-5 h-5 2xl:w-7 2xl:h-7 cursor-pointer' title="Volver" onClick={() => goBack()}/>
        </div>
       <div className='flex flex-col items-center justify-center mt-24 2xl:mt-36'>
          <h5 className='text-black font-medium txt-lg'>¿Estas seguro de eliminar el cliente?</h5>
          <p className='text-md mt-3'>Ten en cuenta que se eliminaran los lavados, vehiculos y cobros correspondientes a este cliente</p>
       </div>
       <div className='mt-4 2xl:mt-8 flex justify-center items-center gap-4 2xl:gap-8'>
         <Button className='bg-blue-500 text-white font-medium text-sm w-1/4' onClick={() => deleteClient()}>Eliminar</Button>
         <Button className='bg-zinc-400 text-white font-medium text-sm w-1/4'>Cancelar</Button>
       </div>
       {load ? <div className='flex items-center justify-center mt-4 mb-2'> <Loading /> </div> : null}
    </div>
  )
}

export default DeleteClient
