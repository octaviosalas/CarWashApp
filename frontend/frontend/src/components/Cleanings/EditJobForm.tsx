import { JobType } from 'types/JobsTypes'
import { ClientType } from 'types/ClientsTypes'
import arrowBack from "../../images/arrowBack.png"
import { useState } from 'react'
import { userStore } from '../../store/store'
import { Button, Select, SelectItem } from '@nextui-org/react'
import apiBackendUrl from '../../lib/axios'
import {toast} from "react-toastify"
import Loading from '../Spinner/Loading'
import { ClientVehiclesType } from 'types/VehiclesTypes'
import handleError from '../../utils/AxiosErrorFragment'

interface Props { 
  detail: JobType,
  clients: ClientType[],
  goBack: () => void,
  updateJobs: () => void
}

type newJobData = { 
  amount: number,
  clientId: string,
  vehicle: string | undefined,
  paid: boolean
}

const EditJobForm = ({detail, clients, goBack, updateJobs}: Props) => {

  const [amount, setAmount] = useState<number>(detail.amount)
  const [clientName, setClientName] = useState<string>(detail.client.name)
  const [clientId, setClientId] = useState<string>(detail.client._id)
  const [clientSelectedVehicles, setClientSelectedVehicles] = useState<ClientVehiclesType[]>([])
  const [load, setLoad] = useState<boolean>(false)
  const [loadVehicles, setLoadVehicles] = useState<boolean>(false)
  const [clientWithOutVehicles, setClientWithOutVehicles] = useState<boolean>(false)
  const user = userStore(state => state.user)
  const [vehicleSelected, setVehicleSelected] = useState<string>(detail.vehicle._id);
  const [newVehicleSelected, setNewVehicleSelected] = useState<string>("");


  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setAmount(Number(e.target.value))
  }

  const findClientVehicles = async (clientId: string) => { 
    setLoadVehicles(true)
    setClientId(clientId)
    try {
        const {data} = await apiBackendUrl.get(`/clients/clientData/${clientId}/${user?._id}`) 
        const response = data.clientVehicles
        if(response) { 
            setClientSelectedVehicles(response)      
            setLoadVehicles(false)
            if(response.length === 0) { 
              setClientWithOutVehicles(true)
            }
        } else { 
            console.log("sin response")
            setLoadVehicles(false)
        }

    } catch (error) {
        console.log(error)
    }
  }

  const chooseVehicle = async (vehicle: ClientVehiclesType) => { 
    setNewVehicleSelected(vehicle._id)
  }

  const changeData = async () => { 
    setLoad(true)
    const newData : newJobData = ({ 
      amount: amount,
      clientId: clientId,
      vehicle: newVehicleSelected ? newVehicleSelected : undefined,
      paid: detail.paid
    })
    try {
        const {data, status} = await apiBackendUrl.put(`/jobs/updateData/${detail._id}/${user?._id}`, newData)
        if(status === 200) { 
          toast.success(data, {
                  style: { backgroundColor: 'white', color: 'blue' },
                  pauseOnHover: false,
                  autoClose: 2000
              });
          updateJobs()
          setLoad(false)
   }
    } catch (error) {
       handleError(error, setLoad)
    }
  }





  return (
    <div className='w-full'>
      <div className='w-full  flex justify-start mt-2 ml.-2'>
           <img className='w-8 h-8 cursor-pointer' title="Volver al detalle" src={arrowBack} onClick={() => goBack()}/>
      </div>
      <div className='flex flex-col mt-6 ml-6'>

        <div className='flex flex-col justify-start text-start items-start'>
            <p className='text-sm text-black font-medium'>Monto del Lavado</p>
              <input type="text" name="price" id="price" className=" mt-1s w-72 xl:w-80 2xl:w-96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                value={amount}
                onChange={handleChangeAmount}
              />
        </div>

        <div className='flex flex-col justify-start text-start items-start mt-4'>
            <p className='text-sm text-black font-medium'>Cliente</p>
            <Select radius="none" color="primary" className='w-3/4  mt-1 text-white font-medium' label="Selecciona uno de tus clientes" defaultSelectedKeys={[clientName]}>
               {clients.map((cc: ClientType) => ( 
                 <SelectItem className='bg-blue-500 text-white font-medium' key={cc.name}onClick={() => findClientVehicles(cc._id)}>{cc.name}</SelectItem>
               ))}
             </Select>
             
        </div>

         {loadVehicles ? 
         <Loading /> : 
          clientSelectedVehicles.length > 0 && loadVehicles === false ? ( 
            <div className='flex flex-col justify-start text-start items-start mt-4'>
                <Select className='w-3/4 rounded-xl border border-blue-600 mt-1' label="Selecciona uno de sus vehiculos">
                  {clientSelectedVehicles.map((cc: ClientVehiclesType) => ( 
                    <SelectItem key={cc._id} onClick={() => chooseVehicle(cc)} textValue={cc.description}> {cc.description} - {cc.patent} </SelectItem>
                  ))}
                </Select>
            </div> 
           ) : loadVehicles === false && clientWithOutVehicles ? ( 
                 <p>no tiene vehiculos</p>
            ) : null 
           }

        
        <div className='flex justify-start text-start items-start gap-6 mt-12'>
           <Button className='bg-blue-500 text-white font-medium w-52 2xl:w-72 3xl:w-96' onClick={() => changeData()}>Confirmar</Button>
           <Button className='bg-gray-300 text-white font-medium w-52 2xl:w-72 3xl:w-96' onClick={() => goBack()}>Cancelar</Button>
        </div>

        { load ? 
            <div className='flex justify-center text-center items-center gap-6 mt-4 2xl:mt-8 3xl:mt-12'>
                <Loading/>
            </div>
        : null}

      </div> 
    </div>
   
  )
}

export default EditJobForm
