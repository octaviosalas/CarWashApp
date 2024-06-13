import { Request, Response } from "express";
import UserModel from "../models/User";
import { hashPassowrd, comprarePassword } from "../utils/HashPassword";
import TokenModel from "../models/Token";
import { createSixDigitsToken } from "../utils/token";
import { sendEmailConfirmationWithToken } from "../emails/AuthEmail";
import ClientModel from "../models/Clients";
import { sendEmailToVerifyUserAccount } from "../utils/SendEmailToClient";
import ServicesModel from "../models/Services";


export const createNewAcount = async (req: Request, res: Response) => { 

    try {
            const newUserToBeAdded = new UserModel(req.body)
            newUserToBeAdded.password = await hashPassowrd(req.body.password)

            const token = new TokenModel
            token.token = createSixDigitsToken()
            token.user = newUserToBeAdded.id

            await sendEmailToVerifyUserAccount({ 
                email: newUserToBeAdded.email, 
                token: token.token, 
                name: newUserToBeAdded.name
           })

           await Promise.allSettled([newUserToBeAdded.save(), token.save()])
           res.send("Hemos enviado un correo electronico a tu email para confirmar tu cuenta. Encontraras un Token de confirmacion que expirara en 15 minutos.")
        

    } catch (error) {
        res.status(500).json({error: "Hubo un error en la creacion de la cuenta"})
    }
}




export const confirmAccountWithToken = async (req: Request, res: Response) => { 

    const {token} = req.body
    console.log(token)

    try {
        const verifyToken = await TokenModel.findOne({token: token})

        if(!verifyToken) { 
            console.log("No encontre el token")
            const error = new Error("El Token es incorrecto o ha expirado")
            return res.status(401).json({error: error.message})
        } else { 
            const getUserTokenOwner = await UserModel.findById(verifyToken.user)
            getUserTokenOwner.confirmed = true
            await getUserTokenOwner.save() 
            await verifyToken.deleteOne() 
            res.status(200).json("La cuenta ha sido confirmada exitosamente")
        }


    } catch (error) {
       res.status(500).json({error: "Hubo un error en la creacion de la cuenta"})
    }
}

export const login = async (req: Request, res: Response) => { 
    
    const {email, password} = req.body
    
    try {
          
        const user = await UserModel.findOne({email: email})

        if(!user) { 

            const error = new Error("El usuario no esta registrado en la base de datos")
            return res.status(401).json({error: error.message})

        } else if (user.confirmed !== true) { 

          console.log("sin confirmar")
          const newTokenToSend = new TokenModel
          newTokenToSend.user = user.id
          newTokenToSend.token = createSixDigitsToken()
          await newTokenToSend.save()

          await sendEmailConfirmationWithToken({ 
             email: user.email,
             name: user.name,
             token: newTokenToSend.token
          })

          const error = new Error("La cuenta no ha sido confirmada, hemos enviado un nuevo email de confirmacion. Tu Token expirara en 15 minutos")
          return res.status(200).json({error: error.message})

        } else { 

            const isPasswordCorrect = await comprarePassword(password, user.password)

            if(isPasswordCorrect === false) { 
                res.status(400).json("La contrasñea ingresada es incorrecta")
                console.log("contraseña mal puesta")
            } else { 
                const userServices = await ServicesModel.find({user: user._id})
                const userClients = await ClientModel.find({clientOf: user._id})

                res.status(200).json({userData: user, userServices: userServices, userClients: userClients})
            }
        }

    } catch (error) {
        res.status(500).json({error: "Hubo un error en el ingreso a la cuenta"})
     }
}

export const updateUserData = async (req: Request, res: Response) => { 
    try {
        
    } catch (error) {
        
    }
}

export const deleteUserAccount = async (req: Request, res: Response) => { 
    try {
        
    } catch (error) {
        
    }
}

