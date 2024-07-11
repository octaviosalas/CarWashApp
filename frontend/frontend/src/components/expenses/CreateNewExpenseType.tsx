import apiBackendUrl from '../../lib/axios'
import { userStore } from '../../store/store'
import {  useState } from 'react'
import handleError from '../../utils/AxiosErrorFragment'
import Loading from '../Spinner/Loading'
import { toast } from 'react-toastify'
import { Button } from '@nextui-org/react'

interface newTypeExpense {
    name: string
}

interface Props { 
    update: () => void,
    cancel: () => void
}

const CreateNewExpenseType = ({update, cancel}: Props) => {

    const [name, setName] = useState<string>("")
    const [load, setLoad] = useState<boolean>(false)
    const user = userStore((state) => state.user)

    const updateTypes = userStore((state) => state.fetchAndSetUserTypeOfExpenses)

    const createNewType = async () => { 
        setLoad(true)
        const newData : newTypeExpense= ({ 
            name: name
        })
       try {
        const {data, status} = await apiBackendUrl.post(`/expenses/createNewTypeOfExpense/${user?._id}`, newData)
        if(status === 200) { 
            toast.success(data.message, {
                style: { backgroundColor: 'white', color: 'blue' },
                pauseOnHover: false,
                autoClose: 2000
            });
            update()
            setLoad(false)
            updateTypes()
        }
       } catch (error) {
          handleError(error, setLoad)
       }
    }

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setName(e.target.value)
    }

  return (
    <div className='w-full'>
        <div className='flex flex-col justify-start items-start'>
           <div className='bg-blue-500 font-medium flex justify-between items-center text-white text-center w-full rounded-lg h-10'>
               <p className='ml-2'>Crear nuevo tipo de Gasto</p>
               <p className='mr-4 text-white text-sm cursor-pointer' onClick={cancel}>X</p>
           </div>
           <div className='flex flex-col justify-start items-start mt-4'>
                <label>Nombre</label>
                <input type="text" name="price" id="price" className=" mt-1s w-80 2xl:w-96 rounded-md border-1 py-1.5 pl-7 pr-20 sm:text-sm sm:leading-6 focus:outline-none" 
                onChange={handleChangeName}/>
           </div>
        </div>
        <div className='flex items-center gap-6 mt-4'> 
            <Button className='bg-blue-500 w-72 text-white font-medium text-sm' onClick={() => createNewType()}>Crear</Button>
            <Button className='bg-gray-300 w-72 text-white font-medium text-sm' onClick={() => cancel()}>Cancelar</Button>
        </div>

        {load ? <div className='mt-6 flex items-center justify-center'> <Loading/> </div> : null}
        
    </div>
  )
}

export default CreateNewExpenseType
