import React from 'react'
import { Button } from "@nextui-org/react"

interface Props { 
  add: () => void
}

const AddNewClient = ({add}: Props) => {
  return (
    <div>
       <Button className="bg-blue-500 text-white font-medium text-md w-96 hover:bg-blue-300 hover:text-black hover:text-lg" onClick={() => add()}>
          Añadir Cliente <span className='text-lg font-bold'>+</span> 
       </Button>
    </div>
  )
}

export default AddNewClient
