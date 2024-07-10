import { ExpensesType } from "types/ExpensesTypes"
import formatDate from "../../functions/TransformDateHour/TransformDate"
import transformPrice from "../../functions/TransformDateHour/TransformPrice"
import { useState } from "react"
import { Button } from "@nextui-org/react"
import AddNewExpense from "./AddNewExpense"
import ExpenseDetail from "./ExpenseDetail"

interface Props { 
    expenses: ExpensesType[] | [],
    update: () => void
}

const ExpensesCard = ({expenses, update}: Props) => {

    const [addNew, setAddNew] = useState<boolean>(false)
    const [expenseSelected, setExpenseSelected] = useState<ExpensesType>()
    
    const selectExpense = (item: ExpensesType) => { 
        setExpenseSelected(item)
    }

    const goBack = () => { 
        setAddNew(false)
   }

  return (
    <div className='flex gap-4 h-full w-full'> 
          <div className='flex flex-col w-1/5 '>
              <div className='mt-2 w-full flex justify-start'>
                        <Button className='bg-blue-500 text-white font-medium text-md w-72' onClick={() => setAddNew(true)}>Añadir nuevo Gasto</Button>
             </div>
              {expenses.map((exp: ExpensesType) => ( 
                     <div className='mt-2 2xl:mt-4 w-full cursor-pointer hover:bg-blue-100' key={exp._id} onClick={() => selectExpense(exp)}>
                        <div className='flex items-start text-start justify-start' key={exp._id}>
                                <p className='font-medium text-md text-blue-500'>{exp.expenseType}</p>
                        </div>
                        <div className='flex items-center gap-2'>                                       
                            <p className='font-medium text-black text-md'>{exp.reason}</p>
                            </div>
                            <div className='flex items-center'>                                      
                                <p className='text-red-600 font-medium text-md'>Monto:  {transformPrice(exp.amount)}</p>                                    
                            </div>                                   
                            <div className='flex items-center mt-2 '>
                                <p className='font-medium text-black text-md'>Fecha: {formatDate(exp.date)}</p>
                            </div>                                
                     </div>  
                  ))}
        </div>
        <div className='w-4/5 h-full flex flex-col items-center justify-center'>
           {addNew === true ?  
                   <AddNewExpense update={update} goBack={goBack}/>
                    :
                   <ExpenseDetail expenseData={expenseSelected} update={update}/>}            
        </div>
    </div>
  )
}

export default ExpensesCard
