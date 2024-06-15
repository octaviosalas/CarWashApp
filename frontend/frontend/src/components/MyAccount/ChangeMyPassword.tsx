import React, { useState } from 'react'
import { Button } from '@nextui-org/react'
import apiBackendUrl from '../../lib/axios'
import { userStore } from '../../store/store'
import handleError from '../../utils/AxiosErrorFragment'
import Loading from '../Spinner/Loading'
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom'


interface NewPasswordType { 
  password: string,
  newPassword: string,
  confirmedPassword: string
}

const ChangeMyPassword = () => {

  const [load, setLoad] = useState<boolean>(false)
  const [password, setPassword] = useState<string>("")
  const [newPassword, setNewPassword] = useState<string>("")
  const [confirmedPassword, setConfirmedPassword] = useState<string>("")
  const {user} = userStore()
  const navigate = useNavigate()

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setPassword(e.target.value)
  }

  const handleChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setNewPassword(e.target.value)
  }

  const handleChangeConfirmedPassword = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setConfirmedPassword(e.target.value)
  }

  const cancel = () => { 
    setPassword("")
    setConfirmedPassword("")
    setNewPassword("")
  }

  const sendDataAndChangePassword = async () => { 
      setLoad(true)
      try {
        const newPasswordData : NewPasswordType = ({ 
          password: password,
          newPassword: newPassword,
          confirmedPassword: confirmedPassword
        })
        const {status, data} = await apiBackendUrl.put(`/auth/updatePassword/${user?._id}`, newPasswordData)
        if(status === 200) { 
          toast.success(data, {
            style: { backgroundColor: 'white', color: 'blue' },
            pauseOnHover: false,
            autoClose: 4000
        });
        navigate("/login")
        setLoad(false)
        } else if( status === 404) { 
          toast.success(data, {
            style: { backgroundColor: 'white', color: 'blue' },
            pauseOnHover: false,
            autoClose: 4000
        });
        setLoad(false)
        }
      } catch (error) {
        handleError(error, setLoad)
      }
  }

  return (
    <div>
      <div className='mt-12 flex w-full  flex-col items-start justify-start'>
           <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mt-2"> Contraseña actual </label>
                <div className="mt-1">
                    <input
                        type="password"
                        required
                        className="block w-96 rounded-md border py-1.5 text-gray-900 shadow-sm"
                        value={password}
                        onChange={handleChangePassword}
                    />
                </div>
       </div>
       <div className='mt-2 flex w-full  flex-col items-start justify-start'>
           <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mt-2"> Nueva Contraseña </label>
                <div className="mt-1">
                    <input
                        type="password"
                        required
                        className="block w-96 rounded-md border py-1.5 text-gray-900 shadow-sm"
                        value={newPassword}
                        onChange={handleChangeNewPassword}
                    />
                </div>
       </div>
       <div className='mt-2 flex w-full  flex-col items-start justify-start'>
           <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mt-2"> Repetir Nueva Contraseña </label>
                <div className="mt-1">
                    <input
                        type="password"
                        required
                        className="block w-96 rounded-md border py-1.5 text-gray-900 shadow-sm"
                        value={confirmedPassword}
                        onChange={handleChangeConfirmedPassword}
                    />
                </div>
       </div>
       <div className='mt-6 flex gap-6 w-full  items-start justify-start'>
          <Button className="bg-blue-500 text-white text-md w-96" onClick={() => sendDataAndChangePassword()}>Confirmar</Button>
          <Button className="bg-gray-300 text-white text-md w-96" onClick={() => cancel()}>Cancelar</Button>
       </div>

       {load ? <div className='flex items-center justify-center mt-12'> <Loading /> </div>: null}
       
       </div>
  )
}

export default ChangeMyPassword
