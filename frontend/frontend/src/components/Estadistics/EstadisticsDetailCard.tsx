import React, { useState } from 'react'
import { Button } from '@nextui-org/react'
import Loading from '../Spinner/Loading'
import DayEstadistics from './DayEstadistics'
import MonthEstadistics from './MonthEstadistics'
import YearEstadistics from './YearEstadistics'

const EstadisticsDetailCard = () => {

 
    const [showData, setShowData] = useState(true)
    const [showDayEstadistic, setShowDayEstadistic] = useState(false)
    const [showMonthEstadistic, setShowMonthEstadistic] = useState(false)
    const [showYearEstadistic, setShowYearEstadistic] = useState(false)

    const showDay = () => { 
        setShowDayEstadistic(true)
        setShowMonthEstadistic(false)
        setShowYearEstadistic(false)
    }

    const showMonth = () => { 
        setShowDayEstadistic(false)
        setShowMonthEstadistic(true)
        setShowYearEstadistic(false)
    }

    const showYear = () => { 
        setShowDayEstadistic(false)
        setShowMonthEstadistic(false)
        setShowYearEstadistic(true)
    }

   

    

  return (
    <div className='flex gap-4 h-full w-full'>
    {showData ? 
        <div className='flex flex-col w-1/5 '>
            
             <div className='max-h-[420px] 2xl:max-h-[645px] 3xl:max-h-[725px] overflow-y-auto w-full'>  
                <div className={showDayEstadistic ? "w-full bg-blue-100 h-24 cursor-pointer text-lg" : 'w-full cursor-pointer hover:bg-blue-100 h-24 text-md'} onClick={() => showDay()}>
                             <div className='flex items-start text-start justify-between'>
                                 <p className='font-medium text-md text-blue-500 mt-9'>Reporte Diario</p>                             
                             </div>           
                     </div>  
                     <div className={showMonthEstadistic ? "w-full bg-blue-100 h-24 cursor-pointer text-lg" : 'w-full cursor-pointer hover:bg-blue-100 h-24 text-md'} onClick={() => showMonth()}>
                             <div className='flex items-start text-start justify-between'>
                                 <p className='font-medium text-md text-blue-500 mt-9'>Reporte Mensual</p>                             
                             </div>           
                     </div>  
                     <div className={showYearEstadistic ? "w-full bg-blue-100 h-24 cursor-pointer text-lg" : 'w-full cursor-pointer hover:bg-blue-100 h-24 text-md'} onClick={() => showYear()}>
                             <div className='flex items-start text-start justify-between'>
                                 <p className='font-medium text-md text-blue-500 mt-9'>Reporte Anual</p>                             
                             </div>           
                     </div>  
             </div>
       </div> : <Loading/>}

       <div className='w-4/5 h-full flex flex-col items-center justify-center'>

         {showDayEstadistic === true ?  
            <DayEstadistics/>
             : showMonthEstadistic === true ? ( 
                 <MonthEstadistics/>
             ) :  showYearEstadistic === true ?  ( 
                   <YearEstadistics/>
             ) : <div> 
                  <p className="text-lg text-zinc-500">No has seleccionado ningun elemento para mostrar</p>
                 </div>
          }

    </div>
</div>
  )
}

export default EstadisticsDetailCard
