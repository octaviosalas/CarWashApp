import type { Request, Response, NextFunction } from "express"
import UserModel from "../models/User"
import { comprarePassword } from "../utils/HashPassword"



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

export const validateAccountNotExist = async (req: Request, res: Response, next: NextFunction) => { 
     
    const {email} = req.body

    try {
       const verifyUserExist = await UserModel.findOne({email: email})
       
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
     
    const {email} = req.body

    try {
       const verifyUserExist = await UserModel.findOne({email: email})

       if(!verifyUserExist) { 
        res.status(400).json("El email ingresado no corresponde a un usuario registrado")
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

export const checkIfUserPasswordIsCorrect = async (req: Request, res: Response, next: NextFunction) => { 
    
     const {userId} = req.params
     const {password} = req.body

     try {
        const user = await UserModel.findById(userId)
        if(!user) { 
            res.status(400).send("El usuario no fue encontrado en nuestra base de datos")
        } else { 
          const isCorrect = await comprarePassword(password, user.password)
          if(isCorrect === false) { 
            res.status(400).json("La contrasñea ingresada es incorrecta")
            console.log("contraseña mal puesta")
            } else { 
               next()
            }
        }
     } catch (error) {
        console.log(error)
        res.status(500).json("Hubo un error en el midddleware")
     }
}