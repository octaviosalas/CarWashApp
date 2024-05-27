import React from 'react'
import { Button } from '@nextui-org/react'
import apiBackendUrl from '../../lib/axios'
import { useState } from 'react'
import { newServiceType } from 'types/ServicesTypes'
import axios from 'axios'
import Loading from '../Spinner/Loading'
import {toast} from "react-toastify"


interface Props { 
    update: () => void
}

const AddnewService = ({update}: Props) => {

    const [service, setService] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [succesMessage, setSuccesMessage] = useState<boolean>(false)
    const [badMessage, setBadMessage] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")
    const [load, setLoad] = useState<boolean>(false)

    
    const handleInputService = (event: React.ChangeEvent<HTMLInputElement>) => { 
        setService(event.target.value)
    }

    const handleInputPrice = (event: React.ChangeEvent<HTMLInputElement>) => { 
        setPrice(Number(event.target.value))
    }

    const sendNewService = async () => { 
        if(service.length === 0) { 
            toast.error("Debes completar todos los campos", {
                style: { backgroundColor: 'white', color: 'blue' },
                pauseOnHover: false,
                autoClose: 2000
            });
        } else { 
            setLoad(true)
            const newService: newServiceType = ({ ////remplazar el id del user por el contexto
                service: service,
                price: price,
            })
            try {
                const {status, data} = await apiBackendUrl.post(`/services/createService/6644b816b732651683c01b26`, newService) //id contexto
                if(status === 200) { 
                    toast.success(data, {
                        style: { backgroundColor: 'white', color: 'blue' },
                        pauseOnHover: false,
                        autoClose: 2000
                    });
                    update()
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                      setLoad(false)
                      toast.error(error.response.data, {
                        style: { backgroundColor: 'white', color: 'blue' },
                        pauseOnHover: false,
                        autoClose: 2000
                    });      
                    setService("")
                    setPrice(0)               
                     
                  } else {
                    console.log('Unexpected error:', error);
                    setLoad(false)
                  }
                }
            }
        }
    }


  return (
    <div className='w-full'>
        <div className='flex justify-start items-center boder-b'>
            <h5 className='font-medium text-black text-md mt-2'>Creando Nuevo Servicio</h5>
        </div>
        <div className='flex flex-col items-start justify-start text-center mt-12 w-full'>
             <div className='flex gap-12 items-center justify-center'>
                <div className='flex flex-col items-start justify-start'>
                    <p className="text-black text-md font-medium">Nombre del Servicio</p> 
                    <input type="text" name="price" id="price" className=" mt-1s w-40 xl:w-52 2xl:w-96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                        value={service}
                        onChange={handleInputService}
                    />
                </div>
                <div className='flex flex-col items-start justify-start'>
                    <p className="text-black text-md font-medium">Precio</p>
                    <input type="text" name="price" id="price" className=" mt-1s w-40 xl:w-52 2xl:w-96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                        value={price?.toString()} 
                        onChange={handleInputPrice}
                    />
                </div>
             </div>
       <div className='flex items-center justify-center text-center mt-4 gap-2'>
          <Button className="bg-blue-500 text-white font-medium text-sm w-96 h-10" onClick={() => sendNewService()}>Crear</Button>
          <Button className="bg-gray-400 text-white font-medium text-sm w-96 h-10" >Cancelar</Button>
       </div>

        {load ? <div className='flex items-center justify-center mt-4 mb-2'> <Loading/> </div>: null}

        {badMessage ? 
            <div className='mt-6 mb-2 flex items-center justify-center'>
                <p className='text-white bg-red-500 w-full text-center font-medium text-md'>{message}</p>
            </div>
            :
            null
        }

        {succesMessage ? 
            <div className='mt-6 mb-2 flex items-center justify-center'>
                <p className='text-white bg-blue-500 w-full text-center font-medium text-md'>{message}</p>
            </div>
            :
            null
        }

    </div>
    </div>
  )
}

export default AddnewService