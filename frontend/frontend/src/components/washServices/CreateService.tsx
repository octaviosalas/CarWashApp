import { Button, Input } from '@nextui-org/react'
import apiBackendUrl from '../../lib/axios'
import React, { ChangeEventHandler } from 'react'
import { useState } from 'react'
import { newServiceType } from 'types/ServicesTypes'

interface Props { 
    closeModal: () => void
}

const CreateService = ({closeModal}: Props) => { 
 
    const [service, setService] = useState<string>("")
    const [price, setPrice] = useState<number>(0)

    const handleInputService = (event: React.ChangeEvent<HTMLInputElement>) => { 
        setService(event.target.value)
    }

    const handleInputPrice = (event: React.ChangeEvent<HTMLInputElement>) => { 
        setPrice(Number(event.target.value))
    }

    const sendNewService = async () => { 
              
        const newService: newServiceType = ({ ////remplazar el id del user por el contexto
            service: service,
            price: price,
        })

        try {
            const {data} = await apiBackendUrl.post(`/services/createService/6644b816b732651683c01b26`, newService)
            console.log(data)
        } catch (error) {
            console.log(error)

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
    </div>
  )
}

export default CreateService