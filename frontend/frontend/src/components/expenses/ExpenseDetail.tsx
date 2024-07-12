import { ExpensesType } from '../../types/ExpensesTypes'
import NavbarExpenses from './NavbarExpenses';
import { useState } from 'react';
import DeleteExpense from './DeleteExpense';
import EditExpense from './EditExpense';
import MainExpensesType from './MainExpensesType';

interface Props{ 
  expenseData: ExpensesType | undefined
  update: () => void
}

const ExpenseDetail = ({expenseData, update}: Props) => {

  
  const [showExpenseDetail, setShowExpenseDetail] = useState<boolean>(true)
  const [showEditExpense, setShowEditExpense] = useState<boolean>(false)
  const [showDeleteExpense, setShowDeleteExpense] = useState<boolean>(false)
  const [showExpenseType, setShowExpenseType] = useState<boolean>(false)

  const showExpenseTypes = () => { 
    setShowEditExpense(false)
    setShowDeleteExpense(false)
    setShowExpenseDetail(false)
    setShowExpenseType(true)
  }

  const showNowEdit = () => { 
    setShowEditExpense(true)
    setShowDeleteExpense(false)
    setShowExpenseDetail(false)
    setShowExpenseType(false)
  }

  const showNowDelete = () => { 
    setShowEditExpense(false)
    setShowDeleteExpense(true)
    setShowExpenseDetail(false)
    setShowExpenseType(false)
  }

  const showDetail = () => { 
    setShowEditExpense(false)
    setShowDeleteExpense(false)
    setShowExpenseDetail(true)
    setShowExpenseType(false)
  }




  return (
     
<div className='w-full h-full flex flex-col justify-center items-center'>
       <div className="mt-4 w-full border-b ">
              <NavbarExpenses showEdit={showNowEdit} showDelete={showNowDelete} showExpenseType={showExpenseTypes} 
              showExpenseDetail={showExpenseDetail} showEditExpense={showEditExpense} showDeleteExpense={showDeleteExpense}
              expensesType={showExpenseType}/>
        </div>
        {showExpenseDetail && expenseData !== undefined && !showEditExpense && !showDeleteExpense && !showExpenseType ? 
         <div className='flex flex-col w-full'>
            <div className='flex flex-col items-start justify-star mt-6 ml-4'>
                <div className='flex flex-col items-start justify-start'>
                    <p className='font-medium text-black'>Razon del Gasto</p>
                    <input type="text" name="price" id="price" className=" mt-1s w-80 2xl:96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                    value={expenseData?.reason} disabled
                    />
                </div>
                <div className='flex flex-col items-start justify-start mt-4'>
                    <p className='font-medium text-black'>Monto Gastado</p>
                    <input type="text" name="price" id="price" className=" mt-1s w-80 2xl:96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                    value={expenseData?.amount} disabled
                    />
                </div>
                <div className='flex flex-col items-start justify-start mt-4'>
                    <p className='font-medium text-black'>Tipo de Gasto</p>
                    <input type="text" name="price" id="price" className=" mt-1s w-80 2xl:96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                    value={expenseData?.expenseType.name} disabled
                    />
                </div>
            </div>             
          </div>
             : !showEditExpense && !showDeleteExpense && !showExpenseType && expenseData === undefined ? ( 
                <div className='mt-24 2xl:mt-40'>
                  <p className='text-zinc-600 font-medium'>No has seleccionado ningun elemento</p>
                 </div>
             ) : null        
            }

            {showEditExpense ? <div className="w-full"> <EditExpense detail={expenseData}  goBack={showDetail} update={update}/> </div> : null}
            {showDeleteExpense ? <div className="w-full"> <DeleteExpense detail={expenseData}  goBack={showDetail} update={update}/> </div> : null}
            {showExpenseType ? <div className="w-full"> <MainExpensesType goBack={showDetail}/> </div> : null}

    </div>

  )
}

export default ExpenseDetail
