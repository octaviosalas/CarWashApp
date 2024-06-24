import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import apiBackendUrl from "../../lib/axios";
import handleError from "../../utils/AxiosErrorFragment";
import Loading from "../Spinner/Loading";
import { toast } from 'react-toastify';


interface EmailType { 
    email: string
}

interface TokenType { 
    token: number
}

interface NewUserDataType { 
    email: string,
    password: string,
    confirmedPassword: string
}

const LossMyPassword = () => {

  
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [showTokendInput, setShowTokenInput] = useState<boolean>(false)
  const [showChangePassowrdInputs, setShowChangePassowrdInputs] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("")
  const [token, setToken] = useState<number>(0)
  const [load, setLoad] = useState<boolean>(false)
  const [succesMessage, setSuccesMessage] = useState<boolean>(false)
  const [newPassword, setNewPassword] = useState<string>("")
  const [confirmedPassword, setConfirmedPassword] = useState<string>("")



  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setEmail(e.target.value)
  }

  const handleChangeToken = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setToken(Number(e.target.value))
  }

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setNewPassword(e.target.value)
  }

  const handleChangeConfirmedPassword = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setConfirmedPassword(e.target.value)
  }

  const sendEmailFirst = async () => { 
    setLoad(true)
    try {
        const userData : EmailType = ({ 
            email: email
        }) 
        const {status, data} = await apiBackendUrl.post("/auth/lossMyPassword", userData)
        if(status === 200) { 
            setShowTokenInput(true)
            console.log(data, status)
            setSuccesMessage(data)
            setLoad(false)
        } else { 
          setEmail("")
        }
    } catch (error) {
         handleError(error, setLoad)
    }
  }

  const sendToken = async () => { 
     setLoad(true)
     const tokenData : TokenType = ({ 
        token: token
     })
     try {
        const {data, status} = await apiBackendUrl.post("/auth/tokenToRecoverAccount", tokenData)
        if(status === 202) { 
            toast.error(data, {
                style: { backgroundColor: 'white', color: 'blue' },
                pauseOnHover: false,
                autoClose: 2500
            });
            setLoad(false)
            setToken(0)
        } else if (status === 200) { 
            toast.success(data, {
                style: { backgroundColor: 'white', color: 'red' },
                pauseOnHover: false,
                autoClose: 2500
            });
            setLoad(false)
            setShowChangePassowrdInputs(true)
        }
     } catch (error) {
        handleError(error, setLoad)
     }
  }

  const sendNewPassword = async () => { 
    setLoad(true)
    try {
        const newUserData : NewUserDataType = ({ 
            email: email,
            password: newPassword, 
            confirmedPassword: confirmedPassword, 
        })
        const {data, status} = await apiBackendUrl.put("/auth/changeUserPassword", newUserData)
        console.log("data", data)
        console.log("status", status)
        if(status === 200) { 
          toast.success(data, {
            style: { backgroundColor: 'white', color: 'red' },
            pauseOnHover: false,
            autoClose: 2500
        });
          onClose()
          setLoad(false)
        }
    } catch (error) {
        handleError(error, setLoad)
    }
  }

  return (
    <>
      <p  onClick={onOpen} className='text-sm text-blue-500 font-medium cursor-pointer'>¿Olvidaste tu contraseña?</p>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"3xl"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Recuperacion de Contraseña</ModalHeader>
              <ModalBody>
                <div> 
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">  Email  </label>
                    <input type="text" className="block w-96 rounded-md border py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400  sm:text-sm sm:leading-6" onChange={handleChangeEmail}/>
                </div>

                {showTokendInput && showChangePassowrdInputs === false? 
                <> 
                    <div>
                       <p className="font-medium text-blue-500 text-sm">{succesMessage}</p>
                    </div>
                    <div> 
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">  Token  </label>
                        <input type="text" className="block w-96 rounded-md border py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400  sm:text-sm sm:leading-6" 
                         onChange={handleChangeToken}/>
                </div>
                </> : null}

              </ModalBody>

              {showChangePassowrdInputs ? 
              <>
               <div className="mt-2 ml-6 mb-2 flex flex-col items-start justify-start">
                    <div> 
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">  Nueva Contraseña  </label>
                        <input type="password" className="block w-96 rounded-md border py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400  sm:text-sm sm:leading-6" onChange={handleChangePassword}/>
                    </div>
                    <div> 
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">  Repetir Contraseña  </label>
                        <input type="password" className="block w-96 rounded-md border py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400  sm:text-sm sm:leading-6" onChange={handleChangeConfirmedPassword}/>
                    </div>
               </div>
               <ModalFooter className="flex items-center justify-center mt-2">
                    <Button className="bg-blue-500 font-medium w-72 text-md text-white text-center" onClick={() => sendNewPassword()}>
                       Confirmar
                    </Button>
                    <Button className="bg-gray-300 font-medium w-72 text-md text-white text-center" onPress={onClose}>
                      Cancelar
                    </Button>
               </ModalFooter> 
               </>
                 :
               <ModalFooter className="flex items-center justify-center mt-2">
                    <Button className="bg-blue-500 font-medium w-72 text-md text-white text-center" onPress={showTokendInput === false ? sendEmailFirst : sendToken}>
                       Enviar
                    </Button>
                    <Button className="bg-gray-300 font-medium w-72 text-md text-white text-center" onPress={onClose}>
                    Cancelar
                    </Button>
               </ModalFooter>}

               {load ? 
                <div className="flex items-center justify-center mt-4 mb-2">
                    <Loading/>
                </div> 
              : null}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default LossMyPassword