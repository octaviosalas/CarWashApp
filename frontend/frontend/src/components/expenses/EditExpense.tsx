import Loading from '../Spinner/Loading'
import { ExpensesType } from 'types/ExpensesTypes'
import { useState } from 'react'
import apiBackendUrl from '../../lib/axios'
import { userStore } from '../../store/store'
import handleError from '../../utils/AxiosErrorFragment'
import { toast } from 'react-toastify'
import { Button } from '@nextui-org/react'


interface Props { 
  detail: ExpensesType  | undefined,
  goBack: () => void,
  update: () => void
}

interface expenseNewData  { 
  reason: string | undefined;
  amount: number | undefined;
  expenseType: string | undefined,
  observation: string | undefined;
}

const EditExpense = ({detail, goBack, update} : Props) => {

  const [expenseReason, setExpenseReason] = useState<string | undefined>(detail?.reason)
  const [amount, setAmount] = useState<number | undefined>(detail?.amount)
  const [observation, setObservation] = useState<string | undefined>(detail?.observation) 
  const [expenseType, setExpenseType] = useState<string | undefined>(detail?.expenseType)
  const [load, setLoad] = useState<boolean>(false)
  const user = userStore((state) => state.user)

  const handleChangeReason = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setExpenseReason(e.target.value)
  }

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setAmount(Number(e.target.value))
  }

  const handleChangeExpenseType = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setExpenseType(e.target.value)
  }

  const handleChangeObservation = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setObservation(e.target.value)
  }


  const changeExpenseData = async () => { 
    setLoad(true)
    const expenseData : expenseNewData = ({ 
      reason: expenseReason,
      amount: amount,
      observation: observation,
      expenseType: expenseType
    })
    try {
      const {data, status} = await apiBackendUrl.put(`/expenses/editData/${detail?._id}/${user?._id}`, expenseData)
      if(status === 200) { 
        update()
        setLoad(false)
        console.log(data)
        toast.success(data, {
          style: { backgroundColor: 'white', color: 'blue' },
          pauseOnHover: false,
          autoClose: 2000
      });
      goBack()
      }
    } catch (error) {
      handleError(error, setLoad)
    }
  }


  return (
    <>
    {detail !== undefined ? 
      <div>
         <div className='flex flex-col justify-start items-start mt-6'>
            <label>Razon</label>
            <input type="text" name="price" id="price" className=" mt-1s w-80 2xl:96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                  onChange={handleChangeReason} value={expenseReason} 
            />
            <label className='mt-3'>Monto</label>
            <input type="number" name="amount" id="price" className=" mt-1 w-80 2xl:96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                  onChange={handleChangeAmount} value={amount} 
            />

              <label className='mt-3'>Tipo de Gasto</label>
            <input type="text" name="price" id="price" className=" mt-1 w-80 2xl:96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                  onChange={handleChangeExpenseType} value={expenseType} 
            />
           
             <label className='mt-3'>Observacion</label>
            <input type="text" name="price" id="price" className=" mt-1 w-80 2xl:96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                  onChange={handleChangeObservation} value={observation} 
            />
        </div>

        <div className='flex items-center justify-start gap-6 mt-6'>
           <Button className="bg-blue-500 text-white font-medium text-sm w-72" onClick={() => changeExpenseData()}>Confirmar</Button>
           <Button className="bg-gray-300 text-white font-medium text-sm w-72">Cancelar</Button>
        </div>

        {load ? <div className='flex items-center justify-center mt-6 2xl:mt-12'><Loading/></div> : null}
    </div> :
     <div className='mt-24 flex items-center justify-center'>
         <p>No has seleccionad ningun gasto para editar</p>
     </div>
   } 
   </>
  )
}

export default EditExpense
