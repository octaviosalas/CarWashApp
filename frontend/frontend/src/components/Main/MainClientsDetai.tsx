import React from 'react'
import CleaningList from '../Cleanings/CleaningList'
 

const MainClientsDetai = () => {
  return (
    <div>
    <div className='border shadow-2xl flex flex-col w-[1400px] h-[700px]'>
       <div className='w-full'>
         <CleaningList/>
       </div>
    </div>
</div>
  )
}

export default MainClientsDetai
