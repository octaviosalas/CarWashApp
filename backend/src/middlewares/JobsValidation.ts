import type { Request, Response, NextFunction } from "express"
import VehicleModel from "../models/Vehicles"
import JobsModel, { JobsType } from "../models/Jobs"

declare global {
  namespace Express {
      interface Request {
          jobData?: JobsType; 
      }
  }
}

export const validateVehicleExistInUserClientsVehicles = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {vehicle} = req.body
    const {userId} = req.params

    try {
       const verifyVehicleExist = await VehicleModel.findOne({_id: vehicle, user: userId})
  
       if(!verifyVehicleExist) { 
        res.status(400).json("El Vehiculo ingresado no forma parte de tus vehiculos registrados")
       } else { 
         next()
       }
    } catch (error) {   
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}

export const validateJobExist = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {jobId} = req.params

    try {
       const verifyJobExist = await JobsModel.findById(jobId)
       if(!verifyJobExist) { 
        res.status(400).json("El Lavado solicitado no se encuentra registrado")
       } else { 
         req.jobData = verifyJobExist
         next()
       }
    } catch (error) {   
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}

export const validateJobIsUserJob = async (req: Request, res: Response, next: NextFunction) => { 
     
  const {jobId, userId} = req.params

  try {
     const verifyJobIsUserJob  = await JobsModel.findOne({_id: jobId, user: userId})
     if(!verifyJobIsUserJob) { 
      res.status(400).json("El Lavado solicitado no te pertenece")
     } else { 
       req.jobData = verifyJobIsUserJob
       next()
     }
  } catch (error) {   
      console.log(error)
      res.status(500).json("Hubo un error en el midddleware")
  }
}


    
  