import Loading from '../Spinner/Loading'
import { useState } from 'react'
import { useEffect } from 'react'
import getMyJobs from '../../functions/ApiQuerys/GetJobs'
import { JobType } from '../../types/JobsTypes'
import CleaningDetailCard from './CleaningDetailCard'
import getMyClients from '../../functions/ApiQuerys/MyClients'
import { ClientType } from 'types/ClientsTypes'
import { userStore } from '../../store/store'
import { getDate, getYesterdayDate } from '../../functions/TransformDateHour/HourAndDate'

const CleaningList = () => {

 
    const [everyJobsList, setEveryJobsList] = useState<JobType[]>([])
    const [originalEveryJobsList, setOriginalEveryJobsList] = useState<JobType[]>([])
    const [pendingCollections, setPendingCollections] = useState<JobType[]>([])
    const [paidJobs, setPaidJobs] = useState<JobType[]>([])
    const [finishedJobs, setFinishedJobs] = useState<JobType[]>([])
    const [pendingJobs, setPendingJobs] = useState<JobType[]>([])
    const [todayJobs, setTodayJobs] = useState<JobType[]>([])
    const [yesterdayJobs, setYesterdayJobs] = useState<JobType[]>([])
    const [yearJobs, setYearJobs] = useState<JobType[]>([])
    const [monthsJobs, setMonthsJobs] = useState<JobType[]>([])
    const [thisWeekJobs, setThisWeekJobs] = useState<JobType[]>([])
    const [userClients, setUserClients] = useState<ClientType[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const user = userStore(state => state.user)
    const [typeOfJobsSelected, setTypeOfJobsSelected] = useState<string>("")

    const date = getDate()
    const yesterday = getYesterdayDate()

    const fetchJobs = async () => {
      setLoading(true)
      const jobs : JobType[] = await getMyJobs(user?._id);
      setEveryJobsList(jobs); 
      setOriginalEveryJobsList(jobs)
      const pendingJobsCollections = jobs.filter((job) => job.paid === false)
      const paidJobsCollections = jobs.filter((job) => job.paid === true)
      const jobsFinished = jobs.filter((job) => job.status === "completed")
      const jobsInProcess = jobs.filter((job) => job.status === "pending")

      const jobsToday = jobs.filter((job) => {
        const jobDate = new Date(job.date);
        return jobDate.toDateString() === date.toDateString();
      });  

      const jobsYesterday = jobs.filter((job) => {
        const jobDate = new Date(job.date);
        return jobDate.toDateString() === yesterday.toDateString();
      });  

      const thisMonthJobs = jobs.filter((job) => { 
        const date = new Date(job.date);
        const actualYear = new Date().getFullYear();
        const actualMonth = new Date().getMonth() + 1; 
        const yearData = date.getFullYear();
        const monthData = date.getMonth() + 1;
        return monthData === actualMonth && yearData === actualYear;
    });

        const today = new Date();
        const firstDayOfWeek = new Date(today); 
        firstDayOfWeek.setDate(today.getDate() - today.getDay() + 1); 
        const lastDayOfWeek = new Date(today); 
        lastDayOfWeek.setDate(today.getDate() - today.getDay() + 7); 
        const jobsThisWeek = jobs.filter((job) => {
            const jobDate = new Date(job.date);
            return jobDate >= firstDayOfWeek && jobDate <= lastDayOfWeek;
        });

        const jobsThisYear = jobs.filter((job) => {
          const jobDate = new Date(job.date);
          const currentYear = new Date().getFullYear();
          return jobDate.getFullYear() === currentYear;
        });

      setPendingCollections(pendingJobsCollections)
      setPaidJobs(paidJobsCollections)
      setFinishedJobs(jobsFinished)
      setPendingJobs(jobsInProcess)
      setTodayJobs(jobsToday)
      setYesterdayJobs(jobsYesterday)
      setMonthsJobs(thisMonthJobs)
      setThisWeekJobs(jobsThisWeek)
      setYearJobs(jobsThisYear)
      setLoading(false)
    };

    const fetchClients = async () => {
      const clients : ClientType[] = await getMyClients(user?._id);
      setUserClients(clients); 
    };

    useEffect(() => {   
        fetchJobs(); 
        fetchClients(); 
       
    }, []);

    const filterJobsByInput = (value: string) => { 
      if (!value.trim()) {
        setEveryJobsList(originalEveryJobsList);
        setTypeOfJobsSelected("every")
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

    const changeTypeOfJob = (data: JobType[] | [], type: string) => { 
     change(data)
     setTypeOfJobsSelected(type)
    }


  
  return (
    <div >
       {loading ? 

          <div className='flex flex-col items-center justify-center mt-24 2xl:mt-40'> 
              <Loading/> 
          </div> :

          <CleaningDetailCard  
            filter={filterJobsByInput} inProcess={pendingJobs} 
            finished={finishedJobs}  jobsData={everyJobsList} 
            pendingCollections={pendingCollections}  paid={paidJobs} 
            every={originalEveryJobsList} todayJobs={todayJobs} 
            yesterdayJobs={yesterdayJobs}  monthsJobs={monthsJobs} thisYearJobs={yearJobs}
            thisWeekJobs={thisWeekJobs} userClientsData={userClients} 
            updateJobs={fetchJobs}  changeTypeOfJob={changeTypeOfJob} typeOfJobsSelected={typeOfJobsSelected}/>}

    </div>
  )
}

export default CleaningList
