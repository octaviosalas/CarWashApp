import React from 'react'
import { Button } from '@nextui-org/react'
import apiBackendUrl from '../../lib/axios'
import { useState } from 'react'
import { newServiceType } from 'types/ServicesTypes'
import Loading from '../Spinner/Loading'
import {toast} from "react-toastify"
import { userStore } from '../../store/store'
import handleError from '../../utils/AxiosErrorFragment'

interface Props { 
    update: () => void,
    goBack: () => void
}

const AddnewService = ({update, goBack}: Props) => {

    const [service, setService] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [load, setLoad] = useState<boolean>(false)
    const user = userStore(state => state.user)

    
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
            const newService: newServiceType = ({ 
                service: service,
                price: price,
            })
            try {
                const {status, data} = await apiBackendUrl.post(`/services/createService/${user?._id}`, newService) 
                if(status === 200) { 
                    toast.success(data, {
                        style: { backgroundColor: 'white', color: 'blue' },
                        pauseOnHover: false,
                        autoClose: 2000
                    });
                    update()
                }
            } catch (error) {
                handleError(error, setLoad)
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
                    <input type="text" name="price" id="price" className=" mt-1s w-80 2xl:w-96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                        value={service}
                        onChange={handleInputService}
                    />
                </div>
                <div className='flex flex-col items-start justify-start'>
                    <p className="text-black text-md font-medium">Precio</p>
                    <input type="text" name="price" id="price" className=" mt-1s w-80 2xl:w-96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                        value={price?.toString()} 
                        onChange={handleInputPrice}
                    />
                </div>
             </div>
       <div className='flex items-center justify-center text-center mt-4 gap-2'>
          <Button className="bg-blue-500 text-white font-medium text-sm w-96 h-10" onClick={() => sendNewService()}>Crear</Button>
          <Button className="bg-gray-400 text-white font-medium text-sm w-96 h-10" onClick={() => goBack()}>Cancelar</Button>
       </div>

        {load ? <div className='w-full flex items-center justify-center mt-6 2xl:mt-12 mb-2 '> <Loading/> </div>: null}

       

    </div>
    </div>
  )
}

export default AddnewService
