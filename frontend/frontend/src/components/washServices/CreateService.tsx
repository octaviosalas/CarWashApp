import { Button, Input, Spinner } from '@nextui-org/react'
import apiBackendUrl from '../../lib/axios'
import React, { ChangeEventHandler } from 'react'
import { useState } from 'react'
import { newServiceType } from 'types/ServicesTypes'
import axios from 'axios'
import Loading from '../Spinner/Loading'

interface Props { 
    closeModal: () => void,
    updateServices: () => void
}

const CreateService = ({closeModal, updateServices}: Props) => { 
 
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
           console.log("a")
        } else { 
            setLoad(true)
            const newService: newServiceType = ({ ////remplazar el id del user por el contexto
                service: service,
                price: price,
            })
            try {
                const query = await apiBackendUrl.post(`/services/createService/6644b816b732651683c01b26`, newService)
                setSuccesMessage(true)
                setMessage(query.data)
                setLoad(false)
                setTimeout(() => { 
                    closeModal()
                    updateServices()
                    setSuccesMessage(false)
                }, 2000)
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                      setLoad(false)
                      setBadMessage(true)
                      setMessage(error.response.data)
                      setTimeout(() => { 
                        setBadMessage(false)
                        setMessage("")
                        setService("")
                        setPrice(0)
                      }, 2000)
                  } else {
                    console.log('Unexpected error:', error);
                    setLoad(false)
                  }
                }
            }
        }
    }


  return (
    <div className='flex flex-col items-center justify-center text-center '>
       <Input className='w-full' variant="underlined" label="Nombre del Servicio" value={service} onChange={handleInputService}></Input>
       <Input className='w-full' type="number" variant="underlined" label="Precio del Servicio" value={price?.toString()} onChange={handleInputPrice}></Input>
       <div className='flex items-center justify-center text-center mt-4 gap-2'>
          <Button className="bg-blue-500 text-white font-medium text-sm w-40 h-10" onClick={() => sendNewService()}>Crear</Button>
          <Button className="bg-blue-500 text-white font-medium text-sm w-40 h-10" onPress={closeModal}>Cancelar</Button>
       </div>

        {load ? <div className='flex items-center justify-center mt-4 mb-2'> <Spinner/> </div>: null}

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
  )
}

export default CreateService