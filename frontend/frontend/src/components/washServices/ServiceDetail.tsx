import NavbarServices from '../NavItemActions/NavbarServices'
import React, { useEffect, useState } from 'react'
import { ServiceType } from 'types/ServicesTypes'
import EditService from './EditService'
import DeleteService from './DeleteService'
import { Button } from '@nextui-org/react'
import apiBackendUrl from '../../lib/axios'
import { userStore } from '../../store/store'
import handleError from '../../utils/AxiosErrorFragment'
import Loading from '../Spinner/Loading'
import transformPrice from '../../functions/TransformDateHour/TransformPrice'

interface Props { 
    serviceData: ServiceType | undefined;
    update: () => void
}

const ServiceDetail = ({serviceData, update}: Props) => {

      const [showService, setShowService] = useState<boolean>(true)
      const [showEditService, setShowEditService] = useState<boolean>(false)
      const [showDeleteService, setShowDeleteService] = useState<boolean>(false)
      const [load, setLoad] = useState<boolean>(false)
      const [detail, setDetail] = useState<ServiceType[]>([])
      const [total, setTotal] = useState<number>()
      const [quantity, setQuantity] = useState<number>()
      const [withOutJobs, setWithOutJobs] = useState<boolean>(false)
      const [viewDetail, setViewDetail] = useState<boolean>(false)
      const {user} = userStore()

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

      const getServiceDetail = async () => { 
        setLoad(true)
          try {
            const {status, data} = await apiBackendUrl.get(`/services/servicesDataEstadistic/${user?._id}/${serviceData?._id}`)
            console.log(data)
              if(status === 200 && data.detail.length > 0) { 
                console.log(data)
                setWithOutJobs(false)
                setDetail(data.detail)
                setTotal(data.totalAmount)
                setQuantity(data.totalJobs)
                setLoad(false)
                setViewDetail(true)
              } else if (status === 200 && data.detail.length === 0) { 
                setWithOutJobs(true)
                setLoad(false)
                setViewDetail(true)
              }
          } catch (error) {
            handleError(error, setLoad)
          }
      }

      useEffect(() => { 
        setViewDetail(false)
      }, [serviceData])


  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
         <div className="mt-4 w-full border-b">
                   <NavbarServices showEditService={showNowEdit} showDeleteService={showNowDelete}/>
                </div>
        {showService && serviceData !== undefined ? 
         <div className='flex flex-col w-full'>
            <div className='flex flex-col items-start justify-star mt-6 ml-4'>
                <div className='flex flex-col items-start justify-start'>
                    <p className='font-bold text-black'>Nombre del Servicio</p>
                    <input type="text" name="price" id="price" className=" mt-1s w-80 2xl:96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                    value={serviceData?.service} disabled
                    />
                </div>
                <div className='flex flex-col items-start justify-start mt-4'>
                    <p className='font-bold text-black'>Precio</p>
                    <input type="text" name="price" id="price" className=" mt-1s w-80 2xl:96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                    value={serviceData?.price} disabled
                    />
                </div>
            </div>
              <div className='mt-6 flex flex-col items-start justify-start w-full ml-4'>
                 <div>
                     {viewDetail ?  
                        <Button className='bg-blue-500 text-white w-80 2xl:96 text-md font-medium' onClick={() => setViewDetail(false)}>Cerrar</Button>
                         :
                        <Button className='bg-blue-500 text-white w-80 2xl:96 text-md font-medium' onClick={() => getServiceDetail()}>Ver Detalles del Mes</Button> 
                      }
                </div>
                {load ?
                       <div className='mt-6'>
                           <Loading/>
                      </div> 
                      : load === false && withOutJobs === false  && viewDetail ? ( 
                        <div className='mt-6 flex flex-col justify-center items-center w-3/4 '>
                           <div className='w-full'>
                              <div className='bg-blue-500 rounded-lg w-full h-12 items-center text-center'>
                                  <p className='font-medium text-lg text-white text-center'>Cantidad de Lavados</p>
                              </div>
                              <div>
                                 <p className=''>{quantity}</p>
                              </div>
                           </div>
                        
                           <div className='w-full mt-4'>
                              <div className='bg-blue-500 rounded-lg w-full h-12 items-center text-center'>
                                  <p className='font-medium text-lg text-white'>Total Facturado</p>
                              </div>
                              <div>
                                 <p className=''>{transformPrice(total)}</p>
                              </div>
                           </div>
                       </div>
                      ) : load === false && withOutJobs === true && viewDetail ? ( 
                        <div className='bg-red-500 text-center justify-center w-full rounded-lg h-12 mt-6'>
                           <p className='font-medium items-center text-center text-white mt-2'>Este servicio no ha sido utilizado en el mes actual</p>                        
                        </div>
                      ) : null
                     
                }
              </div>
          </div>
             :
           null}

            {showEditService ? <div className="w-full"> <EditService detail={serviceData}  goBack={showDetail} update={update}/> </div> : null}
            {showDeleteService ? <div className="w-full"> <DeleteService detail={serviceData}  goBack={showDetail} update={update}/> </div> : null}

    </div>
  )
}



export default ServiceDetail
