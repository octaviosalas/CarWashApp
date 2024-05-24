import { ClientType } from "types/ClientsTypes"
import NavItemActionsClients from "../NavItemActions/NavItemActionsClients";
import { useState } from "react";
import { ClientVehiclesType } from "types/VehiclesTypes";
import { Button } from "@nextui-org/react";
import AddVehicle from "../ClientsData/AddVehicle";
import ClientVehiclesData from "../ClientsData/ClientVehiclesData";
import EditClientData from "../ClientsData/EditClientData";
import DeleteClient from "../ClientsData/DeleteClient";


interface Props { 
    detail: ClientType | undefined
    clientVehicles: ClientVehiclesType[],
    update: () => void,
    updateVehicles: (item: ClientType) => Promise<void>;
}

const ClientDetail = ({ detail, clientVehicles, update, updateVehicles }: Props) => {

 
    const [load, setLoad] = useState<boolean>(false)
    const [showAddVehicle, setShowAddVehicle] = useState<boolean>(false)
    const [showClientDetail, setShowClientDetail] = useState<boolean>(true)
    const [showEditClient, setShowEditClient] = useState<boolean>(false)
    const [showDeleteClient, setShowDeleteClient] = useState<boolean>(false)
    const [showAddVehicleComponent, setShowAddVehicleComponent] = useState<boolean>(false)

     const comeBackToDetail = () => { 
      setShowAddVehicle(false)
      setShowClientDetail(true)
      setShowDeleteClient(false)
      setShowAddVehicleComponent(false)
      setShowEditClient(false)
     }

     const showEditClientFunction = () => { 
      setShowClientDetail(false)
      setShowDeleteClient(false)
      setShowAddVehicleComponent(false)
      setShowEditClient(true)
     }

     const showDeleteClientFunction = () => { 
      setShowClientDetail(false)
      setShowDeleteClient(true)
      setShowAddVehicleComponent(false)
      setShowEditClient(false)
     }

     const showAddClientVehicleFunction = () => { 
      setShowClientDetail(false)
      setShowDeleteClient(false)
      setShowAddVehicleComponent(true)
      setShowEditClient(false)
     }


 

        return (
          <div className="flex flex-col items-center justify-center  ">
              {detail === undefined ? 
               <div className="flex items-center justify-center mt-40">
                  <p className="text-lg text-zinc-500">No hay ningun elemento para mostrar</p>
               </div>  :
               <>

                <div className="mt-4 w-full border-b">
                   <NavItemActionsClients viewEdit={showEditClientFunction} viewDelete={showDeleteClientFunction} viewAddVehicle={showAddClientVehicleFunction}/>
                </div>

               {showClientDetail ? 
                   <div className="w-full justify-start items-start"> 
                 <div className=" w-full">
                    <div className="flex flex-col items-start justify-start text-start w-full mt-1 2xl:mt-8 ">                    
                            <div className="flex flex-col items-start text-start mt-2">
                                <p className="text-md font-medium text-black">Cliente</p>
                                <p className="">{detail.name.toUpperCase()}</p>
                            </div>
                            <div className="flex flex-col items-start text-start mt-2 2xl:mt-3">
                                <p className="text-md font-medium text-black underline">Dni:</p>
                                <p>{detail.dni}</p>
                            </div>
                            <div className="flex flex-col items-start text-start mt-2 2xl:mt-3">
                                <p className="text-md font-medium text-black underline">Telefono:</p>
                                <p>{detail.telephone}</p>
                            </div>
                            <div className="flex flex-col items-start text-start mt-2 2xl:mt-3">
                                <p className="text-md font-medium text-black underline">Email:</p>
                                <p>{detail.email}</p>
                            </div>   
                    </div>
                </div>

                <div className="2xl:mt-6 w-full">

                    {clientVehicles.length === 0  && showAddVehicle === false ?

                      <div className="flex flex-col items-center justify-center w-full">
                         <p className="font-medium text-black text-md">Este cliente no tiene vehiculos cargados</p>
                         <Button className="bg-blue-500 hover:bg-blue-300 hover:text-black text-white font-medium w-2/4 mt-4" onClick={() => setShowAddVehicle(true)}>Agregar Vehiculo</Button>
                      </div> 

                      : clientVehicles.length !== 0 && showAddVehicle === false ? ( 
                         <ClientVehiclesData clientVehicles={clientVehicles}/>
                      ) : null
                    }

                    {showAddVehicle ? <div className="flex items-center justify-center"> <AddVehicle showArrow="false" cancel={comeBackToDetail} detail={detail} update={update} updateVehicles={updateVehicles}/> </div> : null}
                </div>
                   </div> 
               : null}

               {showEditClient ? <div className="w-full"> <EditClientData detail={detail}  goBack={comeBackToDetail} update={update}/> </div> : null}
               {showDeleteClient ? <div className="w-full"> <DeleteClient detail={detail}  goBack={comeBackToDetail} update={update}/> </div> : null}
               {showAddVehicleComponent ? <div className="w-full"> <AddVehicle showArrow="true" cancel={comeBackToDetail} detail={detail} update={update} updateVehicles={updateVehicles}/> </div> : null}


               

              </>
              }  
            </div>
            
          );
    
  
  };

export default ClientDetail
