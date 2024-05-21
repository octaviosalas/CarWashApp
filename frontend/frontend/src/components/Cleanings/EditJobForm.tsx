import { Input } from '@nextui-org/react'
import { Button, Select, SelectItem } from '@nextui-org/react'
import { JobType } from 'types/JobsTypes'
import { ClientType } from 'types/ClientsTypes'
import arrowBack from "../../images/arrowBack.png"
import { useState } from 'react'
import { getDate } from '../../functions/TransformDateHour/HourAndDate'
import { getHour } from '../../functions/TransformDateHour/HourAndDate'

interface Props { 
  detail: JobType,
  clients: ClientType[],
  goBack: () => void
}

//router.post("/updateJobData/:jobId/:clientId/:userId",
//const userId: string = "6644b816b732651683c01b26";//id contexto

const EditJobForm = ({detail, clients, goBack}: Props) => {

  const [selectedClient, setSelectedClient] = useState<string>(detail.client.name);
  const [hour, setHour] = useState(getHour())
  const [date, setDate] = useState(getDate())
  const [vehicle, setVehicle] = useState(detail.vehicle._id)
  const [amount, setAmount] = useState(detail.amount)
  const [typeOfJob, setTypeOfJob] = useState(detail.typeOfJob)
  //parametro clientId es detail.client._id
  //parametro userId es la const
  //parametro job id es detail._id
  


  return (
    <div className='w-full'>
      <div className='w-full  flex justify-start mt-2'>
           <img className='w-8 h-8 cursor-pointer' title="Volver al detalle" src={arrowBack} onClick={() => goBack()}/>
      </div>
      <div className='flex flex-col mt-6'>
          <Select className='w-3/4' label="Selecciona un cliente" value={selectedClient}>
              {clients.map((cc: ClientType) => ( 
                  <SelectItem key={cc._id} onClick={() => setSelectedClient(cc._id)} textValue={cc.name}> {cc.name} </SelectItem>
              ))}
           </Select>
          <Input type="text" label="lala" className='w-72 h-10 mt-3'/>
          <Input type="text" label="lala" className='w-72 h-10 mt-3'/>
          <Input type="text" label="lala" className='w-72 h-10 mt-3'/>
          <Input type="text" label="lala" className='w-72 h-10 mt-3'/>
      </div> 
    </div>
   
  )
}

export default EditJobForm
