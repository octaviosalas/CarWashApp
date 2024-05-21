import ClientsList from '../ClientsData/ClientsList'


const MainClientsDetail = () => {
  return (
    <div>
    <div className='border shadow-2xl flex flex-col  xl:w-[1180px] 2xl:w-[1200px] 3xl:w-[1400px] xl:h-[500px] 3xl:h-[700px]'>
       <div className='w-full'>
         <ClientsList/>
       </div>
    </div>
</div>
  )
}

export default MainClientsDetail
