import { JobType } from 'types/JobsTypes'
import fil from "../../images/fil.png"
import JobDetail from '../JobDetail/JobDetail';
import { useState } from 'react';
import AddNewJobButton from './AddNewJobButton';
import AddNewJobForm from './AddNewJobForm';
import { ClientType } from 'types/ClientsTypes';
import JobCard from './JobCard';
 

interface Props {
    jobsData: JobType[];
    every: JobType[];
    finished: JobType[];
    inProcess: JobType[];
    paid: JobType[];
    pendingCollections: JobType[];
    todayJobs: JobType[];
    yesterdayJobs: JobType[];
    monthsJobs: JobType[];
    thisWeekJobs: JobType[];
    thisYearJobs: JobType[];
    userClientsData: ClientType[];
    updateJobs: () => void;
    filter: (value: string) => void; 
    changeTypeOfJob: (data: JobType[] | [], type: string) => void;
    typeOfJobsSelected: string
}

const CleaningDetailCard = 
   ({jobsData, userClientsData, finished, inProcess, paid, every, todayJobs, 
    yesterdayJobs, monthsJobs, thisWeekJobs, thisYearJobs, pendingCollections, changeTypeOfJob, typeOfJobsSelected, updateJobs, filter}: Props) => {

    const [jobSelected, setJobSelected] = useState<JobType | undefined>()
    const [showNewJob, setShowNewJob] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>("")
    const [showSecondNav, setShowSecondNav] = useState<boolean>(false)


    const addNewJobNow = () => { 
        setShowNewJob(true)
    }

    const viwJobDetail = (item: JobType) => { 
        console.log("recibi a", item)
        setShowNewJob(false)
        setJobSelected(item)
    }

    const restartJobSelected = () => { 
        setJobSelected(undefined)
    }

    const goBack = () => { 
        setShowNewJob(false)
        setJobSelected(undefined)
    }

    const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setInputValue(e.target.value);
        filter(e.target.value); 
    };

    const changeNavBar = () => { 
        setShowSecondNav(!showSecondNav)
    }

    

  return (

    <div className='flex gap-4'>
            <div className='flex flex-col items-start justify-start w-2/5 ml-2  '>
                <div className='mt-2 w-full flex justify-center '>
                   <AddNewJobButton add={addNewJobNow} />
                </div>
                <div className='flex items-center gap-5 2xl:gap-6 mt-2 w-full '>
                   <input type="text" name="search" placeholder='Buscar' className=" mt-1s w-3/4 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                    value={inputValue}
                    onChange={handleChangeInputValue}
                   />
                 <img src={fil} className='h-6 w-6 cursor-pointer' onClick={() => changeNavBar()}/>
                </div>

                 {showSecondNav ? 
                    <div className='flex w-full justify-start items-center gap-6 2xl:gap-12 mt-4 ml-1'>
                        <p className={`text-sm cursor-pointer font-medium ${typeOfJobsSelected === "today" ? 'text-white bg-blue-500 p-1' : 'text-zinc-600'}`}  onClick={() => changeTypeOfJob(todayJobs, "today")}>Solo Hoy</p>
                        <p className={`text-sm cursor-pointer font-medium ${typeOfJobsSelected === "yesterday" ? 'text-white bg-blue-500 p-1' : 'text-zinc-600'}`} onClick={() => changeTypeOfJob(yesterdayJobs, "yesterday")}>Solo Ayer</p>
                        <p className={`text-sm cursor-pointer font-medium ${typeOfJobsSelected === "thisMonth" ? 'text-white bg-blue-500 p-1' : 'text-zinc-600'}`} onClick={() => changeTypeOfJob(monthsJobs, "thisMonth")}>Este Mes</p>
                        <p className={`text-sm cursor-pointer font-medium ${typeOfJobsSelected === "thisWeek" ? 'text-white bg-blue-500 p-1' : 'text-zinc-600'}`} onClick={() => changeTypeOfJob(thisWeekJobs, "thisWeek")}>Esta Semana</p>
                        <p className={`text-sm cursor-pointer font-medium ${typeOfJobsSelected === "thisYear" ? 'text-white bg-blue-500 p-1' : 'text-zinc-600'}`} onClick={() => changeTypeOfJob(thisYearJobs, "thisYear")}>Este Año</p>
                    </div> 
                    : 
                    <div className='flex w-full justify-start items-center gap-4 2xl:gap-12 mt-4 ml-1'>
                        <p className={`text-sm cursor-pointer font-medium  ${typeOfJobsSelected === "every" ? 'text-white bg-blue-500 p-1' : 'text-zinc-600'}`}  onClick={() => changeTypeOfJob(every, "every")}>Todos</p>
                        <p className={`text-sm cursor-pointer font-medium  ${typeOfJobsSelected === "finished" ? 'text-white bg-blue-500  p-1' : 'text-zinc-600'}`} onClick={() => changeTypeOfJob(finished, "finished")}>Finalizados</p>
                        <p className={`text-sm cursor-pointer font-medium  ${typeOfJobsSelected === "inProcess" ? 'text-white bg-blue-500  p-1' : 'text-zinc-600'}`} onClick={() => changeTypeOfJob(inProcess, "inProcess")}>Sin Finalizar</p>
                        <p className={`text-sm cursor-pointer font-medium  ${typeOfJobsSelected === "pendingCollections" ? 'text-white bg-blue-500 p-1' : 'text-zinc-600'}`} onClick={() => changeTypeOfJob(pendingCollections, "pendingCollections")}>Sin Abonar</p>
                        <p className={`text-sm cursor-pointer font-medium  ${typeOfJobsSelected === "paid" ? 'text-white bg-blue-500  p-1' : 'text-zinc-600'}`} onClick={() => changeTypeOfJob(paid, "paid")}>Abonados</p>
                    </div>}

                <div className='max-h-[450px] 2xl:max-h-[645px] 3xl:max-h-[745px] overflow-y-auto w-full'>  
                    {jobsData.length > 0 ? 
                        <div>
                            <JobCard jobs={jobsData} viwJobDetail={viwJobDetail}/>
                        </div> : 
                        <div className='flex flex-col items-center justify-center mt-24'>
                            <p className='font-medium text-zinc-500'>No cuentas con lavados registrados</p>
                        </div>}
                </div>
                
           </div>

           <div className='h-full w-4/5'>
               {
                !showNewJob ?
                <JobDetail  clients={userClientsData} detail={jobSelected} updateJobs={updateJobs} restart={restartJobSelected}/> 
                 : 
                <AddNewJobForm clients={userClientsData} updateJobs={updateJobs} goBack={goBack}/>
               }
           </div>
    </div>
  )
}

export default CleaningDetailCard
