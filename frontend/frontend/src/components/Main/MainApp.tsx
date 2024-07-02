import { useState } from 'react';
import MainCleaningData from './MainCleaningData';
import Navbar from '../Navbar/Navbar';
import MainClientsDetail from './MainClientsDetail';
import "react-toastify/dist/ReactToastify.css"
import MainServicesData from './MainServicesData';
import MainEstadisticsData from '../Estadistics/MainEstadisticsData';
import MainMyAccount from './MainMyAccount';

function MainApp() {
  
     const [showJobs, setShowJobs] = useState<boolean>(true)
     const [showClients, setShowClients] = useState<boolean>(false)
     const [showServices, setShowServices] = useState<boolean>(false)
     const [showEstadistics, setShowEstadistics] = useState<boolean>(false)
     const [showMyAccount, setShowMyAccount] = useState<boolean>(false)

     const showClientsMenu = () => { 
       setShowJobs(false)
       setShowClients(true)
       setShowServices(false)
       setShowEstadistics(false)
       setShowMyAccount(false)
     }

     const showJobsMenu = () => { 
      setShowJobs(true)
      setShowClients(false)
      setShowServices(false)
      setShowMyAccount(false)
      setShowEstadistics(false)
     }

     const showServicesMenu = () => { 
      setShowJobs(false)
      setShowClients(false)
      setShowServices(true)
      setShowMyAccount(false)
      setShowEstadistics(false)
     }

     const showEstadisticsMenu = () => { 
      setShowJobs(false)
      setShowClients(false)
      setShowServices(false)
      setShowEstadistics(true)
      setShowMyAccount(false)
     }

     const showMyAccountMenu = () => { 
      setShowJobs(false)
      setShowClients(false)
      setShowServices(false)
      setShowEstadistics(false)
      setShowMyAccount(true)
     }


  return (
    
      <div className='flex flex-col items-center justify-center text-center '>
          <div className='w-auto '>
              <Navbar showClients={showClientsMenu} showJobs={showJobsMenu} showServices={showServicesMenu} showEstadistics={showEstadisticsMenu} showMyAccountMenu={showMyAccountMenu}/>
          </div>

         {showJobs === true ? 
            <MainCleaningData/> : 
                showClients === true ? ( 
                    <MainClientsDetail/>
                       ) : showServices === true ? ( 
                              <MainServicesData/>
                       ) : showEstadistics === true ? ( 
                               <MainEstadisticsData/>
                       ) : showMyAccount === true ? ( 
                               <MainMyAccount/>
                       ) : null
          }
      </div>
  )
}

export default MainApp


/* 
import { useState } from 'react';
import MainCleaningData from './MainCleaningData';
import Navbar from '../Navbar/Navbar';
import MainClientsDetail from './MainClientsDetail';
import "react-toastify/dist/ReactToastify.css"
import MainServicesData from './MainServicesData';
import MainEstadisticsData from '../Estadistics/MainEstadisticsData';
import MainMyAccount from './MainMyAccount';

function MainApp() {
  
     const [showJobs, setShowJobs] = useState<boolean>(true)
     const [showClients, setShowClients] = useState<boolean>(false)
     const [showServices, setShowServices] = useState<boolean>(false)
     const [showEstadistics, setShowEstadistics] = useState<boolean>(false)
     const [showMyAccount, setShowMyAccount] = useState<boolean>(false)

     const showClientsMenu = () => { 
       setShowJobs(false)
       setShowClients(true)
       setShowServices(false)
       setShowEstadistics(false)
       setShowMyAccount(false)
     }

     const showJobsMenu = () => { 
      setShowJobs(true)
      setShowClients(false)
      setShowServices(false)
      setShowMyAccount(false)
      setShowEstadistics(false)
     }

     const showServicesMenu = () => { 
      setShowJobs(false)
      setShowClients(false)
      setShowServices(true)
      setShowMyAccount(false)
      setShowEstadistics(false)
     }

     const showEstadisticsMenu = () => { 
      setShowJobs(false)
      setShowClients(false)
      setShowServices(false)
      setShowEstadistics(true)
      setShowMyAccount(false)
     }

     const showMyAccountMenu = () => { 
      setShowJobs(false)
      setShowClients(false)
      setShowServices(false)
      setShowEstadistics(false)
      setShowMyAccount(true)
     }


  return (
    
      <div className='flex flex-col items-center justify-center text-center w-full  h-full '>
          <div className='w-[1200px] xl:w-[1280px] 2xl:w-[1350px] 3xl:w-[1700px] '>
                 <Navbar showClients={showClientsMenu} showJobs={showJobsMenu} showServices={showServicesMenu} showEstadistics={showEstadisticsMenu} showMyAccountMenu={showMyAccountMenu}/>
          </div>

         {showJobs === true ? 
            <MainCleaningData/> : 
                showClients === true ? ( 
                    <MainClientsDetail/>
                       ) : showServices === true ? ( 
                              <MainServicesData/>
                       ) : showEstadistics === true ? ( 
                               <MainEstadisticsData/>
                       ) : showMyAccount === true ? ( 
                               <MainMyAccount/>
                       ) : null
          }
      </div>
  )
}

export default MainApp

*/