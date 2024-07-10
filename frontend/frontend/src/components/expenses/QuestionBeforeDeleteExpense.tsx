import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure} from "@nextui-org/react";
import alertIcon from "../../images/alertIcon.png"
import {useState} from "react";
import { userStore } from '../../store/store'
import handleError from "../../utils/AxiosErrorFragment";
import Loading from "../Spinner/Loading";
import apiBackendUrl from "../../lib/axios";
import {toast} from "react-toastify"
import { ExpensesType } from "types/ExpensesTypes";

interface Props { 
    detail: ExpensesType | undefined,
    update: () => void
}

const QuestionBeforeDeleteExpense = ({detail, update}: Props) =>  {

  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const user = userStore(state => state.user)
  const [load, setLoad] = useState<boolean>(false)

  const deleteExpense = async () => { 
    setLoad(true)
    try {
        const {data, status} = await apiBackendUrl.delete(`/expenses/deleteExpense/${detail?._id}/${user?._id}`)
        if(status === 200) { 
            setLoad(false)
            toast.success(data, {
                style: { backgroundColor: 'white', color: 'blue' },
                pauseOnHover: false,
                autoClose: 1500
            });
            update()
            onClose()
        }
    } catch (error) {
        console.log(error)
        handleError(error, setLoad)
    }
}


  return (
    <>
      <Button className='bg-blue-500 text-white font-medium text-sm w-72' onPress={onOpen}>Eliminar</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"3xl"}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col items-center justify-center gap-1">
                                ¿Estas seguro de eliminar el gasto?
                            </ModalHeader>
                            <div className="flex items-center justify-center">
                                <img src={alertIcon} className="w-24 h-24 2xl:w-32 2xl:h-32 flex items-center justify-center"/>
                            </div>
                            <ModalBody className="flex flex-col items-center justify-center">                          
                                <div className="flex items-center justify-center mt-4 gap-4 mb-2">
                                    <Button className="bg-red-500 text-white font-medium text-md w-72" onClick={() => deleteExpense()}>Eliminar</Button>            
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

export default QuestionBeforeDeleteExpense