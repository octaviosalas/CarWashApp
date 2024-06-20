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

    const deleteJob = async () => { 
        setLoad(true)
        try {
            const {data, status} = await apiBackendUrl.delete(`/jobs/${detail?._id}/${user?._id}`)
            if(status === 200) { 
                toast.success(data, {
                    style: { backgroundColor: 'white', color: 'blue' },
                    pauseOnHover: false,
                    autoClose: 2000
                });
                update()
                setLoad(false)      
                onClose()      
            }
        } catch (error) {
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
                            Este lavado tiene un cobro registrado 
                            </ModalHeader>
                            <div className="flex items-center justify-center">
                                <img src={alertIcon} className="w-24 h-24 2xl:w-32 2xl:h-32 flex items-center justify-center"/>
                            </div>
                            <ModalBody className="flex flex-col items-center justify-center">
                                <div className="flex flex-col items-center justify-center">
                                    <p className="text-zinc-500 font-medium"> ¿Estas seguro de eliminar el lavado?</p>
                                    <p className="text-zinc-500"> Al eliminarlo, se eliminara el cobro y puede afectar a tus estadisticas de facturacion </p>
                                </div>                               
                                <div className="flex items-center justify-center mt-4 gap-4 mb-2">
                                    <Button className="bg-red-500 text-white font-medium text-md w-72" onClick={() => deleteJob()}>Eliminar</Button>            
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
