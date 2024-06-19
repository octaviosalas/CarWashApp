import {useState} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure} from "@nextui-org/react";
import { userStore } from '../../store/store'
import handleError from "../../utils/AxiosErrorFragment";
import Loading from "../Spinner/Loading";
import apiBackendUrl from "../../lib/axios";
import {toast} from "react-toastify"
import alertIcon from "../../images/alertIcon.png"
import { JobType } from 'types/JobsTypes'

interface Props { 
    detail: JobType,
    update: () => void
}

const QuestionBeforeDelete = ({detail, update}: Props) => {

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const user = userStore(state => state.user)
    const [load, setLoad] = useState<boolean>(false)

    const deleteClient = async () => { 
        setLoad(true)
        try {
            const {data, status} = await apiBackendUrl.delete(`/clients/deleteClient/${detail?._id}/${user?._id}`)
            if(status === 200) { 
                setLoad(false)
                toast.success(data, {
                    style: { backgroundColor: 'white', color: 'blue' },
                    pauseOnHover: false,
                    autoClose: 1500
                });
                update()
            }
        } catch (error) {
            console.log(error)
           handleError(error, setLoad)
        }
    }


  return (
    <div>
        <Button className="bg-blue-500 text-white font-medium text-md w-96" onPress={onOpen}>Eliminar Lavado</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"3xl"}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col items-center justify-center gap-1">
                                ¿Estas seguro de eliminar el lavado?
                            </ModalHeader>
                            <div className="flex items-center justify-center">
                                <img src={alertIcon} className="w-24 h-24 2xl:w-32 2xl:h-32 flex items-center justify-center"/>
                            </div>
                            <ModalBody className="flex flex-col items-center justify-center">
                                <p className="text-zinc-500"> 
                                    Al eliminar el lavado, tambien se eliminara el cobro del mismo
                                </p>
                                <p className="text-zinc-500 mt-0">
                                  Lo cual puede afectar a las estadisticas de tu facturacion.
                                </p>
                                <div className="flex items-center justify-center mt-4 gap-4 mb-2">
                                    <Button className="bg-red-500 text-white font-medium text-md w-72" onClick={() => deleteClient()}>Eliminar</Button>            
                                    <Button className="bg-gray-300 text-white font-medium text-md w-72" onClick={onClose}>Cancelar</Button>
                                </div>
                            </ModalBody>      
                            {load ? <div className='flex items-center justify-center mt-4 mb-2'> <Loading /> </div> : null}     
                        </>
                    )}
                </ModalContent>
            </Modal>
    </div>
  )
}

export default QuestionBeforeDelete
