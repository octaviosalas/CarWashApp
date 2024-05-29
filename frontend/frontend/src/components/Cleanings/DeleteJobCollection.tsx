import { Button } from '@nextui-org/react'
import apiBackendUrl from '../../lib/axios'
import { JobType } from 'types/JobsTypes'
import {toast} from "react-toastify"
import { useState } from 'react'
import Loading from '../Spinner/Loading'
import axios from 'axios'
import { userStore } from '../../store/store'


interface Props { 
    updateJobs: () => void,
    restart: () => void,
    detail: JobType,
    goBack: () => void
}

const DeleteJobCollection = ({detail, updateJobs, goBack, restart}: Props) => {

    const [load, setLoad] = useState<boolean>(false)
    const [badMessage, setBadMessage] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")
    const user = userStore(state => state.user)

    const deleteCollection = async () => { 
          try {
            const {data, status} = await apiBackendUrl.delete(`/jobs/deletePaid/${detail._id}/${user?._id}`) 
            if(status === 200) { 
                updateJobs()
                toast.success(data, {
                    style: { backgroundColor: 'white', color: 'blue' },
                    pauseOnHover: false,
                    autoClose: 2000
                });
                updateJobs()
                setLoad(false)
                setTimeout(() => { 
                    goBack()
                    restart()
                }, 1500)
              
            } else { 
                console.log("a")
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
                }, 2000)
            } else {
                console.log('Unexpected error:', error);
                setLoad(false)
            }
          }
        }
    }

  return (
    <div>
        <div className='flex flex-col items-center justify-center'>
             <div className='mt-4'>
                 <h5 className='font-medium text-black text-md'>El lavado seleccionado tiene un cobro registrado</h5>
             </div>
             <div className='flex items-center justify-center gap-8 mt-4'>
                 <Button className='bg-blue-500 text-white text-md font-medium w-52' onClick={() => deleteCollection()}>Eliminar cobro</Button>
                 <Button className='bg-blue-500 text-white text-md font-medium w-52'>Ver cobro</Button>
             </div>
             {load ? <div className='flex mt-4 items-center justify-center'> <Loading/> </div> : null}
             {badMessage ? <div className='flex mt-4 items-center justify-center'> <p className='bg-red-600 text-white text-center mt-6'>{message}</p> </div> : null}
        </div>
    </div>
  )
}

export default DeleteJobCollection
