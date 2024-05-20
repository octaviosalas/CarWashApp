import Loading from '../Spinner/Loading'
import { useState } from 'react'
import { useEffect } from 'react'
import getMyJobs from '../../functions/ApiQuerys/GetJobs'
import { JobType } from '../../types/JobsTypes'
import CleaningDetailCard from './CleaningDetailCard'


const CleaningList = () => {

    const [everyJobsList, setEveryJobsList] = useState<JobType[]>([])
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
        console.log(everyJobsList)
    }, [everyJobsList])
   
  return (
    <div >
       {loading ? <Loading/> :  <CleaningDetailCard jobsData={everyJobsList}/>}
    </div>
  )
}

export default CleaningList
