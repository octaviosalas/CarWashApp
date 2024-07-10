import deleteJob from "../../images/deleteJob.png"
import editjob from "../../images/editJob.png"

interface Props { 
  showEdit: () => void,
  showDelete: () => void
}

const NavbarExpenses = ({showEdit, showDelete}: Props) => {
  return (
    <div className='flex items-center justify-between mb-2'>
      <div>
          <p className='font-medium text-black text-md'>Detalle del Gasto</p>
      </div>
      <div className='flex items-center gap-6 mr-8'>
          <img src={editjob} title="Editar datos del gasto"  className='h-6 w-6 cursor-pointer' onClick={() => showEdit()}/>
          <img src={deleteJob} title="Eliminar gasto" className='h-6 w-6 cursor-pointer'  onClick={() => showDelete()}/>
      </div>
</div>
  )
}

export default NavbarExpenses
