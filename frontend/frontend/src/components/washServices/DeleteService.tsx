import { ServiceType } from 'types/ServicesTypes'
import { Button } from '@nextui-org/react'
import arrow from "../../images/arrowBack.png"
import QuestionBeforeDeleteService from './QuestionBeforeDeleteService'


interface Props { 
    detail: ServiceType | undefined,
    goBack: () => void,
    update: () => void
}

const DeleteService = ({detail, goBack, update}: Props) => {


  return (
    <div>
        <div className='w-full justify-start text-start'>
           <img src={arrow} className='w-5 h-5 2xl:w-7 2xl:h-7 cursor-pointer' title="Volver" onClick={() => goBack()}/>
        </div>
    <div className='flex flex-col items-center justify-center mt-24 2xl:mt-36'>
        <h5 className='text-black font-medium txt-lg'>¿Estas seguro de eliminar el Servicio?</h5>
        <p className='text-md mt-3'>Ten en cuenta que se eliminaran los lavados y cobros vinculados al mismo </p>
    </div>
    <div className='mt-4 2xl:mt-8 flex justify-center items-center gap-4 2xl:gap-8'>
        <QuestionBeforeDeleteService update={update} detail={detail}/>
        <Button className='bg-zinc-400 text-white font-medium text-sm w-1/4' onClick={() => goBack()}>Cancelar</Button>
    </div>
</div>
  )
}

export default DeleteService
