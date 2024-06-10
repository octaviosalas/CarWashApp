import { JobType } from 'types/JobsTypes'
import { ClientType } from 'types/ClientsTypes'
import arrowBack from "../../images/arrowBack.png"
import { useEffect, useState } from 'react'
import { userStore } from '../../store/store'
import { Select, SelectItem } from '@nextui-org/react'
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";

interface Props { 
  detail: JobType,
  clients: ClientType[],
  goBack: () => void
}

const EditJobForm = ({detail, clients, goBack}: Props) => {

  const [amount, setAmount] = useState(detail.amount)
  const user = userStore(state => state.user)


  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setAmount(Number(e.target.value))
  }

  const handleChangeClient = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setAmount(Number(e.target.value))
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
            <input type="text" name="price" id="price" className=" mt-1s w-72 xl:w-80 2xl:w-96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                value={detail.client.name}
                onChange={handleChangeClient}
              />
        </div>

    


         
      </div> 
    </div>
   
  )
}

export default EditJobForm
