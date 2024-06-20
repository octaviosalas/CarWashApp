import transformPrice from "../../functions/TransformDateHour/TransformPrice";
import { JobType } from "types/JobsTypes"
import NavItemActions from "../NavItemActions/NavItemActions";
import { useEffect, useState } from "react";
import { ServiceType } from "types/ServicesTypes";
import formatDate from "../../functions/TransformDateHour/TransformDate";
import formatHourToText from "../../functions/TransformDateHour/TransformHour";
import EditJobForm from "../Cleanings/EditJobForm";
import { ClientType } from "types/ClientsTypes";
import DeleteJob from "../Cleanings/DeleteJob";
import MarkPayJob from "../Cleanings/MarkPayJob";
import MarkJobAsFinished from "../Cleanings/MarkJobAsFinished";

interface Props { 
    detail: JobType | undefined,
    clients: ClientType[],
    updateJobs: () => void,
    restart: () => void
}

const JobDetail = ({ detail, clients, updateJobs, restart }: Props) => {

        const [showJobDetail, setShowJobDetail] = useState<boolean>(true)
        const [showEditJobForm, setShowEditJobForm] = useState<boolean>(false)
        const [showDeleteJob, setShowDeleteJob] = useState<boolean>(false)
        const [showPaidJob, setShowPaidJob] = useState<boolean>(false)
        const [showCompletedJob, setShowCompletedJob] = useState<boolean>(false)

        const editJobData = () => { 
            setShowDeleteJob(false)
            setShowEditJobForm(true)
            setShowJobDetail(false)
            setShowPaidJob(false)
            setShowCompletedJob(false)
        }

        const deleteJob = () => { 
            setShowEditJobForm(false)
            setShowJobDetail(false)
            setShowPaidJob(false)
            setShowDeleteJob(true)
            setShowCompletedJob(false)
        }

        const markJobAsPaid = () => { 
            setShowEditJobForm(false)
            setShowJobDetail(false)
            setShowDeleteJob(false)
            setShowPaidJob(true)
            setShowCompletedJob(false)
        }

        const completedJob = () => { 
            setShowEditJobForm(false)
            setShowJobDetail(false)
            setShowDeleteJob(false)
            setShowPaidJob(false)
            setShowCompletedJob(true)
        }

        const goBackDetail = () => { 
            setShowEditJobForm(false)
            setShowJobDetail(true)
            setShowDeleteJob(false)
            setShowPaidJob(false)
            setShowCompletedJob(false)

        }

       

        return (
            <div className="flex flex-col items-center justify-center w-full">

               {detail === undefined ? 

               <div className="flex items-center t-center text-center mt-36">
                  <p className="text-zinc-500 text-lg">No has seleccionado ningun elemento para mostrar</p>
               </div>
               :
               <>
                <div className="mt-4 w-full border-b">
                   <NavItemActions viewEdit={editJobData} viewDelete={deleteJob} viewPay={markJobAsPaid} viewCompletedJob={completedJob}/>
                </div>

                {showJobDetail ?
                    <div className="flex flex-col items-start justify-start text-start w-full mt-8">
                            <div>
                                {detail.paid === false ? 
                                  <p className="bg-red-600 text-white font-medium text-center text-md w-52">Pendiente de pago</p> 
                                : <p className="bg-blue-500 text-white font-medium text-center text-md w-52">Abonado</p>}
                            </div>
                            <div className="flex flex-col items-start text-start mt-2">
                                <p className="text-md font-medium text-black underline">Cliente</p>
                                <p className="">{detail.client.name.toUpperCase()}</p>
                            </div>
                            <div className="flex flex-col items-start text-start mt-3">
                                <p className="text-md font-medium text-black underline">{detail.vehicle.typeOfVehicle}</p>
                                <p>{detail.vehicle.description}</p>
                            </div>
                            <div className="flex flex-col items-start text-start mt-3">
                                <p className="text-md font-medium text-black underline">Servicios:</p>
                                {detail.typeOfJob.map((det: ServiceType) => ( 
                                    <p>{det.service}</p>
                                ))}
                            </div>
                            <div className="flex flex-col items-start text-start mt-3">
                                <p className="text-md font-medium text-black underline">Fecha:</p>
                                <p>{formatDate(detail.date)}</p>
                            </div>
                            <div>
                                <p className="text-md font-medium text-black underline">Hora:</p>
                                <p>{formatHourToText(detail.hour)}</p>
                            </div>
                            <div className="flex flex-col items-start text-start mt-3">
                                <p className="text-md font-medium text-black">Total:</p>
                                <p>{transformPrice(detail.amount)}</p>
                            </div>
                    </div>
                : null}

                <div className="w-full">
                    {showEditJobForm ? <EditJobForm detail={detail} clients={clients} goBack={goBackDetail} updateJobs={updateJobs}/> : null}
                    {showDeleteJob ? <DeleteJob detail={detail} goBack={goBackDetail} updateJobs={updateJobs} restart={restart}/> : null}
                    {showPaidJob ?   <MarkPayJob detail={detail} goBack={goBackDetail} updateJobs={updateJobs} restart={restart}/> : null}
                    {showCompletedJob ?   <MarkJobAsFinished detail={detail} goBack={goBackDetail} updateJobs={updateJobs} restart={restart}/> : null}
                </div>

              

               </> 
               
               }

            </div>
            
          );
    
  
  };

export default JobDetail
