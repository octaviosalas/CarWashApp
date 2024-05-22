import { useState } from 'react';
import './App.css'
import MainCleaningData from './components/Main/MainCleaningData';
import Navbar from './components/Navbar/Navbar';
import MainClientsDetail from './components/Main/MainClientsDetail';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

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
    
      <div className='flex flex-col items-center justify-center text-center w-full mt-6 h-full'>
          <div className='xl:w-[1180px] 2xl:w-[1200px] 3xl:w-[1600px] '>
                 <Navbar showClients={showClientsMenu} showJobs={showJobsMenu}/>
          </div>

         {showJobs === true ? 

            <MainCleaningData/> : 

            showClients === true ? ( 

              <MainClientsDetail/>

            ) : null
          }
        <ToastContainer />
      </div>
  )
}

export default App
