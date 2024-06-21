import { Button } from '@nextui-org/react'
import { useState } from 'react'
import Loading from '../Spinner/Loading'
import QuestionBeforeDelente from './QuestionBeforeDelete'

interface Props { 
  goBack: () => void
}

const DeleteAccount = ({goBack}: Props) => {

  const [load, setLoad] = useState<boolean>(false)
  
  return (
    <div className='flex flex-col items-center justify-center'>
        <div className='flex items-center mt-24'>
          <p className='text-zinc-500'>Ten en cuenta que si das de baja tu cuenta, quedara inhabilitada para utilizar hasta que vuelvas a activarla</p>
        </div>
        <div className='flex gap-6 items-center justify-center mt-4 '>
            <QuestionBeforeDelente/>
            <Button className="bg-gray-300 text-white font-medium text-md w-96" onClick={() => goBack()}>Cancelar</Button>
        </div>
        {load ? <div className='flex items-center justify-center mt-6'> <Loading/> </div> : null}
    </div>
    
  )
}

export default DeleteAccount
