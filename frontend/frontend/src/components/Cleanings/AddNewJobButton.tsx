import { Button } from "@nextui-org/react"

interface Props {
    add: () => void;
}

const AddNewJobButton = ({add}: Props) => {
  return (
    <div className="w-full">
        <Button className="bg-blue-500 text-white font-medium text-md w-full hover:bg-blue-300 hover:text-black hover:text-lg" onClick={add}>
            Nuevo Lavado 
            <span className="font-bold text-md">+</span>
        </Button>
    </div>
  )
}

export default AddNewJobButton
