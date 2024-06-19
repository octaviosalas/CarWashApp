import {useState} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure} from "@nextui-org/react";
import { userStore } from '../../store/store'
import handleError from "../../utils/AxiosErrorFragment";
import { useNavigate } from "react-router-dom";
import apiBackendUrl from "../../lib/axios";
import {toast} from "react-toastify"
import alertIcon from "../../images/alertIcon.png"

const QuestionBeforeDelente = () =>  {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

  const {user} = userStore()
  const [load, setLoad] = useState<boolean>(false)
  const navigate = useNavigate()

  const disableMyAccount = async () => { 
    setLoad(true)
    try {
      const {data, status} = await apiBackendUrl.put(`/auth/disableAccount/${user?._id}`)
      if(status === 200) { 
        toast.success(data, {
          style: { backgroundColor: 'white', color: 'blue' },
          pauseOnHover: false,
          autoClose: 4000
      });
      navigate("/login")
      setLoad(false)
      }
    } catch (error) {
      handleError(error, setLoad)
    }
  }

  return (
    <>
      <Button className="bg-blue-500 text-white font-medium text-md w-96" onPress={onOpen}>Dar de baja mi cuenta</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"2xl"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center justify-center gap-1">¿Estas seguro de eliminar tu cuenta?</ModalHeader>
              <div className="flex items-center justify-center">
                <img src={alertIcon} className="w-24 h-2w-24 2xl:w-32 2xl:h-32 flex items-center justify-center"/>
              </div>
              <ModalBody>
                <p className="text-zinc-500"> 
                   ¿Estás seguro de que deseas eliminar tu cuenta? Al dar de baja tu cuenta, esta quedará suspendida hasta que decidas reactivarla. 
                   Para reactivarla, simplemente vuelve a iniciar sesión y sigue los pasos de seguridad indicados.
                </p>
              
                <div className="flex items-center justify-center mt-4 gap-4">
                    <Button className="bg-red-500 text-white font-medium text-md w-96" onClick={() => disableMyAccount()}>Dar de baja mi cuenta</Button>            
                    <Button className="bg-gray-300 text-white font-medium text-md w-96" onClick={onClose}>Cancelar</Button>
                </div>
              </ModalBody>           
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}


export default QuestionBeforeDelente