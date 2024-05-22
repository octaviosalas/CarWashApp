import finallyJobFlag from "../../images/finallyJobFlag.png"
import payJob from "../../images/payJob.png"
import deleteJob from "../../images/deleteJob.png"
import editjob from "../../images/editJob.png"

interface Props  { 
  viewEdit: () => void,
  viewDelete: () => void,
  viewPay: () => void,
  viewCompletedJob: () => void
}

const NavItemActions = ({viewEdit, viewDelete, viewPay, viewCompletedJob}: Props) => {
  return (
    <div className='flex items-center justify-between mb-2'>
          <div>
              <p className='font-medium text-black text-md'>Detalle del Lavado</p>
          </div>
          <div className='flex items-center gap-8 mr-4'>
              <img src={editjob} title="Editar datos del Lavado"  className='h-6 w-6 cursor-pointer' onClick={() => viewEdit()}/>
              <img src={deleteJob} title="Eliminar Lavado" className='h-6 w-6 cursor-pointer'  onClick={() => viewDelete()}/>
              <img src={payJob} title="Asentar pago del Lavado" className='h-6 w-6 cursor-pointer'  onClick={() => viewPay()}/>
              <img src={finallyJobFlag} title="Marcar lavado como finalizado" className='h-6 w-6 cursor-pointer' onClick={() => viewCompletedJob()}/>
          </div>

    </div>
  )
}

export default NavItemActions
