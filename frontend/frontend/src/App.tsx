import { useState } from 'react';
import './App.css'
import MainCleaningData from './components/Main/MainCleaningData';
import Navbar from './components/Navbar/Navbar';
import MainClientsDetail from './components/Main/MainClientsDetail';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import MainServicesData from './components/Main/MainServicesData';
import MainEstadisticsData from './components/Estadistics/MainEstadisticsData';

function App() {
  
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
    
      <div className='flex flex-col items-center justify-center text-center w-full  h-full'>
          <div className=' xl:w-[1280px] 2xl:w-[1350px] 3xl:w-[1700px] '>
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
        <ToastContainer />
      </div>
  )
}

export default App
