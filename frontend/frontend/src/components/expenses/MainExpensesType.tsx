import apiBackendUrl from '../../lib/axios'
import { userStore } from '../../store/store'
import { useEffect, useState } from 'react'
import handleError from '../../utils/AxiosErrorFragment'
import { TypeOfExpensesType } from '../../types/ExpensesTypes'
import Loading from '../Spinner/Loading'
import CreateNewExpenseType from './CreateNewExpenseType'
import plus from "../../images/plus.png"
import arrowBack from "../../images/arrowBack.png"
import deleteIcon from "../../images/deleteJob.png"
import eyeIcon from "../../images/eyeIcon.png"
import {Accordion, AccordionItem} from "@nextui-org/react";

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
                  <CreateNewExpenseType update={expensesUserTypes} cancel={dontShowAddNew} getExpensesType={expensesUserTypes}/>
               </div>
           </div>
         ) :  !load && userExpensesTypes.length > 0 ? ( 
                <> 
                   <div className='bg-blue-500 font-medium flex justify-between items-center text-white text-center w-3/4 rounded-lg h-10 mt-4 ml-2'>
                       <p className='text-md ml-2'>Tipos de gasto</p>
                       <img className='h-8 w-8 mr-2 cursor-pointer' title="Agregar nuevo tipo de gasto" onClick={() => setShowCreateNew(prevState => !prevState)} src={plus}/>
                   </div>
                   <div className='flex flex-col mt-6 justify-start items-start w-full'>    
                   {userExpensesTypes.map((us: TypeOfExpensesType) => ( 
                       <div className="flex flex-col mt-2 justify-start items-start w-3/4">
                            <Accordion variant="splitted">
                                <AccordionItem key={us._id} aria-label={us.name}title={us.name} indicator={<img src={eyeIcon} alt="Eye Icon" width={24} height={24} />}>
                                   <div className='flex flex-col items-start text-start justify-start w-full '>
                                     {us.name}
                                  </div> 
                                </AccordionItem>                 
                            </Accordion>
                       </div>
                   ))}
                   </div>


                  


                  

                   {showCreateNew ? <div className='mt-12'> <CreateNewExpenseType update={expensesUserTypes} cancel={dontShowAddNew}  getExpensesType={expensesUserTypes}/> </div> : null}
                </>
         ) : null}
    </div>
  )
}

export default MainExpensesType
