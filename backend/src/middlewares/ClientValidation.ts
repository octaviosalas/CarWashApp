import type { Request, Response, NextFunction } from "express"
import ClientModel from "../models/Clients"

export const validateClientExist = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {clientId, userId} = req.params

    try {
       const verifyClientExist = await ClientModel.findOne({_id: clientId, clientOf: userId})

       if(!verifyClientExist) { 
        res.status(400).json("El cliente no se encuentra registrado en tus clientes")
       } else {

        next()
        
        }
    
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}

export const validateClientNotExist = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {name, telephone, dni} = req.body
    const {userId} = req.params

    try {
       const verifyClientExist = await ClientModel.findOne({dni: dni, clientOf: userId})

       if(verifyClientExist) { 
        res.status(400).json("El cliente ya existe registrado en la base de datos")

       } else { 

        next()
       }
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}

export const validateClientNotExistWithVehicle = async (req: Request, res: Response, next: NextFunction) => { 

    const {userId} = req.params

    try {
       const verifyClientExist = await ClientModel.findOne({dni: req.body.client.dni, clientOf: userId})

       if(verifyClientExist) { 
        res.status(400).json("El cliente ya existe registrado en la base de datos")
       } else { 
        next()
       }
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    } 
}



