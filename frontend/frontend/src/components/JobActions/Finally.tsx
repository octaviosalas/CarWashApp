import { Button } from '@nextui-org/react'


const Finally = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
          <div>
             <p>¿Deseas finalizar el lavado y avisar al cliente por correo electronico?</p>
          </div>
          <div className=''>
            <Button className='bg-blue-500 font-medium w-40 text-sm h-10 rounded-xl'>Notificar</Button>
            <Button className='bg-blue-500 font-medium w-40 text-sm h-10 rounded-xl'>Solo Finalizar</Button>
            <Button className='bg-blue-500 font-medium w-40 text-sm h-10 rounded-xl'>Cancelar</Button>
          </div>
    </div>
  )
}

export default Finally
