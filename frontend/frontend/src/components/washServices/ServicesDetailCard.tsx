import  {useState} from 'react'
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

    const selectServiceAndShowData = (item: ServiceType) => { 
        setServiceSelected(item)
    }

    const goBack = () => { 
         setShowNewService(false)
    }


  return (
    <div className='flex gap-4 h-full w-full'>
           {servicesData ? 
               <div className='flex flex-col w-1/5 '>
                    <div className='mt-2 w-full flex justify-start'>
                        <Button className='bg-blue-500 text-white font-medium text-md w-72' onClick={() => setShowNewService(true)}>Añadir nuevo Servicio</Button>
                    </div>
                    <div className='max-h-[450px] 2xl:max-h-[645px] 3xl:max-h-[745px]  overflow-y-auto w-full ml-2'>  
                        {servicesData.length > 0 ? ( 
                            servicesData.map((serv: ServiceType) => ( 
                                <div className='mt-4 w-full cursor-pointer hover:bg-blue-100 h-16 2xl:h-24' key={serv._id} onClick={() => selectServiceAndShowData(serv)}>
                                        <div className='flex items-start text-start justify-between' key={serv._id}>
                                            <p className='font-medium text-md text-blue-500'>{serv.service}</p>                             
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <p className=' text-green-700 text-md font-medium'>{transformPrice( serv.price)}</p>
                                        </div>             
                                </div>  
                            ))
                        ) : ( 
                            <div className='flex items-center justify-center mt-24'>
                               <p className='font-medium text-zinc-500'>No cuentas con Servicios guardados</p>
                            </div>
                        )}
                      
                    </div>
              </div> : <Loading/>}

              <div className='w-4/5 h-full flex flex-col items-center justify-center'>
                {showNewService === true ?  
                   <AddnewService update={update} goBack={goBack}/>
                    :
                   <ServiceDetail serviceData={serviceSelected} update={update}/>}
           </div>
    </div>
  )
}

export default ServicesDetailCard
