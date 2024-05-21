import { ClientType } from "types/ClientsTypes"
import { useEffect } from "react";

interface Props { 
    detail: ClientType | undefined
}

const ClientDetail = ({ detail }: Props) => {

    useEffect(() => { 
        console.log("ClientDetail", detail)
    }, [detail])


        return (
            <div className="flex flex-col items-center justify-center ">

           lala

            </div>
            
          );
    
  
  };

export default ClientDetail
