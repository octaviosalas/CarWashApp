import transformPrice from "../../functions/TransformDateHour/TransformPrice";
import { JobType } from "types/JobsTypes"
import NavItemActions from "../NavItemActions/NavItemActions";
import { useEffect, useState } from "react";
import { ServiceType } from "types/ServicesTypes";
import formatDate from "../../functions/TransformDateHour/TransformDate";
import formatHourToText from "../../functions/TransformDateHour/TransformHour";
import EditJobForm from "../Cleanings/EditJobForm";
import { ClientType } from "types/ClientsTypes";

interface Props { 
    detail: JobType | undefined,
    clients: ClientType[]
}

const JobDetail = ({ detail, clients }: Props) => {

        const [showJobDetail, setShowJobDetail] = useState<boolean>(true)
        const [showEditJobForm, setShowEditJobForm] = useState<boolean>(false)

        const editJobData = () => { 
            setShowEditJobForm(true)
            setShowJobDetail(false)
        }

        const goBackDetail = () => { 
            setShowEditJobForm(false)
            setShowJobDetail(true)
        }

       

        return (
            <div className="flex flex-col items-center justify-center ">

               {detail === undefined ? 

               <div className="flex items-center t-center text-center mt-24">
                  <p>No has seleccionado ningun lavado</p>
               </div>
               :
               <>
                <div className="mt-4 w-full border-b">
                   <NavItemActions viewEdit={editJobData}/>
                </div>

                {showJobDetail ?
                    <div className="flex flex-col items-start justify-start text-start w-full mt-8">
                            <div className="flex flex-col items-start text-start">
                                <p className="text-md font-medium text-black">Cliente</p>
                                <p className="">{detail.client.name.toUpperCase()}</p>
                            </div>
                            <div className="flex flex-col items-start text-start mt-3">
                                <p className="text-md font-medium text-black">{detail.vehicle.typeOfVehicle}</p>
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

                {showEditJobForm ? <EditJobForm detail={detail} clients={clients} goBack={goBackDetail}/> : null}

               </> 
               
               }

            </div>
            
          );
    
  
  };

export default JobDetail
