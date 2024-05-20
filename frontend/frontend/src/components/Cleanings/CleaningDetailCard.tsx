import { JobType } from 'types/JobsTypes'
import formatDate from '../../functions/TransformDateHour/TransformDate';
import car from "../../images/car.png"
import moto from "../../images/moto.png"
import email from "../../images/email.png"
import notified from "../../images/notified.png"
import transformPrice from '../../functions/TransformDateHour/TransformPrice';
import JobDetail from '../JobDetail/JobDetail';
import { useEffect, useState } from 'react';

interface Props {
    jobsData: JobType[];
}

const CleaningDetailCard = ({jobsData}: Props) => {

    const [jobSelected, setJobSelected] = useState<JobType>()

    useEffect(() => { 
      console.log(jobSelected)
    }, [jobSelected])

  return (

    <div className='flex gap-4'>
            <div className=' max-h-[645px] overflow-y-auto flex flex-col items-start justify-start w-2/5 ml-2'>
                {jobsData.map((job: JobType) => ( 
                    <div className='mt-4 w-full' onClick={() => setJobSelected(job)}>
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

           <div className=' h-full w-4/5'>
               <JobDetail detail={jobSelected}/>
           </div>
    </div>
   
 
  )
}

export default CleaningDetailCard
