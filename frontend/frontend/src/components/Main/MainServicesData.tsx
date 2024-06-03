import ServicesList from '../washServices/ServicesList'
import React from 'react'

const MainServicesData = () => {
  return (
    <div>
       <div className=' shadow-2xl flex flex-col w-[1200px] xl:w-[1280px] 2xl:w-[1350px] 3xl:w-[1700px] xl:h-[550px] 3xl:h-[850px]'>
            <div className='w-full'>
                <ServicesList/>
            </div>
        </div>
</div>
  )
}

export default MainServicesData
