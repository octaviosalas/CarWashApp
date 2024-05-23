import { Input, Button } from '@nextui-org/react'
import React from 'react'
import { useState } from 'react'
import AddNewClientFormVehicle from './AddNewClientFormVehicle'
import {toast} from "react-toastify"
import apiBackendUrl from '../../lib/axios'
import Loading from '../Spinner/Loading'
import { newClientType } from 'types/ClientsTypes'
import arrowBack from "../../images/arrowBack.png"

interface Props { 
    update: () => void,
    goBack: () => void
}

const AddNewClientForm = ({update, goBack}: Props) => {

    const [name, setName] = useState<string>("")
    const [dni, setDni] = useState<number>()
    const [email, setEmail] = useState<string>("")
    const [telephone, setTelephone] = useState<number>()
    const [load, setLoad] = useState<boolean>(false)
    const [missedClientData, setMissedClientData] = useState<boolean>(false)
    const [addVehicleStep, setAddVehicleStep] = useState<boolean>(false)
    const userId: string = "6644b816b732651683c01b26";//id contexto

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setName(e.target.value)
    }

    const handleChangeDni = (e: React.ChangeEvent<HTMLInputElement>) => { 
        const dniNumber = parseFloat(e.target.value);
        if (!isNaN(dniNumber)) {
            setDni(dniNumber);
        }
    }

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setEmail(e.target.value)
    }

    const handleChangeTelephone = (e: React.ChangeEvent<HTMLInputElement>) => { 
        const telephoneNumber = parseFloat(e.target.value);
        if (!isNaN(telephoneNumber)) {
            setTelephone(telephoneNumber);
        }
    }

    const addVehicle = () => {
        if(name.length > 0 &&  dni!== undefined  && email.length > 0 && telephone!== undefined) { 
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

    const addClient = async () => { 
        const clientData : newClientType = ({ 
            name: name,
            dni: dni,
            email: email,
            telephone: telephone
        })
        if(name.length > 0 && dni!== undefined && email.length > 0 && telephone!== undefined ) { 
            setLoad(true)
            const {data, status} = await apiBackendUrl.post(`/clients/create/${userId}`, clientData)
            if(status === 200) { 
                toast.success(data, {
                    style: { backgroundColor: 'white', color: 'blue' },
                    pauseOnHover: false,
                    autoClose: 2000
                });
                update()
                setLoad(false)
                cleanInputs()
            }
        } else { 
            setMissedClientData(true)
            toast.error("Debes completar todos los campos", {
                style: { backgroundColor: 'white', color: 'red' },
                pauseOnHover: false,
                autoClose: 800
            });
        }
    }

    const newClientDataResolved : newClientType = { 
        name: name,
        dni: dni,
        email: email,
        telephone: telephone
    }

    const comeBack = () => { 
        setAddVehicleStep(false)
    }

    const cleanInputs = () => { 
        setName("")
        setDni(undefined)
        setTelephone(undefined)
        setEmail("")
    }
     
    


  return (
    <div className='flex flex-col w-full mt-4'>
          <div className='w-full flex justify-between items-center ml-4 border-b'>
             <p className='text-md text-black font-medium'>Creando Cliente</p>
          </div>
          <div className='ml-4 mt-0 2xl:mt-3'>
            <img src={arrowBack} className='w-5 h-5 2xl:w-6 2xl:h-6 cursor-pointer' onClick={() => goBack()}/>
          </div>
          <div className='flex flex-col w-full ml-4 mt-0 2xl:mt-4'>
                <div className='flex items-center mt-6 gap-24'>
                     <div className='flex flex-col justify-start text-start items-start'>
                        <p className='text-sm text-black font-medium'>Nombre y Apellido</p>
                        <input type="text" name="price" id="price" className=" mt-1s w-40 xl:w-52 2xl:w-96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                         value={name}
                         onChange={handleChangeName}
                        />
                     </div>
                     <div className='flex flex-col justify-start text-start items-start'>
                        <p className='text-sm text-black font-medium'>Dni</p>
                        <input type="number" name="price" id="price" className="block mt-1s w-40 xl:w-52 2xl:w-96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none " 
                        value={dni}
                        onChange={handleChangeDni}
                        />
                     </div>
                    
                 </div>
                 <div className='flex items-center mt-3 2xl:mt-6 gap-24'>
                     <div className='flex flex-col justify-start text-start items-start'>
                        <p className='text-sm text-black font-medium'>Email</p>
                        <input type="text" name="price" id="price" className="block mt-1s w-40 xl:w-52 2xl:w-96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none "
                        value={email}
                        onChange={handleChangeEmail}
                        />
                     </div>
                     <div className='flex flex-col justify-start text-start items-start'>
                        <p className='text-sm text-black font-medium'>Telefono</p>
                        <input type="number" name="price" id="price" className="block mt-1s w-40 xl:w-52 2xl:w-96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none "
                        value={telephone}
                        onChange={handleChangeTelephone}
                         />
                     </div>                 
                 </div>
          </div>
          <div className='flex flex-col  mt-6'>
            {addVehicleStep ?
             <AddNewClientFormVehicle newClientData={newClientDataResolved} comeBack={comeBack} update={update} clean={cleanInputs}/>
             :
             <div className='flex flex-col items-start justify-start w-full'>
                <Button className="w-3/4 ml-4 bg-blue-500 text-white font-medium text-md" onClick={() => addClient()}>Agregar Sin Vehiculo</Button>
                <Button className="w-3/4 ml-4 bg-blue-500 text-white font-medium text-md mt-4" onClick={() => addVehicle()}>Agregar Vehiculo</Button>
             </div>
            }

            {load ? <div className='flex flex-col items-center justify-center mt-6'> <Loading/> </div> : null}
          </div>
    </div>
  )
}

export default AddNewClientForm
