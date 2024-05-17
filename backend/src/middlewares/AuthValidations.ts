import type { Request, Response, NextFunction } from "express"
import mongoose from "mongoose"
import UserModel from "../models/User"



export const validateUserExist = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {userId} = req.params

    try {
       const verifyUserExist = await UserModel.findById(userId)

       if(!verifyUserExist) { 
        res.status(400).json("El usuario no existe almacenado en la base de datos")
       } else { 
        next()
       }        
    
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}


export const validateUserNotExist = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {userId} = req.params

    try {
       const verifyUserExist = await UserModel.findById(userId)
       
       if(verifyUserExist) { 
        res.status(400).json("El usuario ya existe almacenado en la base de datos")
       } else { 
        next()
       }
               
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}

export const validateEmailExist = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {email, name} = req.body

    try {
       const verifyUserExist = await UserModel.findOne({email: email})

       if(!verifyUserExist) { 
        res.status(400).json("El usuario no existe almacenado en la base de datos")
       } else { 
        next()
       }        
           
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}

export const validateUserAccountIsConfirmed = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {userId} = req.params

    try {
       const verifyUserExist = await UserModel.findById(userId)

       if(verifyUserExist.confirmed !== true) { 
        res.status(400).json("La cuenta a la que estas queriendo asignarle un cliente no se encuentra confirmada")
       } else { 
        next()
       }        
    
    } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
    }
}
