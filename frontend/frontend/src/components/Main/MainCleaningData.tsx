import Navbar from '../Navbar/Navbar'
import CleaningList from '../Cleanings/CleaningList'

const MainCleaningData = () => {
  return (
    <div>
         <div className=' shadow-2xl flex flex-col xl:w-[1180px] 2xl:w-[1200px] 3xl:w-[1600px] xl:h-[500px] 3xl:h-[700px]'>
            <div className='w-full'>
              <CleaningList/>
            </div>
         </div>
    </div>
  )
}

export default MainCleaningData
