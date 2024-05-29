import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import apiBackendUrl from '../../lib/axios'
import {toast} from "react-toastify"
import Loading from '../Spinner/Loading'
import { NewUserType, errorRegisterMissedDataType } from 'types/UserTypes'

const Register = () => {


    const [load, setLoad] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmedPassword, setConfirmedPassword] = useState<string>("")

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setName(e.target.value)
    }

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setEmail(e.target.value)
    }

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setPassword(e.target.value)
    }

    const handleChangeConfirmedPassword = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setConfirmedPassword(e.target.value)
    }

    const createAccount = async () => { 
        const newUserData : NewUserType = ({ 
            name: name,
            email: email,
            password: password,
            password_confirmation: confirmedPassword
        }) 
        setLoad(true)
        try {
             const {data, status} = await apiBackendUrl.post(`/auth/register`, newUserData)
             if(status === 200) { 
                setLoad(false)
                toast.success(data, {
                    style: { backgroundColor: 'white', color: 'blue' },
                    pauseOnHover: false,
                    autoClose: 1500
                });
             }
             
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error)
                if (error.response) {              
                    console.log(error)
                    const errorMessage = error.response.data.errors.map((er: errorRegisterMissedDataType) => er.msg)[0]
                    console.log(errorMessage)
                    toast.error(errorMessage, {
                        style: { backgroundColor: 'white', color: 'red' },
                        pauseOnHover: false,
                        autoClose: 2500
                    });
                setLoad(false)
            } else if (error.message.includes("Request failed with status code 400")) {
                console.log("Error de código de estado 400");
                toast.error("El email ya existe", {
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
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-36 w-96"
            src="https://i.pinimg.com/originals/ab/61/85/ab618567515f75d1b5ffb840e48b5862.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Crear Usuario
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
 
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Nombre
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  required
                  className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm"
                  value={name}
                  onChange={handleChangeName}
                />
              </div>
              
            </div>

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

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Repetir Contraseña
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
                  value={confirmedPassword}
                  onChange={handleChangeConfirmedPassword}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => createAccount()}
              >
                Crear Cuenta
              </button>
            </div>
 
          {load ? <Loading/> : null}

        </div>
    </div>
  )
}

export default Register
