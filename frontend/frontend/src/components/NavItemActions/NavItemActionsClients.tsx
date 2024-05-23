import finallyJobFlag from "../../images/finallyJobFlag.png"
import payJob from "../../images/payJob.png"
import deleteJob from "../../images/deleteJob.png"
import editjob from "../../images/editJob.png"
import plus from "../../images/plus.png"

interface Props  { 
  viewEdit: () => void,
  viewDelete: () => void,
  viewAddVehicle: () => void
}



const NavItemActionsClients = ({viewEdit, viewDelete, viewAddVehicle}: Props) => {
  return (
    <div className='flex items-center justify-between mb-2'>
          <div>
              <p className='font-medium text-black text-md'>Detalle del Cliente</p>
          </div>
          <div className='flex items-center gap-8 mr-4'>
              <img src={editjob} title="Editar datos del Cliente"  className='h-6 w-6 cursor-pointer' onClick={() => viewEdit()}/>
              <img src={deleteJob} title="Eliminar Cliente" className='h-6 w-6 cursor-pointer'  onClick={() => viewDelete()}/>
              <img src={plus} title="Agregar nuevo Vehiculo" className='h-6 w-6 cursor-pointer'  onClick={() => viewAddVehicle()}/>

          </div>

    </div>
  )
}

export default NavItemActionsClients
