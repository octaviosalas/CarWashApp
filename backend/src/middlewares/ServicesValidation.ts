import type { Request, Response, NextFunction } from "express"
import ServicesModel, {ServicesType} from "../models/Services"

export const validateServiceNotExist = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {service} = req.body
    const {userId} = req.params

    try {
       const verifyVehicleExist = await ServicesModel.findOne({service: service, user: userId})
  
       if(verifyVehicleExist) { 
        res.status(400).json("El servicio ingresado ya forma parte de tus servicios")
       } else { 
         next()
       }
    } catch (error) {   
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}

export const validateServiceExist = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {userId, serviceId} = req.params

    try {
       const verifyVehicleExist = await ServicesModel.findOne({_id: serviceId, user: userId})
  
       if(!verifyVehicleExist) { 
        res.status(400).json("El servicio ingresado no forma parte de tus servicios")
       } else { 
         next()
       }
    } catch (error) {   
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}

export const validateServicePrice= async (req: Request, res: Response, next: NextFunction) => { 
     
  const {price} = req.body

  try {
  
     if(price <= 0 ) { 
      res.status(400).json("El precio del servicio no puede ser 0 o menos de 0.")
     } else { 
       next()
     }
  } catch (error) {   
      console.log(error)
      res.status(500).json("Hubo un error en el midddleware")
  }
}

