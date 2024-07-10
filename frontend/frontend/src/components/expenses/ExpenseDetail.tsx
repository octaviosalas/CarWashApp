import { ExpensesType } from '../../types/ExpensesTypes'
import NavbarExpenses from './NavbarExpenses';
import { useState, useEffect } from 'react';
import DeleteExpense from './DeleteExpense';
import EditExpense from './EditExpense';

interface Props{ 
  expenseData: ExpensesType | undefined
  update: () => void
}

const ExpenseDetail = ({expenseData, update}: Props) => {

  
  const [showExpenseDetail, setShowExpenseDetail] = useState<boolean>(true)
  const [showEditExpense, setShowEditExpense] = useState<boolean>(false)
  const [showDeleteExpense, setShowDeleteExpense] = useState<boolean>(false)
  const [viewDetail, setViewDetail] = useState<boolean>(false)


  const showNowEdit = () => { 
    setShowEditExpense(true)
    setShowDeleteExpense(false)
    setShowExpenseDetail(false)
  }

  const showNowDelete = () => { 
    setShowEditExpense(false)
    setShowDeleteExpense(true)
    setShowExpenseDetail(false)
  }

  const showDetail = () => { 
    setShowEditExpense(false)
    setShowDeleteExpense(false)
    setShowExpenseDetail(true)
  }

  useEffect(() => { 
    setViewDetail(false)
  }, [expenseData])


  return (
     
<div className='w-full h-full flex flex-col justify-center items-center'>
       <div className="mt-4 w-full border-b ">
              <NavbarExpenses showEdit={showNowEdit} showDelete={showNowDelete}/>
        </div>
        {showExpenseDetail && expenseData !== undefined && !showEditExpense && !showDeleteExpense? 
         <div className='flex flex-col w-full'>
            <div className='flex flex-col items-start justify-star mt-6 ml-4'>
                <div className='flex flex-col items-start justify-start'>
                    <p className='font-bold text-black'>Razon del Gasto</p>
                    <input type="text" name="price" id="price" className=" mt-1s w-80 2xl:96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                    value={expenseData?.reason} disabled
                    />
                </div>
                <div className='flex flex-col items-start justify-start mt-4'>
                    <p className='font-bold text-black'>Monto Gastado</p>
                    <input type="text" name="price" id="price" className=" mt-1s w-80 2xl:96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                    value={expenseData?.amount} disabled
                    />
                </div>
                <div className='flex flex-col items-start justify-start mt-4'>
                    <p className='font-bold text-black'>Tipo de Gasto</p>
                    <input type="text" name="price" id="price" className=" mt-1s w-80 2xl:96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                    value={expenseData?.expenseType} disabled
                    />
                </div>
            </div>             
          </div>
             : !showEditExpense && !showDeleteExpense && expenseData === undefined ? ( 
                <div className='mt-24 2xl:mt-40'>
                  <p className='text-zinc-600 font-medium'>No has seleccionado ningun elemento</p>
                 </div>
             ) : null        
            }

            {showEditExpense ? <div className="w-full"> <EditExpense detail={expenseData}  goBack={showDetail} update={update}/> </div> : null}
            {showDeleteExpense ? <div className="w-full"> <DeleteExpense detail={expenseData}  goBack={showDetail} update={update}/> </div> : null}

    </div>

  )
}

export default ExpenseDetail
