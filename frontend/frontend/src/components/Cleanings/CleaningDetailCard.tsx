import { JobType } from 'types/JobsTypes'
import formatDate from '../../functions/TransformDateHour/TransformDate';
import car from "../../images/car.png"
import moto from "../../images/moto.png"
import email from "../../images/email.png"
import notified from "../../images/notified.png"
import transformPrice from '../../functions/TransformDateHour/TransformPrice';
import JobDetail from '../JobDetail/JobDetail';
import { useState } from 'react';
import AddNewJobButton from './AddNewJobButton';
import AddNewJobForm from './AddNewJobForm';
import { ClientType } from 'types/ClientsTypes';

interface Props {
    jobsData: JobType[];
    userClientsData: ClientType[];
    updateJobs: () => void;
}

const CleaningDetailCard = ({jobsData, userClientsData, updateJobs}: Props) => {

    const [jobSelected, setJobSelected] = useState<JobType>()
    const [showNewJob, setShowNewJob] = useState<boolean>(false)

    console.log("JOBDATA RECIBIDO", jobsData)
    
   const addNewJobNow = () => { 
    setShowNewJob(true)
   }

   const viwJobDetail = (item: JobType) => { 
    console.log(item)
    setShowNewJob(false)
    setJobSelected(item)
   }

  return (

    <div className='flex gap-4'>
            <div className='flex flex-col items-start justify-start w-2/5 ml-2 '>
                <div className='mt-2 w-full flex justify-start'>
                   <AddNewJobButton add={addNewJobNow}/>
                </div>
                <div className='max-h-[500px] 2xl:max-h-[645px] overflow-y-auto w-full '> 
                {jobsData.map((job: JobType) => ( 
                    <div className='mt-8 w-full cursor-pointer' onClick={() => viwJobDetail(job)}>
                            <div className='flex items-start text-start justify-start' key={job._id}>
                                <p className='font-medium text-sm text-blue-500'>{job.client.name.toUpperCase()}</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                {job.vehicle.typeOfVehicle === "Auto" ? 
                                    <img className='w-6 h-8' src={car}/> : 
                                    <img className='w-6 h-8' src={moto}/>
                                } 
                                <p className='font-medium text-black text-sm'>{job.vehicle.description}</p>
                            </div>
                            <div className='flex items-center'>
                                {
                                job.paid == true ? 
                                <p className='text-green-600 text-sm font-medium'>Abonado - {transformPrice(job.amount)}</p> :
                                <p className='text-red-600 font-medium text-sm'>Pendiente de Pago - {transformPrice(job.amount)}</p>
                                }
                            </div>
                            <div className='flex items-center justify-between mt-2 mb-2'>
                              <p className='font-medium text-black text-sm'>{formatDate(job.date)}</p>
                              {
                              job.notified === false ? <img title='Notificar via Email' className='cursor-pointer w-5 h-5 mr-2' src={email}/> 
                              : 
                              <img title='Notificado' className='cursor-pointer w-5 h-5 mr-2' src={notified}/>
                              }
                            </div>
                    </div>  
                ))}
             </div>
           </div>

           <div className=' h-full w-4/5'>
               {!showNewJob ? <JobDetail  clients={userClientsData} detail={jobSelected}/> : <AddNewJobForm clients={userClientsData} updateJobs={updateJobs}/>}
           </div>
    </div>
   
 
  )
}

export default CleaningDetailCard