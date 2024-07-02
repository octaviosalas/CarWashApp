import ClientsList from '../ClientsData/ClientsList'


const MainClientsDetail = () => {
  return (
    <div>
        <div className=' shadow-2xl flex flex-col w-screen h-[500px] xl:h-[600px] 2xl:-h-[750px] 3xl:h-[912px]'>
          <div className='w-full'>
            <ClientsList/>
          </div>
      </div>
</div>
  )
}

export default MainClientsDetail
/* 
   <div>
         <div className=' shadow-2xl flex flex-col w-[1200px] xl:w-[1280px] 2xl:w-[1350px] 3xl:w-[1700px] xl:h-[550px]  3xl:h-[780px]'>
       <div className='w-full'>
         <ClientsList/>
       </div>
    </div>
</div>
*/
