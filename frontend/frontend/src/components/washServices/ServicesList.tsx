import React from 'react'
import apiBackendUrl from "../../lib/axios"
import { ServiceType } from "types/ServicesTypes";
import Loading from "../Spinner/Loading";
import { useState } from 'react'
import { useEffect } from 'react'
import ServicesDetailCard from './ServicesDetailCard';
import { userStore } from '../../store/store';

const ServicesList = () => {

    const [withOutServices, setWithOutServices] = useState<boolean>(false)
    const [services, setServices] = useState<ServiceType[]>([])
    const [load, setLoad] = useState<boolean>(false)
    const [showCreateNew, setShowCreateNew] = useState<boolean>(false)
    const user = userStore(state => state.user)

    const getMyServices = async () => {
        setLoad(true)
        try {
            const {data} = await apiBackendUrl.get(`/services/myServices/${user?._id}`) 
            const response = data
            console.log("servicios", response)
            if(response.length > 0) { 
              setServices(response)
              setWithOutServices(false)
              setLoad(false)
            } else { 
              setWithOutServices(true)
              setLoad(false)
            }
          } catch (error) {
            console.log(error)
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
