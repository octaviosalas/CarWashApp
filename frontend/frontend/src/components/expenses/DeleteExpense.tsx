import { Button } from '@nextui-org/react'
import { ExpensesType } from 'types/ExpensesTypes'
import QuestionBeforeDeleteExpense from './QuestionBeforeDeleteExpense'
import arrowBack from "../../images/arrowBack.png"

interface Props { 
  detail: ExpensesType  | undefined,
  goBack: () => void,
  update: () => void
}

const DeleteExpense = ({detail, goBack, update}: Props) => {
  return (
    <> 
    {detail !== undefined ? 
      <div>
       <div className='ml-4 mt-0 2xl:mt-3'>
            <img src={arrowBack} className='w-5 h-5 2xl:w-6 2xl:h-6 cursor-pointer' onClick={() => goBack()}/>
          </div>
        <div className='mt-24 flex flex-col items-center justify-center'> 
          <p className='font-medium text-black'>¿Estas seguro de eliminar el gasto?</p>
          <div className='flex items-center gap-6 mt-6'>
              <QuestionBeforeDeleteExpense update={update} detail={detail}/>
              <Button className='bg-gray-300 text-white font-medium text-sm w-72' onClick={() => goBack()}>Cancelar</Button>
          </div>
        </div>
    </div> : <div className='mt-24 flex items-center justify-center'> <p className='font-medium text-zinc-600'>No has seleccionado ningun gasto para eliminar</p> </div>}
    </>
  )
}

export default DeleteExpense
