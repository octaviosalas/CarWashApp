import { ClientType } from "types/ClientsTypes"
import { useEffect } from "react";
import NavItemActionsClients from "../NavItemActions/NavItemActionsClients";
import apiBackendUrl from '../../lib/axios';
import {toast} from "react-toastify"
import { useState } from "react";
import axios from "axios";
import { ClientVehiclesType } from "types/VehiclesTypes";

interface Props { 
    detail: ClientType | undefined
    clientVehicles: ClientVehiclesType[]
}

const ClientDetail = ({ detail, clientVehicles }: Props) => {

 
    const userId: string = "6644b816b732651683c01b26";//id contexto
    const [load, setLoad] = useState<boolean>(false)
  
    useEffect(() => { 
      console.log("ClientDetail", detail)
      console.log("Client Vehicles", clientVehicles)
     }, [detail, clientVehicles])

 

        return (
          <div className="flex flex-col items-center justify-center  ">
              {detail === undefined ? 
               <div className="flex items-center justify-center mt-40">
                  <p className="text-lg text-zinc-500">No hay ningun elemento para mostrar</p>
               </div>  :
               <>
                <div className="mt-4 w-full border-b">
                   <NavItemActionsClients/>
                </div>
                 <div className=" w-full">
                    <div className="flex flex-col items-start justify-start text-start w-full mt-8 ">                    
                            <div className="flex flex-col items-start text-start mt-2">
                                <p className="text-md font-medium text-black">Cliente</p>
                                <p className="">{detail.name.toUpperCase()}</p>
                            </div>
                            <div className="flex flex-col items-start text-start mt-3">
                                <p className="text-md font-medium text-black underline">Dni:</p>
                                <p>{detail.dni}</p>
                            </div>
                            <div className="flex flex-col items-start text-start mt-3">
                                <p className="text-md font-medium text-black underline">Telefono:</p>
                                <p>{detail.telephone}</p>
                            </div>
                            <div className="flex flex-col items-start text-start mt-3">
                                <p className="text-md font-medium text-black underline">Email:</p>
                                <p>{detail.email}</p>
                            </div>   
                    </div>
                </div>
                <div className="mt-6">
                    {clientVehicles.length === 0 ?
                      <div>
                         <p>Este cliente no tiene vehiculos cargados</p>
                      </div> : 
                      <p>tiene</p>
                    }
                </div>
              </>
              }  
            </div>
            
          );
    
  
  };

export default ClientDetail
