import { useState } from "react"
import eye from "../../images/eyeIcon.png"
import { ClientType } from "types/ClientsTypes"
import apiBackendUrl from "../../lib/axios"
import { userStore } from "../../store/store"
import handleError from "../../utils/AxiosErrorFragment"
import Loading from "../Spinner/Loading"
import { ServiceType } from "types/ServicesTypes"
import formatDate from "../../functions/TransformDateHour/TransformDate"
import transformPrice from "../../functions/TransformDateHour/TransformPrice"
import formatHourToText from "../../functions/TransformDateHour/TransformHour"

interface Props { 
    detail: ClientType | undefined
}

interface historicVehicleData { 
    description: string,
    patent: string
   _id: string
}

interface hisrtoricDataType { 
   amount: number,
   date: string,
   hour: string,
   service: ServiceType[] | [],
   vehicle: historicVehicleData
   
}

const ClientHistoric = ({detail}: Props) => {

    const [view, setView] = useState<boolean>(false)
    const [load, setLoad] = useState<boolean>(false)
    const [withOutHistoric, setWithOutHistoric] = useState<boolean>(false)
    const [historicData, setHistoricData] = useState<hisrtoricDataType[] | []>([])
    const {user} = userStore()

    const getHistoricClientData = async () => {
        setLoad(true)
         try {
            const {data, status} = await apiBackendUrl.get(`/clients/clientHistoricJobs/${detail?._id}/${user?._id}`)
            if(status === 200) { 
                setView(true)
                setLoad(false)
                if(data.length === 0) { 
                    setWithOutHistoric(true)
                } else { 
                    setHistoricData(data.reverse())
                    setWithOutHistoric(false)
                }
            } else { 
                console.log(status)
                setView(false)
                setLoad(false)
            }
         } catch (error) {
            handleError(error, setLoad)
         }
    }

  return (
     <div className="flex flex-col">
        <div className="flex items-center justify-between w-full border mt-6 h-10 2xl:h-12 bg-blue-500 text-white rounded-lg">
            <p className="text-white font-medium text-lg ml-2">Historico</p>
            {!view ?<img src={eye} className="w-6 h-6 mr-6 cursor-pointer" title="Ver Historico" onClick={() => getHistoricClientData()}/> : 
            <p className="cursor-pointer text-white font-medium text-sm 2xl:text-md mr-6" onClick={() => setView(false)}>X</p>}
        </div> 
        {load ? <div className="flex mt-6 items-center justify-center"><Loading/></div> : null}
      
        {view && load === false && !withOutHistoric ? ( 
            <div className=" w-full mt-2 ml-2 max-h-[150px] overflow-y-scroll mr-4">
             {historicData.map((his : hisrtoricDataType) => ( 
                <div className="flex gap-4 items-center mt-1">
                    <p><span className="font-medium text-zinc-500">Fecha:</span> {formatDate(his.date)} </p>
                    <p><span className="font-medium text-zinc-500">Fecha:</span> {formatHourToText(his.hour)} </p>
                    <p><span className="font-medium text-zinc-500">Monto:</span> {transformPrice(his.amount)}</p>
                </div>
             ))}
            </div>
        ) : view && load === false && withOutHistoric ? ( 
            <div>
               <p className="text-zinc-500 font-medium text-md 2xl:text-lg mt-2 2xl:mt-6">No hay lavados registrados de este cliente</p>
            </div>
        ) : null 
        }

     </div>
  )
}

export default ClientHistoric
