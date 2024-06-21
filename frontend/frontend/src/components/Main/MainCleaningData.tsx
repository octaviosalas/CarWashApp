import CleaningList from '../Cleanings/CleaningList'
import { userStore } from '../../store/store'

const MainCleaningData = () => {

  const user = userStore(state => state.user)

  return (
    <div>
         <div className=' shadow-2xl flex flex-col w-[1200px] xl:w-[1280px] 2xl:w-[1350px] 3xl:w-[1700px] h-[500px] xl:h-[550px] 3xl:h-[780px]'>
            <div className='w-full'>
               <CleaningList/>
            </div>
         </div>
    </div>
  )
}

export default MainCleaningData
