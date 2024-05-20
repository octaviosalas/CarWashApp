import transformPrice from "../../functions/TransformDateHour/TransformPrice";
import { JobType } from "types/JobsTypes"
import NavItemActions from "../NavItemActions/NavItemActions";
import { useEffect } from "react";

interface Props { 
    detail: JobType | undefined
}

const JobDetail = ({ detail }: Props) => {

    useEffect(() => { 
        console.log("JobDetail", detail)
    }, [detail])


        return (
            <div className="flex flex-col items-center justify-center ">

               {detail === undefined ? 
               <div className="flex items-center t-center text-center mt-24">
                  <p>No has seleccionado ningun lavado</p>
               </div>
               :
               <>
               <div className="mt-4 w-full">
                    <NavItemActions/>
                </div>
               <div className="flex flex-col items-start justify-start text-start w-full mt-8">
                    <div className="flex flex-col items-start text-start">
                        <p className="text-md font-medium text-black">Cliente</p>
                        <p>{detail.client.name.toUpperCase()}</p>
                    </div>
                    <div className="flex flex-col items-start text-start mt-3">
                        <p className="text-md font-medium text-black">{detail.vehicle.typeOfVehicle}</p>
                        <p>{detail.vehicle.description}</p>
                    </div>
                    <div className="flex flex-col items-start text-start mt-3">
                        <p className="text-md font-medium text-black underline">Servicios:</p>
                        <p>{detail.typeOfJob}</p>
                    </div>
                    <div className="flex flex-col items-start text-start mt-3">
                        <p className="text-md font-medium text-black">Total:</p>
                        <p>{transformPrice(detail.amount)}</p>
                    </div>
               </div>
               </> }

            </div>
            
          );
    
  
  };

export default JobDetail
