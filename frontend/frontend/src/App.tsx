import { useState } from 'react';
import './App.css'
import MainCleaningData from './components/Main/MainCleaningData';
import Navbar from './components/Navbar/Navbar';
import MainClientsDetail from './components/Main/MainClientsDetail';


function App() {
  
     const [showJobs, setShowJobs] = useState<boolean>(true)
     const [showClients, setShowClients] = useState<boolean>(false)

     const showClientsMenu = () => { 
       setShowJobs(false)
       setShowClients(true)
       console.log("a")
     }

     const showJobsMenu = () => { 
      setShowJobs(true)
      setShowClients(false)
     }


  return (
    
      <div className='flex flex-col items-center h-screen justify-center text-center w-full'>
          <div className=' xl:w-[1180px] 2xl:w-[1200px] 3xl:w-[1400px]'>
                 <Navbar showClients={showClientsMenu} showJobs={showJobsMenu}/>
          </div>

         {showJobs === true ? 

            <MainCleaningData/> : 

            showClients === true ? ( 

              <MainClientsDetail/>

            ) : null
          }

      </div>
  )
}

export default App
