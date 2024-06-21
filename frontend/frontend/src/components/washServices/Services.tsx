import { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import apiBackendUrl from "../../lib/axios"
import { ServiceType } from "types/ServicesTypes";
import Loading from "../Spinner/Loading";
import CreateService from "./CreateService";
import transformPrice from "../../functions/TransformDateHour/TransformPrice"
import { userStore } from "../../store/store";

const Services = () => {

  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [withOutServices, setWithOutServices] = useState<boolean>(false)
  const [services, setServices] = useState<ServiceType[]>([])
  const [load, setLoad] = useState<boolean>(false)
  const [showCreateNew, setShowCreateNew] = useState<boolean>(false)
  const user = userStore(state => state.user)

  const getMyServices = async () => {
    setLoad(true)
    try {
        const {data} = await apiBackendUrl.get(`/services/myServices/${user?._id}`) 
        const response = data
        console.log("servicios", response)
        if(response.length > 0) { 
          setServices(response)
          setWithOutServices(false)
          setLoad(false)
        } else { 
          setWithOutServices(true)
          setLoad(false)
        }
      } catch (error) {
        console.log(error)
      }
  
  }


  const handleOpen = async () => { 
        onOpen()
        getMyServices()
       
  }

  const closeModalNow = () => { 
    onClose()
    setShowCreateNew(false)
    setWithOutServices(false)
  }

  return (
    <>
      <svg onClick={handleOpen} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-6 h-6 cursor-pointer">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
      </svg>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Mis Servicios</ModalHeader>
              <ModalBody className="flex flex-col justify-center items-center">
                {load ? (
                  <Loading/>
                ) : withOutServices ? ( 
                  <div className="flex items-center justify-center">
                     <p>No tenes servicios guardados</p>
                  </div>
                ) : withOutServices === false && services.length > 0 ? (
                  <div>
                      {services.map((c: ServiceType) => ( 
                        <div className="flex justify-between gap-12">
                           <p>{c.service}</p>
                           <p>{transformPrice(c.price)}</p>
                        </div>
                      ))}
                     </div>   
                 ) : null}
              </ModalBody>
              
              <ModalFooter className="flex items-center justify-center">
               {showCreateNew !== true ?
                 <div  className="flex w-full items-center justify-center gap-2 "> 
                    <Button className="bg-blue-500 text-white font-medium text-md w-40" onClick={() => setShowCreateNew(true)}>
                       Nuevo Servicio
                    </Button>
                    <Button className="bg-blue-500 text-white font-medium text-md w-40"  onPress={onClose}>
                      Cerrar
                    </Button>
                  </div>
                :
                  <div>
                    <CreateService closeModal={closeModalNow} updateServices={getMyServices}/>
                  </div> 
                }
              </ModalFooter>

            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Services