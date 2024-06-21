import  { useState } from 'react'
import { Button, Select, SelectItem } from '@nextui-org/react'
import arrowBack from "../../images/arrowBack.png"
import transformPrice from '../../functions/TransformDateHour/TransformPrice'
import { JobType } from 'types/JobsTypes'
import apiBackendUrl from '../../lib/axios'
import {toast} from "react-toastify"
import Loading from '../Spinner/Loading'
import axios from 'axios'
import { getDate } from '../../functions/TransformDateHour/HourAndDate'
import DeleteJobCollection from './DeleteJobCollection'
import { userStore } from '../../store/store'
import { initMercadoPago } from '@mercadopago/sdk-react'
import handleError from '../../utils/AxiosErrorFragment'

interface Props { 
    goBack: () => void,
    updateJobs: () => void,
    detail: JobType,
    restart: () => void
}

interface collectionData  { 
    paymentMethod: string,
    date: Date
}

type dataMp = { 
    quantity: number,
    price: number,
    title: string
}


const MarkPayJob = ({goBack, updateJobs, detail, restart}: Props) => {

    initMercadoPago('TEST-c1b81993-f36a-4561-ab69-4d516066e314', {  
        locale:'es-AR'
    });

    const [paymentMethod, setPaymentMethod] = useState<string>("")
    const [load, setLoad] = useState(false)
    const [loadLink, setLoadLink] = useState(false)
    const [showManualPayment, setShowManualPayment] = useState(false)
    const [showLinkPayment, setShowLinkPayment] = useState(false)
    const [badMessage, setBadMessage] = useState(false)
    const [message, setMessage] = useState<string>("")
    const [date, setDate] = useState(getDate())
    const [preferenceId, setPreferenceId] = useState<string>("")
    const user = userStore(state => state.user)

    const showManual = () => { 
        setShowManualPayment(true)
        setShowLinkPayment(false)
    }

    const showLink = () => { 
        setShowManualPayment(false)
        setShowLinkPayment(true)
    }

    const createPreference = async () => { 
        setLoadLink(true)
        const data : dataMp = ({ 
            title: "Lavadero de Autos",
            quantity: 1,
            price: detail.amount
        })
        try {
            const response = await axios.post(`http://localhost:4000/create_preference/${detail?._id}/${user._id}`, data)
            const {id} = response.data
            return id
        } catch (error) {
            console.log(error)
        }
    }

    const handleBuy = async () => { 
     
     const id = await createPreference()
     showLink()
     setLoadLink(false)
     if(id) { 
        setPreferenceId(id)
     }
    }

    const createCollection = async () => { 
        setLoad(true)
        const collectionDataDetail  : collectionData = ({
            paymentMethod: paymentMethod,
            date: date
        })
        try {
          const {data, status}  = await apiBackendUrl.put(`/jobs/markAsPaid/${detail._id}/${user?._id}`, collectionDataDetail)    
                if(status === 200) { 
                    toast.success(data, {
                    style: { backgroundColor: 'white', color: 'blue' },
                    pauseOnHover: false,
                    autoClose: 3500
                    });
                    updateJobs()
                    setLoad(false)
                    setTimeout(() => { 
                    restart()
                    goBack()
                }, 2000)
              } 
           } catch (error) {
                handleError(error, setLoad)
    }
    }

  return (
    <div className="flex flex-col items-center justify-center w-full">
         <div className='w-full  flex justify-start mt-2'>
           <img className='w-8 h-8 cursor-pointer' title="Volver al detalle" src={arrowBack} onClick={() => goBack()}/>
        </div>
          
        {detail.paid === false ? 
         <>
                <div className='mt-12 h-12 w-full bg-blue-500 flex rounded-lg text-center items-center justify-center'>
                    <div className=' w-full'>
                       <p className='font-medium text-white text-md'>Cargar cobro</p>
                    </div>
                </div>

               {showManualPayment || showLinkPayment ? null :
                <div className='mt-12 gap-6 flex items-center'>
                    <Button className='bg-blue-500 font-medium text-white w-52 2xl:w-60 3xl:w-96' onClick={() => showManual()}>Cargar cobro Manualmente</Button>
                    <Button  className='bg-blue-500 font-medium text-white w-52 2xl:w-60 3xl:w-96'  onClick={() => handleBuy()}>Generar Link de Pago</Button>
                </div>}

                {loadLink ? <div className="flex items-center justify-center mt-12"> <Loading/> </div> : null}

                {preferenceId &&   <p className='text-blue-500 font-medium cursor-pointer mt-12'>{preferenceId}</p> }


              {showManualPayment ?
              <> 
                   
                    <div className="flex items-center justify-center mt-4 gap-2 w-full border h-12 text-center rounded-lg bg-green-800">
                        <p className="font-medium text-white text-md">Monto a cobrar:</p>
                        <p className="font-medium text-white text-md">{transformPrice(detail.amount)}</p>
                    </div>
                    <div className='mt-4 w-full'>
                        <Select label="Seleciona el metodo de pago" className='border border-blue-600 rounded-xl w-2/4'>
                            <SelectItem  key="Efectivo" onClick={() => setPaymentMethod("Efectivo")}>Efectivo</SelectItem>
                            <SelectItem  key="Transferencia" onClick={() => setPaymentMethod("Transferencia")}>Transferencia</SelectItem>
                            <SelectItem  key="Tarjeta de Debito" onClick={() => setPaymentMethod("Tarjeta de Debito")}>Tarjeta de Debito</SelectItem>
                            <SelectItem  key="Tarjeta de Credito" onClick={() => setPaymentMethod("Tarjeta de Credito")}>Tarjeta de Credito</SelectItem>
                        </Select>
                    </div>
                    <div>
                    {paymentMethod.length > 0 ? 
                        <div className='flex items-center gap-6 mt-4'>
                        <Button className='bg-blue-500 font-medium text-md w-52 text-white' onClick={() => createCollection()}>Guardar Cobro</Button>
                        <Button className='bg-gray-400 font-medium text-md w-52 text-white'  onClick={() => goBack()}>Cancelar</Button>
                        </div>
                        :
                        null
                    }
                    </div> 
                </>
                 : null}

                 {load ? <div className='mt-6 flex items-center justify-center'> <Loading/>  </div> : null}

         </>
          : 
          <div className=' w-full'>
              <DeleteJobCollection detail={detail} updateJobs={updateJobs} goBack={goBack} restart={restart}/>
          </div>
        }
          
        

           {badMessage ? <div className='mt-4 flex items-center justify-center'> <p className='text-white bg-red-600 text-center'>{message}</p> </div> : null}
    </div>
  )
}

export default MarkPayJob
