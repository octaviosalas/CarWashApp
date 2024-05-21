import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";


interface Props { 
    clientId: string
}

const AddNewVehicle = ({clientId}: Props) => {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button className="bg-blue-500 font-medium text-sm w-52 text-white" onPress={onOpen}>Añadir Vehiculo</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Añadir Vehiculo</ModalHeader>
              <ModalBody>
                 {clientId}
              </ModalBody>
              <ModalFooter className="flex gap-4 items-center">
                <Button className="bg-blue-700 font-medium text-sm w-52" onPress={onClose}>
                  Crear
                </Button>
                <Button className="bg-blue-500 font-medium text-sm w-52" onPress={onClose}>
                  Cancelar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddNewVehicle