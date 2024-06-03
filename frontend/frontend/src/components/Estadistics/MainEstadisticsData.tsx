import React from 'react'
import EstadisticsList from './EstadisticsList'

const MainEstadisticsData = () => {
  return (
    <div>
    <div className=' shadow-2xl flex flex-col w-[1200px] xl:w-[1280px] 2xl:w-[1350px] 3xl:w-[1700px] xl:h-[550px] 3xl:h-[850px]'>
         <div className='w-full'>
             <EstadisticsList/>
         </div>
     </div>
</div>
  )
}

export default MainEstadisticsData
