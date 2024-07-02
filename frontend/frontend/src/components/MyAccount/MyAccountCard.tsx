import { useState } from "react"
import ChangeMyData from "./ChangeMyData"
import ChangeMyPassword from "./ChangeMyPassword"
import DeleteAccount from "./DeleteAccount"

const MyAccountCard = () => {
 
    const [showChangeData, setShowChangeData] = useState<boolean>(false)
    const [showChangePassword, setShowChangePassword] = useState<boolean>(false)
    const [showDeleteAccount, setShowDeleteAccount] = useState<boolean>(false)

    const changeData = () => { 
        setShowChangeData(true)
        setShowChangePassword(false)
        setShowDeleteAccount(false)
    }

    const changePassowrd = () => { 
        setShowChangeData(false)
        setShowChangePassword(true)
        setShowDeleteAccount(false)
    }

    const deleteAccountNow = () => { 
        setShowChangeData(false)
        setShowChangePassword(false)
        setShowDeleteAccount(true)
    }


  return (
    <div className='h-full flex gap-4'>
        <div className='flex flex-col items-start justify-start w-1/5 h-full'>
             <div className=" w-full flex items-center justify-start text-start h-24 2xl:h-36  cursor-pointer hover:bg-blue-100" onClick={() => changeData()}>
                  <p className="text-blue-500 font-medium text-md ml-4">Modificar mis Datos</p>
             </div>
             <div className=" w-full flex items-center justify-start text-start h-24 2xl:h-36  cursor-pointer hover:bg-blue-100" onClick={() => changePassowrd()}>
                <p className="text-blue-500 font-medium text-md ml-4">Cambiar Contraseña</p>
             </div>
             <div className=" w-full flex items-center justify-start text-start h-24 2xl:h-36  cursor-pointer hover:bg-blue-100" onClick={() => deleteAccountNow()}>
                <p className="text-blue-500 font-medium text-md ml-4">Dar de baja mi cuenta</p>
             </div>
        </div>
        
        <div className='h-full w-4/5'>
               {
                 showChangeData ? <ChangeMyData/> 
                 : showChangePassword ? ( 
                    <ChangeMyPassword goBack={changeData}/>
                 ) : showDeleteAccount ? ( 
                      <DeleteAccount goBack={changeData}/>
                 ) : null
               }
           </div>
    </div>
  )
}

export default MyAccountCard
