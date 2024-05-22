import { Input, Button } from '@nextui-org/react'
import React from 'react'
import { useState } from 'react'
import AddNewClientFormVehicle from './AddNewClientFormVehicle'
import {toast} from "react-toastify"


const AddNewClientForm = () => {

    const [name, setName] = useState<string>("")
    const [dni, setDni] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [telephone, setTelephone] = useState<string>("")
    const [missedClientData, setMissedClientData] = useState<boolean>(false)
    const [addVehicleStep, setAddVehicleStep] = useState<boolean>(false)

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setName(e.target.value)
    }

    const handleChangeDni = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setDni(e.target.value)
    }

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setEmail(e.target.value)
    }

    const handleChangeTelephone = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setTelephone(e.target.value)
    }

    const addVehicle = () => {
        if(name.length > 0 && dni.length > 0 && email.length > 0 && telephone.length > 0) { 
            setAddVehicleStep(true)
            setMissedClientData(false)
            
        } else { 
            setMissedClientData(true)
            setAddVehicleStep(false)
            toast.error("Debes completar todos los campos", {
                style: { backgroundColor: 'white', color: 'red' },
                pauseOnHover: false,
                autoClose: 800
            });
        }
    }



  return (
    <div className='flex flex-col w-full mt-4'>
          <div className='w-full flex justify-between items-center ml-4 border-b'>
             <p className='text-md text-black font-medium'>Creando Cliente</p>
          </div>
          <div className='flex flex-col w-full ml-4 mt-4'>
                <div className='flex items-center mt-6 gap-24'>
                     <div className='flex flex-col justify-start text-start items-start'>
                        <p className='text-sm text-black font-medium'>Nombre y Apellido</p>
                        <input type="text" name="price" id="price" className="block mt-1s w-96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                         value={name}
                         onChange={handleChangeName}
                        />
                     </div>
                     <div className='flex flex-col justify-start text-start items-start'>
                        <p className='text-sm text-black font-medium'>Dni</p>
                        <input type="text" name="price" id="price" className="block mt-1s w-96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none " 
                        value={dni}
                        onChange={handleChangeDni}
                        />
                     </div>
                    
                 </div>
                 <div className='flex items-center mt-6 gap-24'>
                     <div className='flex flex-col justify-start text-start items-start'>
                        <p className='text-sm text-black font-medium'>Telefono</p>
                        <input type="text" name="price" id="price" className="block mt-1s w-96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none "
                        value={email}
                        onChange={handleChangeEmail}
                        />
                     </div>
                     <div className='flex flex-col justify-start text-start items-start'>
                        <p className='text-sm text-black font-medium'>Email</p>
                        <input type="text" name="price" id="price" className="block mt-1s w-96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none "
                        value={telephone}
                        onChange={handleChangeTelephone}
                         />
                     </div>                 
                 </div>
          </div>
          <div className='flex justify-start mt-6'>
            {addVehicleStep ?
             <AddNewClientFormVehicle/>
             :
             <div className='flex flex-col items-start justify-start w-full'>
                <Button className="w-3/4 ml-4 bg-blue-500 text-white font-medium text-md" onClick={() => addVehicle()}>Agregar Sin Vehiculo</Button>
                <Button className="w-3/4 ml-4 bg-blue-500 text-white font-medium text-md mt-4" onClick={() => addVehicle()}>Agregar Vehiculo</Button>
             </div>
            }
          </div>
    </div>
  )
}

export default AddNewClientForm
