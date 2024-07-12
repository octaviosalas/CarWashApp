import apiBackendUrl from '../../lib/axios'
import { userStore } from '../../store/store'
import { useEffect, useState } from 'react'
import handleError from '../../utils/AxiosErrorFragment'
import { TypeOfExpensesType } from '../../types/ExpensesTypes'
import Loading from '../Spinner/Loading'
import CreateNewExpenseType from './CreateNewExpenseType'
import plus from "../../images/plus.png"
import arrowBack from "../../images/arrowBack.png"
import eyeIcon from "../../images/eyeIcon.png"
import {Accordion, AccordionItem} from "@nextui-org/react";
import { Selection } from '@react-types/shared'; 
import { getDate } from '../../functions/TransformDateHour/HourAndDate'
import transformPrice from '../../functions/TransformDateHour/TransformPrice'
import QuestionBeforeDeleteType from './QuestionBeforeDeleteType'

interface Props { 
    goBack: () => void
}



const MainExpensesType = ({goBack}: Props) => {

    const user = userStore((state) => state.user)
    const [userExpensesTypes, setUserExpensesTypes] = useState<TypeOfExpensesType[] | []>([])
    const [showCreateNew, setShowCreateNew] = useState<boolean>(false)
    const [load, setLoad] = useState<boolean>(false)
    const [loadingTypeDetail, setLoadingTypeDetail] = useState<boolean>(false)
    const [dayAmount, setDayAmount] = useState<number>()
    const [monthAmount, setMonthAmount] = useState<number>()
    const [yearAmount, setYearAmount] = useState<number>()

    const actualDate = getDate()


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

    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
    

    const additionalFunction = async (expenseTypeId: string) => {
        setLoadingTypeDetail(true)
        try {
            const {data, status} = await apiBackendUrl.get(`/expenses/expenseTypeData/${expenseTypeId}/${user?._id}/${actualDate}`)
            if(status === 200) { 
                setLoadingTypeDetail(false)
                setDayAmount(data.day)
                setMonthAmount(data.month)
                setYearAmount(data.year)
            }
        } catch (error) {
            handleError(error, setLoad)
        }    
    };
    
      const handleSelectionChange = (keys: Selection) => {
        setSelectedKeys(keys);
        const { anchorKey } = keys as any
        additionalFunction(anchorKey);
      };

  return (
    <div>
         <div className='w-full  flex justify-start mt-2'>
           <img className='w-6 h-6 2xl:w-8 2xl:h-8 ml-2 cursor-pointer' title="Volver" src={arrowBack} onClick={() => goBack()}/>
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
                   <div className='flex flex-col mt-6 justify-start items-start w-full max-h-[200px] 2xl:max-h-[450px] overflow-y-auto'>    
                   {userExpensesTypes.map((us: TypeOfExpensesType) => ( 
                       <div className="flex items-center mt-2 justify-start  w-3/4">
                            <Accordion variant="light" selectedKeys={selectedKeys}  onSelectionChange={handleSelectionChange}>
                                <AccordionItem key={us._id} aria-label={us.name}title={us.name} indicator={<img title="Ver detalle" src={eyeIcon} alt="Eye Icon" width={24} height={24} />} className='border-b-2' >
                                   <div className='flex flex-col items-start text-start justify-start w-full '>
                                    {loadingTypeDetail ?
                                    <div className='flex flex-col items-center justify-center'> 
                                        <Loading/> 
                                    </div>
                                    : 
                                    <div className='flex gap-4 items-center'> 
                                        <p className='text-black font-medium'><span className='text-blue-600 font-bold text-md'>Gastado en el Dia:</span> {transformPrice(dayAmount)}</p>
                                        <p className='text-black  font-medium'><span className='text-blue-600 font-bold text-md'>Gastado en el Mes:</span> {transformPrice(monthAmount)}</p>
                                        <p className='text-black  font-medium'><span className='text-blue-600 font-bold text-md'>Gastado en el Año:</span> {transformPrice(yearAmount)}</p>
                                     </div>
                                     }
                                  </div> 
                                </AccordionItem>                 
                            </Accordion>
                            <QuestionBeforeDeleteType id={us._id} update={expensesUserTypes}/>
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






