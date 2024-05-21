import Loading from '../Spinner/Loading'
import { useState } from 'react'
import { useEffect } from 'react'
import getMyJobs from '../../functions/ApiQuerys/GetJobs'
import { JobType } from '../../types/JobsTypes'
import CleaningDetailCard from './CleaningDetailCard'
import getMyClients from '../../functions/ApiQuerys/MyClients'
import { ClientType } from 'types/ClientsTypes'

const CleaningList = () => {

    const [everyJobsList, setEveryJobsList] = useState<JobType[]>([])
    const [userClients, setUserClients] = useState<ClientType[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchJobs = async () => {
            const jobs : JobType[] = await getMyJobs();
            setEveryJobsList(jobs); 
        };
        fetchJobs(); 
        setLoading(false)
    
    }, []);

    useEffect(() => {
      const fetchClients = async () => {
          const clients : ClientType[] = await getMyClients();
          setUserClients(clients); 
      };
      fetchClients(); 
  }, []);

    


   
  return (
    <div >
       {loading ? <Loading/> :  <CleaningDetailCard jobsData={everyJobsList} userClientsData={userClients}/>}
    </div>
  )
}

export default CleaningList
