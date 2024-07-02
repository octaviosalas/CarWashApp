import { Button } from '@nextui-org/react'
import QuestionBeforeDelente from './QuestionBeforeDelete'

interface Props { 
  goBack: () => void
}

const DeleteAccount = ({goBack}: Props) => {


  
  return (
    <div className='flex flex-col items-center justify-center'>
        <div className='flex items-center mt-24'>
          <p className='text-zinc-500'>Ten en cuenta que si das de baja tu cuenta, quedara inhabilitada para utilizar hasta que vuelvas a activarla</p>
        </div>
        <div className='flex gap-6 items-center justify-center mt-4 '>
            <QuestionBeforeDelente/>
            <Button className="bg-gray-300 text-white font-medium text-md w-36 xl:w-72 2xl:w-96" onClick={() => goBack()}>Cancelar</Button>
        </div>
       
    </div>
    
  )
}

export default DeleteAccount
