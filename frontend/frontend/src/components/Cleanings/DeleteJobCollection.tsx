import { Button } from '@nextui-org/react'
import apiBackendUrl from '../../lib/axios'
import { JobType } from 'types/JobsTypes'
import {toast} from "react-toastify"
import { useState } from 'react'
import Loading from '../Spinner/Loading'
import { userStore } from '../../store/store'
import { CollectionsType } from 'types/CollectionsType'
import handleError from '../../utils/AxiosErrorFragment'
import transformPrice from '../../functions/TransformDateHour/TransformPrice'
import formatDate from '../../functions/TransformDateHour/TransformDate'
import CollectionDetailTableData from "./CollectionDetailTableData"




interface Props { 
    updateJobs: () => void,
    restart: () => void,
    detail: JobType,
    goBack: () => void
}

const DeleteJobCollection = ({detail, updateJobs, goBack, restart}: Props) => {

  
    const [load, setLoad] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")
    const [collectionData, setCollectionData] = useState<CollectionsType | undefined>()
    const [showCollectionData, setShowCollectionData] = useState<boolean>(false)
    const user = userStore(state => state.user)

    const deleteCollection = async () => { 
          try {
            const {data, status} = await apiBackendUrl.delete(`/jobs/deletePaid/${detail._id}/${user?._id}`) 
            if(status === 200) { 
                updateJobs()
                toast.success(data, {
                    style: { backgroundColor: 'white', color: 'blue' },
                    pauseOnHover: false,
                    autoClose: 2000
                });
                updateJobs()
                setLoad(false)
                setTimeout(() => { 
                    goBack()
                    restart()
                }, 1500)
              
            } else { 
                console.log("a")
            }
          } catch (error) {
            handleError(error, setLoad)
        }
    }

    const viewCollectionData = async () => { 
        setLoad(true)
        try {
            const {data, status} = await apiBackendUrl.get(`/jobs/jobCollection/${detail._id}/${user?._id}`)
            if(status === 200) { 
                setCollectionData(data)
                setLoad(false)
                setShowCollectionData(true)
            }
        } catch (error) {
            handleError(error, setLoad)
        }
    }

  return (
    <div className='w-full '>
        <div className='flex flex-col items-center justify-center w-full '>
             <div className='mt-4'>
                 <h5 className='font-medium text-black text-md'>El lavado seleccionado tiene un cobro registrado</h5>
             </div>
             <div className='flex items-center justify-center gap-8 mt-4'>
                 <Button className='bg-blue-500 text-white text-md font-medium w-52' onClick={() => deleteCollection()}>Eliminar cobro</Button>
                 {!showCollectionData ? 
                  <Button className='bg-blue-500 text-white text-md font-medium w-52' onClick={() => viewCollectionData()}>Ver cobro</Button> : 
                  <Button className='bg-blue-500 text-white text-md font-medium w-52' onClick={() => setShowCollectionData(false)}>Ocultar Cobro</Button>}
             </div>
             {load ? <div className='flex mt-4 items-center justify-center'> <Loading/> </div> : null}
            
             {showCollectionData && load === false ? 
             <div className='flex w-full  flex-col justify-center items-center mt-6'>
                
                 <div className='flex flex-col justify-start items-start mt-2 w-full'>
                   <CollectionDetailTableData detail={collectionData}/>
                 </div>
             </div> : null}

        </div>
    </div>
  )
}

export default DeleteJobCollection
