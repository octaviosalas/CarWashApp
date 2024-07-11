import apiBackendUrl from "../../lib/axios"
import Loading from "../Spinner/Loading";
import { useState } from 'react'
import { useEffect } from 'react'
import { userStore } from "../../store/store";
import ExpensesCard from "./ExpensesCard";
import { ExpensesType } from "types/ExpensesTypes";

const ExpensesList = () => {

    const [expensesData, setExpensesData] = useState<ExpensesType[] | []>([])
    const [load, setLoad] = useState<boolean>(false)
    const user = userStore(state => state.user)

    const getExpenses = async () => {
        setLoad(true)
        try {
            const {data} = await apiBackendUrl.get(`/expenses/getMyExpenses/${user?._id}`) 
            const response = data
            if(response.length > 0) { 
                setExpensesData(response.reverse())
                console.log("LOS GASTOS", response)
              setLoad(false)
            } else { 
              setLoad(false)
            }
          } catch (error) {
            console.log(error)
            setLoad(false)
          }
      }

      useEffect(() => { 
        getExpenses()
      }, [])


  return (
    <div>
       {load ? <div className='flex flex-col items-center justify-center mt-24 2xl:mt-40'> <Loading/> </div> :  <ExpensesCard expenses={expensesData} update={getExpenses}/>}
  </div>
  )
}

export default ExpensesList
