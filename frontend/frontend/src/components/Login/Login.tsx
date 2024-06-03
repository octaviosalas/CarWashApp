import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import apiBackendUrl from '../../lib/axios'
import {toast} from "react-toastify"
import Loading from '../Spinner/Loading'
import { errorRegisterMissedDataType } from 'types/UserTypes'
import { useNavigate } from 'react-router-dom'
import { userStore } from '../../store/store'

interface userAccountType  { 
    email: string,
    password: string
}

const Login = () => {


    const [load, setLoad] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate()

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setEmail(e.target.value)
    }

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setPassword(e.target.value)
    }

    const {setUserAccountData, setUserClients, setUserServices} = userStore()

   

    const logAccount = async () => { 
        const userData : userAccountType = ({ 
            email: email,
            password: password,
        }) 

        setLoad(true)

        try {
             const {data, status} = await apiBackendUrl.post(`/auth/login`, userData)
             if(status === 200) { 
                setLoad(false)
                console.log(data)
                setUserAccountData(data.userData)
                setUserServices(data.userServices)
                setUserClients(data.userClients)
                console.log(data.userClients)
                navigate("/") 
             }
             
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error)
                if (error.response && Array.isArray(error.response.data.errors)) {              
                    console.log(error)
                    const errorMessage = error.response.data.errors.map((er: errorRegisterMissedDataType) => er.msg)[0]
                    console.log(errorMessage)
                    toast.error(errorMessage, {
                        style: { backgroundColor: 'white', color: 'red' },
                        pauseOnHover: false,
                        autoClose: 2500
                    });
                setLoad(false)
            }  if (error.response && !Array.isArray(error.response)) {
                toast.error(error.response.data, {
                    style: { backgroundColor: 'white', color: 'red' },
                    pauseOnHover: false,
                    autoClose: 2500
                });
                setLoad(false);
            } else { 
                console.log('Unexpected error:', error);
                setLoad(false)
            }
          }
        }
    }


  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-32 w-32 lg:w-72 lg:h-40 2xl:h-64 2xl:w-96"
            src="https://i.pinimg.com/originals/ab/61/85/ab618567515f75d1b5ffb840e48b5862.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
           Iniciar Sesion
          </h2>
        </div>

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
 

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email 
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  required
                  className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                  value={email}
                  onChange={handleChangeEmail}
                />
              </div>
              
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Contraseña
                </label>
               
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                  value={password}
                  onChange={handleChangePassword}
                />
              </div>
            </div>

        

            <div className='mt-6'>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => logAccount()}
              >
                Ingresar
              </button>
            </div>
 
          {load ? <div className='flex items-center justify-center mt-4'> <Loading/> </div> : null}

        </div>
    </div>
  )
}

export default Login
