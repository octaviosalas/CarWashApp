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

    const fetchJobs = async () => {
      const jobs : JobType[] = await getMyJobs();
      setEveryJobsList(jobs); 
    };

    const fetchClients = async () => {
      const clients : ClientType[] = await getMyClients();
      setUserClients(clients); 
  };

    useEffect(() => {   
        fetchJobs(); 
        fetchClients(); 
        setLoading(false)
    }, []);

   
  return (
    <div >
       {loading ? <Loading/> :  <CleaningDetailCard jobsData={everyJobsList} userClientsData={userClients} updateJobs={fetchJobs}/>}
    </div>
  )
}

export default CleaningList