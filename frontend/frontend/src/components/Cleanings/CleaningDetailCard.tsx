import { JobType } from 'types/JobsTypes'
import formatDate from '../../functions/TransformDateHour/TransformDate';
import formatHourToText from '../../functions/TransformDateHour/TransformHour';
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

    const [jobSelected, setJobSelected] = useState<JobType | undefined>()
    const [showNewJob, setShowNewJob] = useState<boolean>(false)

    const addNewJobNow = () => { 
        setShowNewJob(true)
    }

    const viwJobDetail = (item: JobType) => { 
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

  return (

    <div className='flex gap-4'>
            <div className='flex flex-col items-start justify-start w-2/5 ml-2 '>
                <div className='mt-2 w-full flex justify-start'>
                   <AddNewJobButton add={addNewJobNow} />
                </div>
                <div className='max-h-[420px] 2xl:max-h-[645px] overflow-y-auto w-full '>  
                {jobsData.map((job: JobType) => ( 
                    <div className='mt-8 w-full cursor-pointer' key={job._id} onClick={() => viwJobDetail(job)}>
                            <div className='flex items-start text-start justify-start' key={job._id}>
                                <p className='font-medium text-sm text-blue-500'>{job.client.name}</p>
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
                            <div className='flex items-center mt-2 '>
                               <p className='font-medium text-black text-sm'>Lavado: {job.status === "pending" ? <span className='bg-red-300 text-white font-medium'>Pendiente</span> :
                               <span className='bg-green-300 text-white font-medium'>Completado</span>}</p> 
                            </div>
                            <div className='flex items-center mt-2 '>
                              <p className='font-medium text-black text-sm'>Fecha: {formatDate(job.date)}</p>
                            </div>
                            <div className='flex items-center justify-between mt-1 mb-2'>     
                            <p className='font-medium text-black text-sm'>Horario: {formatHourToText(job.hour)}</p>
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
