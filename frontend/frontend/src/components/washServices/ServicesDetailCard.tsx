import React, {useState} from 'react'
import { ServiceType } from 'types/ServicesTypes';
import { Button } from '@nextui-org/react';
import Loading from '../Spinner/Loading';
import ServiceDetail from './ServiceDetail';
import transformPrice from '../../functions/TransformDateHour/TransformPrice';
import AddnewService from './AddnewService';

interface Props {
    servicesData: ServiceType[];
    update: () => void
 }

const ServicesDetailCard = ({servicesData, update}: Props) => {

    const [serviceSelected, setServiceSelected] = useState<ServiceType>()
    const [showNewService, setShowNewService] = useState<boolean>(false)
    const [showServiceDetail, setShowServiceDetail] = useState<boolean>(false)

    const selectServiceAndShowData = (item: ServiceType) => { 
        setShowServiceDetail(true)
        setServiceSelected(item)
    }


  return (
    <div className='flex gap-4 h-full w-full'>
           {servicesData ? 
               <div className='flex flex-col w-1/5 '>
                    <div className='mt-2 w-full flex justify-start'>
                        <Button className='bg-blue-500 text-white font-medium text-md' onClick={() => setShowNewService(true)}>Añadir nuevo Servicio</Button>
                    </div>
                    <div className='max-h-[420px] 2xl:max-h-[645px] 3xl:max-h-[725px] overflow-y-auto w-full ml-2'>  
                        {servicesData.map((serv: ServiceType) => ( 
                            <div className='mt-4 w-full cursor-pointer hover:bg-blue-100' key={serv._id} onClick={() => selectServiceAndShowData(serv)}>
                                    <div className='flex items-start text-start justify-between' key={serv._id}>
                                        <p className='font-medium text-md text-blue-500'>{serv.service}</p>                             
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <p className=' text-green-700 text-md font-medium'>{transformPrice( serv.price)}</p>
                                    </div>             
                            </div>  
                        ))}
                    </div>
              </div> : <Loading/>}

              <div className='w-4/5 h-full flex flex-col items-center justify-center'>
                {showNewService === true ?  
                   <AddnewService update={update}/>
                    :
                   <ServiceDetail serviceData={serviceSelected} update={update}/>}
           </div>
    </div>
  )
}

export default ServicesDetailCard
