import ClientsList from '../ClientsData/ClientsList'


const MainClientsDetail = () => {
  return (
    <div>
         <div className=' shadow-2xl flex flex-col xl:w-[1280px] 2xl:w-[1350px] 3xl:w-[1600px] xl:h-[550px] 3xl:h-[700px]'>
       <div className='w-full'>
         <ClientsList/>
       </div>
    </div>
</div>
  )
}

export default MainClientsDetail
