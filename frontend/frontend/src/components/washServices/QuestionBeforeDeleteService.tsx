import { useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure} from "@nextui-org/react";
import { userStore } from '../../store/store'
import handleError from "../../utils/AxiosErrorFragment";
import Loading from "../Spinner/Loading";
import apiBackendUrl from "../../lib/axios";
import {toast} from "react-toastify"
import alertIcon from "../../images/alertIcon.png"
import { ServiceType } from 'types/ServicesTypes'


interface Props { 
  detail: ServiceType | undefined,
  update: () => void
}

const QuestionBeforeDeleteService = ({detail, update}: Props) => {


  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const user = userStore(state => state.user)
  const [load, setLoad] = useState<boolean>(false)

  const deleteService = async () => { 
    setLoad(true)
    try {
        const {status, data} = await apiBackendUrl.delete(`/services/deleteService/${user?._id}/${detail?._id}`)
        if(status === 200) { 
            toast.success(data, {
                style: { backgroundColor: 'white', color: 'blue' },
                pauseOnHover: false,
                autoClose: 1500
            });
            update()
            setLoad(false)
        }
    } catch (error) {
       handleError(error, setLoad)
    }
  }

  return (
    <>
       <Button className="bg-blue-500 text-white font-medium text-md w-96" onPress={onOpen}>Eliminar Servicio</Button>
       <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"3xl"}>
        <ModalContent>
          {(onClose) => (
            <>
                <ModalHeader className="flex flex-col items-center justify-center gap-1">
                                ¿Estas seguro de eliminar el servicio?
                </ModalHeader>
                <div className="flex items-center justify-center">
                  <img src={alertIcon} className="w-24 h-24 2xl:w-32 2xl:h-32 flex items-center justify-center"/>
                </div>
                <ModalBody className="flex flex-col items-center justify-center">
                                <p className="text-zinc-500"> 
                                    Al eliminar el servicio, se eliminaran los cobros, 
                                </p>
                                <p className="text-zinc-500 mt-0">
                                  Lo cual puede afectar a las estadisticas de tu facturacion.
                                </p>
                                <div className="flex items-center justify-center mt-4 gap-4 mb-2">
                                    <Button className="bg-red-500 text-white font-medium text-md w-72" onClick={() => deleteService()}>Eliminar</Button>            
                                    <Button className="bg-gray-300 text-white font-medium text-md w-72" onClick={onClose}>Cancelar</Button>
                                </div>
                            </ModalBody>  
                            {load ? <div className='flex items-center justify-center mt-4 mb-2'> <Loading /> </div> : null}     
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default QuestionBeforeDeleteService