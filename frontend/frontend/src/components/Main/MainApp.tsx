import { useState } from 'react';
import MainCleaningData from './MainCleaningData';
import Navbar from '../Navbar/Navbar';
import MainClientsDetail from './MainClientsDetail';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import MainServicesData from './MainServicesData';
import MainEstadisticsData from '../Estadistics/MainEstadisticsData';

function MainApp() {
  
     const [showJobs, setShowJobs] = useState<boolean>(true)
     const [showClients, setShowClients] = useState<boolean>(false)
     const [showServices, setShowServices] = useState<boolean>(false)
     const [showEstadistics, setShowEstadistics] = useState<boolean>(false)

     const showClientsMenu = () => { 
       setShowJobs(false)
       setShowClients(true)
       setShowServices(false)
       setShowEstadistics(false)
     }

     const showJobsMenu = () => { 
      setShowJobs(true)
      setShowClients(false)
      setShowServices(false)
      setShowEstadistics(false)
     }

     const showServicesMenu = () => { 
      setShowJobs(false)
      setShowClients(false)
      setShowServices(true)
      setShowEstadistics(false)
     }

     const showEstadisticsMenu = () => { 
      setShowJobs(false)
      setShowClients(false)
      setShowServices(false)
      setShowEstadistics(true)
     }


  return (
    
      <div className='flex flex-col items-center justify-center text-center w-full  h-full '>
          <div className='w-[1200px] xl:w-[1280px] 2xl:w-[1350px] 3xl:w-[1700px] '>
                 <Navbar showClients={showClientsMenu} showJobs={showJobsMenu} showServices={showServicesMenu} showEstadistics={showEstadisticsMenu}/>
          </div>

         {showJobs === true ? 
            <MainCleaningData/> : 
                showClients === true ? ( 
                    <MainClientsDetail/>
                       ) : showServices === true ? ( 
                              <MainServicesData/>
                       ) : showEstadistics === true ? ( 
                               <MainEstadisticsData/>
                       ) : null
          }
      </div>
  )
}

export default MainApp
