import type { Request, Response, NextFunction } from "express"
import CollectionModel, { CollectionType } from "../models/Collections"


declare global {
    namespace Express {
        interface Request {
            collectionData?: CollectionType; 
        }
    }
  }


export const validateJobCollectionExist = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {jobId, userId} = req.params
  
    try {
       const verifyJobCollectionExist = await CollectionModel.findOne({jobReference: jobId, user: userId})
       if(!verifyJobCollectionExist) { 
        res.status(400).json("No existe un cobro almacenado para este Lavado")
       } else { 
         req.collectionData = verifyJobCollectionExist
         next()
       }
    } catch (error) {   
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
  }