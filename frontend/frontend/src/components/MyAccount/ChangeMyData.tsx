import React, { useState } from 'react'
import { userStore } from '../../store/store'
import { Button } from '@nextui-org/react'
import apiBackendUrl from '../../lib/axios'
import handleError from '../../utils/AxiosErrorFragment'
import Loading from '../Spinner/Loading'
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom'

interface NewDataType { 
    email: string | undefined,
    password: string
}

const ChangeMyData = () => {

    const {user} = userStore()
    const [load, setLoad] = useState<boolean>(false)
    const [userEmail, setUserEmail] = useState<string | undefined>(user?.email)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate()

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setUserEmail(e.target.value)
    }

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setPassword(e.target.value)
    }

    const sendNewEmailAndSave = async () => { 
        console.log("sendNewEmailAndSave")
        const newData  : NewDataType = ({ 
            password: password,
            email: userEmail
        }) 
        try {
            const {data, status} = await apiBackendUrl.put(`/auth/updateUserData/${user?._id}`, newData)
            if(status === 200) { 
                setLoad(false)
                toast.success(data, {
                    style: { backgroundColor: 'white', color: 'blue' },
                    pauseOnHover: false,
                    autoClose: 4000
                });
                navigate("/login")
            } else if (status == 400) { 
                console.log("400")
                toast.error(data, {
                    style: { backgroundColor: 'white', color: 'blue' },
                    pauseOnHover: false,
                    autoClose: 4000
                });
            }
        } catch (error) {
            handleError(error, setLoad)
        }
    }

  return (
    <div className='w-full flex flex-col'>
        <div className='mt-12 flex w-full  flex-col items-start justify-start'>
           <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mt-2"> Email </label>
                <div className="mt-1">
                    <input
                        type="text"
                        required
                        className="block w-96 rounded-md border py-1.5 text-gray-900 shadow-sm"
                        value={userEmail}
                        onChange={handleChangeEmail}
                    />
                </div>
       </div>
       {showPassword ? 
          <div className='mt-2 flex w-full  flex-col items-start justify-start'>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mt-2"> Ingresar tu Contraseña </label>
                <div className="mt-1">
                    <input
                        type="password"
                        required
                        className="block w-96 rounded-md border py-1.5 text-gray-900 shadow-sm"
                        value={password}
                        onChange={handleChangePassword}
                    />
                    <p className='text-zinc-500 text-xs mt-1 flex text-start'>Debes ingresar tu contraseña para guardar los cambios</p>
                </div>
         </div> : null
       }
       <div className='mt-4 2xl:mt-6 flex w-full  flex-col items-start justify-start'>
         <Button className="bg-blue-500 text-md text-white font-medium w-96"  onClick={showPassword ? () => sendNewEmailAndSave() : () => setShowPassword(true)}>Guardar Cambios</Button>
       </div>

      {load ? <div className='flex items-center justify-center mt-12'> <Loading /> </div>: null}

    </div>
    
  )
}

export default ChangeMyData
