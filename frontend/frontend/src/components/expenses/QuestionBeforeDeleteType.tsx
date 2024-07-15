import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure} from "@nextui-org/react";
import deleteIcon from "../../images/deleteJob.png"
import apiBackendUrl from '../../lib/axios'
import { userStore } from '../../store/store'
import handleError from '../../utils/AxiosErrorFragment'
import Loading from '../Spinner/Loading'
import alertIcon from "../../images/alertIcon.png"
import { useState } from "react";
import { toast } from "react-toastify";


interface Props { 
    id: string,
    update: () => void,
    reset: () => void
}

const QuestionBeforeDeleteType = ({id, update, reset}: Props) => {

  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const user = userStore((state) => state.user)
  const [load, setLoad] = useState<boolean>(false)

  const deleteTypeExpense= async () => { 
    setLoad(true)
    console.log("El id del tipo de gasto", id)
    console.log("El id del user", user?._id)
    try {
        const {data, status} = await apiBackendUrl.delete(`/expenses/deleteType/${id}/${user?._id}`)
        if(status === 200) { 
            toast.success(data, {
                style: { backgroundColor: 'white', color: 'blue' },
                pauseOnHover: false,
                autoClose: 1500
            });
            onClose()
            update()
            reset()
            setLoad(false)
        }
    } catch (error) {
        handleError(error, setLoad)
    }
  }


  return (
    <>
      <img src={deleteIcon} width={24} height={24} className='cursor-pointer' title="Eliminar tipo e gasto"  onClick={onOpen}/>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Eliminar tipo de gasto</ModalHeader>
              <ModalBody className="flex flex-col items-center justify-center text-center">
                   <div className="flex flex-col items-center justify-center">
                       <p className="text-black font-medium text-lg">No recomendamos eliminar el tipo de gasto</p>
                       <p  className="text-black font-medium text-sm">¿Por que?</p>
                       <img src={alertIcon} className="w-24 h-24 2xl:w-32 2xl:h-32 flex items-center justify-center"/>
                   </div>
                   <div className="flex flex-col items-center justify-center mt-6">
                       <p>Si eliminas el tipo de gasto, se eliminaran todos los gastos almacenados con este tipo.</p>
                   </div>
                   <div className="flex gap-6 items-center justify-center mt-6 mb-3">
                        <Button className="bg-red-500 text-white font-medium text-md w-72" onClick={() => deleteTypeExpense()}>Eliminar</Button>            
                        <Button className="bg-gray-300 text-white font-medium text-md w-72" onClick={onClose}>Cancelar</Button>
                   </div> 
                   {load ? <div className="flex flex-col items-center justify-center text-center mt-6 mb-2"><Loading/></div> : null}
              </ModalBody>           
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}


export default QuestionBeforeDeleteType