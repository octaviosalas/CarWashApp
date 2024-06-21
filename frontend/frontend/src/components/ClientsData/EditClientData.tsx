import React from 'react'
import { ClientType, newClientType } from 'types/ClientsTypes'
import { useState } from 'react'
import { Button } from '@nextui-org/react'
import arrow from "../../images/arrowBack.png"
import apiBackendUrl from '../../lib/axios'
import {toast} from "react-toastify"
import Loading from '../Spinner/Loading'
import { userStore } from '../../store/store'
import handleError from '../../utils/AxiosErrorFragment'


interface Props { 
    detail: ClientType | undefined,
    goBack: () => void,
    update: () => void
}

const EditClientData = ({detail, goBack, update}: Props) => {

    const [name, setName] = useState<string>(detail?.name || "");
    const [dni, setDni] = useState<number>(detail?.dni || 0);
    const [email, setEmail] = useState<string>(detail?.email || "");
    const [telephone, setTelephone] = useState<number>(detail?.telephone || 0);
    const user = userStore(state => state.user)
    const [load, setLoad] = useState(false)

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

    const updateClientData = async () => { 
        setLoad(true)
        const clientData : newClientType = ({ 
           name: name,
           dni: dni,
           telephone: telephone,
           email: email
        })
        try {
            const {data, status} = await apiBackendUrl.put(`/clients/updateClientData/${detail?._id}/${user?._id}`, clientData)
            if(status === 200) { 
                toast.success(data, {
                    style: { backgroundColor: 'white', color: 'blue' },
                    pauseOnHover: false,
                    autoClose: 2000
                });
                update()
                setLoad(false)
            }
        } catch (error) {
            console.log(error)
            handleError(error, setLoad)
        }
    }
     
  return (
    <div className=''>
        <div className='w-full justify-start text-start'>
            <img src={arrow} className='w-5 h-5 2xl:w-7 2xl:h-7 cursor-pointer' title="Volver" onClick={() => goBack()}/>
        </div>
          <div className='flex flex-col w-full ml-4 mt-0 2xl:mt-4'>
                <div className='flex items-center mt-6 gap-24'>
                     <div className='flex flex-col justify-start text-start items-start'>
                        <p className='text-sm text-black font-medium'>Nombre y Apellido</p>
                        <input type="text" name="price" id="price" className=" mt-1s w-72 2xl:w-96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                         value={name} 
                         onChange={handleChangeName}
                        />
                     </div>
                     <div className='flex flex-col justify-start text-start items-start'>
                        <p className='text-sm text-black font-medium'>Dni</p>
                        <input type="number" name="price" id="price" className="block mt-1s  w-72 2xl:w-96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none " 
                        value={dni}
                        onChange={handleChangeDni}
                        />
                     </div>
                    
                 </div>
                 <div className='flex items-center mt-3 2xl:mt-6 gap-24'>
                     <div className='flex flex-col justify-start text-start items-start'>
                        <p className='text-sm text-black font-medium'>Email</p>
                        <input type="text" name="price" id="price" className="block mt-1s  w-72 2xl:w-96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none "
                        value={email}
                        onChange={handleChangeEmail}
                        />
                     </div>
                     <div className='flex flex-col justify-start text-start items-start'>
                        <p className='text-sm text-black font-medium'>Telefono</p>
                        <input type="number" name="price" id="price" className="block mt-1s  w-72 2xl:w-96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none "
                        value={telephone}
                        onChange={handleChangeTelephone}
                         />
                     </div>                 
                 </div>
          </div>
          <div className='flex items-center justify-start mt-4 2xl:mt-12 gap-4 2xl:gap-6'>
            <Button className='bg-blue-500 text-white w-2/4 font-medium text-md' onClick={() => updateClientData()}>Guardar Cambios</Button>
            <Button className='bg-gray-400 text-white w-1/4  font-medium text-md'  onClick={() => goBack()}>Cancelar</Button>
          </div>
          {load ? <div className='flex items-center justify-center mt-6'> <Loading/> </div> : null}
    </div>
  )
}

export default EditClientData
