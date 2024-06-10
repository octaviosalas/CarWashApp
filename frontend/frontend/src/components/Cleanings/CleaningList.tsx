import Loading from '../Spinner/Loading'
import { useState } from 'react'
import { useEffect } from 'react'
import getMyJobs from '../../functions/ApiQuerys/GetJobs'
import { JobType } from '../../types/JobsTypes'
import CleaningDetailCard from './CleaningDetailCard'
import getMyClients from '../../functions/ApiQuerys/MyClients'
import { ClientType } from 'types/ClientsTypes'
import { userStore } from '../../store/store'

const CleaningList = () => {

    const [everyJobsList, setEveryJobsList] = useState<JobType[]>([])
    const [originalEveryJobsList, setOriginalEveryJobsList] = useState<JobType[]>([])
    const [pendingCollections, setPendingCollections] = useState<JobType[]>([])
    const [paidJobs, setPaidJobs] = useState<JobType[]>([])
    const [finishedJobs, setFinishedJobs] = useState<JobType[]>([])
    const [pendingJobs, setPendingJobs] = useState<JobType[]>([])
    const [userClients, setUserClients] = useState<ClientType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const user = userStore(state => state.user)

    const fetchJobs = async () => {
      setLoading(true)
      const jobs : JobType[] = await getMyJobs(user?._id);
      setLoading(false)
      setEveryJobsList(jobs); 
      setOriginalEveryJobsList(jobs)
      const pendingJobsCollections = jobs.filter((job) => job.paid === false)
      const paidJobsCollections = jobs.filter((job) => job.paid === true)
      const jobsFinished = jobs.filter((job) => job.status === "completed")
      const jobsInProcess = jobs.filter((job) => job.status === "pending")
      setPendingCollections(pendingJobsCollections)
      setPaidJobs(paidJobsCollections)
      setFinishedJobs(jobsFinished)
      setPendingJobs(jobsInProcess)
    };

    const fetchClients = async () => {
      const clients : ClientType[] = await getMyClients(user?._id);
      setUserClients(clients); 
    };

    useEffect(() => {   
        fetchJobs(); 
        fetchClients(); 
        setLoading(false)
    }, []);

    const filterJobsByInput = (value: string) => { 
      if (!value.trim()) {
        setEveryJobsList(originalEveryJobsList);
      } else {
        const lowerCaseValue = value.toLowerCase();
        const filteredJobs = everyJobsList.filter((job) => 
          job.vehicle.description.toLowerCase().includes(lowerCaseValue) ||
          job.client.name.toLowerCase().includes(lowerCaseValue)
        );
        setEveryJobsList(filteredJobs);
      }
    };
    
   const change = (data: JobType[] | []) => { 
     setEveryJobsList(data)
   }


  
  return (
    <div >
       {loading ? 

          <div className='flex flex-col items-center justify-center mt-24 2xl:mt-40'> 
              <Loading/> 
          </div> :

          <CleaningDetailCard  
          filter={filterJobsByInput} change={change} inProcess={pendingJobs} 
          finished={finishedJobs}  jobsData={everyJobsList} pendingCollections={pendingCollections}  
          paid={paidJobs} every={originalEveryJobsList} userClientsData={userClients} updateJobs={fetchJobs}/>}

    </div>
  )
}

export default CleaningList
