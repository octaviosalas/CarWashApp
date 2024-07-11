import React, { useEffect, useState } from 'react'
import arrowBack from "../../images/arrowBack.png"
import { Button } from '@nextui-org/react'
import {toast} from "react-toastify"  
import { getDate } from '../../functions/TransformDateHour/HourAndDate'
import apiBackendUrl from '../../lib/axios'
import { userStore } from '../../store/store'
import handleError from '../../utils/AxiosErrorFragment'
import Loading from '../Spinner/Loading'
import { TypeOfExpensesType } from '../../types/ExpensesTypes'
import CreateNewExpenseType from './CreateNewExpenseType'

interface Props { 
    update: () => void,
    goBack: () => void
}

interface newExpenseType { 
  date: Date,
  amount: number,
  reason: string,
  expenseType: string,
  observation: string
}

const AddNewExpense = ({update, goBack}: Props) => {

  const [expenseReason, setExpenseReason] = useState<string>("")
  const [amount, setAmount] = useState<number>(0)
  const [typeExpense, setTypeExpense] = useState<string>("")
  const [observation, setObservation] = useState<string>("")
  const [load, setLoad] = useState<boolean>(false)

  const date = getDate()
  const userData = userStore((state) => state.user)
  const userTypeOfExpenses = userStore((state) => state.userTypeOfExpenses)

  const handleChangeReason = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setExpenseReason(e.target.value)
  }

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setAmount(Number(e.target.value))
  }

  const handleChangeTypeExpense= (e: React.ChangeEvent<HTMLSelectElement>) => { 
    setTypeExpense(e.target.value)
  }

  const handleChangeObservation = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setObservation(e.target.value)
  }

  const createNewExpense = async () => { 
    setLoad(true)
    const expenseData : newExpenseType = ({ 
       date: date,
       amount: amount,
       reason: expenseReason,
       expenseType: typeExpense,
       observation: observation
    })
    try {
        const {data, status} = await apiBackendUrl.post(`/expenses/createExpense/${userData?._id}`, expenseData)
        if(status === 200) { 
          update()
          setLoad(false)
          toast.success(data, {
            style: { backgroundColor: 'white', color: 'blue' },
            pauseOnHover: false,
            autoClose: 2000
        });
        }
    } catch (error) {
       handleError(error, setLoad)
    } 
  }

  useEffect(() => { 
    console.log(typeExpense)
  }, [typeExpense])

  return (
    <>
   {userTypeOfExpenses.length > 0 ? 
    <div className="w-full ">
          <div className='w-full flex justify-between items-center ml-4 mt-4 border-b'>
             <p className='text-md text-black font-medium'>Creando Gasto </p>
          </div>
          <div className='ml-4 mt-0 2xl:mt-3'>
            <img src={arrowBack} className='w-5 h-5 2xl:w-6 2xl:h-6 cursor-pointer' onClick={() => goBack()}/>
          </div>
        <div className='flex flex-col justify-start items-start mt-6 ml-4'>
            <label>Razon</label>
            <input type="text" name="price" id="price" className=" mt-1s w-80 2xl:96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                  onChange={handleChangeReason} value={expenseReason} 
            />
            <label className='mt-3'>Monto</label>
            <input type="number" name="amount" id="price" className=" mt-1 w-80 2xl:96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                  onChange={handleChangeAmount} value={amount} 
            />
            
  
           <label className='mt-3'>Tipo de Gasto</label>
           <select className=" mt-1 w-80 2xl:96 h-10 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none"  value={typeExpense}  onChange={handleChangeTypeExpense}>
              {userTypeOfExpenses?.map((us: TypeOfExpensesType) => ( 
                <option value={us._id}  key={us._id}>{us.name}</option>
              ))}
           </select>


             <label className='mt-3'>Observacion</label>
            <input type="text" name="price" id="price" className=" mt-1 w-80 2xl:96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                  onChange={handleChangeObservation} value={observation} 
            />
        </div>
        <div className='mt-4 flex gap-4 items-center justify-start'>
          <Button className="bg-blue-500 text-white text-md font-medium w-72" onClick={() => createNewExpense()}>Añadir</Button>
          <Button className='bg-gray-400 font-medium text-white  w-72' onClick={() => goBack()}>Cancelar</Button>
        </div>
        {load ? <div className='flex items-center justify-center mt-6 2xl:mt-12'> <Loading/> </div> : null}
    </div> : 
       <div className="w-full ">
           <div className='w-full flex justify-between items-center ml-4 mt-4 border-b'>
             <p className='text-md text-black font-medium'>Creando Gasto </p>
          </div>
          <div className='mt-12 bg-red-500 text-white text-md h-10 rounded-lg flex items-center justify-center text-center'>
               <p>Para poder crear un gasto, primero debes asignar cuales seran los tipos de gasto</p>
          </div>
          <div className='mt-12'>
            <CreateNewExpenseType update={update} cancel={goBack}/>
          </div>
       </div>}
    </>
  )
}

export default AddNewExpense
