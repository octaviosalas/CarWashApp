import MyAccountList from '../MyAccount/MyAccountList'

const MainMyAccount = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
         <div className='flex flex-col w-screen h-[500px] xl:h-[600px] 2xl:-h-[750px] 3xl:h-[912px]'>
            <div className='w-full'>
               <MyAccountList/>
            </div>
         </div>
    </div>
  )
}

export default MainMyAccount

//         <div className=' shadow-2xl flex flex-col w-screen h-[500px] xl:h-[600px] 2xl:-h-[750px] 3xl:h-[912px]'>

/* 
<div className='flex flex-col items-center justify-center'>
       <div className=' shadow-2xl flex flex-col w-[1200px] xl:w-[1280px] 2xl:w-[1350px] 3xl:w-[1700px] h-[500px] xl:h-[550px] 3xl:h-[780px]'>
            <div className='w-full'>
               <MyAccountList/>
            </div>
         </div>
    </div>
*/