import { Button } from '@nextui-org/react'
import React, {useState} from 'react'
import { ServiceType } from 'types/ServicesTypes'
import arrow from "../../images/arrowBack.png"

interface Props { 
    detail: ServiceType | undefined,
    goBack: () => void,
    update: () => void
}

const EditService = ({detail, goBack, update}: Props) => {

    const [name, setName] = useState<string>(detail?.service || "");
    const [price, setPrice] = useState<number>(detail?.price || 0);

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setName(e.target.value)
    }

    const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => { 
        const dniNumber = parseFloat(e.target.value);
        if (!isNaN(dniNumber)) {
            setPrice(dniNumber);
        }
    }


  return (
    <div>
        <div className='w-full justify-start text-start'>
           <img src={arrow} className='w-5 h-5 2xl:w-7 2xl:h-7 cursor-pointer' title="Volver" onClick={() => goBack()}/>
        </div>
        <div className='flex items-center justify-start gap-24 mt-6'>
                <div className='flex flex-col items-start justify-start'>
                    <p className='font-bold text-black'>Nombre del Servicio</p>
                    <input type="text" name="price" id="price" className=" mt-1s w-40 xl:w-52 2xl:w-96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                    value={name} 
                    onChange={handleChangeName}
                    />
                </div>
                <div className='flex flex-col items-start justify-start'>
                    <p className='font-bold text-black'>Precio</p>
                    <input type="text" name="price" id="price" className=" mt-1s w-40 xl:w-52 2xl:w-96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                    value={price} 
                    onChange={handleChangePrice}
                    />
                </div>
        </div>
        <div className='flex items-center justify-start gap-8 mt-12'>
           <Button className= "bg-blue-500 text-white font-medium tex-md w-96">Guardar Cambios</Button>
           <Button className= "bg-gray-400 text-white font-medium tex-md w-96">Cancelar</Button>
        </div>
    </div>
  )
}

export default EditService
