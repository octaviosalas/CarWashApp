import { Button } from '@nextui-org/react'
import apiBackendUrl from '../../lib/axios'
import { useState } from 'react'
import { userStore } from '../../store/store'
import handleError from '../../utils/AxiosErrorFragment'
import Loading from '../Spinner/Loading'
import { useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"

const DeleteAccount = () => {

  const {user} = userStore()
  const [load, setLoad] = useState<boolean>(false)
  const navigate = useNavigate()

  const disableMyAccount = async () => { 
    setLoad(true)
    try {
      const {data, status} = await apiBackendUrl.put(`/auth/disableAccount/${user?._id}`)
      if(status === 200) { 
        toast.success(data, {
          style: { backgroundColor: 'white', color: 'blue' },
          pauseOnHover: false,
          autoClose: 4000
      });
      navigate("/login")
      setLoad(false)
      }
    } catch (error) {
      handleError(error, setLoad)
    }
  }


  return (
    <div className='flex flex-col items-center justify-center'>
        <div className='flex items-center mt-24'>
          <p className='text-zinc-500'>Ten en cuenta que si das de baja tu cuenta, quedara inhabilitada para utilizar hasta que vuelvas a activarla</p>
        </div>
        <div className='flex gap-6 items-center justify-center mt-4 '>
            <Button className="bg-blue-500 text-white font-medium text-md w-96" onClick={() => disableMyAccount()}>Dar de baja mi cuenta</Button>
            <Button className="bg-gray-300 text-white font-medium text-md w-96">Cancelar</Button>
        </div>
        {load ? <div className='flex items-center justify-center mt-6'> <Loading/> </div> : null}
    </div>
    
  )
}

export default DeleteAccount
