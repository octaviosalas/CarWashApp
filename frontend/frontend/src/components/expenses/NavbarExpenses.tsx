import { Button } from "@nextui-org/react"
import deleteJob from "../../images/deleteJob.png"
import editjob from "../../images/editJob.png"

interface Props { 
  showEdit: () => void,
  showDelete: () => void,
  showExpenseType: () => void,
  showExpenseDetail: boolean,
  showEditExpense: boolean,
  showDeleteExpense: boolean,
  expensesType: boolean
}

const NavbarExpenses = ({showEdit, showDelete, showExpenseType, showExpenseDetail, showEditExpense, showDeleteExpense, expensesType}: Props) => {
  return (
    <div className='flex items-center justify-between mb-2 ml-12 2xl:ml-0'>
      <div className="flex items-center gap-6">
            {expensesType ? <p className='font-medium text-black text-md cursor-pointer' onClick={() => showExpenseType()}>Tipos de Gasto</p> : 
            <Button className='font-medium text-white h-10 bg-blue-500 text-md cursor-pointer' onClick={() => showExpenseType()}>Mis tipos de gasto</Button>}
            {showExpenseDetail ? <p className='font-medium text-black text-md underline'>Detalle del Gasto</p> : null}
            {showEditExpense ? <p className='font-medium text-black text-md underline'>Editar Gasto</p> : null}
            {showDeleteExpense ? <p className='font-medium text-black text-md underline'>Eliminar Gasto</p> : null}
      </div>
     {!expensesType ? <div className='flex items-center gap-6 mr-8'>
          <img src={editjob} title="Editar datos del gasto"  className='h-6 w-6 cursor-pointer' onClick={() => showEdit()}/>
          <img src={deleteJob} title="Eliminar gasto" className='h-6 w-6 cursor-pointer'  onClick={() => showDelete()}/>
      </div> : null}
</div>
  )
}

export default NavbarExpenses
