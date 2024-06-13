import React from 'react'
import { JobType } from 'types/JobsTypes'
import car from "../../images/car.png"
import moto from "../../images/moto.png"
import camioneta from "../../images/camioneta.png"
import email from "../../images/email.png"
import notified from "../../images/notified.png"
import formatDate from '../../functions/TransformDateHour/TransformDate';
import formatHourToText from '../../functions/TransformDateHour/TransformHour';
import transformPrice from '../../functions/TransformDateHour/TransformPrice';


interface Props { 
    jobs: JobType[],
    viwJobDetail: (job: JobType) => void
}

const JobCard = ({jobs, viwJobDetail}: Props) => {
    console.log(jobs)
  return (
    <div>
                            {jobs.map((job: JobType) => ( 
                                <div className='mt-2 2xl:mt-4 w-full cursor-pointer hover:bg-blue-100' key={job._id} onClick={() => viwJobDetail(job)}>
                                        <div className='flex items-start text-start justify-start' key={job._id}>
                                            <p className='font-medium text-md text-blue-500'>{job.client.name}</p>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            {job.vehicle.typeOfVehicle === "Auto" ? 
                                                <img className='w-6 h-8' src={car}/> : 
                                                job.vehicle.typeOfVehicle === "Moto" ? ( 
                                                    <img className='w-6 h-8' src={moto} />
                                                ) : (
                                                <img className='w-6 h-8' src={camioneta} />
                                                ) 
                                            
                                            } 
                                            <p className='font-medium text-black text-md'>{job.vehicle.description}</p>
                                        </div>
                                        <div className='flex items-center'>
                                            {
                                            job.paid == true ? 
                                            <p className='text-green-600 text-md font-medium'>Abonado - {transformPrice(job.amount)}</p> :
                                            <p className='text-red-600 font-medium text-md'>Pendiente de Pago - {transformPrice(job.amount)}</p>
                                            }
                                        </div>
                                        <div className='flex items-center mt-2 '>
                                        <p className='font-medium text-black text-md'>Lavado: {job.status === "pending" ? <span className='bg-red-300 text-white font-medium'>Pendiente</span> :
                                        <span className='bg-green-300 text-white font-medium'>Completado</span>}</p> 
                                        </div>
                                        <div className='flex items-center mt-2 '>
                                        <p className='font-medium text-black text-md'>Fecha: {formatDate(job.date)}</p>
                                        </div>
                                        <div className='flex items-center justify-between mt-1 mb-2'>     
                                        <p className='font-medium text-black text-md'>Horario: {formatHourToText(job.hour)}</p>
                                        {
                                        job.notified === false ? <img title='Notificar via Email' className='cursor-pointer w-5 h-5 mr-2' src={email}/> 
                                        : 
                                        <img title='Notificado' className='cursor-pointer w-5 h-5 mr-2' src={notified}/>
                                        }
                                        </div>
                                </div>  
                            ))}
                        </div>
  )
}

export default JobCard
