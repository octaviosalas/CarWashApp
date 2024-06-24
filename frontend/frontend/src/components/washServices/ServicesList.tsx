import apiBackendUrl from "../../lib/axios"
import { ServiceType } from "types/ServicesTypes";
import Loading from "../Spinner/Loading";
import { useState } from 'react'
import { useEffect } from 'react'
import ServicesDetailCard from './ServicesDetailCard';
import { userStore } from '../../store/store';

const ServicesList = () => {

   
    const [services, setServices] = useState<ServiceType[]>([])
    const [load, setLoad] = useState<boolean>(false)
    const user = userStore(state => state.user)

    const getMyServices = async () => {
        setLoad(true)
        try {
            const {data} = await apiBackendUrl.get(`/services/myServices/${user?._id}`) 
            const response = data
            if(response.length > 0) { 
              setServices(response)
              setLoad(false)
            } else { 
              setLoad(false)
            }
          } catch (error) {
            console.log(error)
            setLoad(false)
          }
      }

      useEffect(() => { 
        getMyServices()
      }, [])


  return (
    <div>
       {load ? <div className='flex flex-col items-center justify-center mt-24 2xl:mt-40'> <Loading/> </div> :  <ServicesDetailCard servicesData={services} update={getMyServices}/>}
    </div>
  )
}

export default ServicesList
