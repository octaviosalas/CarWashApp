import type { Request, Response, NextFunction } from "express"
import VehicleModel from "../models/Vehicles"

export const validateVehicleNotExist = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {typeOfVehicle, patent} = req.body
    const {userId} = req.params

    try {
       const verifyVehicleExist = await VehicleModel.findOne({patent: patent, user: userId})

       if(verifyVehicleExist) { 
        res.status(400).json("El Vehiculo ingresado ya forma parte de tus vehiculos registrados")
       } else { 
         next()
       }
    } catch (error) {   
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}

export const validateVehicleExist = async (req: Request, res: Response, next: NextFunction) => { 
     
  const {vehicleId} = req.params

  try {
     const verifyVehicleExist = await VehicleModel.findById(vehicleId)

     if(!verifyVehicleExist) { 
      res.status(400).json("El Vehiculo no esta registrado")
     } else { 
       next()
     }
  } catch (error) {   
      console.log(error)
      res.status(500).json("Hubo un error en el midddleware")
  }
}

export const validateVehicleIsYours = async (req: Request, res: Response, next: NextFunction) => { 
     
  const {vehicleId, userId} = req.params

  try {
     const verifyVehicleIsUserCient = await VehicleModel.findOne({_id: vehicleId, user: userId})

     if(!verifyVehicleIsUserCient) { 
      res.status(400).json("El Vehiculo no forma parte de tus clientes")
     } else { 
       next()
     }
  } catch (error) {   
      console.log(error)
      res.status(500).json("Hubo un error en el midddleware")
  }
}



