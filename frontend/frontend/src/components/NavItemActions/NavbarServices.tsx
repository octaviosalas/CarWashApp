import deleteJob from "../../images/deleteJob.png"
import editjob from "../../images/editJob.png"

interface Props  { 
    showEditService: () => void,
    showDeleteService: () => void,
}
  
const NavbarServices = ({showEditService, showDeleteService}: Props) => {
    return (
      <div className='flex items-center justify-between mb-2'>
            <div>
                <p className='font-medium text-black text-md'>Detalle del Servicio</p>
            </div>
            <div className='flex items-center gap-8 mr-4'>
                <img src={editjob} title="Editar datos del Lavado"  className='h-6 w-6 cursor-pointer' onClick={() => showEditService()}/>
                <img src={deleteJob} title="Eliminar Lavado" className='h-6 w-6 cursor-pointer'  onClick={() => showDeleteService()}/>
            </div>
      </div>
    )
}
  
  export default NavbarServices