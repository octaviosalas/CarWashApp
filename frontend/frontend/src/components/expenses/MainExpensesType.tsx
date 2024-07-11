import apiBackendUrl from '../../lib/axios'
import { userStore } from '../../store/store'
import { useEffect, useState } from 'react'
import handleError from '../../utils/AxiosErrorFragment'
import { TypeOfExpensesType } from '../../types/ExpensesTypes'
import Loading from '../Spinner/Loading'
import CreateNewExpenseType from './CreateNewExpenseType'
import plus from "../../images/plus.png"
import arrowBack from "../../images/arrowBack.png"

interface Props { 
    goBack: () => void
}

const MainExpensesType = ({goBack}: Props) => {

    const user = userStore((state) => state.user)
    const [userExpensesTypes, setUserExpensesTypes] = useState<TypeOfExpensesType[] | []>([])
    const [showCreateNew, setShowCreateNew] = useState<boolean>(false)
    const [load, setLoad] = useState<boolean>(false)


    const expensesUserTypes = async () => { 
        setLoad(true)
        try {
            const {data, status} = await apiBackendUrl.get(`/expenses/getExpensesTypes/${user?._id}`)
            if(status === 200) { 
                setUserExpensesTypes(data)
                setLoad(false)
                console.log("Types", data)
            }
        } catch (error) {
            handleError(error, setLoad)
        }
    }

    useEffect(() => { 
        expensesUserTypes()
    }, [])

    const dontShowAddNew = () => { 
        setShowCreateNew(false)
    }

  return (
    <div>
         <div className='w-full  flex justify-start mt-2'>
           <img className='w-8 h-8 cursor-pointer' title="Volver" src={arrowBack} onClick={() => goBack()}/>
        </div>
         {load ?
          <div className='mt-24 flex items-center justify-center'> 
             <Loading/> 
         </div> : !load && userExpensesTypes.length === 0 ? ( 
           <div className='mt-8'>
                <div className='bg-red-500 h-10 rounded-lg w-full font-medium text-white flex justify-center text-center items-center'>
                    <p className='text-white font-medium'>No tenes tipos de gastos almacenados. Crea el primero</p>
               </div>
               <div className='flex w-full justify-start mt-12'>
                  <CreateNewExpenseType update={expensesUserTypes} cancel={dontShowAddNew}/>
               </div>
           </div>
         ) :  !load && userExpensesTypes.length > 0 ? ( 
                <> 
                   <div className='bg-blue-500 font-medium flex justify-between items-center text-white text-center w-full rounded-lg h-10 mt-4'>
                       <p className='text-md'>Tipos de gasto</p>
                       <img className='h-8 w-8 mr-4 cursor-pointer' title="Agregar nuevo tipo de gasto" onClick={() => setShowCreateNew(prevState => !prevState)} src={plus}/>
                   </div>
                   <div className='flex flex-col mt-6 justify-start items-start w-full'>
                       {userExpensesTypes.map((us : TypeOfExpensesType) => ( 
                          <div className='flex flex-col text-start mt-2 w-full' key={us._id}>
                              <p className='font-medium text-black text-md border-b w-full'>{us.name}</p>
                          </div>
                       ))}
                   </div>

                   {showCreateNew ? <div className='mt-12'> <CreateNewExpenseType update={expensesUserTypes} cancel={dontShowAddNew}/> </div> : null}
                </>
         ) : null}
    </div>
  )
}

export default MainExpensesType
