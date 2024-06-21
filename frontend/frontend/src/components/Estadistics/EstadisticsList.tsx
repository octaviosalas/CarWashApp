import Loading from "../Spinner/Loading";
import { useState } from 'react'
import EstadisticsDetailCard from './EstadisticsDetailCard';


const EstadisticsList = () => {

    const [load, setLoad] = useState<boolean>(false)


  return (
    <div className='h-full'>
       {load ? <div className='flex flex-col items-center justify-center mt-24 2xl:mt-40'> <Loading/> </div> :  <EstadisticsDetailCard />}
    </div>
  )
}

export default EstadisticsList
