import NavbarServices from '../NavItemActions/NavbarServices'
import React, { useState } from 'react'
import { ServiceType } from 'types/ServicesTypes'
import EditService from './EditService'
import DeleteService from './DeleteService'
import { Button } from '@nextui-org/react'

interface Props { 
    serviceData: ServiceType | undefined;
    update: () => void
}

const ServiceDetail = ({serviceData, update}: Props) => {

      const [showService, setShowService] = useState<boolean>(true)
      const [showEditService, setShowEditService] = useState<boolean>(false)
      const [showDeleteService, setShowDeleteService] = useState<boolean>(false)

      const showNowEdit = () => { 
        setShowEditService(true)
        setShowDeleteService(false)
        setShowService(false)
      }

      const showNowDelete = () => { 
        setShowEditService(false)
        setShowDeleteService(true)
        setShowService(false)
      }

      const showDetail = () => { 
        setShowEditService(false)
        setShowDeleteService(false)
        setShowService(true)
      }

  return (
    <div className='w-full h-full flex flex-col justify-start items-start'>
         <div className="mt-4 w-full border-b">
                   <NavbarServices showEditService={showNowEdit} showDeleteService={showNowDelete}/>
                </div>
        {showService && serviceData  ? 
         <div className='flex flex-col'>
            <div className='flex items-center jsutify-center gap-24 mt-6'>
                <div className='flex flex-col items-start justify-start'>
                    <p className='font-bold text-black'>Nombre del Servicio</p>
                    <input type="text" name="price" id="price" className=" mt-1s w-40 xl:w-52 2xl:w-96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                    value={serviceData?.service} disabled
                    />
                </div>
                <div className='flex flex-col items-start justify-start'>
                    <p className='font-bold text-black'>Precio</p>
                    <input type="text" name="price" id="price" className=" mt-1s w-40 xl:w-52 2xl:w-96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                    value={serviceData?.price} disabled
                    />
                </div>
            </div>
            <div className='mt-6 flex items-center justify-center w-full border'>
               <Button className='bg-blue-500 text-white w-full text-md font-medium'>Ver Detalles</Button>
            </div>
          </div>
             :
            <div className='flex flex-col items-center justify-center w-full'>
                 <p className='mt-24 text-zinc-600'>No hay ningun elemento para mostrar</p>
            </div>}

            {showEditService ? <div className="w-full"> <EditService detail={serviceData}  goBack={showDetail} update={update}/> </div> : null}
            {showDeleteService ? <div className="w-full"> <DeleteService detail={serviceData}  goBack={showDetail} update={update}/> </div> : null}

    </div>
  )
}



export default ServiceDetail
