import Loading from '../Spinner/Loading'
import { useState } from 'react'
import { useEffect } from 'react'
import getMyJobs from '../../functions/ApiQuerys/GetJobs'
import { JobType } from '../../types/JobsTypes'
//import CleaningDetailCard from './CleaningDetailCard'


const CleaningList = () => {

    const [myClients, setMyClients] = useState<JobType[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchJobs = async () => {
            const jobs : JobType[] = await getMyJobs();
            setMyClients(jobs); 
        };
        fetchJobs(); 
        setLoading(false)
    
    }, []);

    useEffect(() => { 
        console.log(myClients)
    }, [myClients])
   
  return (
    <div >
    </div>
  )
}

export default CleaningList
